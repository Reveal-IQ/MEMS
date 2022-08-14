/*
**********************************************
*  Comapny              : Reveal IQ               *
*  Last Edit Author     : Akshay Puli             *
*  App Name             : Administrator Dashboard *
*  Last Edit		       	: 05/19/2022		          * 
*  Version              : 0.15.17  		            *
**********************************************
*/

//Required Libs
const { join } = require("path");
//const media = require(join(CONFIG.Paths.HomeDir, CONFIG.Paths.API, "GLOBAL", "media"));
const { v4: uuidv4 } = require('uuid');
const instituteCode = CONFIG.Database.Site_Database.Name;


//Application Info
module.exports.App_Info = {
  App_Name: "Admin Panel",
  Service_Code: "ADPNL",
  App_Module: "ADMIN",
  App_Display: true,
  App_Icon: "users",
  App_Version: "0.4.3.03.18",
  App_Date_Version: "2020/11/23",
  App_Status: "Active",
  App_DB_Roles: {
    role: "ADPNL_dbRole",
    privileges: [
      { resource: { db: "Site_DB", collection: "User" }, actions: ["find", "update"] },
      { resource: { db: "Site_DB", collection: "App_Info" }, actions: ["find"] },
      { resource: { db: "Site_DB", collection: "App_Access" }, actions: ["find", "insert", "update"] },
      { resource: { db: "Site_DB", collection: "Availability" }, actions: ["find", "insert", "update"] },
      { resource: { db: "Site_DB", collection: "Global_Definition" }, actions: ["find"] },
      { resource: { db: "Terminology", collection: "User_Group" }, actions: ["find"] },
      { resource: { db: "Terminology", collection: "Geography" }, actions: ["find"] },
      { resource: { db: "Terminology", collection: "Clinical_Descriptor" }, actions: ["find"] },
      { resource: { db: "Terminology", collection: "Currency" }, actions: ["find"] },
      { resource: { db: "Terminology", collection: "Time_Zone" }, actions: ["find"] }
    ],
    roles: []
  },
  Version_Schema: "022621-V0.1"
}


//Provides the Site information
module.exports.Site_Info = async function (req, dbClient) {

  try {

    //Confirm Packet Received 
    console.log(await TIMESTAMP() + `: RCU-ADPNL-I001 : Site_Info processing request packet ID: ${req.ID}`)

    //req object defintion
    var res = Object.assign({}, req);

    //Add API Functionality Here
    let query = {};
    let projection = { _id: 0, Institute_Code: req.Request.Institute_Code };
    let Site_Info_Record = await dbClient.db(instituteCode).collection('Global_Definition').find(query, projection).toArray();


    //Response Packet
    res.Type = "RESPONSE";
    res.Response = {
      Request_ID: req.ID,
      API_Version: "1.1",
      Site_Info: Site_Info_Record,
    }

  } catch (error) {

    //Log Error
    console.log(await TIMESTAMP() + `: RCU-ADPNL-E001 : ${error}`)

    //Error Request Packet
    res.Type = "ERROR";
    res.Response = {
      Request_ID: req.ID,
      Error_Code: "RCU-ADPNL-E001",
      Error_Msg: "Site Info Failed to execute db query"
    };
  }

  return res;
}

// User Summary API
module.exports.User_Summary = async function (req, dbClient) {

  try {

    //Confirm Packet Received 
    console.log(await TIMESTAMP() + `: RCU-ADPNL-I001 : User_Summary processing request packet ID: ${req.ID}`)
    //req object defintion
    var res = Object.assign({}, req);

    //Add API Functionality Here
    const TotalUser = await dbClient.db(instituteCode).collection('User').estimatedDocumentCount({});

    //Response Packet
    res.Type = "RESPONSE";
    res.Response = {
      Request_ID: req.ID,
      API_Version: "1.2",
      Total_User: TotalUser
    }

  } catch (error) {

    //Log Error
    console.log(await TIMESTAMP() + `: RCU-ADPNL-E001 : ${error}`)

    //Error Request Packet
    res.Type = "ERROR";
    res.Response = {
      Request_ID: req.ID,
      Error_Code: "RCU-ADPNL-E001",
      Error_Msg: "User_Summary Failed to execute db query"
    };
  }

  return res;
}

// User Create API
module.exports.User_Create = async function (req, dbClient) {

  try {

    //Confirm Packet Received 
    console.log(await TIMESTAMP() + `: API-ADPNL-I001 : User_Create processing request packet ID: ${req.ID}`)
    //req object defintion
    var res = Object.assign({}, req);

    //Add API Functionality Here

    //Step 1: Create ID_User
    let ID_UUID = uuidv4();
    let ID = instituteCode + '-' + ID_UUID;

    //Step 2: Add ID_User to User, Availability and App Access records

    //User Profile
    req.Request.User_Profile.ID_User = ID;
    req.Request.User_Profile.User_Status = "ACTIVE";
    await dbClient.db(instituteCode).collection('User').insert(req.Request.User_Profile);

    //App Access
    for (let key in req.Request.App_Access) {
      let Access_Record = Object.assign({ Access_Status: "ACTIVE", ID_User: ID }, req.Request.App_Access[key])
      await dbClient.db(instituteCode).collection('App_Access').insert(Access_Record);
    }

    //Availibility
    for (let key in req.Request.Availability) {
      let Availability_Record = Object.assign({ User_Status: "ACTIVE", ID_User: ID }, req.Request.Availability[key])
      await dbClient.db(instituteCode).collection('Availability').insert(Availability_Record);
    }

    //Response Packet
    res.Type = "RESPONSE";
    res.Response = {
      Request_ID: req.ID,
      Registration_Status: 'SUCCESS',
      ID_User: ID

    }

  } catch (error) {

    //Log Error
    console.log(await TIMESTAMP() + `: API-ADPNL-E001 : ${error}`)

    //Error Request Packet
    res.Type = "ERROR";
    res.Response = {
      Request_ID: req.ID,
      Error_Code: "API-TEMP-E001",
      Error_Msg: "User_Create: Failed to execute db query"
    };
  }

  return res;
}

// User Search API
module.exports.User_Search = async function (req, dbClient) {

  try {

    //Confirm Packet Received 
    console.log(await TIMESTAMP() + `: API-ADPNL-I001 : User_Search API processing request packet ID: ${req.ID}`)
    //req object defintion
    var res = Object.assign({}, req);

    //Add API Functionality Here

    //Check for User Profile Request
    if (req.Request.User_Profile) {

      let query = { ID_User: req.Request.ID_User };
      let User_Profile = await dbClient.db(instituteCode).collection('User').findOne(query, { _id: 0 });
      let App_Access = await dbClient.db(instituteCode).collection('App_Access').find(query, { _id: 0 }).toArray();
      let Availability = await dbClient.db(instituteCode).collection('Availability').find(query, { _id: 0 }).toArray();

      //Response Packet
      res.Type = "RESPONSE"
      res.Response = {
        Request_ID: req.ID,
        API_Version: "0.1",
        User_Profile,
        App_Access,
        Availability
      }
    } else if (req.Request.User_List) {

      let projection = {
        User_Name_First: 1,
        User_Name_Last: 1,
        User_Name: 1,
        Date_Time_Pwd_Set: 1,
        Date_Time_Pwd_Expiry: 1,
        Contact_Phone_Number: 1,
        User_Email: 1,
        User_Group: 1,
        User_Department: 1,
        ID_User: 1,
        Flag_New_User: 1,
        Version: 1,
        User_Status: 1,
        _id: 0
      }
      let User_List = await dbClient.db(instituteCode).collection('User').find({ User_Status: "ACTIVE" }, projection).limit(req.Request.Max_List).toArray();

      //Response Packet
      res.Type = "RESPONSE"
      res.Response = {
        Request_ID: req.ID,
        API_Version: "1.4",
        User_List
      }

    }
  } catch (error) {

    //Log Error
    console.log(await TIMESTAMP() + `: API-TEMP-E001 : ${error}`)

    //Error Request Packet
    res.Type = "ERROR";
    res.Response = {
      Request_ID: req.ID,
      Error_Code: "API-TEMP-E001",
      Error_Msg: "User_Search API: Failed to execute db query"
    };
  }

  return res;
}

// Service list API
module.exports.Services_Lists = async function (req, dbClient) {

  try {

    //Confirm Packet Received 
    console.log(await TIMESTAMP() + `: API-ADPNL-I001 : Services_List API processing request packet ID: ${req.ID}`)
    //req object defintion
    var res = Object.assign({}, req);

    //Add API Functionality Here
    let services_list = await dbClient.db(instituteCode).collection('App_Info').find({}, { _id: 0 }).toArray();

    //Response Packet
    res.Type = "RESPONSE";
    res.Response = {
      Request_ID: req.ID,
      API_Version: "1.1",
      services_lists: services_list,
    }

  } catch (error) {

    //Log Error
    console.log(await TIMESTAMP() + `: API-TEMP-E001 : ${error}`)

    //Error Request Packet
    res.Type = "ERROR";
    res.Response = {
      Request_ID: req.ID,
      Error_Code: "RCU-TEMP-E001",
      Error_Msg: "Service_Lists: Failed to execute db query"
    };
  }

  return res;
}

// User Delete API
module.exports.User_Delete = async function (req, dbClient) {

  try {

    //Confirm Packet Received 
    console.log(await TIMESTAMP() + `: API-TEMP-I001 : ADPNL processing request packet ID: ${req.ID}`)
    //req object defintion
    var res = Object.assign({}, req);

    //Add API Functionality Here
    await dbClient.db(instituteCode).collection('User').update({ ID_User: req.Request.ID_User }, { $set: { User_Status: "INACTIVE" } })
    await dbClient.db(instituteCode).collection('App_Access').updateMany({ ID_User: req.Request.ID_User }, { $set: { Access_Status: "INACTIVE" } })
    await dbClient.db(instituteCode).collection('Availability').updateMany({ ID_User: req.Request.ID_User }, { $set: { User_Status: "INACTIVE" } })

    //Response Packet
    res.Type = "RESPONSE";
    res.Response = {
      Request_ID: req.ID,
      Status: "Success",
      Message: "User password has been reset.",
      ID_User: req.Request.ID_User,
    }

  } catch (error) {

    //Log Error
    console.log(await TIMESTAMP() + `: API-TEMP-E001 : ${error}`)

    //Error Request Packet
    res.Type = "ERROR";
    res.Response = {
      Request_ID: req.ID,
      Error_Code: "API-ADPNL-E001",
      Error_Msg: "User_Delete: Failed to execute db query"
    };
  }

  return res;
}

//Password Reset
module.exports.User_Password_Reset = async function (req, dbClient) {

  try {

    //Confirm Packet Received 
    console.log(await TIMESTAMP() + `: API-ADPNL-I001 : ADPNL processing request packet ID: ${req.ID}`)
    //req object defintion
    var res = Object.assign({}, req);

    //Add API Functionality Here

    //Step 1: Generate Past EPOCH Time by one hour
    let Past_Epoch = Date.now() - 3600;

    //Step 2: Update EPOCH Time in Date_Time_Pwd_Expiry - User Collection
    await dbClient.db(instituteCode).collection('User').update({ ID_User: req.Request.ID_User }, { $set: { Date_Time_Pwd_Expiry: Past_Epoch, Hash_Salt: req.Request.Password_Salt, Password_Hash: req.Request.Password_Hash } })

    //Response Packet
    res.Type = "RESPONSE";
    res.Response = {
      Request_ID: req.ID,
      Status: "Success",
      Message: "User password has been reset.",
      ID_User: req.Request.ID_User
    }

  } catch (error) {

    //Log Error
    console.log(await TIMESTAMP() + `: API-ADPNL-E001 : ${error}`)

    //Error Request Packet
    res.Type = "ERROR";
    res.Response = {
      Request_ID: req.ID,
      Error_Code: "API-ADPNL-E001",
      Error_Msg: "User_Password_Reset API: Failed to execute db query"
    };
  }

  return res;
}
