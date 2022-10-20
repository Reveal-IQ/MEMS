/*
**********************************************
*  Comapny              : Reveal IQ               *
*  Last Edit Author     : Akshay Puli             *
*  App Name             : Global API              *
*  Last Edit		    : 5/28/2022 		      * 
*  Version              : 0.1.8   		          *
**********************************************
*/

//Required Libs
const { join } = require("path");
//const media = require(join(CONFIG.Paths.HomeDir, CONFIG.Paths.API, "GLOBAL", "media"));
const instituteCode = CONFIG.Database.Site_Database.Name;

//Application Info
module.exports.App_Info = {
    App_Name: "Global API",
    Service_Code: "GLOBL",
    App_Module: "ADMIN",
    App_Display: false,
    App_Version: "0.4.3.03.18",
    App_Date_Version: "2020/11/23",
    App_Status: "Active",
    App_DB_Roles: {
      role: "GLOBL_dbRole",
      privileges: [
        { resource: { db: "Terminology", collection: "User_Group" }, actions: ["find"] },
        { resource: { db: "Terminology", collection: "Geography" }, actions: ["find"] },
      ],
      roles: []
    },
    Version_Schema: "022621-V0.1"
  }


//GET_GEO_LIST
module.exports.GET_GEO_LIST = async function (req, dbClient) {

    let nameAPI = 'GET_GEO_LIST';

    try {

        //Confirm Packet Received 
        console.log(await TIMESTAMP() + ': RCU-' + this.App_Info.Service_Code + '-I001 : ' + nameAPI + '- processing request packet ID: ' + req.ID)
        //req object defintion
        var res = Object.assign({}, req);

        //Add API Functionality Here
        let typeCode = req.Request.Criteria.Type_Code;

        //Is Max_Limit present in the req packet
        if (req.Request.Max_List == undefined) {
            //Set Default
            maxList = 5
        } else {
            //Check and Convert to String to Number
            maxList = Number(req.Request.Max_List)
        }


        if (typeCode == "CNTY") {

            let Country_List;
            let input = req.Request.Criteria.Loci_Name_Country;

            if (input == null || input == '' || input.length == 0) {
                Country_List = await dbClient.db("Terminology").collection("Geography").find({ Type_Code: typeCode }, { projection: { _id: 0, Loci_Name_Country: 1, Loci_Code_Country: 1 } }).limit(maxList).toArray();
            } else {
                Country_List = await dbClient.db("Terminology").collection("Geography").find({ $and: [{ Type_Code: typeCode }, { Loci_Name_Country: { $regex: input, $options: "i" } }] }, { projection: { _id: 0, Loci_Name_Country: 1, Loci_Code_Country: 1 } }).limit(maxList).toArray();
            }

            //Response Packet
            res.Type = "RESPONSE";
            res.Response = {
                Request_ID: req.ID,
                API_Version: "1.1",
                Country_List
            }

        } else if (typeCode == "STATE") {

            let State_List;
            let input = req.Request.Criteria.Loci_Name_State;
            let countryCode = req.Request.Criteria.Loci_Code_Country

            if (input == null || input == '' || input.length == 0) {
                State_List = await dbClient.db("Terminology").collection("Geography").find({ $and: [{ Type_Code: typeCode }, { Loci_Code_Country: countryCode }] }, { projection: { _id: 0, Loci_Name_State: 1, Loci_Code_State: 1 } }).limit(maxList).toArray();
            } else {
                State_List = await dbClient.db("Terminology").collection("Geography").find({ $and: [{ Type_Code: typeCode }, { Loci_Code_Country: countryCode }, { Loci_Name_State: { $regex: input, $options: "i" } }] }, { projection: { _id: 0, Loci_Name_State: 1, Loci_Code_State: 1 } }).limit(maxList).toArray();
            }

            //Response Packet
            res.Type = "RESPONSE";
            res.Response = {
                Request_ID: req.ID,
                API_Version: "1.1",
                State_List
            }

        } else if (typeCode == "ARL1") {

            let ARL1_List;
            let input = req.Request.Criteria.Loci_Name_Area_L1;
            let countryCode = req.Request.Criteria.Loci_Code_Country;
            let stateCode = req.Request.Criteria.Loci_Code_State;

            if (input == null || input == '' || input.length == 0) {
                ARL1_List = await dbClient.db("Terminology").collection("Geography").find({ $and: [{ Type_Code: typeCode }, { Loci_Code_Country: countryCode }, { Loci_Code_State: stateCode }] }, { projection: { _id: 0, Loci_Name_Area_L1: 1, Loci_Code_Area_L1: 1 } }).limit(maxList).toArray();
            } else {
                ARL1_List = await dbClient.db("Terminology").collection("Geography").find({ $and: [{ Type_Code: typeCode }, { Loci_Code_Country: countryCode }, { Loci_Code_State: stateCode }, { Loci_Name_Area_L1: { $regex: input, $options: "i" } }] }, { projection: { _id: 0, Loci_Name_Area_L1: 1, Loci_Code_Area_L1: 1 } }).limit(maxList).toArray();
            }

            //Response Packet
            res.Type = "RESPONSE";
            res.Response = {
                Request_ID: req.ID,
                API_Version: "1.1",
                ARL1_List
            }

        } else if (typeCode == "ARL2") {

            let ARL2_List;
            let input = req.Request.Criteria.Loci_Name_Area_L2;
            let countryCode = req.Request.Criteria.Loci_Code_Country;
            let stateCode = req.Request.Criteria.Loci_Code_State;
            let arl1Code = req.Request.Criteria.Loci_Code_Area_L1;

            if (input == null || input == '' || input.length == 0) {
                ARL2_List = await dbClient.db("Terminology").collection("Geography").find({ $and: [{ Type_Code: typeCode }, { Loci_Code_Country: countryCode }, { Loci_Code_State: stateCode }, { Loci_Code_Area_L1: arl1Code }] }, { projection: { _id: 0, Loci_Name_Area_L2: 1, Loci_Code_Area_L2: 1, Loci_Postal_Code: 1 } }).limit(maxList).toArray();
            } else {
                ARL2_List = await dbClient.db("Terminology").collection("Geography").find({ $and: [{ Type_Code: typeCode }, { Loci_Code_Country: countryCode }, { Loci_Code_State: stateCode }, { Loci_Code_Area_L1: arl1Code }, { Loci_Name_Area_L2: { $regex: input, $options: "i" } }] }, { projection: { _id: 0, Loci_Name_Area_L2: 1, Loci_Code_Area_L2: 1, Loci_Postal_Code: 1 } }).limit(maxList).toArray();
            }

            //Response Packet
            res.Type = "RESPONSE";
            res.Response = {
                Request_ID: req.ID,
                API_Version: "1.1",
                ARL2_List
            }
        } else {

            throw ('Geography type code not found')
        }

    } catch (error) {

        //Log Error
        console.log(await TIMESTAMP() + ':RCU-' + this.App_Info.Service_Code + '-E00? : ' + nameAPI + ' -->' + error)

        //Error Request Packet
        res.Type = "ERROR";
        res.Response = {
            Request_ID: req.ID,
            Error_Code: 'RCU-' + this.App_Info.Service_Code + '-E00?',
            Error_Msg: nameAPI + ': Failed to execute db query'
        };
    }

    return res;
}


//GET_User_Group
module.exports.GET_USER_GROUP = async function (req, dbClient) {

    let nameAPI = 'GET_USER_GROUP';

    try {

        //Confirm Packet Received 
        console.log(await TIMESTAMP() + ': RCU-' + this.App_Info.Service_Code + '-I001 : ' + nameAPI + '- processing request packet ID: ' + req.ID)
        //req object defintion
        var res = Object.assign({}, req);

        //Add API Functionality Here
        let User_Group = await dbClient.db('Terminology').collection('User_Group').find({ Type_Code: "USRGP" }, { projection: { _id: 0 } }).toArray();

        //Response Packet
        res.Type = "RESPONSE";
        res.Response = {
            Request_ID: req.ID,
            API_Version: "1.1",
            User_Group
        }


    } catch (error) {

        //Log Error
        console.log(await TIMESTAMP() + ':RCU-' + this.App_Info.Service_Code + '-E00? : ' + nameAPI + ' -->' + error)

        //Error Request Packet
        res.Type = "ERROR";
        res.Response = {
            Request_ID: req.ID,
            Error_Code: 'RCU-' + this.App_Info.Service_Code + '-E00?',
            Error_Msg: nameAPI + ': Failed to execute db query'
        };
    }

    return res;
}

//GET_GEO_NAME
module.exports.GET_GEO_NAME = async function (req, dbClient) {

    let nameAPI = 'GET_GEO_NAME';

    try {

        //Confirm Packet Received 
        console.log(await TIMESTAMP() + ': RCU-' + this.App_Info.Service_Code + '-I001 : ' + nameAPI + '- processing request packet ID: ' + req.ID)

        //req object defintion
        var res = Object.assign({}, req);

        //Response Packet
        res.Type = "RESPONSE";
        res.Response = {
            Request_ID: req.ID,
            API_Version: "1.0",
        }

        //Add API Functionality Here
        if (req.Request.Type_Code == "CNTY") {
            let query = { $and: [{ Type_Code: req.Request.Type_Code }, { Loci_Code_Country: req.Request.Loci_Code_Country }] }
            let projection = { projection: { _id: 0, Loci_Name_Country: 1 } }
            res.Response = await dbClient.db('Terminology').collection('Geography').findOne(query, projection);


        }
        else if (req.Request.Type_Code == "STATE") {
            let query = { $and: [{ Type_Code: req.Request.Type_Code }, { Loci_Code_Country: req.Request.Loci_Code_Country }, { Loci_Code_State: req.Request.Loci_Code_State }] }
            let projection = { projection: { _id: 0, Type_Code: 1, Loci_Name_State: 1, Loci_Code_State: 1 } }
            res.Response = await dbClient.db('Terminology').collection('Geography').findOne(query, projection);

        }
        else if (req.Request.Type_Code == "ARL1") {
            let query = { $and: [{ Type_Code: req.Request.Type_Code }, { Loci_Code_Country: req.Request.Loci_Code_Country }, { Loci_Code_State: req.Request.Loci_Code_State }, { Loci_Code_Area_L1: req.Request.Loci_Code_Area_L1}] }
            let projection = { projection: { _id: 0, Type_Code: 1, Loci_Name_Area_L1: 1, Loci_Code_Area_L1: 1 } }
            res.Response = await dbClient.db('Terminology').collection('Geography').findOne(query, projection);

        }
        else if (req.Request.Type_Code == "ARL2") {
            let query = { $and: [{ Type_Code: req.Request.Type_Code }, { Loci_Code_Country: req.Request.Loci_Code_Country }, { Loci_Code_State: req.Request.Loci_Code_State }, { Loci_Code_Area_L1: req.Request.Loci_Code_Area_L1 }, { Loci_Code_Area_L2: req.Request.Loci_Code_Area_L2 }] }
            let projection = { projection: { _id: 0, Type_Code: 1, Loci_Name_Area_L2: 1, Loci_Code_Area_L2: 1, Loci_Postal_Code: 1 } }
            res.Response = await dbClient.db('Terminology').collection('Geography').findOne(query, projection);

        } else {

            throw ('Geography Type Code was not found.')

        }


    } catch (error) {

        //Log Error
        console.log(await TIMESTAMP() + ':RCU-' + this.App_Info.Service_Code + '-E00? : ' + nameAPI + ' -->' + error)

        //Error Request Packet
        res.Type = "ERROR";
        res.Response = {
            Request_ID: req.ID,
            Error_Code: 'RCU-' + this.App_Info.Service_Code + '-E00?',
            Error_Msg: nameAPI + ': Failed to execute db query'
        };
    }

    return res;
}