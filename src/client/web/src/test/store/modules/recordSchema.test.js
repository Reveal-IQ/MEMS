const {
  _RECORD_BASE,
  AssetRecord,
  FacilityRecord,
  VendorRecord,
  ManufacturerRecord,
  ModelRecord,
  DepartmentRecord,
  _RECORD_LIST,
} = require("../../../store/modules/recordSchema");
const { BSONType, ObjectId, Int32, Long, BSON } = require("bson");
const {SAMPLE_RECORD_TYPE_DATA} = require("./recordSchema.data");

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

  it.each(SAMPLE_RECORD_TYPE_DATA)("Populated %s Record", (type, data) => {
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
      case "Department":
        asset = new DepartmentRecord(data);
        break;
      default:
        throw new Error("Unsupported Record Type for Test");
    }
    expect(BSON.deserialize(Uint8Array.from(asset.serialize()))).toStrictEqual(
      data
    );
  });
});
