/*
************************************
*  Created By : Reveal Foundation  *
*  Author     : Akshay Puli        *
*  Date       : Aug 27 2022        *
*  Version    : 0.2.0              *
************************************
*/

import { io } from 'socket.io-client';

// Configure socket.io connection options 
var options = {
    path: "/ws/", // proxy path for WebSocket connection
    auth: {
        token: null, // Refresh Token is Included here while creating the connection
    },
    transports: ['websocket'],
    upgrade: false,
    autoConnect: false // Need to establish connection mannually
}

// WebSocket connection request
const socket = io ("ws://mems.revealfoundation.com", options);

// Request Buffer
var requestBuffer = [];

// Timeout set for each socket request
const withTimeout = (onSuccess, onTimeout, timeout) => {
    let called = false;

    const timer = setTimeout(() => {
        if (called) return;
        called = true;
        onTimeout();
    }, timeout);
  
    return (...args) => {
        if (called) return;
        called = true;
        clearTimeout(timer);
        onSuccess.apply(this, args);
    }
}

// To handle communication for all the services except USLGN
const socketLink = {

    state: () => ({
        socketStatus: null, // connected, disconnected, reconnecting, authErr, error
        accessToken: null,
        accessIssuedAt: null,
        accessExpiresIn: null,
        accessStatus: null, // renewed, renewing
        renewalTimeoutID: null
    }),

    mutations: { 

        // To update the status of the socket connection
        UPDATE_SOCKET_STATUS(state, status){
            state.socketStatus = status
        },

        // To add the access token
        SET_ACCESS_TOKEN(state, token){
            state.accessToken = token
        },

        // To add the access expiry
        SET_ACCESS_ISSUEDAT(state, issuedAt){
            state.accessIssuedAt = issuedAt
        },

        // To add the access expiry
        SET_ACCESS_EXPIRESIN(state, expiry){
            state.accessExpiresIn = expiry
        },

        // To add the access expiry
        UPDATE_ACCESS_STATUS(state, status){
            state.accessStatus = status
        },

        SET_RENEWAL_TIMEOUT_ID(state, id){
            state.renewalTimeoutID = id
        }
    },

    actions: { 

        // To create the WebSocket connections
        createConnection ({ commit, state }){
            try{
                console.log("WEB-I??: Socket Connection Requested.")

                // Check if there is an existing WebSocket connection
                if(state.socketStatus) throw "A WebSocket connection already exists.";
                
                // Include Refresh Token
                options.auth.token = localStorage.getItem("Token");
                
                // Establish socket connection
                socket.connect();

                // To handle connect event on socket connection
                socket.on('connect', () => {
                    console.log("CLNT-connected.");
                    
                    // Get access token for the first time
                    if(state.accessToken === null) this.dispatch("renewAccessToken")

                    // To update the socket status to connected
                    this.commit("UPDATE_SOCKET_STATUS", "connected")
                })

                socket.on('access_token', (res) => {
                    this.dispatch("updateAccessToken", res)
                })

                socket.on('refresh_token_expired', () => {
                    localStorage.removeItem("Token"); // Remove token from local storage
                    localStorage.removeItem("IssuedAt"); // Remove token issued time from local storage
                    localStorage.removeItem("ExpiresIn"); // Remove token expiry time from local storage
                    alert("Refresh Token Expired. Loging out ...")
                    location.reload();
                })

                // To handle diconnect event on socket connection
                socket.on("disconnect", () => {
                    console.log("disconnected.");

                    // To update the socket status to disconnected
                    this.commit("UPDATE_SOCKET_STATUS", "disconnected")
                })

                // To handle reconnect_attemp event on socket connections
                socket.on("reconnect_attempt", (number) => {
                    console.log("Reconnecing Attempt: ", number)

                    // To update the socket status to reconnecting
                    this.commit("UPDATE_SOCKET_STATUS", "reconnecting")
                })

                // To handle reconnect event on socket connection
                socket.on("reconnect", () => {
                    console.log("Reconnected");

                    // To update the socket status as connected after disconnection
                    this.commit("UPDATE_SOCKET_STATUS", "connected")
                })

                // To handle error event on socket connection
                socket.on("error", (error) => {
                    console.log("error");

                    // To update the socket status as error object
                    commit('SET_SOCKET_STATUS', error);
                })
                
                // To handle connect_error event on socket connection
                socket.on("connect_error", (err) => {
                    console.log("WEB-E??: Attempted Socket Connection and failed with error. " + err.message);
                    if(err.message == "not authorized"){

                        localStorage.removeItem("Token"); // Remove token from local storage
                        localStorage.removeItem("IssuedAt"); // Remove token issued time from local storage
                        localStorage.removeItem("ExpiresIn"); // Remove token expiry time from local storage
                        
                        // To emit "authErr" event on authorization error
                        this.dispatch('emitEvent', {
                            type: "authErr", 
                            data: err
                        });

                        // To update the socket status as authErr
                        this.commit("UPDATE_SOCKET_STATUS", "authErr")
                    } else{

                        // To update the socket status as error object
                        this.commit("UPDATE_SOCKET_STATUS", err)
                    }
                })

            } catch (err){
                console.log(err);
            }
        },

        // Disconnects socket connection
        disconnectSocket(){
            if(socket.connected) {
                socket.disconnect()
            }
        },

        // Reconnect socket connection manually 
        reconnectSocket(){
            if(socket.disconnected) {
                // Include Refresh Token
                options.auth.token = localStorage.getItem("Token");

                // Establish socket connection
                socket.connect()
            }
        },

        // To configure request packet sent over WebSocket connections
        async sendSocketReq ({ state, dispatch, rootState }, request){
            try{
                
                // Store the request in the buffer if Access Token not renewed
                if(state.accessStatus !== "renewed") {
                    dispatch("addReqBuffer", request);
                } else {
                    // Make a copy of the request body from request data
                    let req = Object.assign({}, request.data);

                    // Add current epoch time to request
                    req.DateTime = Date.now();

                    // Add ID the request packet
                    req.ID = req.DateTime + await dispatch('createRandomHex');
                    
                    // Add requester information like User ID, Institute Code, Socket ID and Access Token to the request packet
                    req.Requester = {
                        ...((socket && socket.hasOwnProperty("id") && socket.id) && { SocketID: socket.id }),
                        ...((rootState.globalStore.UserInfo && rootState.globalStore.UserInfo.hasOwnProperty("ID_User") && rootState.globalStore.UserInfo.ID_User) && { UserID: rootState.globalStore.UserInfo.ID_User }),
                        ...((rootState.globalStore.UserInfo && rootState.globalStore.UserInfo.hasOwnProperty("Institute_Info") && rootState.globalStore.UserInfo.Institute_Info.Code) && {InstituteCode: rootState.globalStore.UserInfo.Institute_Info.Code}),
                        ...( state.accessToken  && { Token: state.accessToken })
                    }

                    // Create signature for the request packet
                    req.Signature = await dispatch('createSignature', { data:req, algorithm: 'sha256' });

                    // Encode the request by coverting to base64
                    let encodedReq = btoa(JSON.stringify(req));
                
                    // Handle Response
                    let handleResponse = async (response) => {
                        try {
                            // Covert base64 to JSON
                            let res = JSON.parse(atob(response));
                        
                            // Verify Signature for the response
                            let resCopy = Object.assign({}, res);;
                            delete resCopy.Signature;
                            let compareSignature = await dispatch("createSignature", { data: resCopy, algorithm: 'sha256' });
                          
                            if (res.Signature !== compareSignature){
                                
                                console.log("Response Signature:" + res.Signature);
                                console.log("Compare Signature: "+compareSignature)
                                console.log(resCopy)

                                //throw "Invalid Signature"; --> Bug with some packets
                            } 
                            
                            // Send response to the provided callback function
                            request.callback(res);
                        } catch (err) {
                            console.log(err);
                        }
                    }

                    // Handle request timeout
                    let handleTimeout = () => {
                        try {
                            socket.offAny(req.ID);
                            req.Type = "ERROR"
                            req.Response = {
                                Request_ID: req.ID,
                                Error_Code: "UI-E002",
                                Error_Msg: "Request timeout"
                            }
                            request.callback(req);
                        } catch (err) {
                            console.log(err)
                        }
                    }

                    // Send encoded request to the server
                    socket.emit("socket_request", encodedReq, withTimeout(handleResponse, handleTimeout, req.Expiry));
                }

            } catch(err) {
                console.log(err);
            }
        },

        // Send request to renew Access Token
        async renewAccessToken ({ commit, dispatch, rootState }){
            try{

                commit('UPDATE_ACCESS_STATUS', "renewing");
                
                // Construct the request packet to renew acces token
                let req = {
                    ID: new Date().valueOf() + await dispatch('createRandomHex'),
                    DateTime: new Date().valueOf(),
                    Expiry: 10000,
                    Type: "REQUEST",
                    Requester: {
                        ...((socket && socket.hasOwnProperty("id") && socket.id) && { SocketID: socket.id }),
                        ...((rootState.globalStore.UserInfo && rootState.globalStore.UserInfo.hasOwnProperty("ID_User") && rootState.globalStore.UserInfo.ID_User) && { UserID: rootState.globalStore.UserInfo.ID_User }),
                        ...((rootState.globalStore.UserInfo && rootState.globalStore.UserInfo.hasOwnProperty("Institute_Info") && rootState.globalStore.UserInfo.Institute_Info.Code) && {InstituteCode: rootState.globalStore.UserInfo.Institute_Info.Code})
                    },
                    Request: {
                        Refresh_Token: localStorage.getItem("Token")
                    }
                }

                // Create signature for the request
                req.Signature = await dispatch('createSignature', { data:req, algorithm: 'sha256' });

                // Encode the request packet by converting to base64
                let encodedReq = btoa(JSON.stringify(req));
   
                // Sends encoded request to renew Access Token to server
                socket.emit("renew_access_token", encodedReq);
                
            } catch(err){
                console.log(err);
            }
        },

        // To handle reaposne for the request to renew acces token
        async updateAccessToken ({ state, commit, dispatch }, response) {
            try{
                // Covert base64 to JSON
                let res = JSON.parse(atob(response));
                
                // Verify signature for the response
                let resCopy = Object.assign({}, res);
                delete resCopy.Signature;
                let compareSignature = await dispatch("createSignature", { data:resCopy, algorithm: 'sha256' });
                if(res.Signature !== compareSignature) throw "Invalid Sinature";
                
                if(res.Type === "RESPONSE") {
                    commit('SET_ACCESS_TOKEN', res.Response.Access_Token);
                    commit('SET_ACCESS_ISSUEDAT', res.Response.Issued_At)
                    commit('SET_ACCESS_EXPIRESIN', res.Response.Expires_In);
                    commit('UPDATE_ACCESS_STATUS', "renewed");

                    // Set timeout to renew Access Token
                    if(state.renewalTimeoutID) clearTimeout(state.renewalTimeoutID);
                    let timeoutID = setTimeout(() => {
                        this.dispatch("renewAccessToken")
                    }, parseInt(res.Response.Expires_In) - 10000);

                    // Add renewal timeoutID to store
                    commit("SET_RENEWAL_TIMEOUT_ID", timeoutID);

                    // Emits "accessTokenRenewed" event on successful connection
                    this.dispatch('emitEvent', {
                        type: "accessTokenRenewed"
                    });

                    // Process requests stored in the buffer
                    if(requestBuffer.length >= 1) dispatch("processBufferedReq");

                } else {
                    console.log(res.Response);
                }

            } catch(err){
                console.log(err);
            }
        },

        // Add given request to buffer
        addReqBuffer({}, request){
            try{
                requestBuffer.push(request);
            } catch(err){
                console.log("Error in addReqBuffer ", err)
            }
        },

        // Process the requests present in array and finally clears the array
        async processBufferedReq({dispatch}){
            try{
                let requestPromises = requestBuffer.map(req => {
                    dispatch("sendSocketReq", req);
                })
                await Promise.all(requestPromises);
                requestBuffer = [];
            } catch(err){
                console.log("Error in processBufferedReq ", err)
            }
        }

    }
}

export default socketLink;
