/*
**********************************************
*  Comapny              : Reveal IQ          *
*  Last Edit Author     : Akshay Puli        *
*  App Name             : TEMPLATE APP       *
*  Last Edit			      : 05/17/2022		     *  
*  Version              : 0.1.2 		         *
**********************************************
*/

//Required Libs
//const { join } = require("path");
//const media = require(join(CONFIG.Paths.HomeDir, CONFIG.Paths.API, "GLOBAL", "media"));
//const instituteCode = CONFIG.Database.Site_Database.Name;

//*****DELETE DECLERATION */
// To generate current timestamp
var TIMESTAMP = async function(){
    
  // Current date
  let newDate = new Date();
  
  let date = newDate.getUTCDate() < 10 ? `0${newDate.getUTCDate()}` : newDate.getUTCDate();
  let month = parseInt(newDate.getUTCMonth() + 1) < 10 ? `0${parseInt(newDate.getUTCMonth() + 1)}` : parseInt(newDate.getUTCMonth() + 1);
  let year = newDate.getUTCFullYear();
  let hour = newDate.getUTCHours() < 10 ? `0${newDate.getUTCHours()}` : newDate.getUTCHours();
  let minutes = newDate.getUTCMinutes() < 10 ? `0${newDate.getUTCMinutes()}` : newDate.getUTCMinutes();
  let seconds = newDate.getUTCSeconds() < 10 ? `0${newDate.getUTCSeconds()}` : newDate.getUTCSeconds();

  return `${date}/${month}/${year} ${hour}:${minutes}:${seconds} UTC`;
}
//*****DELETE DECLERATION */

//Application Info
module.exports.App_Info = {
  Service_Code: "TEMPT",
  App_Name: "Template",
  App_Icon: "users",
  App_Module: "TEMP",
  App_Display: true,
  App_Version: "0.13.0",
  App_Date_Version: "05/05/2022",
  App_Status: "Active",
  App_DB_Roles: [
    {
      "User": ["find", "update"],
      "App_Info": ["find"],
      "App_Access": ["find", "insert", "update"],
      "Availability": ["find", "insert", "update"],
      "Global_Definition": ["find"],
      "db": instituteCode
    },
    {
      "Geography": ["find"],
      "Clinical_Descriptor": ["find"],
      "User_Group": ["find"],
      "Currency": ["find"],
      "Time_Zone": ["find"],
      "db": "Terminology"
    }
  ],
  Version_Schema: "022621-V0.1"
}



//API Template #1
module.exports.Temp_API1 = async function (req, dbClient) {

  try {
    
    //Confirm Packet Received 
    console.log(await TIMESTAMP() + `: RCU-<TEMP>-I001 : ADPNL processing request packet ID: ${req.ID}`)
    //req object defintion
    var res = Object.assign({}, req);

    //Add API Functionality Here
    

    //Response Packet
    res.Type = "RESPONSE";
    res.Response = {
      Request_ID: req.ID,
      API_Version: "1.1"
    }

  } catch (error) {
    
    //Log Error
    console.log(await TIMESTAMP() + `: API-<TEMP>-E001 : ${error}`)

    //Error Request Packet
    res.Type = "ERROR";
    res.Response = {
      Request_ID: req.ID,
      Error_Code: "API-TEMP-E001",
      Error_Msg: "TEMP_API: Failed to execute db query"
    };
  }

  return res;
}