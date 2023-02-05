/*
************************************
*  Created By : Reveal IQ          *
*  Author     : Sudheer            *
*  Date       : 15 MAY 2021        *
*  Version    : 0.1.0.01.07-0521   *
************************************
*/

const { validateReq, processReq, createSignature, createRandomHex } = require("./middleware");
const { createAccessToken } = require("./tokens");

module.exports = (io, socket) => {
    

    // To handle requests to generate a new Access Token
    const generateAccessToken = async (request) => {
        try{
            // Covert base64 to JSON
            var res, req = JSON.parse(Buffer.from(request, 'base64').toString('ascii'));

            console.log(await TIMESTAMP() + `: RCU-I024 : Request- ID: ${req.ID} received from the User- ID: ${req.Requester.UserID} with Client- ID: ${req.Requester.SocketID}.`);

            // Check if the request is expired
            if(Date.now() > parseInt(parseInt(req.DateTime)+parseInt(req.Expiry))) {
                console.log(await TIMESTAMP() + `: RCU-E052 : Expired, Request- ID: ${req.ID} has been rejected.`);
                throw {code:"RCU-E052"};
            }

            // Validate signature
            let reqCopy = Object.assign({}, req);
            delete reqCopy.Signature;
            let compareSignature = await createSignature(reqCopy, 'sha256');
            if(req.Signature !== compareSignature) {
                console.log(await TIMESTAMP() + `: RCU-E039 : Invalid Signature, Request- ID: ${req.ID} has been rejected.`);
                throw {code:"RCU-E039"};
            };

            // Create access token using the refresh token
            let tokenInfo = await createAccessToken(req.Request.Refresh_Token);

            // Construct response from request
            res = req
            res.Type = "RESPONSE";
            res.Response = {
                Request_ID: req.ID,
                Access_Token: tokenInfo.token,
                Issued_At: tokenInfo.issuedAt,
                Expires_In: tokenInfo.expiresIn
            }

            // Create response ID
            res.ID = new Date().valueOf() + await createRandomHex();

            // Remove unwanted data form response
            if(res.hasOwnProperty("Request")) delete res.Request;
            if(res.hasOwnProperty("Signature")) delete res.Signature;

            // Create signature for the response
            res.Signature = await createSignature(res, 'sha256');

            // Convert the response to base64
            let encodedRes = Buffer.from(JSON.stringify(res)).toString('base64');
            
            // Send encoded response to the client with given Socket ID
            io.to(res.Requester.SocketID).emit("access_token", encodedRes);
            
            console.log(await TIMESTAMP() + `: RCU-I028 : Response- ID: ${res.ID} for the Request- ID: ${res.Response.Request_ID} to renew Access Token was sent to the User- ID: ${res.Requester.UserID} with Client- ID: ${res.Requester.SocketID}.`)
        } catch(err){
            // Send encoded response to the client with given Socket ID
            io.to(req.Requester.SocketID).emit("refresh_token_expired");

            console.log(await TIMESTAMP() + `: RCU-E049 : Error occurred in 'generateAccessToken' function. Asking User- ID: ${req.Requester.UserID} with Client- ID: ${req.Requester.SocketID} to logout.`);
        }
    }

    // Handle Request sent using WebSocket 
    const handleRequest = async (request, callback) => {
        try{
            // Covert base64 to JSON
            var res, req = JSON.parse(Buffer.from(request, 'base64').toString('ascii'));

            console.log(await TIMESTAMP() + `: RCU-I024 : Request- ID: ${req.ID} received from the User- ID: ${req.Requester.UserID} with Client- ID: ${req.Requester.SocketID}.`);
            
            // Validate request before processing
            let validatedReq = await validateReq(req);
            
            // Process request
            res = await processReq(validatedReq);
        } catch(err){
            console.log(await TIMESTAMP() + `: RCU-E050 : Error occurred in 'handleRequest' function.`);
            
            // Construct response from request includeds error code
            res = req;
            res.Response = {
                Request_ID: req.ID,
                Error_Code: "RCU-E050",
                Error_Msg: "Invalid request."
            }

            // Create response ID
            res.ID = new Date().valueOf() + await createRandomHex();

            // Remove unwanted data form response
            if(res.hasOwnProperty("Request")) delete res.Request;
            if(res.hasOwnProperty("Signature")) delete res.Signature;

            // Create signature
            res.Signature = await createSignature(res, 'sha256');
        } finally{
            // Convert the response to base64
            let encodedRes = Buffer.from(JSON.stringify(res)).toString('base64');
            
            // Send response
            callback(encodedRes);

            console.log(await TIMESTAMP() + `: RCU-I026 : Response- ID: ${res.ID} for the Request- ID: ${res.Response.Request_ID} sent to the User- ID: ${res.Requester.UserID} with Client- ID: ${res.Requester.SocketID}.`)
        }
    }

    // Listener for access token generation request
    socket.on("renew_access_token", generateAccessToken);

    // Listener for API request
    socket.on("socket_request", handleRequest);
}