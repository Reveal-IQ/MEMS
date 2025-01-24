/**
 * @file Record schema used by the client.
 *
 */

import { BSON, BSONType, ObjectId, Double, Timestamp, Long, Int32 } from "bson";
import { useStore } from "vuex";

class Record {
  /**
   * Create a record based on the supported schema.
   * @param {string} name record name.
   * @param {*} data record data to transform.
   */
  constructor(name, data, validateUniqueFn) {
    this._name = name;
    this._record = {};
    this._validateUniqueFn = validateUniqueFn;
    const schema = this.getSchema();
    Record._validateSchema(schema);
    Record._validateRequired(data, schema);
    Record._validateUnique(data, schema, this._validateUniqueFn);
    this._record = Record._fieldToBsonType(this.getName(), data, schema);
  }

  getName() {
    return this._name;
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

  static _validateRequired(data, schema) {
    if (schema.type === BSONType.object) {
      const fields = schema.fields;
      // const uniqueChecks = [];

      Object.keys(fields).forEach((key) => {
        const field = fields[key];

        if (field.required && (data[key] === undefined || data[key] === null)) {
          throw new Error(`Field '${key}' is required.`);
        }
      });
    }
  }

  static async _validateUnique(data, schema, validateUniqueFn) {
    if (schema.type === BSONType.object) {
      const fields = schema.fields;
      const uniqueChecks = [];

      Object.keys(fields).forEach((key) => {
        const field = fields[key];
        if (field.unique && data[key] !== undefined && data[key] !== null) {
          // Check if the value is unique from database.
          uniqueChecks.push(
            this._checkUnique(this._name, key, data[key], validateUniqueFn)
          );
        }
      });
      await Promise.all(uniqueChecks);
    }
  }

  static async _checkUnique(recordName, fieldName, value, validateUniqueFn) {
    try {
      const isUnique = await validateUniqueFn(recordName, fieldName, value);
      if (isUnique === null) {
        // Server error occurred
        throw new Error(
          `Unable to verify uniqueness for field '${fieldName}' due to a server error.`
        );
      }

      if (!isUnique) {
        throw new Error(
          `Field '${fieldName}' with value '${value}' is not unique for record '${recordName}'.`
        );
      }
    } catch (error) {
      console.error(
        `Error checking uniqueness for field '${fieldName}':`,
        error
      );
      throw error;
    }
  }

  static _validateSchema(schema) {
    if (typeof schema !== "object") {
      throw new Error(
        `Schema field should be an object: ${JSON.stringify(schema)}`
      );
    } else if (schema.type == undefined || schema.type == null) {
      throw new Error(
        `Schema field object should have 'type' key: ${JSON.stringify(schema)}`
      );
    } else if (!Object.values(BSONType).includes(schema.type)) {
      throw new Error(
        `Schema 'type' value is not a BSONType: ${JSON.stringify(schema)}`
      );
    } else if (schema.type == BSONType.array) {
      if (schema.items == undefined || schema.items == null) {
        throw new Error(
          `Schema array field should have 'items' key: ${JSON.stringify(
            schema
          )}`
        );
      } else {
        this._validateSchema(schema.items);
      }
    } else if (schema.type == BSONType.object) {
      if (schema.fields == undefined || schema.fields == null) {
        throw new Error(
          `Schema array field should have 'fields' key: ${JSON.stringify(
            schema
          )}`
        );
      } else {
        Object.keys(schema.fields).forEach((key) =>
          this._validateSchema(schema.fields[key])
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
  static _fieldToBsonType(label, data, schema) {
    switch (schema.type) {
      case BSONType.string:
        return typeof data == "string" ? data : data.toString();
      case BSONType.objectId:
        return new ObjectId(data);
      case BSONType.date:
        return new Date(data);
      case BSONType.timestamp:
        return new Timestamp(data);
      case BSONType.bool:
        return data == true ? true : false;
      case BSONType.int:
        return new Int32(data);
      case BSONType.long:
        return new Long(data);
      case BSONType.double:
        return new Double(data);
      case BSONType.array:
        let data_arr = data
          .filter((e) => e !== undefined || e !== null)
          .map((item) => {
            return Record._fieldToBsonType(label, item, schema.items);
          });
        return Array.isArray(data_arr) ? data_arr : [];
      case BSONType.object:
        const data_obj = Object.keys(data).reduce((obj, key) => {
          if (data[key] !== undefined && data[key] !== null) {
            if (key in schema.fields) {
              obj[key] = Record._fieldToBsonType(
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
        return typeof data_obj === "object" ? data_obj : undefined;
      default:
        console.error(
          `Unsupported field type for Record[${this._name}] field[${label}] : ${schema.type}`
        );
    }
  }
}

class AssetRecord extends Record {
  constructor(data, validateUniqueFn) {
    super("Asset", data, validateUniqueFn);
  }
  getSchema() {
    return {
      type: BSONType.object,
      fields: {
        //Schema Version: 0.4.1
        assetCode: { type: BSONType.string, required: true, unique: true },
        description: { type: BSONType.string },
        serialNumber: { type: BSONType.string },
        parentAssetID: { type: BSONType.objectId },
        modelID: { type: BSONType.objectId },
        manufacturerID: { type: BSONType.objectId },
        manufactureDate: { type: BSONType.date },
        facilityID: { type: BSONType.objectId },
        departmentID: { type: BSONType.objectId },
        locationName: { type: BSONType.string },
        supportTeam: { type: BSONType.string },
        vendorID: { type: BSONType.objectId },
        status: { type: BSONType.string },
        purchaseOrderID: { type: BSONType.objectId },
        acceptanceDate: { type: BSONType.date },
        purchaseCost: { type: BSONType.double },
        comment: { type: BSONType.string },
      },
    };
  }
}

class FacilityRecord extends Record {
  constructor(data) {
    super("Facility", data);
  }
  getSchema() {
    return {
      type: BSONType.object,
      fields: {
        //Schema Version: 0.1.1
        facilityName: { type: BSONType.string, required: true },
        address_1: { type: BSONType.string },
        address_2: { type: BSONType.string },
        city: { type: BSONType.string },
        area: { type: BSONType.string },
        areaCode: { type: BSONType.string },
        country: { type: BSONType.string },
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
      type: BSONType.object,
      fields: {
        //Schema Version: 0.1
        manufacturerName: { type: BSONType.string },
      },
    };
  }
}

class ModelRecord extends Record {
  constructor(data) {
    super("Model", data);
  }
  getSchema() {
    return {
      type: BSONType.object,
      fields: {
        //Schema Version: v0.1
        manufacturerID: { type: BSONType.objectId },
        contactID: { type: BSONType.objectId },
        modelName: { type: BSONType.string },
        commonName: { type: BSONType.string },
        UMDNSCode: { type: BSONType.string },
      },
    };
  }
}

class VendorRecord extends Record {
  constructor(data) {
    super("Vendor", data);
  }
  getSchema() {
    return {
      type: BSONType.object,
      fields: {
        //Schema Version: v0.1
        vendorName: { type: BSONType.string },
        country: { type: BSONType.string },
        area: { type: BSONType.string },
        city: { type: BSONType.string },
        address_1: { type: BSONType.string },
        address_2: { type: BSONType.string },
        areaCode: { type: BSONType.string },
        contactInfo: {
          type: BSONType.array,
          items: {
            type: BSONType.object,
            fields: {
              number: { type: BSONType.string },
              name: { type: BSONType.string },
              email: { type: BSONType.string },
              type: { type: BSONType.string },
            },
          },
        },
        manufacturerList: {
          type: BSONType.array,
          items: {
            type: BSONType.object,
            fields: {
              manufacturer: { type: BSONType.objectId },
            },
          },
        },
      },
    };
  }
}

class DepartmentRecord extends Record {
  constructor(data) {
    super("Department", data);
  }
  getSchema() {
    return {
      type: BSONType.object,
      fields: {
        // Schema Version: v0.1
        facilityID: { type: BSONType.objectId, required: true },
        departmentName: { type: BSONType.string, required: true },
        shortName: { type: BSONType.string, required: true },
      },
    };
  }
}

const _RECORD_BASE = Record;

const _RECORD_LIST = [
  AssetRecord,
  FacilityRecord,
  ManufacturerRecord,
  ModelRecord,
  VendorRecord,
  DepartmentRecord,
];

export {
  _RECORD_BASE,
  _RECORD_LIST,
  AssetRecord,
  FacilityRecord,
  ManufacturerRecord,
  ModelRecord,
  VendorRecord,
  DepartmentRecord,
};
