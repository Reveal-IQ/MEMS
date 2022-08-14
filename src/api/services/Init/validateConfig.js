const { join, basename } = require('path');
const { constants } = require('fs');
const { access, lstat, readFile } = require('fs/promises');

// This function is used to validate the configuration
module.exports.validateConfig = async function (homeDir, configRelativePath) {
    try {
        var configFilePath = join(homeDir, configRelativePath);
        // Check if the configuration file has read access
        await checkReadAccess(configFilePath);
        // Load config files
        var config = await getConfig(homeDir, configFilePath);
        // Check Mandatory fields
        // await checkMandatoryFields(config);
        return config;
    } catch (err) {
        console.log(await TIMESTAMP() + ": " + "RCU-E003 : Error occurred in 'validateConfig' function.");
        throw {code:"RCU-E003"};
    }
}

// This function is used to check if the given path has a file and then if the file is readable.
async function checkReadAccess(filePath) {
    try {
        // Check if the file is readable.
        await access(filePath, constants.R_OK);
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.log(await TIMESTAMP() + ": " + `RCU-E001 : ${err.code}- '${basename(filePath)}' file not found at given path '${err.path}'.`);
        } else {
            console.log(await TIMESTAMP() + ": " + `RCU-E002 : ${err.code}- Unable to read the '${basename(filePath)}' file at given path '${err.path}'. `);
        }
        console.log(await TIMESTAMP() + ": " + "RCU-E004 : Error occurred in 'checkReadAccess' function.")
        throw {code: "RCU-E004"}
    }
}

// Fetch configuration file and then find and included the any sub configuration avaialble
async function getConfig(homeDir, configFilePath){
    try {
        // Load config file
        var config = require(configFilePath); 
        // Pull the keys from config json file.
        let configPromises = Object.keys(config).map(async key => {
            // Check if there is another file path to the field
            var isPath = await checkPathExists(homeDir, config[key])
            if (isPath && isPath.isFile()) {
                // Check if the file is readable
                await checkReadAccess(join(homeDir, config[key]));
                // Read the file from the path and assign it to the same field.
                config[key] = JSON.parse(await readFile(join(homeDir, config[key]), "utf8"));
            };
        });
        await Promise.all(configPromises);
        return config
    } catch (err) {
        console.log(await TIMESTAMP() + ": " + "RCU-E005 : Error occurred in 'getConfig' function.");
        throw {code:"RCU-E005"};
    }
}

// This function is used to check the value has 
async function checkPathExists(homeDir, filePath) {
    try {
        // If the filePath is not the string type then it's not a path
        if(typeof filePath !== "string") return false;
        // Check if the string contains "/" to know weather the given string is intended to be a path
        const found = filePath.match(/[/]/);
        // If the string doesn't contain any "/" then it is a normal string
        if(found == null) return false;
        // Check if the string is a valid path
        var pathInfo = await lstat(join(homeDir, filePath));
        return pathInfo;        
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.log(await TIMESTAMP() + ": " + `RCU-E001 : ${err.code}- '${basename(filePath)}' file not found at given path '${err.path}'.`);
        }
        console.log(await TIMESTAMP() + ": " + "RCU-E006 : Error occurred in 'checkPathExists' function.")
        throw {code:"RCU-E006"};
    }
}

/*
async function checkMandatoryFields(config){
    // Get Mandatory fields JSON
    // Compare config with Mandatory fields JSON
    // Throw error if any mandatory filed not found
}
*/