
const { BSONType, ObjectId, Int32, Long, BSON } = require("bson");

exports.SAMPLE_RECORD_TYPE_DATA = [
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
      facilityName: "FacilityName",
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
  [
    "Department",
    {
      departmentName: "Department Name",
      shortName: "Short Name",
      facilityID: new ObjectId("990f1a8b9aea2d4e2d0d11dd"),
    },
  ],
];
