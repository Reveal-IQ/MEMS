/*
************************************
*  Created By : Reveal IQ          *
*  Author     : Sudheer            *
*  Date       : 31 AUG 2021        *
*  Version    : 0.1.0.00.01-0821   *
************************************
*/

exports.initSetupWiz = async function (){    
    try{
        // Imports
        const cors = require("cors");
        const express = require('express');

        const Port = CONFIG.Communication_Link.Port;
        const webApp = express();

        // Creating HTTPS server
        const httpServer = require("http").createServer(webApp);

        console.log(await TIMESTAMP() + ": RCU-I015 : Setup Wizard initialization started.");

        /**
         * -------------- EXPRESS ----------------
         */

        // Register Express Middleware

        // Handles base64 data sent in the request
        webApp.use(express.text())

        // Allows requests form different origins
        webApp.use(cors());

        // Imports all express API routes
        webApp.use(require('./setupRoutes'));
        
        /**
         * -------------- SERVER ----------------
         */

        // Establishing server on given Port
        httpServer.listen(Port, async() => {
            console.log(await TIMESTAMP() + `: RCU-I018 : HTTP server is listening at http://localhost:${Port}`);
        });

    } catch(err){
        console.log(err)
        console.log(await TIMESTAMP() + ": RCU-E027 : Error occurred in 'initSetupWiz' function.");
        throw {code:"RCU-E027"};
    }
};
