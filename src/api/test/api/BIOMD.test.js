/**
 * @file BIOMD API Test with Stub database in the loop.
 *
 */

//=============== START-OF: Reveal Config ===============//
global.CONFIG = {
  Database: {
    Site_Database: {
      Name: "DMO",
    },
  },
};
global.TIMESTAMP = () => {};
//================ END-OF: Reveal Config ================//

//=============== START-OF: Imports ===============//
const { ObjectId } = require("bson");
const {
  CREATE_RECORD,
  FIND_RECORD,
  GET_RECORD_METRICS,
} = require("../../api/BIOMD/BIOMD");
const InMemoryMongoDb = require("./MockDatabase");
const {
  _RECORD_LIST,
  AssetRecord,
  FacilityRecord,
  ManufacturerRecord,
  ModelRecord,
  VendorRecord,
  DepartmentRecord,
} = require("../../../client/web/src/store/modules/recordSchema");
const {
  SAMPLE_RECORD_TYPE_DATA,
} = require("../../../client/web/src/test/store/modules/recordSchema.data");
//================ END-OF: Imports ================//

//=============== START-OF: Test Fixture ===============//

const TEST_DB = new InMemoryMongoDb();
afterAll(() => TEST_DB.stop());
beforeAll(() => TEST_DB.start(CONFIG.Database.Site_Database.Name));
afterEach(() => TEST_DB.cleanup());

//================ END-OF: Test Fixture ================//

describe("Testing CREATE_RECORD", () => {
  /**
   * Test creating empty records in each collection.
   */
  it.each(
    _RECORD_LIST.map((e) => {
      e_i = new e({});
      return [e_i.getName(), e_i];
    })
  )("Empty %s Record", async (collection, record) => {
    const request = {
      Request: {
        collection,
        record: record.serialize(),
      },
    };
    const response = await CREATE_RECORD(request, TEST_DB.connection);
    expect(response.Type).toStrictEqual("RESPONSE");
    expect(response.Response.success).toStrictEqual(true);
    expect(response.Response.insertId).not.toBe("");
  });

  /**
   * Test creating sample records in each collection.
   */
  it.each(SAMPLE_RECORD_TYPE_DATA)(
    "Populated %s Record",
    async (collection, data) => {
      let asset;
      switch (collection) {
        case "Asset":
          asset = new AssetRecord(data);
          break;
        case "Facility":
          asset = new FacilityRecord(data);
          break;
        case "Manufacturer":
          asset = new ManufacturerRecord(data);
          break;
        case "Model":
          asset = new ModelRecord(data);
          break;
        case "Vendor":
          asset = new VendorRecord(data);
          break;
        case "Department":
          asset = new DepartmentRecord(data);
          break;
        default:
          throw new Error("Unsupported Record Type for Test");
      }

      const request = {
        Request: {
          collection,
          record: asset.serialize(),
        },
      };
      const response = await CREATE_RECORD(request, TEST_DB.connection);
      expect(response.Type).toStrictEqual("RESPONSE");
      expect(response.Response.success).toStrictEqual(true);
      expect(response.Response.insertId).not.toBe("");
    }
  );
});

describe("Testing FIND_RECORD", () => {
  /**
   * Create empty record of each collection type that can be found.
   */
  it.each(
    _RECORD_LIST.map((e) => {
      return [new e({}).getName()];
    })
  )("Find Basic%s Record", async (collection) => {
    await TEST_DB.db.collection(collection).insertOne({});
    const request = {
      ID: "",
      Request: {
        return_array: false,
        find : {
          collection,
          projection: {
            _id: 1
          },
        }
      },
    };
    const response = await FIND_RECORD(
      request,
      TEST_DB.connection
    );
    expect(response.Type).toStrictEqual("RESPONSE");
    expect(response.Response.success).toStrictEqual(true);
    expect(response.Response.records.length).toStrictEqual(1);
  });

  /**
   * Finding all created records in collection.
   */
  it("Find all records", async () => {
    const recordCount = 5;
    await TEST_DB.db.collection("Model").insertMany(
      [...Array(recordCount).keys()].map(e => ({ modelName: "Model_" + e}) )
    );

    const request = {
      ID: "",
      Request: {
        return_array: true,
        max_list: recordCount,
        find : {
          collection: "Model",
          projection: {
            "_id": 1
          },
        }
      },
    };
    const response = await FIND_RECORD(
      request,
      TEST_DB.connection
    );
    expect(response.Type).toStrictEqual("RESPONSE");
    expect(response.Response.success).toStrictEqual(true);
    expect(response.Response.records.length).toStrictEqual(recordCount);
  });

  /**
   * Finding filtered records based on string field.
   */
  it("Find records with string field", async () => {
    const recordCount = 6;
    await TEST_DB.db.collection("Asset").insertMany(
      [...Array(recordCount).keys()].map(e => ({ assetCode: "Asset_" + e, status: (e % 2 == 0) ? "Active" : "In Storage" }) )
    );

    const request = {
      ID: "",
      Request: {
        return_array: true,
        max_list: recordCount,
        find : {
          collection: "Asset",
          queries: [
            { field: "status", op: "eq", value: "Active" },
          ],
          projection: {
            _id: 0,
            assetCode: 1
          },
        }
      },
    };
    const response = await FIND_RECORD(
      request,
      TEST_DB.connection
    );
    expect(response.Type).toStrictEqual("RESPONSE");
    expect(response.Response.success).toStrictEqual(true);
    expect(response.Response.records).toStrictEqual([
      { assetCode: "Asset_0"},
      { assetCode: "Asset_2"},
      { assetCode: "Asset_4"}]);
  });

  /**
   * Finding filtered records based on objectId field.
   */
  it("Find records with objectID field", async () => {
    const recordCount = 6;
    const testObjectIDs = [
      new ObjectId(),
      new ObjectId(),
    ]
    await TEST_DB.db.collection("Model").insertMany(
      [...Array(recordCount).keys()].map(e => ({ modelName: "Model_" + e, manufacturerID: testObjectIDs[e % testObjectIDs.length]}) )
    );

    const request = {
      ID: "",
      Request: {
        return_array: true,
        max_list: recordCount,
        find : {
          collection: "Model",
          queries: [
            { field: "manufacturerID", op: "eq_id", value: testObjectIDs[1] },
          ],
          projection: {
            _id: 0,
            modelName: 1
          },
        }
      },
    };
    const response = await FIND_RECORD(
      request,
      TEST_DB.connection
    );
    expect(response.Type).toStrictEqual("RESPONSE");
    expect(response.Response.success).toStrictEqual(true);
    expect(response.Response.records).toStrictEqual([
      { modelName: "Model_1"},
      { modelName: "Model_3"},
      { modelName: "Model_5"}]);
  });


  /**
   * Finding filtered records with single lookup.
   */
  it("Find records with one field lookup", async () => {
    const testLookupName = "Test Manufacturer";
    const { insertedId: testLookupID } = await TEST_DB.db.collection("Manufacturer").insertOne({
      manufacturerName: testLookupName
    });
    const recordCount = 6;
    await TEST_DB.db.collection("Asset").insertMany(
      [...Array(recordCount).keys()].map(e => ({
        modelName: "Asset_" + e,
        manufacturerID: (e % 2 == 0) ? testLookupID : new ObjectId(),
        status: (e % 2 == 0) ? "Active" : "In Storage"
      }))
    );

    const request = {
      ID: "",
      Request: {
        return_array: true,
        max_list: recordCount,
        find : {
          collection: "Asset",
          queries: [
            { field: "status", op: "eq", value: "Active" },
          ],
          lookups: [
             { "localField": "manufacturerID", "collection": "Manufacturer", "foreignField": "_id", "as": "Manufacturer" }
          ],
          projection: { _id: 0, modelName: 1, manufacturerName: "$Manufacturer.manufacturerName" },
        }
      },
    };
    const response = await FIND_RECORD(
      request,
      TEST_DB.connection
    );
    expect(response.Type).toStrictEqual("RESPONSE");
    expect(response.Response.success).toStrictEqual(true);
    expect(response.Response.records).toStrictEqual([
      { modelName: "Asset_0", manufacturerName: testLookupName},
      { modelName: "Asset_2", manufacturerName: testLookupName},
      { modelName: "Asset_4", manufacturerName: testLookupName}]);
  });

  /**
   * Finding filtered records with multiple lookups.
   */
  it("Find records with multiple field lookup", async () => {
    const testManufacturerName = "Test Manufacturer";
    const testModelName = "Test Model";
    const { insertedId: testManufacturerID } = await TEST_DB.db.collection("Manufacturer").insertOne({
      manufacturerName: testManufacturerName
    });
    const { insertedId: testModelID } = await TEST_DB.db.collection("Model").insertOne({
      modelName: testModelName
    });
    const recordCount = 6;
    await TEST_DB.db.collection("Asset").insertMany(
      [...Array(recordCount).keys()].map(e => ({
        assetCode: "Asset_" + e,
        manufacturerID: (e % 2 == 0) ? testManufacturerID : new ObjectId(),
        modelID: (e % 2 == 0) ? testModelID : new ObjectId(),
        status: (e % 2 == 0) ? "Active" : "In Storage"
      }))
    );

    const request = {
      ID: "",
      Request: {
        return_array: true,
        max_list: recordCount,
        find : {
          collection: "Asset",
          queries: [
            { field: "status", op: "eq", value: "Active" },
          ],
          lookups: [
             { "localField": "manufacturerID", "collection": "Manufacturer", "foreignField": "_id", "as": "Manufacturer" },
             { "localField": "modelID", "collection": "Model", "foreignField": "_id", "as": "Model" }
          ],
          projection: { _id: 0, assetCode: 1, modelName: "$Model.modelName", manufacturerName: "$Manufacturer.manufacturerName" },
        }
      },
    };
    const response = await FIND_RECORD(
      request,
      TEST_DB.connection
    );
    expect(response.Type).toStrictEqual("RESPONSE");
    expect(response.Response.success).toStrictEqual(true);
    expect(response.Response.records).toStrictEqual([
      { assetCode: "Asset_0", modelName: testModelName, manufacturerName: testManufacturerName},
      { assetCode: "Asset_2", modelName: testModelName, manufacturerName: testManufacturerName},
      { assetCode: "Asset_4", modelName: testModelName, manufacturerName: testManufacturerName}]);
  });
});


describe("Testing GET_RECORD_METRICS", () => {
  describe("FIELD_COUNTS Metrics", () => {
    it("Happy Path", async () => {
      const { insertedIds: insertedModels } = await TEST_DB.db
        .collection("Model")
        .insertMany([
          { modelName: "First-Model" },
          { modelName: "Second-Model" },
        ]);

      await TEST_DB.db.collection("Asset").insertMany([
        {
          assetCode: "First-Asset",
          status: "Active",
          modelId: insertedModels[0],
        },
        {
          assetCode: "Second-Asset",
          status: "Active",
          modelId: insertedModels[0],
        },
        {
          assetCode: "Third-Asset",
          status: "Storage",
          modelId: insertedModels[0],
        },
        {
          assetCode: "Fourth-Asset",
          status: "Repairable",
          modelId: insertedModels[0],
        },
        {
          assetCode: "Fifth-Asset",
          status: "Active",
          modelId: insertedModels[1],
        },
      ]);

      const request = {
        ID: "",
        Request: {
          metrics: {
            type: "FIELD_COUNTS",
            collection: "Asset",
            field: "status",
            matchQueries: [
              {
                field: "modelId",
                op: "eq_id",
                value: insertedModels[0],
              },
            ],
          },
        },
      };
      const response = await GET_RECORD_METRICS(
        request,
        TEST_DB.connection
      );
      expect(response.Type).toEqual("RESPONSE");
      expect(response.Response.metrics).toEqual({
        Repairable: 1,
        Active: 2,
        Storage: 1,
      });
    });
  });
});
