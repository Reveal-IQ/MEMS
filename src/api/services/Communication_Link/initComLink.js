/*
************************************
*  Created By : Reveal IQ          *
*  Author     : Sudheer            *
*  Date       : 15 MAY 2021        *
*  Version    : 0.1.0.01.07-0521   *
************************************
*/

exports.initComLink = async function (){    
    try{
        // Imports
        const cors = require("cors");
        const express = require('express');

        const Port = CONFIG.Communication_Link.Port;
        const webApp = express();

        // Creating HTTPS server
        const httpServer = require("http").createServer(webApp);

        console.log(await TIMESTAMP() + ": RCU-I015 : Communication Link initialization started.");

        /**
         * -------------- EXPRESS ----------------
         */

        // Register Express Middleware

        // Handles base64 data sent in the request
        webApp.use(express.text())

        // Allows requests form different origins
        webApp.use(cors());

        // Imports all express API routes
        webApp.use(require('./routes'));


        /**
         * -------------- SOCKET.IO ----------------
         */

        const webSocket = require("socket.io")(httpServer, CONFIG.SocketIO);

        // socket.io Middleware used to authorize users before establishing a secured WebSocket connection 
        const { authorizeUser } = require("./middleware");
        webSocket.use((socket, next) => authorizeUser(socket, next));

        // Import socket.webSocket request handlers
        const regsiterSocketAPI = require("./socketAPI.js");

        // Handles connection event on webSocket
        const onConnection = async (socket) => {
            try{
                console.log(await TIMESTAMP() + `: RCU-I023 : Client- ID: ${socket.id} connected with the server.`)
                
                // Register event handlers on the socket
                regsiterSocketAPI(webSocket, socket);

                socket.on("disconnect", async (reason) => {
                    console.log(await TIMESTAMP() + `: RCU-I026 : Client- ID: ${socket.id} disconnected with the server. Reason: ${reason}.`)
                });

                socket.on("error", async (err) => {
                    console.log(await TIMESTAMP() + `: RCU-E053 : Socket error '${err.code}'- ${err.message}.`);
                    if (err && err.message === "unauthorized event") {
                    socket.disconnect();
                    }
                });
            } catch(err){
                console.log(await TIMESTAMP() + ": RCU-E054 : Error occured in WebSocket 'onConnection' function.");
            }
        }

        // Handles connection_error event on webSocket
        const onConnectionError = async (err) => {
            console.log(await TIMESTAMP() + `: RCU-E052 : Socket connection error '${err.code}'- ${err.message}. Request ${err.req} and Context ${err.context}.`);
        }

        webSocket.on("connection", onConnection);
        webSocket.engine.on("connection_error", onConnectionError)

        
        /**
         * -------------- SERVER ----------------
         */

        // Establishing server on given Port
        httpServer.listen(Port, async() => {
            console.log(await TIMESTAMP() + `: RCU-I018 : HTTPS server is listening at http://localhost:${Port}`);
        });

    } catch(err){
        console.log(await TIMESTAMP() + ": RCU-E027 : Error occurred in 'initComLink' function.");
        throw {code:"RCU-E027"};
    }
};
