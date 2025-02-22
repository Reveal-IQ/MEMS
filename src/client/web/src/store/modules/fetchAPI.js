/*
************************************
*  Created By : Reveal IQ          *
*  Author     : Sudheer            *
*  Date       : 15 MAY 2021        *
*  Version    : 0.1.0.01.05-0521   *
************************************
*/

// Imports
import { createHash } from 'crypto';

// Fetch API module is used to handle Rest API request for USLGN
const fetchAPI = {

    actions: { 

        // Used to create a ramdom hex of size 5
        async createRandomHex(){
            try{
                let size = 5, charset = "0123456789ABCDEF", randomID = "";
                Array.from({ length: size }, () => {
                    randomID += charset[Math.floor(Math.random() * charset.length)];
                });
                return randomID;
            } catch (err){
                console.log(err)
            }
            
        },

        // Used to create signature for given data
        async createSignature({ commit }, info){
            try{
                // Convert the data to buffer
                const buffer = Buffer.from( JSON.stringify(info.data) );

                // Create a hash for the buffer and encode it with base64
                const hash = createHash(info.algorithm).update(buffer).digest('base64');
                
                return hash;
            } catch (err){
                console.log(err)
            }
        },

        // Method used to send USLGN API request
        async sendHTTPReq({ dispatch, rootState }, req){
            try{
                // Add current timestamp to request
                req.DateTime = Date.now()

                // Add ID for the request
                req.ID = req.DateTime  + await dispatch('createRandomHex');
                
                // Add requester information User ID and Instititute Code to the request
                req.Requester = {
                    ...((rootState.globalStore.UserInfo && rootState.globalStore.UserInfo.hasOwnProperty("ID_User") && rootState.globalStore.UserInfo.ID_User) && { UserID: rootState.globalStore.UserInfo.ID_User }),
                    ...((rootState.globalStore.UserInfo && rootState.globalStore.UserInfo.hasOwnProperty("Institute_Info") && rootState.globalStore.UserInfo.Institute_Info.Code) && {InstituteCode: rootState.globalStore.UserInfo.Institute_Info.Code})
                }

                // Create signature for the request 
                req.Signature = await dispatch('createSignature', { data:req, algorithm: 'sha256' })
                
                // Encode the req by converting it to base64
                let endcodedReq = btoa(JSON.stringify(req))

                // To abort fech API requests on request expiry
                const controller = new AbortController();
                const expiryTimeoutID = setTimeout(() => controller.abort(), req.Expiry);

                // Send POST request
                const response = await fetch(`http://mems.revealiq.co/api/${req.Request.Module}/${req.Request.ServiceCode}`, {
                    method: 'POST',
                    headers:{
                        'Content-Type': 'text/plain',
                    },
                    body: endcodedReq,
                    signal: controller.signal
                });
                
                clearTimeout(expiryTimeoutID)

                // Convert response from base64 to JSON
                let res = JSON.parse(atob(await response.text()));

                // Verify Signature for the response
                let resCopy = Object.assign({}, res);
                delete resCopy.Signature;
                let compareSignature = await dispatch("createSignature", { data:resCopy, algorithm: 'sha256' });
                
                //if(res.Signature !== compareSignature) throw "Invalid Signature";

                // Return the response to the parent function
                return res;
            } catch(err){
                console.log(err);
                if(err.message === "Failed to fetch"){
                    req.Type = "ERROR"
                    req.Response = {
                        Request_ID: req.ID,
                        Error_Code: "UI-E001",
                        Error_Msg: "Failed to send request to the server"
                    }
                } else if (err.name === "AbortError"){
                    req.Type = "ERROR"
                    req.Response = {
                        Request_ID: req.ID,
                        Error_Code: "UI-E002",
                        Error_Msg: "Request timeout"
                    }
                }
                return req
            }
        }
     }
}

export default fetchAPI;