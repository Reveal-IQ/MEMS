const {
  _RECORD_BASE,
  AssetRecord,
  FacilityRecord,
  VendorRecord,
  ManufacturerRecord,
  ModelRecord,
  _RECORD_LIST,
} = require("./recordSchema");
const { BSONType, ObjectId, Int32, Long, BSON } = require("bson");

describe("Testing Base Record Functionality", () => {
  describe("Base Record Field Parsing", () => {
    it.each([
      ["String", { input: "test", schema: { type: BSONType.string } }],
      [
        "String from Int",
        { input: 123, schema: { type: BSONType.string }, expected: "123" },
      ],
      [
        "ObjectID",
        {
          input: new ObjectId("10d00020f51bb4362e8e2a4d"),
          schema: { type: BSONType.objectId },
        },
      ],
      [
        "ObjectID from String ",
        {
          input: "507f1a1e810c19729de860ea",
          schema: { type: BSONType.objectId },
          expected: new ObjectId("507f1a1e810c19729de860ea"),
        },
      ],
      ["Boolean", { input: true, schema: { type: BSONType.bool } }],
      [
        "Boolean from String",
        { input: "false", schema: { type: BSONType.bool }, expected: false },
      ],
      [
        "Int",
        { input: 20, schema: { type: BSONType.int }, expected: new Int32(20) },
      ],
      [
        "Int from String",
        {
          input: "46",
          schema: { type: BSONType.int },
          expected: new Int32(46),
        },
      ],
      [
        "Long",
        {
          input: 123541,
          schema: { type: BSONType.long },
          expected: new Long(123541),
        },
      ],
      [
        "Long from String",
        {
          input: "45784",
          schema: { type: BSONType.long },
          expected: new Long(45784),
        },
      ],
      [
        "Array of primitives",
        {
          input: ["a", "b", "c", "d"],
          schema: { type: BSONType.array, items: { type: BSONType.string } },
        },
      ],
      [
        "Array of arrays",
        {
          input: [["a"], ["b"], ["c"], ["d"]],
          schema: {
            type: BSONType.array,
            items: { type: BSONType.array, items: { type: BSONType.string } },
          },
        },
      ],
      [
        "Object",
        {
          input: {
            testing: 1,
            world: "hello",
          },
          schema: {
            type: BSONType.object,
            fields: {
              testing: { type: BSONType.int },
              world: { type: BSONType.string },
            },
          },
          expected: {
            testing: new Int32(1),
            world: "hello",
          },
        },
      ],
      [
        "Array of Objects",
        {
          input: [
            {
              first: "one",
              second: 2,
              arr: ["first", "one"],
            },
            {
              first: "three",
              second: 534,
              arr: ["second", "one"],
            },
          ],
          schema: {
            type: BSONType.array,
            items: {
              type: BSONType.object,
              fields: {
                first: { type: BSONType.string },
                second: { type: BSONType.int },
                arr: { type: BSONType.array, items: { type: BSONType.string } },
              },
            },
          },
          expected: [
            {
              first: "one",
              second: new Int32(2),
              arr: ["first", "one"],
            },
            {
              first: "three",
              second: new Int32(534),
              arr: ["second", "one"],
            },
          ],
        },
      ],
      [
        "Object with Arrays",
        {
          input: {
            arr: ["apple", "pie"],
          },
          schema: {
            type: BSONType.object,
            fields: {
              arr: { type: BSONType.array, items: { type: BSONType.string } },
            },
          },
        },
      ],
      [
        "Nested Objects",
        {
          input: {
            first: {
              second: {
                third: {
                  fourth: "data",
                },
              },
            },
          },
          schema: {
            type: BSONType.object,
            fields: {
              first: {
                type: BSONType.object,
                fields: {
                  second: {
                    type: BSONType.object,
                    fields: {
                      third: {
                        type: BSONType.object,
                        fields: {
                          fourth: { type: BSONType.string },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      ],
    ])("Parsing %s", (_, { input, schema, expected }) => {
      _RECORD_BASE._validateSchema(schema);
      expect(_RECORD_BASE._fieldToBsonType("", input, schema)).toStrictEqual(
        expected == undefined ? input : expected
      );
    });
  });
});

describe("Testing Records", () => {
  it.each(
    _RECORD_LIST.map((e) => {
      e_i = new e({});
      return [e_i.getName(), e_i];
    })
  )("Empty %s Record", (_, record) => {
    record.serialize();
  });

  it.each([
    [
      "Asset",
      {
        assetCode: "assetCode",
        description: "description",
        serialNumber: "serialNumber",
        modelID: new ObjectId("650f14d8dc843d63d8639973"),
        manufacturerID: new ObjectId("f088034d002843d6ff639424"),
        manufactureDate: new Date(2022, 11, 24, 10, 33, 30, 0),
        facilityID: new ObjectId("1d223300b663778899abcedf"),
        departmentID: new ObjectId("88de630123371298da201bbc"),
        locationName: "roomTag",
        supportTeam: "supportTeam",
        vendorID: new ObjectId("0238488de63012338da271bd"),
        status: "status",
        purchaseOrderID: new ObjectId("ff38488de63012338da271bd"),
        acceptanceDate: new Date(2022, 7, 14, 10, 33, 30, 0),
        comment: "generalComment",
      },
    ],
    [
      "Facility",
      {
        facility_name: "FacilityName",
        country: "Argentina",
        area: "area",
        city: "city",
        address_1: "Address 1",
        address_2: "Address 2",
        areaCode: "34AND82",
      },
    ],
    [
      "Manufacturer",
      {
        manufacturerName: "ManufacturerName",
      },
    ],
    [
      "Model",
      {
        manufacturerID: new ObjectId("ff0f1a8b9aea2dfe2d0d1142"),
        modelName: "ModelName",
        commonName: "common Name",
        contactID: new ObjectId("720f1a8b9aea2dfe2d0d11dd"),
        UMDNSCode: "UMDNS Code",
      },
    ],
    [
      "Vendor",
      {
        vendorName: "VendorName",
        country: "Canada",
        area: "area",
        city: "city",
        address_1: "Address 1",
        address_2: "Address 2",
        areaCode: "Z4AND87",
        contactInfo: [
          {
            number: "233-231-1212",
            name: "RepName",
            email: "rep.name@example.com",
            type: "RepType",
          },
        ],
        manufacturerList: [
          {
            manufacturer: new ObjectId("bf0f1a8b9aea2dfe2d0d1142"),
          },
        ],
      },
    ],
  ])("Populated %s Record", (type, data) => {
    let asset;
    switch (type) {
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
      default:
        throw new Error("Unsupported Record Type for Test");
    }
    expect(BSON.deserialize(Uint8Array.from(asset.serialize()))).toStrictEqual(
      data
    );
  });
});
