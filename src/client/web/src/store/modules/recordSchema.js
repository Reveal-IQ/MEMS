/**
 * @file Record schema used by the client.
 *
 */

import { BSON, BSONType, ObjectId, Double, Timestamp, Long } from "bson";

class Record {
  /**
   * Create a record based on the supported schema.
   * @param {string} name record name.
   * @param {*} data record data to transform.
   */
  constructor(name, data) {
    this._name = name;
    this._record = {};
    const schema = this.getSchema();
    for (const data_label in data) {
      if (data[data_label] == undefined || data[data_label] == null) {
        continue;
      } else if (data_label in schema) {
        this._record[data_label] = this._fieldToBsonType(
          data_label,
          data[data_label],
          schema[data_label]
        );
      } else {
        console.error(
          `Unsupported field for Record[${this._name}]: ${data_label}`
        );
      }
    }
  }

  /**
   * Transform field data into BSON type based on schema.
   * @param {string} label field label.
   * @param {*} data underlying data.
   * @param {*} schema BSON type to transform data.
   * @returns
   */
  _fieldToBsonType(label, data, schema) {
    switch (schema.type) {
      case BSONType.string:
        return data.toString();
      case BSONType.objectId:
        return new ObjectId(data);
      case BSONType.timestamp:
        return new Timestamp(data);
      case BSONType.boolean:
        return new Boolean(data);
      case BSONType.int:
      case BSONType.long:
        return new Long(data);
      case BSONType.double:
        return new Double(data);
      case BSONType.array:
        let data_arr = data.filter(e => ((e !== undefined) || (e !== null))).map((item) => {
          return this._fieldToBsonType(label, item, schema.items);
        });
        return (Array.isArray(data_arr)) ? data_arr : [];
      case BSONType.object:
        let data_obj = Object.keys(data).reduce((obj, key) => {
          if ((data[key] !== undefined) && (data[key] !== null)) {
            if (key in schema.fields) {
              obj[key] = this._fieldToBsonType(
                key,
                data[key],
                schema.fields[key]
              );
              return obj;
            } else {
              console.error(
                `Unsupported field type for Record[${this._name}] field[${label}][${key}] : ${schema.type}`
              );
            }
          }
          return obj;
        }, {});
        return (typeof data_obj === "object") ? data_obj : undefined;
      default:
        console.error(
          `Unsupported field type for Record[${this._name}] field[${label}] : ${schema.type}`
        );
    }
  }

  getRecord() {
    return this._record;
  }

  /**
   * Transform record into BSON stream.
   *
   * @returns Byte stream
   */
  serialize() {
    return Array.from(BSON.serialize(this._record));
  }

  /**
   * @returns {object} Record schema object.
   */
  getSchema() {
    throw new Error(
      "Cannot instantiate Record instance. Child classes should implement getSchema()"
    );
  }
}

class AssetRecord extends Record {
  constructor(data) {
    super("Asset", data);
  }
  getSchema() {
    return {
      assetCode: { type: BSONType.string },
      commonName: { type: BSONType.string },
      description: { type: BSONType.string },
      serialNumber: { type: BSONType.string },
      model_id: { type: BSONType.objectId },
      manufacturer_id: { type: BSONType.objectId },
      manufactureDate: { type: BSONType.timestamp },
      facility_id: { type: BSONType.objectId },
      area: { type: BSONType.string },
      city: { type: BSONType.string },
      department: BSONType.objectId,
      roomTag: { type: BSONType.string },
      supportTeam: { type: BSONType.string },
      vendor_id: { type: BSONType.objectId },
      status: { type: BSONType.string },
      user_manual: { type: BSONType.boolean },
      technical_manual: { type: BSONType.boolean },
      purchaseOrderNumber: { type: BSONType.string },
      project: { type: BSONType.string },
      purchaseCost: { type: BSONType.double },
      purchaseDate: { type: BSONType.timestamp },
      acceptanceDate: { type: BSONType.timestamp },
      warrantyDate: { type: BSONType.timestamp },
      generalComment: { type: BSONType.string },
    };
  }
}

class FacilityRecord extends Record {
  constructor(data) {
    super("Facility", data);
  }
  getSchema() {
    return {
      name: { type: BSONType.string },
      address_1: { type: BSONType.string },
      address_2: { type: BSONType.string },
      city: { type: BSONType.string },
      area: { type: BSONType.string },
      area_code: { type: BSONType.string },
      country: { type: BSONType.string },
      departments: {
        type: BSONType.array,
        items: BSONType.objectId,
      },
    };
  }
}

class ManufacturerRecord extends Record {
  constructor(data) {
    super("Manufacturer", data);
  }
  getSchema() {
    return {
      manufacturer_name: { type: BSONType.string },
      country: { type: BSONType.string },
      area: { type: BSONType.string },
      city: { type: BSONType.string },
      address_1: { type: BSONType.string },
      address_2: { type: BSONType.string },
      area_code: { type: BSONType.string },
    };
  }
}

class ModelRecord extends Record {
  constructor(data) {
    super("Model", data);
  }
  getSchema() {
    return {
      manufacturer_id: { type: BSONType.objectId },
      model_name: { type: BSONType.string },
      model_number: { type: BSONType.string },
      vendor_site_ID: { type: BSONType.string }, // TODO: Is this ObjectID?
      manufacturer_name: { type: BSONType.string },
    };
  }
}

class VendorRecord extends Record {
  constructor(data) {
    super("Vendor", data);
  }
  getSchema() {
    return {
      vendor_name: { type: BSONType.string },
      country: { type: BSONType.string },
      area: { type: BSONType.string },
      city: { type: BSONType.string },
      address_1: { type: BSONType.string },
      address_2: { type: BSONType.string },
      areaCode: { type: BSONType.string },
      contact_info: {
        type: BSONType.array,
        items: {
          type: BSONType.object,
          fields: {
            contact_number: { type: BSONType.string },
            representative_name: { type: BSONType.string },
            email: { type: BSONType.string },
            contact_type: { type: BSONType.string },
          },
        },
      },
      manufacturer_list: {
        type: BSONType.array,
        items: {
          type: BSONType.object,
          fields: {
            manufacturer: { type: BSONType.objectId },
            model_list: {
              type: BSONType.array,
              items: {
                type: BSONType.object,
                fields: {
                  model_id: { type: BSONType.objectId },
                },
              },
            },
          },
        },
      },
    };
  }
}

export {
  AssetRecord,
  FacilityRecord,
  ManufacturerRecord,
  ModelRecord,
  VendorRecord,
};
