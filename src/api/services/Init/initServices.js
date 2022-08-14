/*
************************************
*  Created By : Reveal Foundation  *
*  Author     : AP                 *
*  Date       : 01-Aug-22          *
*  Version    : 0.1.0              *
************************************
*/

// Required Modules
const { join } = require('path');
const { MongoClient } = require('mongodb');
const fs = require('node:fs/promises');

// Services and Database-Clients to be exported
var Services, DBLink;

module.exports.initServices = async () => {
    try {
        // Load services dynamically
        await loadServices();

        // Load database connections
        await createDBLink();
        
    } catch (err) {
        console.log(await TIMESTAMP() + ": RCU-E029 : Error occurred in 'initServices' function. -> ", err);
        throw { code: "RCU-E029" };
    }
}

// Dynamically import all the services and store them in Services object
async function loadServices() {
    try {
        Services = {};
        AppInfo = [];

        //Dynamically obtain a list of Modules and Services
        let Applications = await findServices();

        // Load all the Applications
        let appPromises = Applications.map(async app => {
            try {
                // Import each application by constructing the path dynamically
                const application = await require(join(CONFIG.Paths.HomeDir, CONFIG.Paths.API, app.App_Module, app.Service_Code));

                // Dynamically add app ServiceCode and asign the file
                let appCode = await app.Service_Code.split("."); //Extract the filename [0] and extention [1] in an array
                Services[appCode[0]] = application;

                //Required Service Added to Services
                console.log(await TIMESTAMP() + ': RCU-I0?? : '+ appCode[0] + ' Service added to API.');

            } catch (err) {
                console.log(await TIMESTAMP() + `: RCU-E030 : Failed to load ${app.Service_Code} APIs -->`, err);
                throw { code: "RCU-E030" };
            }
        })
        await Promise.all(appPromises);

        console.log(await TIMESTAMP() + ": RCU-I016 : Loaded APIs for all the Services.");
    } catch (err) {
        console.log(await TIMESTAMP() + ": RCU-E031 : Error occurred in 'loadServices' function --> ", err);
        throw { code: "RCU-E031" };
    }
}

// Create Database connections for each application
async function createDBLink() {
    try {

        if (CONFIG.Database.Security) {

            console.log(await TIMESTAMP() + ": RCU-I0?? : Attempting secured DB connection");

            //DB Configuration with Security
            dbUrl = CONFIG.Database.Hostname
            dbPort = CONFIG.Database.Port
            dbUsername = CONFIG.Database.Site_DB_Username
            dbPassword = encodeURIComponent(CONFIG.Database.Site_DB_Password)

            //SSL Certificate Location (Place certificates in cert directory)
            tlsCA = CONFIG.Database.tlsCAFile//Certificate Authority Chain of Trust 
            tlsCrt = CONFIG.Database.tlsCertificateKeyFile//User Certificate File = certficate + pvt
            tlsPvtPass = encodeURIComponent(CONFIG.Database.tlsCertificateKeyFilePwd) //Private Key Password

            //Build URI
            uri = 'mongodb://' + dbUsername + ':' + dbPassword + '@' + dbUrl + ':' + dbPort + '/?authSource=admin&readPreference=primary&appname=dbConfigTool&directConnection=true&tls=true&tlsCertificateKeyFile=' + tlsCrt + '&tlsCertificateKeyFilePassword=' + tlsPvtPass + '&tlsCAFile=' + tlsCA
        } else {

            console.log(await TIMESTAMP() + ": RCU-I0?? : Attempting unsecured DB connection");

            //DB Configuration with Security
            dbUrl = CONFIG.Database.Hostname
            dbPort = CONFIG.Database.Port
            dbUsername = CONFIG.Database.Site_DB_Username
            dbPassword = encodeURIComponent(CONFIG.Database.Site_DB_Password)
            appName = 'Init Services'

            //Define URI
            uri = 'mongodb://' + dbUsername + ':' + dbPassword + '@' + dbUrl + ':' + dbPort + '/?authSource=admin&readPreference=primary&appname=' + appName + '&directConnection=true'

        }

        // Establish database connection for the app
        DBLink = new MongoClient(uri);
        await DBLink.connect();

        console.log(await TIMESTAMP() + ": RCU-I017 : Established database connections");

    } catch (err) {
        console.log(await TIMESTAMP() + ": RCU-E033 : Error occurred in 'createDBLinks' function." + err);
        throw { code: "RCU-E033" };
    }
}

module.exports.getServices = () => {
    return Services;
}

module.exports.getDBLink = () => {
    return DBLink;
}

// Generate a list of Modules and Applications installed with the /api folder
async function findServices() {

    //App List
    var application = [];
    let apiPath = './api'

    //Find App Modules
    try {

        const AppModules = await fs.readdir(apiPath);


        for (let index = 0; index < AppModules.length; index++) {
            const AppModule = AppModules[index];

            //Find Service Code
            const servicePath = await join(apiPath, AppModule);

            //Find Service
            const serviceCodes = await fs.readdir(servicePath);

            //Create Objects 
            for (let index1 = 0; index1 < serviceCodes.length; index1++) {
                const serviceCode = serviceCodes[index1];

                application.push({
                    "Service_Code": serviceCode,
                    "App_Module": AppModule

                })

            }
        }

        //console.log(application)
        return application

    } catch (err) {
        return console.log('E??- Unable to scan App Module directory: ' + err);
    }


}

