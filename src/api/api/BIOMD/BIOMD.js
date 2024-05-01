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
const BSON = require('bson');
const { ObjectId } = require('mongodb');
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

const SUPPORTED_COLLECTIONS = [
  "Manufacturer",
  "Vendor",
  "Facility",
  "Model",
  "Asset",
  "Contact",
  "Department",
]

const ASSETS = "assets";
const FACILITIES = "facilities";
const MANUFACTURERS = "manufacturers";
const EQUIPMENT_MODELS = "equipment_models";
const VENDORS = "vendors";

const OPERATORS = ["eq", "in", "gt", "lt", "sb", "eq_id"];

const DEFAULT_LIMIT_COUNT = 1000;
const DEFAULT_SKIP_COUNT = 0;

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
  let res = Object.assign({}, req);

  //Declaration
  const collection = req.Request.collection;

  if (SUPPORTED_COLLECTIONS.includes(collection)) {
    try {
      const record = BSON.deserialize(Uint8Array.from(req.Request.record));
      const insertID = await createOne(record, dbClient, collection);

      res.Type = "RESPONSE";
      res.Response = {
        insertID: insertID,
        success: true,
        message: "Created " + collection + " Record",
      };
    } catch (error) {
      // Record creation failure
      res.Type = "ERROR";
      res.Response = {
        Request_ID: req.ID,
        Error_Code: "API-BIOMD-E001",
        Error_Msg: "CREATE_RECORD : Failed to create " + collection + " record",
      };
    }
  } else {
    // Invalid collection
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

/**
 * Find Records API
 *
 * @param {*} req Request Object.
 * @param {*} dbClient Database connection handle.
 * @returns Response Object.
 */
module.exports.FIND_RECORD = async function (req, dbClient) {

  // Copy Requester Information
  let res = Object.assign({}, req);

  try {
    // Confirm Packet Received
    console.log(
      (await TIMESTAMP()) +
      `: RCU-BIOMD-I001 : FIND_RECORDS processing request packet ID: ${req.ID}`
    );


    // Request object defaults
    const find = Object.assign({
      queries: [],
      lookups: [],
      projection: {},
    }, req.Request.find);

    // Check query
    const filter_query = find.queries.reduce((query_obj, {field, op, value}) => {
      if (isValidOperator(op)) {
        switch (op) {
          case "eq_id":
            query_obj[field] = ObjectId(value);
            break;
          case "eq":
            query_obj[field] = value;
            break;
          case "sb":
            query_obj[field] = { $regex: String(value) };
            break;
        }
      } else {
        throw new Error("Invalid Query Syntax: selected operator is not valid");
      }
      return query_obj;
    }, {});

    // Lookup queries
    let lookup_projection = {...find.projection};
    const lookup_queries = find.lookups.reduce((lookup_arr, {collection, localField, foreignField, as}) => {
      if (SUPPORTED_COLLECTIONS.includes(collection)) {
        lookup_arr.push({
          $lookup: {
            from: collection,
            localField,
            foreignField,
            as,
          }
        });
        lookup_projection[as] = { $arrayElemAt: [ "$" + as , 0] }
      } else {
        throw new Error("Invalid Lookup Syntax: collection not supported: " + collection);
      }
      return lookup_arr;
    }, []);

    // Perform Find
    const collection = await dbClient.db(instituteCode).collection(find.collection);
    const limit = req.Request.return_array ? req.Request.max_list : 1;
    const records = await collection.aggregate([
      { $match: filter_query },
      { $limit: limit },
      ...lookup_queries,
      { $project: lookup_projection },
      { $project: find.projection },
    ]).toArray();

    // Response Packet
    res.Type = "RESPONSE";
    res.Response = {
      records,
      success: true,
      message: records.length + " record(s) found in " + find.collection,
    };

  } catch (error) {
    // Log Error
    console.log((await TIMESTAMP()) + `: API-<FIND>-E001 : ${error}`);

    // Error Response Packet
    res.Type = "ERROR";
    res.Response = {
      Request_ID: req.ID,
      Error_Code: "API-FIND-E001",
      Error_Msg: "FIND_API: Failed to execute db query",
    };
  }

  return res;
};

// List Assets API
module.exports.LIST_ASSETS = async function (req, dbClient) {
  try {
    //Confirm Packet Received
    console.log(
      (await TIMESTAMP()) +
      `: RCU-BIOMD-I001 : LIST_ASSETS processing request packet ID: ${req.ID}`
    );

    //Copy Requester Information
    var res = Object.assign({}, req);

    // Perform List query
    const collection = await dbClient.db(instituteCode).collection("Asset");
    const projection = (req && req.Request && req.Request.list && req.Request.list.projection) || { "_id": 1 };
    const limit = (req && req.Request && req.Request.list && req.Request.list.limit) || DEFAULT_LIMIT_COUNT;
    const skip = (req && req.Request && req.Request.list && req.Request.list.skip) || DEFAULT_SKIP_COUNT;
    const records = await collection.aggregate([
      { $skip: skip },
      { $limit: limit },
      {
        $project: {
          manufacturer_id: { $toObjectId: "$manufacturer_id" },
          model_id: { $toObjectId: "$model_id" },
          facility_id: { $toObjectId: "$facility_id" },
          ...projection
        },
      },
      { $lookup: { from: "Facility", localField: "facility_id", foreignField: "_id", as: "facility" } },
      { $lookup: { from: "Manufacturer", localField: "manufacturer_id", foreignField: "_id", as: "manufacturer" } },
      { $lookup: { from: "Model", localField: "model_id", foreignField: "_id", as: "model" } },
      {
        $project: {
          facility: { $arrayElemAt: ["$facility", 0] },
          manufacturer: { $arrayElemAt: ["$manufacturer", 0] },
          model: { $arrayElemAt: ["$model", 0] },
          ...projection
        }
      }]).toArray();

    //Response Packet
    res.Type = "RESPONSE";
    res.Response = {
      records,
      success: true,
      message: records.length + " records listed from Asset",
    };

  } catch (error) {
    //Log Error
    console.log((await TIMESTAMP()) + `: API-<LIST_ASSETS>-E001 : ${error}`);

    //Error Request Packet
    res.Type = "ERROR";
    res.Response = {
      Request_ID: req.ID,
      Error_Code: "API-BIOMD-E003",
      Error_Msg: "LIST_ASSETS: Failed to execute db query",
    };
  }

  return res;
};

// List Vendors API
module.exports.LIST_VENDORS = async function (req, dbClient) {
  try {
    //Confirm Packet Received
    console.log(
      (await TIMESTAMP()) +
      `: RCU-BIOMD-I001 : LIST_VENDORS processing request packet ID: ${req.ID}`
    );

    //Copy Requester Information
    var res = Object.assign({}, req);

    // Perform List query
    const collection = await dbClient.db(instituteCode).collection("Vendor");
    const projection = (req && req.Request && req.Request.list && req.Request.list.projection) || { "_id": 1 };
    const limit = (req && req.Request && req.Request.list && req.Request.list.limit) || DEFAULT_LIMIT_COUNT;
    const skip = (req && req.Request && req.Request.list && req.Request.list.skip) || DEFAULT_SKIP_COUNT;
    const records = await collection.aggregate([
      { $skip: skip },
      { $limit: limit },
      {
        $project: {
          manufacturer_id: {
            $map: {
              input: "$manufacturer_id",
              as: "manufacturer_id",
              in: {
                $convert: {
                  input: "$$manufacturer_id",
                  to: "objectId"
                }
              }
            }
          },
          ...projection
        }
      },
      { $lookup: { from: "Manufacturer", localField: "manufacturer_id", foreignField: "_id", as: "manufacturers" } },
      {
        $project: {
          ...projection
        }
      }]).toArray();

    //Response Packet
    res.Type = "RESPONSE";
    res.Response = {
      records,
      success: true,
      message: records.length + " records listed from Vendor",
    };

  } catch (error) {
    //Log Error
    console.log((await TIMESTAMP()) + `: API-<LIST_VENDORS>-E001 : ${error}`);

    //Error Request Packet
    res.Type = "ERROR";
    res.Response = {
      Request_ID: req.ID,
      Error_Code: "API-BIOMD-E004",
      Error_Msg: "LIST_VENDORS: Failed to execute db query",
    };
  }

  return res;
};

module.exports.GET_REPORTS = async function (req, dbClient) {
  const DESCRIPTION = "description";
  const INFLOW = "inflow";
  const DEPARTMENT = "department";
  const FUNCTIONALITY = "functionality";

  const REPORT_TYPES = [DESCRIPTION, INFLOW, DEPARTMENT, FUNCTIONALITY];
  const ACTIVE_STRING = "Active Deployed";
  
  try {
    //Confirm Packet Received
    console.log(
      (await TIMESTAMP()) +
      `: RCU-BIOMD-I001 : RECORDS processing request packet ID: ${req.ID}`
    );

    //Copy Requester Information
    var res = Object.assign({}, req);
    const reportType = res.Request.reportType;
    const year = res.Request.reportSpecs.year || null;

    // Check report type (This should be included in the request inside find)
    if (REPORT_TYPES.includes(reportType)) {
      
      const collection = await dbClient.db(instituteCode).collection("Asset");
      var result;

      switch(reportType) {
        case DESCRIPTION: {
          result = await collection.aggregate([
            {
              $project: {
                assetCode: 1,
                modelID: 1,
                purchaseCost: 1,
                activeCount: {
                  $cond: [{$eq: ["$status", ACTIVE_STRING]}, 1, 0]
                },
                inactiveCount: {
                  $cond: [{$ne: ["$status", ACTIVE_STRING]}, 1, 0]
                }
              }
            },
            {
              $lookup: {from: "Model", localField: "modelID", foreignField: "_id", as: "model"}
            },
            {
              $group: {
                _id: "$modelID",
                description: {$first: "$model.UMDNSCode"},
                assetCode: {$first:"$assetCode"},
                active: {$sum: "$activeCount"},
                inactive: {$sum: "$inactiveCount"},
                totalCost: {$sum: "$purchaseCost"}
              }
            }
          ]).toArray();
          break;
        }
        case DEPARTMENT: {
          result = await collection.aggregate([
            {
              $project: {
                departmentID: 1,
                purchaseCost: 1,
                activeCount: {
                  $cond: [{$eq: ["$status", ACTIVE_STRING]}, 1, 0]
                },
                inactiveCount: {
                  $cond: [{$ne: ["$status", ACTIVE_STRING]}, 1, 0]
                }
              }
            },
            {
              $lookup: {from: "Department", localField: "departmentID", foreignField: "_id", as: "dep"}
            },
            {
              $group: {
                _id: "$departmentID",
                department: {$first: "$dep.departmentName"},
                active: {$sum: "$activeCount"},
                inactive: {$sum: "$inactiveCount"},
                totalCost: {$sum: "$purchaseCost"}
              }
            }
          ]).toArray();
          break;
        }
        case FUNCTIONALITY: {
          result = await collection.aggregate([
            {
              $project: {
                activeCount: {
                  $cond: [{$eq: ["$status", ACTIVE_STRING]}, 1, 0]
                },
                inactiveCount: {
                  $cond: [{$ne: ["$status", ACTIVE_STRING]}, 1, 0]
                }
              }
            },
            {
              $group: {
                _id: "null",
                active: {$sum: "$activeCount"},
                inactive: {$sum: "$inactiveCount"},
                totalDevices: {$sum: 1}
              }
            }
          ]).toArray();
          break;
        }
        case INFLOW: {
          //The year value should also be included in the request object in find
          if (!year) throw new Error("Invalid Query Syntax: no year provided");

          result = await collection.aggregate([
            {
              $match: {
                acceptanceDate: {
                  $gte: new Date(`${Number(year)}-01-01T00:00:00.000Z`),
                  $lt: new Date(`${Number(year)+1}-01-01T00:00:00.000Z`)
                }
              }
            },
            {
              $project: {
                assetCode: 1, 
                modelID: 1,
                purchaseCost: 1,
                activeCount: {
                  $cond: [{$eq: ["$status", ACTIVE_STRING]}, 1, 0]
                },
                inactiveCount: {
                  $cond: [{$ne: ["$status", ACTIVE_STRING]}, 1, 0]
                }
              }
            },
            {
              $lookup: {from: "Model", localField: "modelID", foreignField: "_id", as: "model"}
            },
            {
              $group: {
                _id: "$modelID",
                description: {$first: "$model.UMDNSCode"},
                assetCode: {$first:"$assetCode"},
                active: {$sum: "$activeCount"},
                inactive: {$sum: "$inactiveCount"},
                totalCost: {$sum: "$purchaseCost"}
              }
            }
          ]).toArray();
          break;
        }
      }

    } else {
      throw new Error("Invalid Report Type: Selected report type is not valid.");
    };

    //Response Packet
    res.Type = "RESPONSE";
    res.Response = {
      records: result,
      success: true,
      message: result.length + " records found in " + ASSETS,
    };
  
  } catch (error) {
    //Log Error
    console.log((await TIMESTAMP()) + `: API-<RECORDS>-E001 : ${error}`);

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
