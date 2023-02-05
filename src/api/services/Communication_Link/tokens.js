/*
************************************
*  Created By : Reveal IQ          *
*  Author     : Sudheer            *
*  Date       : 15 MAY 2021        *
*  Version    : 0.1.0.01.03-0521   *
************************************
*/

// Required Modules
const { sign, verify } = require('jsonwebtoken');
const { readFileSync } = require('fs');
const RefreshSecret = readFileSync(CONFIG.Paths.HomeDir + CONFIG.Communication_Link.RefreshKey);
const AccessSecret = readFileSync(CONFIG.Paths.HomeDir + CONFIG.Communication_Link.AccessKey);

// Sing a new Refresh Token
module.exports.createRefreshToken = async (id) => {
    try{
        let issuedAt = Date.now();
        let expiresIn = parseInt(CONFIG.Communication_Link.RefreshExpiryInSeconds) * 1000;

        const signedToken = sign(
            {
                UserID: id,
                InstituteCode: CONFIG.Database.Site_Database.Name
            }, 
            RefreshSecret, 
            { 
                expiresIn: parseInt(CONFIG.Communication_Link.RefreshExpiryInSeconds), 
                algorithm: 'HS256' 
            }
        );
        
        console.log(await TIMESTAMP() + `: RCU-I020 : Refresh Token issued to the User- ID: ${id}`);

        return {
            token: signedToken,
            issuedAt: issuedAt,
            expiresIn: expiresIn
        }
    } catch(err){
        console.log(await TIMESTAMP() + `: RCU-E034 : Error occurred in 'createRefreshToken' function, failed to genereate Refresh Token for User- ID: ${id}`);
        throw {code:"RCU-E034"};
    } 
};

// Verify the given Refresh Token
module.exports.verifyRefreshToken = async (token) => {
    try{
        const verification = verify( token, RefreshSecret, { algorithm: 'HS256' });

        return verification
    } catch(err){
        if(err.name === "TokenExpiredError") {
            console.log(await TIMESTAMP() + ": RCU-E048 : Error occurred in 'verifyRefreshToken' function. Refresh Token expired or Invalid, asking user to log out.");
            throw {code:"RCU-E048"};
        } else {
            console.log(await TIMESTAMP() + `: RCU-E035 : Error occurred in 'verifyRefreshToken' function. ${err.name}: ${err.message}`);
            throw {code:"RCU-E035"};
        }
    }  
};

// Sign a new Access Token
module.exports.createAccessToken = async (refreshToken) => {
    try{
        const userInfo = await this.verifyRefreshToken(refreshToken);

        let issuedAt = Date.now();
        let expiresIn = parseInt(CONFIG.Communication_Link.AccessExpiryInSeconds) * 1000;

        const signedToken = sign(
            {
                UserID: userInfo.UserID,
                InstituteCode: userInfo.InstituteCode
            }, 
            AccessSecret, 
            { 
                expiresIn: parseInt(CONFIG.Communication_Link.AccessExpiryInSeconds), 
                algorithm: 'HS256' 
            }
        );

        console.log(await TIMESTAMP() + `: RCU-I025 : Access Token issued to the User- ID: ${userInfo.UserID}`);

        return {
            token: signedToken,
            issuedAt: issuedAt,
            expiresIn: expiresIn
        }
    } catch(err){
        console.log(await TIMESTAMP() + `: RCU-E036 : Error occurred in 'createAccessToken' function.`);
        
        if(err.code === "RCU-E048"){ 
            throw err
        } else {
            throw {code:"RCU-E036"}
        };
    }
};

// Verify the given Access Token
module.exports.verifyAccessToken = async (token) => {
    try{
        const verification = verify(token, AccessSecret, { algorithms: 'HS256' });

        return verification
    } catch(err){
        if(err.name === "TokenExpiredError"){
            console.log(await TIMESTAMP() + ": RCU-E037 : Error occurred in 'verifyAccessToken' function. Access Token expired, asking user to send a request to renew the same.");
            throw {code:"RCU-E037"};
        } else {
            console.log(await TIMESTAMP() + `: RCU-E038 : Error occurred in 'verifyAccessToken' function. ${err.name}: ${err.message}`);
            throw {code:"RCU-E038"};
        }
        
    }  
};
