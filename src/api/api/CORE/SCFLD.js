//  Required Modules and Files
const { join } = require("path");
const { Get_Media } = require(join(CONFIG.Paths.HomeDir, CONFIG.Paths.API, "GLOBAL", "media"));
const instituteCode = CONFIG.Database.Site_Database.Name;

module.exports.App_Info = {
    App_Name: "Scaffold",
    Service_Code: "SCFLD",
    App_Module: "CORE",
    App_Display: false,
    App_Icon: "Clone",
    App_Version: "0.1.0",
    App_Date_Version: "2021/04/24",
    App_Status: "Active",
    App_DB_Roles: {
        role: "SCFLD_dbRole",
        privileges: [
            { resource: { db: "Site_DB", collection: "App_Info" }, actions: ["find"] },
            { resource: { db: "Site_DB", collection: "App_Access" }, actions: ["find"] },
            { resource: { db: "Site_DB", collection: "User" }, actions: ["find", "update"] },
            { resource: { db: "Site_DB", collection: "Media_Depot" }, actions: ["find"] },
            { resource: { db: "Site_DB", collection: "Global_Definition" }, actions: ["find"] },
            { resource: { db: "Terminology", collection: "Geography" }, actions: ["find"] },
        ],
        roles: []
    },
    Version_Schema: "022621-V0.1"
}

// SCFLD-001 : Fetch User information and Services allowed.
module.exports.Initialize_User = async function (req, DBclient) {
    try {
        var res = Object.assign({}, req);
        let userID = req.Requester.UserID;
        let arrayOfMicroservices = [];

        // Get user information
        let userInfo = await DBclient.db(instituteCode).collection("User").findOne({ ID_User: userID }, { projection: { _id: 0, User_First_Name: 1, User_Middle_Name: 1, User_Last_Name: 1, User_Name: 1, User_Sex: 1, User_Profile: 1, User_Group: 1, Hash_Salt: 1, User_Department: 1 } });

        // Check if the user exists
        if (userInfo == null) throw "User not found"

        // Get services assinged to the user
        let userServices = await DBclient.db(instituteCode).collection("App_Access").find({ ID_User: userID }, { projection: { _id: 0, Service_Code: 1 } }).toArray();

        // Check if there are no services assinged
        if (userServices == null) throw "No user services found"

        // Get all the services available for the Institute
        let installedServices = await DBclient.db(instituteCode).collection("App_Info").find({}, { projection: { _id: 0, Service_Code: 1, App_Display: 1, App_Icon: 1, App_Name: 1, App_Module: 1 } }).toArray();

        // Check if the services are available
        if (installedServices == null) throw "No services installed"

        // Get information required for user services
        let installedServicesPromises = installedServices.map(async parentObj => {
            try {
                let userServicesPromises = userServices.map(async childObj => {
                    try {
                        if (parentObj.Service_Code === childObj.Service_Code) {
                            arrayOfMicroservices.push(parentObj);
                        }
                    } catch (error) {
                        throw error;
                    }
                });
                await Promise.all(userServicesPromises);
            } catch (error) {
                throw error;
            }
        });
        await Promise.all(installedServicesPromises);

        // Get user profile picture
        if (userInfo.User_Profile != null) {
            let profilePic = await Get_Media([userInfo.User_Profile], DBclient);
            userInfo.User_Profile = profilePic[0].img;
        } else if (userInfo.hasOwnProperty("User_Profile")) {
            delete userInfo.User_Profile
        }

        // Fetch required Institute Information
        let instituteInfo = await DBclient.db(instituteCode).collection("Global_Definition").findOne({ Institute_Code: instituteCode }, { projection: { _id: 0, Institute_Name: 1, Institute_Foundation_Date: 1 } });

        // Check if the Institute Information is available
        if (instituteInfo == null) throw "No services installed"

        // Construct response packet
        res.Type = "RESPONSE";
        res.Response = {
            Request_ID: req.ID,
            ID_User: userID,
            ...userInfo,
            User_Services: arrayOfMicroservices,
            Institute_Info: {
                Name: instituteInfo.Institute_Name,
                Code: instituteCode,
                Foundation_Date: instituteInfo.Institute_Foundation_Date
            }
        }

        return res;
    } catch (err) {
        console.log(await TIMESTAMP() + `: API-SCFLD-E001 : ${err}`)

        res.Type = "ERROR";
        res.Response = {
            Request_ID: req.ID,
            Error_Code: "API-SCFLD-E001",
            Error_Msg: "Failed to fetch user information."
        };

        return res;
    }
}