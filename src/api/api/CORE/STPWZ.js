/*
************************************
*  Created By : Reveal Foundation  *
*  Author     : Akshay             *
*  Date       : Aug-1-22           *
*  Version    : 0.1.3              *
************************************
*/


// Required
const { join } = require('path');
const util = require('util');
const { constants } = require('fs');
const { access, writeFile, mkdir, readdir } = require('fs/promises');
const { spawn } = require('child_process');
const { MongoClient } = require('mongodb');
const exec = util.promisify(require('child_process').exec);

// Global Variable
var dbDetails, dbClient;

// STPWZ-001: Establish Database Connection
module.exports.Establish_DB_Connection = async function (req) {
    try {

        var res = Object.assign({}, req);

        if (dbClient) {
            dbClient = null;
        }

        if (req.Request.tlsCertificateKeyFile & req.Request.tlsCAFile) {

            console.log(await TIMESTAMP() + ": API-STPWZ-I?? DB Security Enabled")

            let isCertsExists = await checkPathExists(join(CONFIG.Paths.HomeDir, CONFIG.Paths.Certs));

            if (!isCertsExists) {
                // Create Certs dir if it doesn't esists
                await mkdir(join(CONFIG.Paths.HomeDir, CONFIG.Paths.Certs));
            }

            await writeFile(join(CONFIG.Paths.HomeDir, CONFIG.Paths.Certs, "/tlsCertificateKeyFile.pem"), req.Request.tlsCertificateKeyFile);
            await writeFile(join(CONFIG.Paths.HomeDir, CONFIG.Paths.Certs, "/tlsCAFile.pem"), req.Request.tlsCAFile);

            //DB Configuration
            let dbUrl = req.Request.Hostname
            let dbPort = req.Request.Port
            let dbUsername = req.Request.Username
            let dbPassword = encodeURIComponent(req.Request.Password)

            //SSL Certificate Location (Place certificates in cert directory)
            let tlsCA = join(CONFIG.Paths.HomeDir, CONFIG.Paths.Certs, "/tlsCAFile.pem")//Certificate Authority Chain of Trust 
            let tlsCrt = join(CONFIG.Paths.HomeDir, CONFIG.Paths.Certs, "/tlsCertificateKeyFile.pem")//User Certificate File = certficate + pvt
            let tlsPvtPass = encodeURIComponent(req.Request.tlsCertificateKeyFilePwd) //Private Key Password

            //Build URI
            uri = 'mongodb://' + dbUsername + ':' + dbPassword + '@' + dbUrl + ':' + dbPort + '/?authSource=admin&readPreference=primary&appname=dbConfigTool&directConnection=true&tls=true&tlsCertificateKeyFile=' + tlsCrt + '&tlsCertificateKeyFilePassword=' + tlsPvtPass + '&tlsCAFile=' + tlsCA

            //Save to Global Variable
            dbDetails = {
                Hostname: req.Request.Hostname,
                Port: req.Request.Port,
                Security: false,
                tlsCertificateKeyFile: join(CONFIG.Paths.HomeDir, CONFIG.Paths.Certs, "/tlsCertificateKeyFile.pem"),
                tlsCAFile: join(CONFIG.Paths.HomeDir, CONFIG.Paths.Certs, "/tlsCAFile.pem"),
                tlsCertificateKeyFilePwd: req.Request.tlsCertificateKeyFilePwd
            }

        } else {
            //Security is Disabled
            console.log(await TIMESTAMP() + ": API-STPWZ-I?? DB Security Disabled")

            //DB Configuration
            let dbUrl = req.Request.Hostname
            let dbPort = req.Request.Port
            let dbUsername = req.Request.Username
            let dbPassword = encodeURIComponent(req.Request.Password)
            let appName = 'RevealSetupWizard'

            //Define URI
            uri = 'mongodb://' + dbUsername + ':' + dbPassword + '@' + dbUrl + ':' + dbPort + '/?authSource=admin&readPreference=primary&appname=' + appName + '&directConnection=true'

            //Save to Global Variable
            dbDetails = {
                Hostname: req.Request.Hostname,
                Port: req.Request.Port,
                Security: false
            }

        }

        //Generate DBclient and Connection
        dbClient = new MongoClient(uri);
        await dbClient.connect();

        res.Type = "RESPONSE";
        res.Response = {
            Request_ID: req.ID,
            Connection: "Established"
        };

        return res

    } catch (err) {
        console.log(await TIMESTAMP() + `: API-STPWZ-E001 : ${err}`)

        res.Type = "ERROR";
        res.Response = {
            Request_ID: req.ID,
            Error_Code: "API-STPWZ-E001",
            Error_Msg: "Failed to Establish Database Connection."
        };

        return res;
    }
}

// STPWZ-002: To get list of Currencies
module.exports.Fetch_Currency = async function (req) {
    try {

        var res = Object.assign({}, req);

        let currencyResult, Currency_List;
        let input = req.Request.Search_Currency;

        if (input == null || input == '' || input.length == 0) {
            currencyResult = await dbClient.db("Terminology").collection("Currency").find({ Type_Code: "CURCY", Currency_Name: { $exists: true } }, { projection: { _id: 0, Currency_Name: 1, Currency_Code: 1 } }).limit(5).toArray();
        } else if (input.length >= 3) {
            currencyResult = await dbClient.db("Terminology").collection("Currency").find({ Type_Code: "CURCY", Currency_Name: { $regex: input, $options: "i" } }, { projection: { _id: 0, Currency_Name: 1, Currency_Code: 1 } }).limit(5).toArray();
        } else {
            currencyResult = [];
        }
        Currency_List = currencyResult.map(cur => {
            return { "listName": cur.Currency_Name, "listCode": cur.Currency_Code }
        })
        await Promise.all(Currency_List).catch(error => { throw error; })

        res.Type = "RESPONSE";
        res.Response = {
            Request_ID: req.ID,
            Currency_List
        };

        return res

    } catch (error) {
        console.log(await TIMESTAMP() + `: API-STPWZ-E002 : ${err}`)

        res.Type = "ERROR";
        res.Response = {
            Request_ID: req.ID,
            Error_Code: "API-STPWZ-E002",
            Error_Msg: "Failed to fetch list of matching currency."
        };

        return res;
    }
}

// STPWZ-003: To get list of Timezones
module.exports.Fetch_Timezone = async function (req) {
    try {

        var res = Object.assign({}, req);

        let timezoneResult, Timezone_List;
        let input = req.Request.Search_Timezone;

        if (input == null || input == '' || input.length == 0) {
            timezoneResult = await dbClient.db("Terminology").collection("Time_Zone").find({ Time_Zone_Name: { $exists: true } }, { projection: { _id: 0, Time_Zone_Name: 1, UTC_Time_Zone: 1 } }).limit(5).toArray();
        } else if (input.length >= 3) {
            timezoneResult = await dbClient.db("Terminology").collection("Time_Zone").find({ Time_Zone_Name: { $regex: input, $options: "i" } }, { projection: { _id: 0, Time_Zone_Name: 1, UTC_Time_Zone: 1 } }).limit(5).toArray();
        } else {
            timezoneResult = [];
        }

        Timezone_List = timezoneResult.map(tz => {
            return { "listName": tz.Time_Zone_Name, "listCode": tz.UTC_Time_Zone }
        })
        await Promise.all(Timezone_List).catch(error => { throw error; })

        res.Type = "RESPONSE";
        res.Response = {
            Request_ID: req.ID,
            Timezone_List
        };

        return res

    } catch (error) {
        console.log(await TIMESTAMP() + `: API-STPWZ-E003 : ${err}`)

        res.Type = "ERROR";
        res.Response = {
            Request_ID: req.ID,
            Error_Code: "API-STPWZ-E003",
            Error_Msg: "Failed to fetch list of matching timezones."
        };

        return res;
    }
}

// STPWZ-004: To get list of matching Countries
module.exports.Fetch_Country = async function (req) {
    try {

        var res = Object.assign({}, req);

        let countriesResult, Country_List;
        let input = req.Request.Search_Country;

        // If field is empty
        if (input == null || input == '' || input.length == 0) {
            countriesResult = await dbClient.db("Terminology").collection("Geography").find({ Loci_Name_Country: { $exists: true } }, { projection: { _id: 0, Loci_Name_Country: 1, Loci_Code_Country: 1 } }).limit(5).toArray();
        } else if (input.length >= 3) { // If Input string length is >=3
            countriesResult = await dbClient.db("Terminology").collection("Geography").find({ Loci_Name_Country: { $regex: input, $options: "i" } }, { projection: { _id: 0, Loci_Name_Country: 1, Loci_Code_Country: 1 } }).limit(5).toArray();
        } else { // If input string length is below 3
            countriesResult = [];
        }

        // Get Country Names from countriesResult
        Country_List = countriesResult.map(ele => {
            return { "listName": ele.Loci_Name_Country, "listCode": ele.Loci_Code_Country }
        })
        await Promise.all(Country_List).catch(err => { throw err; })

        res.Type = "RESPONSE";
        res.Response = {
            Request_ID: req.ID,
            Country_List
        };

        return res
    } catch (err) {
        console.log(await TIMESTAMP() + `: API-STPWZ-E004 : ${err}`)

        res.Type = "ERROR";
        res.Response = {
            Request_ID: req.ID,
            Error_Code: "API-STPWZ-E004",
            Error_Msg: "Failed to fetch list of matching Countries."
        };

        return res;
    }
}

// STPWZ-005: To get list of matching States
module.exports.Fetch_State = async function (req) {
    try {

        var res = Object.assign({}, req);

        let statesResult, State_List;
        let input = req.Request.Search_State;

        // If Input string length is zero or null, it returns top 5 documents to the client
        if (input == null || input.length == 0) {
            statesResult = await dbClient.db("Terminology").collection("Geography").find({ $and: [{ Loci_Code_Country: req.Request.Country }, { Type_Code: "STATE" }] }, { projection: { _id: 0, Loci_Name_State: 1, Loci_Code_State: 1 } }).limit(5).toArray();
        } else if (input.length >= 3) { // If Input string length is >=3
            statesResult = await dbClient.db("Terminology").collection("Geography").find({ $and: [{ Loci_Code_Country: req.Request.Country }, { Loci_Name_State: { $regex: input, $options: "i" } }] }, { projection: { _id: 0, Loci_Name_State: 1, Loci_Code_State: 1 } }).limit(5).toArray();
        } else {
            statesResult = [];
        }
        // Checks the State_List array is empty or not
        if (statesResult.length > 0) {
            State_List = statesResult.map(ele => {
                return { listName: ele.Loci_Name_State, listCode: ele.Loci_Code_State };
            })
            await Promise.all(State_List).catch(err => { throw err; })
        } else {
            State_List = statesResult;
        }

        res.Type = "RESPONSE";
        res.Response = {
            Request_ID: req.ID,
            State_List
        };

        return res

    } catch (err) {
        console.log(await TIMESTAMP() + `: API-STPWZ-E005 : ${err}`)

        res.Type = "ERROR";
        res.Response = {
            Request_ID: req.ID,
            Error_Code: "API-STPWZ-E005",
            Error_Msg: "Failed to fetch list of matching States."
        };

        return res;
    }
}

// STPWZ-006: To get list of matching Districts
module.exports.Fetch_District = async function (req) {
    try {

        var res = Object.assign({}, req);

        let districtsResult, District_List;
        let input = req.Request.Search_District;

        // If Input string length is zero or null, it returns top 5 documents to the client
        if (input == null || input.length == 0) {
            districtsResult = await dbClient.db("Terminology").collection("Geography").find({ $and: [{ Loci_Code_State: req.Request.State }, { Type_Code: "ARL1" }] }, { projection: { _id: 0, Loci_Name_Area_L1: 1, Loci_Code_Area_L1: 1 } }).limit(5).toArray();
        } else if (input.length >= 3) { // If Input string length is >=3
            districtsResult = await dbClient.db("Terminology").collection("Geography").find({ $and: [{ Loci_Code_State: req.Request.State }, { Loci_Name_Area_L1: { $regex: input, $options: "i" } }] }, { projection: { _id: 0, Loci_Name_Area_L1: 1, Loci_Code_Area_L1: 1 } }).limit(5).toArray();
        } else {
            districtsResult = [];
        }
        ////Checks the State_List array is empty or not/////////////////////////
        if (districtsResult.length > 0) {
            District_List = districtsResult.map(ele => {
                return { listName: ele.Loci_Name_Area_L1, listCode: ele.Loci_Code_Area_L1 };
            })
            await Promise.all(District_List).catch(err => { throw err; })
        } else {
            District_List = districtsResult;
        };

        res.Type = "RESPONSE";
        res.Response = {
            Request_ID: req.ID,
            District_List
        };

        return res

    } catch (err) {
        console.log(await TIMESTAMP() + `: API-STPWZ-E006 : ${err}`)

        res.Type = "ERROR";
        res.Response = {
            Request_ID: req.ID,
            Error_Code: "API-STPWZ-E006",
            Error_Msg: "Failed to fetch list of matching Districts."
        };

        return res;
    }
}

// STPWZ-007: To get list of matching Mandals
module.exports.Fetch_Mandal = async function (req) {
    try {

        var res = Object.assign({}, req);

        let mandalResults, Mandal_List;
        let input = req.Request.Search_Mandal

        // If Input string length is zero or null, it returns top 5 documents to the client
        if (input == null || input.length == 0) {
            mandalResults = await dbClient.db("Terminology").collection("Geography").find({ $and: [{ Loci_Code_Area_L1: req.Request.District }, { Type_Code: "ARL2" }] }, { projection: { _id: 0, Loci_Name_Area_L2: 1, Loci_Code_Area_L2: 1 } }).limit(5).toArray();
        } else if (input.length >= 3) { // If Input string length is >=3
            mandalResults = await dbClient.db("Terminology").collection("Geography").find({ $and: [{ Loci_Code_Area_L1: req.Request.District }, { Loci_Name_Area_L2: { $regex: input, $options: "i" } }] }, { projection: { _id: 0, Loci_Name_Area_L2: 1, Loci_Code_Area_L2: 1 } }).limit(5).toArray();
        } else {
            mandalResults = [];
        }

        // Checks the State_List array is empty or not
        if (mandalResults.length > 0) {
            Mandal_List = mandalResults.map(ele => {
                return { listName: ele.Loci_Name_Area_L2, listCode: ele.Loci_Code_Area_L2 }
            })
            await Promise.all(Mandal_List).catch(err => { throw err; })
        } else {
            Mandal_List = mandalResults;
        }

        res.Type = "RESPONSE";
        res.Response = {
            Request_ID: req.ID,
            Mandal_List
        };

        return res

    } catch (err) {
        console.log(await TIMESTAMP() + `: API-STPWZ-E008 : ${err}`)

        res.Type = "ERROR";
        res.Response = {
            Request_ID: req.ID,
            Error_Code: "API-STPWZ-E008",
            Error_Msg: "Failed to fetch list of matching Mandals."
        };

        return res;
    }
}

// STPWZ-008: To get Pincodes of the district
module.exports.Fetch_Postal_Code = async function (req) {
    try {

        var res = Object.assign({}, req);

        let mandalResults, Postal_Code;

        mandalResults = await dbClient.db("Terminology").collection("Geography").findOne({ $and: [{ Loci_Code_Area_L1: req.Request.District }, { Loci_Code_Area_L2: req.Request.Mandal }] }, { projection: { _id: 0, Loci_Postal_Code: 1 } });

        if (mandalResults != null) {
            Postal_Code = mandalResults.Loci_Postal_Code
        } else {
            throw `Cannot find Postal Code for District: ${req.Request.District} and Mandal ${req.Request.Mandal}`
        }

        res.Type = "RESPONSE";
        res.Response = {
            Request_ID: req.ID,
            Postal_Code
        };

        return res

    } catch (err) {
        console.log(await TIMESTAMP() + `: API-STPWZ-E007 : ${err}`)

        res.Type = "ERROR";
        res.Response = {
            Request_ID: req.ID,
            Error_Code: "API-STPWZ-E007",
            Error_Msg: "Failed to fetch Postal Code."
        };

        return res;
    }
}

// STPWZ-009: Setup Reveal Instance
module.exports.Complete_Setup = async function (req) {
    try {

        //Variable Definition
        var res = Object.assign({}, req);

        // CONFIG.JSON FILE
        console.log(await TIMESTAMP() + ': API-STPWZ-I## - Finalizing Configuration File')
        let config = req.Request.Config;

        // (1) GENERATE SECURITY KEY
        console.log(await TIMESTAMP() + ': API-STPWZ-I## - Generating Site Keys')
        //Check if Folder Exists
        let isCertsDir = await checkPathExists(join(CONFIG.Paths.HomeDir, CONFIG.Paths.Certs));
        if (!isCertsDir) {
            // Create Certs dir if it doesn't esists
            await mkdir(join(CONFIG.Paths.HomeDir, CONFIG.Paths.Certs));
        }
        await exec(`openssl genrsa -out ${join(CONFIG.Paths.HomeDir, CONFIG.Paths.Certs, "/", "site.pem")} 3072`); // Site Key to encrypt media files in media store
        await exec(`openssl ecparam -outform PEM -out ${join(CONFIG.Paths.HomeDir, CONFIG.Paths.Certs, "/", "refresh.pem")} -noout -genkey -name prime256v1`); // Refresh Key to generate JWT Refresh tokens
        await exec(`openssl ecparam -outform PEM -out ${join(CONFIG.Paths.HomeDir, CONFIG.Paths.Certs, "/", "access.pem")} -noout -genkey -name prime256v1`); // Access Key to generate JWT Access tokens
        await exec(`openssl rsa -in ${join(CONFIG.Paths.HomeDir, CONFIG.Paths.Certs, "/", "site.pem")} -pubout -out ${join(CONFIG.Paths.HomeDir, CONFIG.Paths.Certs, "/", "public.pem")}`); // Public Key to decypt media files in media store
        //Adding Cert Path to Config
        config.System = {
            SiteKey: `${join(CONFIG.Paths.Certs, "/site.pem")}`,
            PublicKey: `${join(CONFIG.Paths.Certs, "/public.pem")}`
        }
        config.Communication_Link.RefreshKey = `${join(CONFIG.Paths.Certs, "/refresh.pem")}`;
        config.Communication_Link.AccessKey = `${join(CONFIG.Paths.Certs, "/access.pem")}`;
        config.Communication_Link.Port = CONFIG.Communication_Link.Port;
        config.Paths = CONFIG.Paths;
        //console.log(await TIMESTAMP() + ': API-STPWZ-I## - Generated Config File: ' + JSON.stringify(config, null, 4))

        //(2) Generate Config File
        //Replace Application in Req with Dynamically Generated
        delete config["Applications"]

        // Remove Admin Database username and password
        delete dbDetails["RootUsername"];
        delete dbDetails["RootPassword"];

        dbDetails["Site_DB_Username"] = `${req.Request.Database.Site_Database.Name}DB`
        dbDetails["Site_DB_Password"] = `${req.Request.Database.Site_Database.Name}DB_PASSWORD`

        // Assign the Admin Database details to config
        config.Database = dbDetails;

        config.Database.Site_Database = {
            Name: req.Request.Database.Site_Database.Name,
            AdminUsername: req.Request.Database.Site_Database.Username,
            AdminPassword: req.Request.Database.Site_Database.Password
        }

        await writeFile(join(CONFIG.Paths.HomeDir, CONFIG.Paths.Config, "/config.json"), JSON.stringify(config, null, 4));
        
        //Load New Config File
        CONFIG = config
        console.log(CONFIG)


        //(2) Create Applications and roleList 
        let roleList = []
        let appInfoList = []

        //Dynamically obtain a list of Modules and Services
        let Applications = await findServices();
        // Load all the Applications
        let appPromises = Applications.map(async app => {
            try {
                // Import each application by constructing the path dynamically
                const application = await require(join(CONFIG.Paths.HomeDir, CONFIG.Paths.API, app.App_Module, app.Service_Code));

                //Extract App.Info
                if (application['App_Info'] !== undefined) {
                    appInfoList.push(application['App_Info']);
                    roleList.push(application['App_Info'].App_DB_Roles.role);
                }
            } catch (err) {
                console.log(await TIMESTAMP() + `: RCU-E030 : Failed to load ${app.Service_Code} APIs -->`, err);
                throw { code: "RCU-E030" };
            }
        })
        await Promise.all(appPromises);

        //Create Site DB
        await createDatabases(req.Request.Database);

        // Insert App Information
        await insertAppInfo(req.Request.Database.Site_Database.Name, "App_Info", appInfoList);

        // Create database user for site
        await createDbUser(req.Request.Database.Site_Database.Name, roleList)

        // Restart Reveal Core Unit using child process 
        process.on("exit", function () {

            // In case of Docker Container the container itself stops when we call process.exit()
            // The Container is provided with option to restart on stopping, so subprocess will not be exceuted
            const subprocess = spawn(process.argv.shift(), process.argv, {
                cwd: process.cwd(),
                detached: true,
                stdio: 'inherit'
            });

            subprocess.unref()
        });

        process.exit();

    } catch (err) {
        console.log(await TIMESTAMP() + `: API-STPWZ-E009 : ${err}`)

        res.Type = "ERROR";
        res.Response = {
            Request_ID: req.ID,
            Error_Code: "API-STPWZ-E009",
            Error_Msg: "Failed to Complete Setup process."
        };

        return res;
    }
}

/*
 Support Functions
*/

// Checks if the given path exists
async function checkPathExists(filePath) {
    try {
        await access(filePath, constants.F_OK);
        return true
    } catch (err) {
        return false
    }
}

// Create database along with its Admin User 
async function createDatabases(databases) {
    try {

        let createDbs = Object.keys(databases).map(async (key) => {
            try {

                // Get list of databases
                let dbsList = await dbClient.db('admin').command({ listDatabases: 1, nameOnly: true });

                // Pull out the DB names from the dbList object
                let dbNames = await Promise.all(dbsList.databases.map(db => db.name));

                // Check if the Database exists and Create administrator
                if (dbNames.indexOf(databases[key].Name) < 0) {
                    await dbClient.db(databases[key].Name).command({ createUser: databases[key].Username, pwd: databases[key].Password, roles: ["dbOwner"] });
                    console.log(await TIMESTAMP() + ": STPWZ-I001 : Created " + databases[key].Name + " database.");


                    // Insert Institute_Info, Workflow_Logic, Cost_Code, User_Info, App_Info, App_Access, Record_Schema in Site Database
                    if (databases[key].hasOwnProperty("Collections")) await insertCollections(databases[key].Name, databases[key].Collections);
                } else {
                    console.log(await TIMESTAMP() + ": STPWZ-E010 : Already created " + databases[key].Name + " database.");
                    throw { code: "STPWZ-E010" };
                }

            } catch (error) {
                throw error
            }
        })
        await Promise.all(createDbs);

    } catch (err) {
        console.log(await TIMESTAMP() + ": " + "STPWZ-E011 : Error occurred in 'createDbs' function. ", err);
        throw { code: "STPWZ-E011" };
    }
}

//Insert data into the collection in database
async function insertCollections(database, collections) {
    try {

        let colPrms = Object.keys(collections).map(async colName => {
            await dbClient.db(database).collection(colName).insertMany(collections[colName]);
            console.log(await TIMESTAMP() + ": STPWZ-I002 : Inserted data in " + database + " database - " + colName + " collection.");
        })
        await Promise.all(colPrms);

    } catch (err) {
        console.log(await TIMESTAMP() + ": STPWZ-E012 : Error occurred in 'insertCollectionsData' function. ", err);
        throw { code: "STPWZ-E012" };
    }
}

// Insert information of each App in App_Info collection
async function insertAppInfo(database, col, applications) {
    try {

        // Get list of user defined roles from dbs
        let rolesList = await dbClient.db("admin").admin().command({ rolesInfo: 1, showBuiltinRoles: false });

        let appsPrms = applications.map(async app => {
            try {

                // Check if the Info already exists
                let isAppExists = await dbClient.db(database).collection(col).findOne({ Service_Code: app.Service_Code });

                // Insert App Info
                if (isAppExists === null) {

                    // Create DB Role for the App
                    await createDbRole(rolesList, app);

                    delete app.App_DB_Roles; // Delete App DB Roles

                    app.App_Date_Install = Date.now();
                    app.App_Date_Expiry = new Date().setDate(new Date().getDate() + 365);
                    app.App_Date_Version = new Date(app.App_Date_Version).getTime();

                    // Insert App Info
                    await dbClient.db(database).collection("App_Info").insertOne(app);

                    let removeFileds = Object.keys(app).map((key) => {
                        if (!(key == "Service_Code" || key == "App_Module")) {
                            delete app[key];
                        }
                    })
                    await Promise.all(removeFileds);

                    console.log(await TIMESTAMP() + ": STPWZ-I003 : Inserted " + app.Service_Code + " information in " + database + " database - App_Info collection.");
                } else {
                    console.log(await TIMESTAMP() + ": STPWZ-I004 : Already inserted " + app.Service_Code + " information in " + database + " database - App_Info collection.");
                }

            } catch (err) {
                console.log(await TIMESTAMP() + ": STPWZ-E013 : Failed to insert " + app.Service_Code + " information in " + database + " database - App_Info collection. ", err);
                throw { code: "STPWZ-E013" };
            }
        });
        await Promise.all(appsPrms);

    } catch (error) {
        throw error
    }
}

// Creates the roles for each microservice(user)
async function createDbRole(rolesList, app) {
    try {

        // Check if the Roles exist
        let isRoleExist = rolesList.roles.find(obj => obj.role === app.App_DB_Roles.role);

        // Create the Role
        if (rolesList.roles.length == 0 || typeof (isRoleExist) === "undefined" || isRoleExist === null) {
            await dbClient.db("admin").admin().command({ createRole: app.App_DB_Roles.role, privileges: app.App_DB_Roles.privileges, roles: app.App_DB_Roles.roles });
            console.log(await TIMESTAMP() + ": STPWZ-I003 : Created " + app.App_DB_Roles.role + " role in admin database.");
        } else {
            console.log(await TIMESTAMP() + ": STPWZ-I004 : Already created " + app.App_DB_Roles.role + " role in admin database.");
        }

    } catch (err) {
        console.log(await TIMESTAMP() + ": " + "STPWZ-E015 : Error occurred in 'createDbRole' function. ", err);
        throw { code: "STPWZ-E015" };
    }
}

// Create the user in admin database
async function createDbUser(siteCode, roleList) {
    try {

        let dbUsername = `${siteCode}DB`
        let dbPassword = encodeURIComponent(`${siteCode}DB_PASSWORD`)

        let userInfo = await dbClient.db("admin").collection("system.users").findOne({ user: dbUsername });

        // Create Users in admin database
        if (userInfo === null) {
            await dbClient.db("admin").admin().command({ createUser: dbUsername, pwd: dbPassword, roles: roleList });
            console.log(await TIMESTAMP() + ": STPWZ-I005 : Created " + dbUsername + " user in admin database.");
        } else {
            console.log(await TIMESTAMP() + ": STPWZ-I006 : Already created " + dbUsername + " user in admin database.");
        }

    } catch (err) {
        console.log(await TIMESTAMP() + ": " + " STPWZ-E014 : Error occurred in 'createDbUsers' function. ", err);
        throw { code: "STPWZ-E014" };
    }
}

// Generate a list of Modules and Applications installed with the /api folder
async function findServices() {

    //App List
    var application = [];
    let apiPath = './api'

    //Find App Modules
    try {

        const AppModules = await readdir(apiPath);

        for (let index = 0; index < AppModules.length; index++) {
            const AppModule = AppModules[index];


            //Find Service Code
            const servicePath = await join(apiPath, AppModule);

            //Find Service
            const serviceCodes = await readdir(servicePath);

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
        return console.log(await TIMESTAMP() + ": " + " STPWZ-E0?? : Error occurred in findService function. ", err);
    }


}