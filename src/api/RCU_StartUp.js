/*
**********************************************
*  Comapny              : Reveal IQ          *
*  Last Edit Author     : Akshay Puli        *
*  App Name             : Reveal Core Unit   *
*  Version              : 0.10.1-030222      *
**********************************************
*/

// Require modules
const configFilePath = "./lib/config/config.json";
const { validateConfig } = require("./services/Init/validateConfig");
const { getTimestamp } = require("./services/Logger/logger.js");
const { constants } = require('fs');
const { access } = require('fs/promises');

// Global varaibles
global.TIMESTAMP = getTimestamp;
global.CONFIG;

async function initRCU() {
    try {
        
        const isfileExists = await checkConfig(configFilePath);

        if(isfileExists){

            // Validate Template Configuration file
            CONFIG = await validateConfig(__dirname, configFilePath);
            console.log(await TIMESTAMP() + ": " + "RCU-I001 : Configuration file validation successfull.")

            // Initialize MicroServices by loading APIs and Creating DB Clients
            await require("./services/Init/initServices").initServices();

            // Initialize Communication Link
            await require("./services/Communication_Link/initComLink").initComLink();

        } else {
            
            const Communication_Link = require("./lib/config/comsLink.json");
            const Paths = require("./lib/config/paths.json");
            
            CONFIG = {
                Communication_Link,
                Paths
            }

            // Initialize Databases
            await require("./services/Init/initSetupWiz").initSetupWiz();

        }

    } catch (err) {
        console.log(await TIMESTAMP() + ": " + "RCU-E007 : Error occurred in 'initRCU' function --> ", err);
    }
}

async function checkConfig(filePath){
    try{

        // Check if the config file exists.
        await access(filePath, constants.F_OK);
        console.log(await TIMESTAMP() + ": " + "RCU-I001 : Configuration file exists.");
        return true;

    } catch(err){
        console.log(await TIMESTAMP() + ": " + "RCU-I001 : Configuration file does not exists.");
        return false;
    }
}

//Intialise an Instance of the RCU
initRCU();
