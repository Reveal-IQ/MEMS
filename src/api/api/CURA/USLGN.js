//Required Modules and Files
const { join } = require("path");
const { Get_Media } = require(join(CONFIG.Paths.HomeDir, CONFIG.Paths.API, "GLOBAL", "media"));
const { createRefreshToken } = require(join(CONFIG.Paths.HomeDir, CONFIG.Paths.ComLink, "tokens"));
const { updateVersion } = require(join(CONFIG.Paths.HomeDir, CONFIG.Paths.API, "GLOBAL", "updateVersion"));

// Global variables
const instituteCode = CONFIG.Database.Site_Database.Name;

module.exports.App_Info = {
  App_Name: "User Login",
  Service_Code: "USLGN",
  App_Module: "CURA",
  App_Display: false,
  App_Icon: "Clone",
  App_Version: "0.1.0",
  App_Date_Version: "2021/04/28",
  App_Status: "Active",
  App_DB_Roles: {
      role: "USLGN_dbRole",
      privileges: [
          { resource: { db: "Site_DB", collection: "App_Info" }, actions: [ "find" ] },
          { resource: { db: "Site_DB", collection: "App_Access" }, actions: [ "find" ] },
          { resource: { db: "Site_DB", collection: "User" }, actions: [ "find", "update" ] },
          { resource: { db: "Site_DB", collection: "Media_Depot" }, actions: [ "find" ] },
          { resource: { db: "Site_DB", collection: "Global_Definition" }, actions: [ "find" ] },
          { resource: { db: "Terminology", collection: "Geography" }, actions: [ "find" ] },
      ],
      roles: []
  },
  Version_Schema: "022621-V0.1"
}

// USLGN-001: Fetch institute institute and USLGN version.
module.exports.Init_USLGN = async function (req, DBclient) {
  try {
    var res = Object.assign({}, req);

    // Query DB to fetch the version of the microservice (USLGN) from the App_Info using the service code
    let appVersion = await DBclient.db(instituteCode).collection("App_Info").findOne({ Service_Code: "USLGN" }, { projection: { _id: 0, App_Version: 1 } });

    // Fetch required Institute Information
    let instituteInfo = await DBclient.db(instituteCode).collection("Global_Definition").findOne({ Institute_Code: instituteCode }, { projection: { _id: 0, Institute_Name: 1 } });
        
    // Check if the Institute Information is available
    if(instituteInfo == null) throw "No services installed"

    // Construct response packet
    res.Type = "RESPONSE";
    res.Response = {
      Request_ID: req.ID,
      Institute_Code: instituteCode,
      Institute_Name: instituteInfo.Institute_Name,
      ...appVersion
    };

    return res;
  } catch (err) {
    console.log(await TIMESTAMP() + `: API-USLGN-E001 : ${err}`)
    
    res.Type = "ERROR";
    res.Response = {
      Request_ID: req.ID,
      Error_Code: "API-USLGN-E001",
      Error_Msg: "Failed to fetch information required to initialize USLGN"
    };

    return res;
  }
};

// USLGN-002: Validate username by checking if the user is registered to access the site’s reveal instance
module.exports.Authenticate_Username = async function (req, DBclient) {
  try {
    var res = Object.assign({}, req);

    // Validate user input
    if (!req.Request.hasOwnProperty("User_Name") || req.Request.User_Name.length < 4) throw "Invalid username"

    // Find username from User collection
    let userInfo = await DBclient.db(instituteCode).collection("User").findOne({ User_Name: req.Request.User_Name }, { projection: { _id: 0, ID_User: 1, User_First_Name: 1, User_Last_Name: 1, User_Group: 1, Hash_Salt: 1, User_Sex: 1, Flag_New_User: 1, Date_Time_Pwd_Expiry: 1, User_Profile: 1 } });
    
    // Check if there is a user given username
    if (userInfo === null) throw "Username not found"

    // Check if the user is new and doesn't have a password yet
    if(userInfo.Flag_New_User){
      delete userInfo.Hash_Salt
    } else if (userInfo.Date_Time_Pwd_Expiry > Date.now()) {
      userInfo.isExpired = false; // Password is not yet expired for existing user
    } else {
      userInfo.isExpired = true; // Password expired for existing user
    }

    // Check if pic is not undefined or null, then fetch the image 
    if (userInfo.User_Profile != null) {
      let profilePic = await Get_Media([userInfo.ID_User], DBclient);
      userInfo.User_Profile = profilePic[0].img;
    } else if (userInfo.hasOwnProperty("User_Profile")) {
      delete userInfo.User_Profile
    }

    // Construct the response packet with user information
    res.Type = "RESPONSE";
    res.Response = {
      Request_ID: req.ID,
      ...userInfo
    }

    return res;
  } catch (err) {
    console.log(await TIMESTAMP() + `: API-USLGN-E002 : ${err}`)

    res.Type = "ERROR";
    res.Response = {
      Request_ID: req.ID,
      Error_Code: "API-USLGN-E002",
      Error_Msg: "Invalid username"
    }

    return res;
  }
}

// USLGN-003: Check if the given password is correct. 
module.exports.Authenticate_Password = async function (req, DBclient) {
  try {
    var res = Object.assign({}, req);

    // Validate user input
    if (!req.Request.hasOwnProperty("Password_Hash")) throw "Invalid input"

    // Check if there is user with given ID and password
    let userInfo = await DBclient.db(instituteCode).collection("User").findOne({ $and: [{ ID_User: req.Requester.UserID }, { Password_Hash: req.Request.Password_Hash }] }, { projection: { _id: 0, ID_User: 1 } });
    
    // If the ID doesn't match with the password
    if (userInfo === null) throw "Invalid password"
    
    // Construct response
    res.Type = "RESPONSE";
    res.Response = {
      Request_ID: req.ID,
      isAuthenticated: true
    }

    return res;
  } catch (err) {
    console.log(await TIMESTAMP() + `: API-USLGN-E003 : ${err}`)
    
    res.Type = "ERROR";
    res.Response = {
      Request_ID: req.ID,
      Error_Code: "API-USLGN-E003",
      Error_Msg: "Invalid password"
    };

    return res;
  }
}

//  USLGN-004: Check the password is correct or not. 
module.exports.Login_User = async function (req, DBclient) {
  try {
    var res = Object.assign({}, req);

    // Validate user input
    if (!req.Request.hasOwnProperty("Password_Hash")) throw "Invalid input"

    // Check if there is user with given ID and password
    let userInfo = await DBclient.db(instituteCode).collection("User").findOne({ $and: [{ ID_User: req.Requester.UserID }, { Password_Hash: req.Request.Password_Hash }] }, { projection: { _id: 0, ID_User: 1 } });
    
    // If the ID doesn't match with the password
    if (userInfo === null) throw "Invalid password"

    // Generate Refresh Token
    let tokenInfo = await createRefreshToken(userInfo.ID_User);
    
    res.Type = "RESPONSE";
    res.Response = {
      Request_ID: req.ID,
      Refresh_Token: tokenInfo.token,
      Issued_At: tokenInfo.issuedAt,
      Expires_In: tokenInfo.expiresIn
    }

    return res;
  } catch (err) {
    console.log(await TIMESTAMP() + `: API-USLGN-E004 : ${err}`)

    res.Type = "ERROR";
    res.Response = {
      Request_ID: req.ID,
      Error_Code: "API-USLGN-E004",
      Error_Msg: "Failed to login user"
    };

    return res;
  }
}

// USLGN-005: Insert the new password or update the password to the user.
module.exports.Set_Password = async function (req, DBclient) {
  try {
    var res = Object.assign({}, req);

    // Validate user input
    if (!req.Request.hasOwnProperty("Hash_Salt") 
      || req.Request.Hash_Salt.toString().length != 16 
      || !req.Request.hasOwnProperty("Password_Hash") 
      || !req.Request.hasOwnProperty("Password_Expiry_Duration")
      || !(parseInt(req.Request.Password_Expiry_Duration) > 0 
      || parseInt(req.Request.Password_Expiry_Duration) < 366)) throw "Invalid input"

    let ID_User = req.Requester.UserID;

    // Check the UserID is valid or not
    let userInfo = await DBclient.db(instituteCode).collection("User").findOne({ ID_User: ID_User }, { projection: { _id: 0, Version: 1 } });
    
    // If there no user with given user ID
    if (userInfo === null) throw "Invalid User ID"

    // Calculate password expiry date from given number of days
    let expiryDate = new Date().setDate(new Date().getDate() + req.Request.Password_Expiry_Duration);

    // Update User Info document version
    let newVersion = await updateVersion(userInfo.Version);
    
    // Update Password
    await DBclient.db(instituteCode).collection("User").updateOne({ ID_User: ID_User }, { $set: { Password_Hash: req.Request.Password_Hash, Hash_Salt: req.Request.Hash_Salt, Date_Time_Pwd_Set: Date.now(), Date_Time_Pwd_Expiry: expiryDate, Version: newVersion, Flag_New_User: false } });
    
    // Construct response
    res.Type = "RESPONSE";
    res.Response = {
      Request_ID: req.ID,
      isPasswordSet: true
    }

    return res;
  } catch (err) {
    console.log(await TIMESTAMP() + `: API-USLGN-E005 : ${err}`)

    res.Type = "ERROR";
    res.Response = {
      Request_ID: req.ID,
      Error_Code: "API-USLGN-E005",
      Error_Msg: "Failed to set password"
    };

    return res;
  }
};