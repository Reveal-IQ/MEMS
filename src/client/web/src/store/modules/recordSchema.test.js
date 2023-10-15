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
      console.log(
        input,
        schema,
        expected,
        _RECORD_BASE._fieldToBsonType("", input, schema)
      );
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
        commonName: "commonName",
        description: "description",
        serialNumber: "serialNumber",
        model_id: new ObjectId("650f14d8dc843d63d8639973"),
        manufacturer_id: new ObjectId("f088034d002843d6ff639424"),
        manufactureDate: new Date(2022, 11, 24, 10, 33, 30, 0),
        facility_id: new ObjectId("1d223300b663778899abcedf"),
        area: "area",
        city: "city",
        department: new ObjectId("88de630123371298da201bbc"),
        roomTag: "roomTag",
        supportTeam: "supportTeam",
        vendor_id: new ObjectId("0238488de63012338da271bd"),
        status: "status",
        user_manual: true,
        technical_manual: true,
        purchaseOrderNumber: "purchaseOrderNumber",
        project: "project",
        purchaseCost: 220.31,
        purchaseDate: new Date(2020, 7, 14, 10, 33, 30, 0),
        acceptanceDate: new Date(2022, 7, 14, 10, 33, 30, 0),
        warrantyDate: new Date(2033, 1, 1, 0, 0, 0, 0),
        generalComment: "generalComment",
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
        area_code: "34AND82",
        departments: [
          new ObjectId("ff3e630123371298da201bbc"),
          new ObjectId("650f1a8b9aea2dfe2d0d114e"),
          new ObjectId("750f1a8b9aea2dfe2d0d1122"),
          new ObjectId("850f1a8b9aea2dfe2d0d114d"),
        ],
      },
    ],
    [
      "Manufacturer",
      {
        manufacturer_name: "ManufacturerName",
        country: "Canada",
        area: "area",
        city: "city",
        address_1: "Address 1",
        address_2: "Address 2",
        area_code: "34AND82",
      },
    ],
    [
      "Model",
      {
        manufacturer_id: new ObjectId("ff0f1a8b9aea2dfe2d0d1142"),
        model_name: "ModelName",
        model_number: "ModelNumber",
        vendor_site_ID: "SiteId5",
        manufacturer_name: "ManufacturerName",
      },
    ],
    [
      "Vendor",
      {
        vendor_name: "VendorName",
        country: "Canada",
        area: "area",
        city: "city",
        address_1: "Address 1",
        address_2: "Address 2",
        areaCode: "Z4AND87",
        contact_info: [
          {
            contact_number: "233-231-1212",
            representative_name: "RepName",
            email: "rep.name@example.com",
            contact_type: "RepType",
          },
        ],
        manufacturer_list: [
          {
            manufacturer: new ObjectId("bf0f1a8b9aea2dfe2d0d1142"),
            model_list: [
              {
                model_id: new ObjectId("ff0f188b9aea2dfe2d0d8b23"),
              },
              {
                model_id: new ObjectId("3f0f188b9aea2dfe2d0d8bff"),
              },
              {
                model_id: new ObjectId("92f0f188b9aea2dfe2dd8b29"),
              },
            ],
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
