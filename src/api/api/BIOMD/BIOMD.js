/*
 **********************************************
 *  Company              : MEMS                *
 *  Last Edit Author     : Jay Anand           *
 *  App Name             : BIOMD               *
 *  Last Edit			       : 09/18/2022		       *
 *  Version              : 0.1.0 		           *
 **********************************************
 */

//Required Libs
// const { join } = require("path");
// const media = require(join(CONFIG.Paths.HomeDir, CONFIG.Paths.API, "GLOBAL", "media"));
const {ObjectId} = require('mongodb');
const instituteCode = CONFIG.Database.Site_Database.Name;

//Application Info
module.exports.App_Info = {
  App_Name: "Medical Equipment Managment System",
  Service_Code: "BIOMD",
  App_Module: "BIOMD",
  App_Display: true,
  App_Icon: "users",
  App_Version: "0.1.0",
  App_Date_Version: "05/17/2022",
  App_Status: "Active",
  App_DB_Roles: {
    role: "BIOMD_dbRole",
    privileges: [
      { resource: { db: "Site_DB", collection: "Assets" }, actions: ["find", "insert", "update"] },
      { resource: { db: "Site_DB", collection: "Facilities" }, actions: ["find", "insert", "update"] },
      { resource: { db: "Site_DB", collection: "Manufacturers" }, actions: ["find", "insert", "update"] },
      { resource: { db: "Site_DB", collection: "EquipmentModels" }, actions: ["find", "insert", "update"] },
      { resource: { db: "Site_DB", collection: "Vendors" }, actions: ["find", "insert", "update"] }
    ],
    roles: []
  },
  Version_Schema: "022621-V0.1"
}


const ASSETS = "assets";
const FACILITIES = "facilities";
const MANUFACTURERS = "manufacturers";
const EQUIPMENT_MODELS = "equipment_models";
const VENDORS = "vendors";

const OPERATORS = ["eq", "in", "gt", "lt", "sb", "eq_id"];

//Common Create Function
const createOne = async function (doc, dbClient, collection) {
  const result = await dbClient.db(instituteCode).collection(collection).insertOne(doc);
  return result.insertedId;
};

//Common Create Function
const createMany = async function (docs, dbClient, collection) {
  const conn = await dbClient.db(instituteCode).collection(collection);
  let result = await conn.insertMany(docs);
  return result.insertedIds;
};

// //Check if query is sanitized
// const checkQuery = async function (query) {
//   if (mongoSanitize.has(query)) {
//     throw new Error("Incorrect Query Syntax");
//   }
// };

//Check if query is sanitized
const isValidOperator = async function (operator) {
  return OPERATORS.indexOf(operator) !== 1;
};

//Create a single BIOMD record
module.exports.CREATE_RECORD = async function (req, dbClient) {

  //Confirm Packet Received 
  console.log(await TIMESTAMP() + `: RCU-BIOMD-I001 : CREATE RECORD api processing request packet ID: ${req.ID}`)

  //Copy Requester Information
  var res = Object.assign({}, req);

  //Decleration
  var invalidCollection = false;
  var id = new Object();
  let collection = req.Request.collection;

  try {
    switch (collection) {
      case "Manufacturer":
        insertID = await createOne(req.Request.record, dbClient, "Manufacturer");
        break;
      case "Vendor":
        insertID = await createOne(req.Request.record, dbClient, "Vendor");
        break;
      case "Facility":
        insertID = await createOne(req.Request.record, dbClient, "Facility");
        break;
      case "Model":
        insertID = await createOne(req.Request.record, dbClient, "Model");
        break;
      case "Asset":
        insertID = await createOne(req.Request.record, dbClient, "Asset");
        break;
      case "Contact":
        insertID = await createOne(req.Request.record, dbClient, "Contact");
        break;
      default:
        invalidCollection = true
    }
  } catch (error) {
    res.Type = "ERROR";
    res.Response = {
      Request_ID: req.ID,
      Error_Code: "API-BIOMD-E001",
      Error_Msg: "CREATE_RECORD : Failed to create " + collection + " record",
    };
  }

  if (!invalidCollection) {
    res.Type = "RESPONSE";
    res.Response = {
      insertID: insertID,
      success: true,
      message: "Created " + collection + " Record",
    };
  } else {
    res.Type = "ERROR";
    res.Response = {
      Request_ID: req.ID,
      Error_Code: "API-BIOMD-E002",
      Error_Msg: "CREATE_RECORD: Invalid " + collection + " collection",
    };
  }
  return res;
}


module.exports.CREATE_RECORDS = async function (req, dbClient) {
  var invalidCollection = false;
  var res = new Object();
  var ids = [];
  //Response Packet
  res.Type = "RESPONSE";
  try {
    let collection = req.request.collection;
    switch (collection) {
      case MANUFACTURERS:
        ids = await createMany(req.request.records, dbClient, MANUFACTURERS)
        break;
      case VENDORS:
        ids = await createMany(req.request.records, dbClient, VENDORS)
        break;
      case FACILITIES:
        ids = await createMany(req.request.records, dbClient, FACILITIES)
        break;
      case EQUIPMENT_MODELS:
        ids = await createMany(req.request.records, dbClient, EQUIPMENT_MODELS)
        break;
      case ASSETS:
        ids = await createMany(req.request.records, dbClient, ASSETS)
        break;
      default:
        invalidCollection = true
    }
  } catch (error) {
    res.Type = "ERROR";
    res.Response = {
      Request_ID: req.ID,
      Error_Code: "API-CREATE_RECORDS-E001",
      Error_Msg: "CREATE_RECORDS_API: Failed to execute db query",
    };
  }
  if (!invalidCollection) {
    res.Type = "RESPONSE";
    res.Response = {
      ID: ids,
      collection: collection,
      success: true,
      message: "Created Records",
    };
  } else {
    res.Type = "ERROR";
    res.Response = {
      Request_ID: req.ID,
      Error_Code: "API-CREATE_RECORDS-E002",
      Error_Msg: "CREATE_RECORDS_API: Invalid collection provided",
    };
  }
  return res;
}

//API Create New Vendor
module.exports.FIND_RECORD = async function (req, dbClient) {
  try {
    //Confirm Packet Received
    console.log(
      (await TIMESTAMP()) +
      `: RCU-BIOMD-I001 : FIND_RECORDS processing request packet ID: ${req.ID}`
    );

    //Copy Requester Information
    var res = Object.assign({}, req);

    //req object defintion
    var find = Object.assign({}, req.Request.find);

    // Check query
    var queries = find.queries;
    var createdFindQuery = {};
    for (let i = 0; i < queries.length; i++) {
      let qry = queries[i]
      if (isValidOperator(qry.op)) {
        switch (qry.op) {
          case "eq_id":
            createdFindQuery["_id"] = ObjectId(qry.value);
            break;
          case "eq":
            createdFindQuery[qry.field] = qry.value;
            break;
          case "sb":
            createdFindQuery[qry.field] = { $regex: String(qry.value) };
            break;
        }
      } else {
        throw new Error("Invalid Query Syntax: selected operator is not valid");
      }
    }


    // Perform Find
    const collection = await dbClient.db(instituteCode).collection(find.collection);
    let limit = req.Request.return_array ? req.Request.max_list : 1;
    let result = await collection
      .find(createdFindQuery)
      .project(find.projection ? find.projection : {})
      .limit(limit)
      .toArray();

    //Response Packet
    res.Type = "RESPONSE";
    res.Response = {
      records: result,
      success: true,
      message: result.length + " records found in " + find.collection,
    };
  
  } catch (error) {
    //Log Error
    console.log((await TIMESTAMP()) + `: API-<FIND>-E001 : ${error}`);

    //Error Request Packet
    res.Type = "ERROR";
    res.Response = {
      Request_ID: req.ID,
      Error_Code: "API-FIND-E001",
      Error_Msg: "FIND_API: Failed to execute db query",
    };
  }

  return res;
};