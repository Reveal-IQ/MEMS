/*
************************************
*  Created By : Reveal IQ          *
*  Author     : Sudheer            *
*  Date       : 31 AUG 2021        *
*  Version    : 0.1.0.00.01-0821   *
************************************
*/

// Required
const { join } = require("path");
const { createHash } = require("crypto");

const STPWZ = require(join(CONFIG.Paths.HomeDir, "/api/CORE/STPWZ.js"));

// Create hash for the given data
module.exports.createSignature = async function (data, algorithm){
    try{        
        // Convert the data to buffer
        const buffer = Buffer.from(JSON.stringify(data));

        // Create the hash of buffer and encode it in base64
        const hash = createHash(algorithm).update(buffer).digest('base64');

        return hash;
    } catch(err){
        console.log(await TIMESTAMP() + `: RCU-E046 : Error occurred in 'createSignature' function.`);
        throw {code:"RCU-E046"};
    }
    
};

// Create a random hex of size 5
module.exports.createRandomHex = async function (){
    try{
        let size = 5, charset = "0123456789ABCDEF", randomID = "";
        Array.from({ length: size }, () => {
            randomID += charset[Math.floor(Math.random() * charset.length)];
        });
        return randomID;
    } catch (err){
        console.log(await TIMESTAMP() + `: RCU-E047 : Error occurred in 'createRandomHex' function.`);
        throw {code:"RCU-E047"};
    }
};

// Function to acknowledge USLGN request
module.exports.validateSTPWZReq = async (request, response, next) => {
    try{
        // Covert buffer to base64 and then decode the encoded request
        var req = JSON.parse(Buffer.from(request.body, 'base64').toString());
        
        console.log(await TIMESTAMP() + `: RCU-I019 : Request- ID: ${req.ID} received from the User.`);

        // Check if the request is expired
        if(Date.now() > parseInt(parseInt(req.DateTime)+parseInt(req.Expiry))) {
            console.log(await TIMESTAMP() + `: RCU-E052 : Request Expired, Request- ID: ${req.ID} has been rejected.`);
            throw {code:"RCU-E052"};
        }

        // Validate signature
        let reqCopy = Object.assign({}, req);
        delete reqCopy.Signature;
        let compareSignature = await this.createSignature(reqCopy, 'sha256');
        if(req.Signature !== compareSignature) {
            console.log(await TIMESTAMP() + `: RCU-E039 : Invalid Signature, Request- ID: ${req.ID} has been rejected.`);
            throw {code:"RCU-E039"};
        };
        
        // Verify request
        if(req.Request.ServiceCode !== "STPWZ") {
            console.log(await TIMESTAMP() + `: RCU-E040 : Invalid Service Code, Request- ID: ${req.ID} has been rejected.`);
            throw {code:"RCU-E040"};
        };

        // Update request body with the decode request data
        request.body = req;

        // Forword the request
        next();
    } catch(err){
        console.log(await TIMESTAMP() + ": RCU-E099 : Error occurred in 'validateSTPWZReq' function.");
            
        // Construct response from request
        let res = req;
        res.Type = "ERROR"
        res.Response = {
            Request_ID: req.ID,
            Error_Code: "RCU-E034",
            Error_Msg: "Invalid request"
        }

        // Create ID for response
        res.ID = new Date().valueOf() + await this.createRandomHex();
        
        // Remove unwanted data form response   
        if(res.hasOwnProperty("Request")) delete res.Request;
        if(res.hasOwnProperty("Signature")) delete res.Signature;

        // Create signature for response
        res.Signature = await this.createSignature(res, 'sha256');
        
        // Covert res to base64
        let encodedRes = Buffer.from(JSON.stringify(res)).toString('base64');

        console.log(await TIMESTAMP() + `: RCU-I021 : Response- ID: ${res.ID} for the Request- ID: ${res.Response.Request_ID} sent.`)
        
        // Send Response
        response.send(encodedRes);
    }
};

// Handle USLGN request from Express
module.exports.processSTPWZReq = async (request, response) => {
    try{
        var res, req = request.body;

        // Call the API and pass the request along with Database connection
        res = await STPWZ[req.Request.API](req);
    } catch(err){
        console.log(await TIMESTAMP() + ": RCU-E097 : Error occurred in 'processSTPWZReq' function.");
        
        // Construct response from request
        res = req;
        res.Type = "ERROR"
        res.Response = {
            Request_ID: req.ID,
            Error_Code: "RCU-E040",
            Error_Msg: "Failed to process the request"
        }

    } finally {
        // Add ID to the response
        res.ID = new Date().valueOf() + await this.createRandomHex();

        // Remove unwanted data form response   
        if(res.hasOwnProperty("Request")) delete res.Request;
        if(res.hasOwnProperty("Signature")) delete res.Signature;

        // Create Signature for the response
        res.Signature = await this.createSignature(res, 'sha256');
        
        // Covert JSON to base64
        let encodedRes = Buffer.from(JSON.stringify(res)).toString('base64');

        console.log(await TIMESTAMP() + `: RCU-I021 : Response- ID: ${res.ID} for the Request- ID: ${res.Response.Request_ID} sent to the User.`)
        
        // Send Response
        response.send(encodedRes);
    }
};

// Function to acknowledge USLGN request
module.exports.validateStatusReq = async (request, response, next) => {
    try{
        // Covert buffer to base64 and then decode the encoded request
        var req = JSON.parse(Buffer.from(request.body, 'base64').toString());
        
        console.log(await TIMESTAMP() + `: RCU-I019 : Request- ID: ${req.ID} received from the User.`);

        // Check if the request is expired
        if(Date.now() > parseInt(parseInt(req.DateTime)+parseInt(req.Expiry))) {
            console.log(await TIMESTAMP() + `: RCU-E052 : Request Expired, Request- ID: ${req.ID} has been rejected.`);
            throw {code:"RCU-E052"};
        }

        // Validate signature
        let reqCopy = Object.assign({}, req);
        delete reqCopy.Signature;
        let compareSignature = await this.createSignature(reqCopy, 'sha256');
        if(req.Signature !== compareSignature) {
            console.log(await TIMESTAMP() + `: RCU-E039 : Invalid Signature, Request- ID: ${req.ID} has been rejected.`);
            throw {code:"RCU-E039"};
        };

        // Update request body with the decode request data
        request.body = req;

        // Forword the request
        next();
    } catch(err){
        console.log(await TIMESTAMP() + ": RCU-E099 : Error occurred in 'validateStatusReq' function.");
            
        // Construct response from request
        let res = req;
        res.Type = "ERROR"
        res.Response = {
            Request_ID: req.ID,
            Error_Code: "RCU-E034",
            Error_Msg: "Invalid request"
        }

        // Create ID for response
        res.ID = new Date().valueOf() + await this.createRandomHex();
        
        // Remove unwanted data form response   
        if(res.hasOwnProperty("Request")) delete res.Request;
        if(res.hasOwnProperty("Signature")) delete res.Signature;

        // Create signature for response
        res.Signature = await this.createSignature(res, 'sha256');
        
        // Covert res to base64
        let encodedRes = Buffer.from(JSON.stringify(res)).toString('base64');

        console.log(await TIMESTAMP() + `: RCU-I021 : Response- ID: ${res.ID} for the Request- ID: ${res.Response.Request_ID} sent to the User.`)
        
        // Send Response
        response.send(encodedRes);
    }
};

// Handle USLGN request from Express
module.exports.processStatusReq = async (request, response) => {
    try{
        var res, req = request.body;

        res = req
        res.Type = "RESPONSE"
        res.Response = {
            Request_ID: req.ID
        }

        res.Response.State = "Init";

    } catch(err){
        console.log(await TIMESTAMP() + ": RCU-E097 : Error occurred in 'processStatusReq' function.");
        
        // Construct response from request
        res = req;
        res.Type = "ERROR"
        res.Response = {
            Request_ID: req.ID,
            Error_Code: "RCU-E040",
            Error_Msg: "Failed to process the request"
        }

    } finally {
        // Add ID to the response
        res.ID = new Date().valueOf() + await this.createRandomHex();

        // Remove unwanted data form response   
        if(res.hasOwnProperty("Request")) delete res.Request;
        if(res.hasOwnProperty("Signature")) delete res.Signature;

        // Create Signature for the response
        res.Signature = await this.createSignature(res, 'sha256');
        
        // Covert JSON to base64
        let encodedRes = Buffer.from(JSON.stringify(res)).toString('base64');

        console.log(await TIMESTAMP() + `: RCU-I021 : Response- ID: ${res.ID} for the Request- ID: ${res.Response.Request_ID} sent to the User.`)
        
        // Send Response
        response.send(encodedRes);
    }
};