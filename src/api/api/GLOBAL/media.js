/*
************************************
*  Created By : Reveal IQ          *
*  Author     : Sudheer            *
*  Date       : 15 JUN 2021        *
*  Version    : 0.1.0.01.06-0621   *
************************************
*/

// Require Modules
const { join } = require("path");
const { readFileSync, constants } = require('fs');
const { writeFile, access, mkdir, readFile } = require('fs/promises');
const crypto = require('crypto');
const InstituteCode = CONFIG.Database.Site_Database.Name

const MediaDir = CONFIG.Paths.MediaDir;
const MediaPublic = readFileSync(join(CONFIG.Paths.HomeDir, CONFIG.System.PublicKey));
const MediaPrivate = readFileSync(join(CONFIG.Paths.HomeDir, CONFIG.System.SiteKey));

// Encrypts and Stores the given media in the Media Directory 
module.exports.Store_Media = async function (media, dbLink) {
    try {

        // Seperate media format and data using regex
        var mediaDetails = media.Doc.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);

        // Checks if the given media matches the required format
        if (!media || mediaDetails.length !== 3) {
            console.log(await TIMESTAMP() + ": RCU-I067 : Invalid Media")
            throw {code: "RCU-I067"}
        };

        let filePath = await createDirectory(); // Create the folder required to store the image
        let fileID = await createFileID(5); // Create the FileID required to refer to the image
        let fileLocation = `${filePath}/${fileID}`;

        // Store media type and data
        let mediaFile = {
            type: mediaDetails[1],
            data: mediaDetails[2]
        } 

        // Convert mediaFile to base64
        mediaFile = Buffer.from(JSON.stringify(mediaFile)).toString('base64');

        // Encrypt the given Image
        let encryptMediaInfo = await encryptMedia(mediaFile);

        // Store the Image in the Media Directory
        await writeFile(join(MediaDir, fileLocation), encryptMediaInfo.encryptedMedia);

        delete media["Doc"]

        // Store the Media Information in the Database
        let insertMediaRes = await dbLink.db(InstituteCode).collection("Media_Depot").insertOne(
            { 
                ID_Doc: fileID,
                Location: fileLocation,
                Security_Key: encryptMediaInfo.encryptedKey,
                Init_Vector: encryptMediaInfo.initVect, 
                Meta_Data: media,
                Date_Time: Date.now(),
                Version: "001" 
            }
        );

        if (insertMediaRes == null){
            console.log(await TIMESTAMP() + ": RCU-I068 : Failed to insert media information")
            throw {code: "RCU-I068"}
        };

        return fileID;
    } catch (err) {
        console.log(await TIMESTAMP() + " : RCU-E061 : Error occured in 'Store_Media' function");
        throw {code: "RCU-E061"};
    }
}

// Retrive and Decrypt Encypted Media from Media Store
module.exports.Get_Media = async function (idDoc, dbLink) {
    try {
        // Find the media information matching fileID provided
        let mediaInfo = await dbLink.db(InstituteCode).collection("Media_Depot").findOne(
            { 
                ID_Doc: idDoc 
            }, 
            { 
                projection: { _id: 0 } 
            }
        );

        if(!mediaInfo) {
            console.log(await TIMESTAMP() + " : RCU-E069 : Invalid fileID");
            throw {code: "RCU-E069"};
        }
        
        // Retrive the Encrypted Media from File Location
        let encryptedMedia = await readFile(join(MediaDir, mediaInfo.Location));

        // Decrypt the media file retrived form media store   
        let decryptedMedia = await dencryptMedia(encryptedMedia, mediaInfo.Security_Key, mediaInfo.Init_Vector);

        // Media is converted into the format that the web client can render
        return {
            Doc: `data:${decryptedMedia.type};base64,${decryptedMedia.data.toString("base64")}`,
            ...mediaInfo.Meta_Data
        }
    } catch (err) {
        console.log(await TIMESTAMP() + " : RCU-E062 : Error occured in 'Get_Media' function");
        throw {code: "RCU-E062"};
    }
}

// Create Director structure to store the media file
async function createDirectory() {
    try {
        let fileLocation =  `/${new Date().getUTCFullYear()}/${new Date().toLocaleString('default', { month: 'short', timeZone: 'UTC' }).toUpperCase()}/${new Date().getUTCDate()}`;
        
        try{
            // Check if the required folders exists
            await access(join(MediaDir, fileLocation), constants.R_OK | constants.W_OK)
        } catch(err){
            // Create the required file structure if it doesn't esists
            await mkdir(join(MediaDir, fileLocation), { recursive: true });
        }

        return fileLocation;
    } catch (err) {
        console.log(await TIMESTAMP() + " : RCU-E063 : Error occured in 'createDirectory' function");
        throw {code: "RCU-E063"};
    }
}

// Create a hexadecimal code of given size and version 01
async function createFileID(size) {
    try {
        let charset = "0123456789abcdef";
        let result = "";

        Array.from({ length: size }, () => {
            result += charset[Math.floor(Math.random() * charset.length)];
        })

        return `${result}_01`;
      } catch (err) {
        console.log(await TIMESTAMP() + " : RCU-E064 : Error occured in 'createFileID' function");
        throw {code: "RCU-E064"};
      }
}

// To encrypt the media and return encrypted information
async function encryptMedia(media) {
    try {
        const secKey = crypto.randomBytes(32);  // Create Security Key
        const initVect = crypto.randomBytes(16);    // Create Initialzation Vector
        const cipher = crypto.createCipheriv('aes-256-ctr', secKey, initVect);  // Create cipher

        // Encrypt Media using cipher
        const encryptedMedia = Buffer.concat([cipher.update(Buffer.from(JSON.stringify(media), "base64")), cipher.final()]);
        
        // Encrypt Security Key
        const encryptedKey = crypto.publicEncrypt(
            {
                key: MediaPublic
            }, 
            Buffer.from(secKey)
        )

        return {
            encryptedMedia,
            encryptedKey: encryptedKey.toString('hex'),
            initVect: initVect.toString('hex')
        }
    } catch (err) {
        console.log(await TIMESTAMP() + " : RCU-E065 : Error occured in 'encryptMedia' function");
        throw {code: "RCU-E065"};
    }
}

// To decrypt the given encrypted media file
async function dencryptMedia(encryptedMedia, encryptedKey, initVect) {
    try {
        // Decrypt Security Key
        const secKey = crypto.privateDecrypt(
            {
                key: MediaPrivate,
                ...((CONFIG.System.hasOwnProperty("SiteKeyPassphrase") && CONFIG.System.SiteKeyPassphrase) && { passphrase: CONFIG.System.SiteKeyPassphrase }),
            },
            Buffer.from(encryptedKey, "hex")
        );

        const decipher = crypto.createDecipheriv("aes-256-ctr", secKey, Buffer.from(initVect, 'hex')); // Create Decipher

        // Decrypt encrypted media using decipher
        const decryptedMedia = Buffer.concat([decipher.update(encryptedMedia), decipher.final()]);

        return JSON.parse(decryptedMedia);
    } catch (err) {
        console.log(await TIMESTAMP() + " : RCU-E066 : Error occured in 'decryptMedia' function");
        throw {code: "RCU-E066"};
    }
}