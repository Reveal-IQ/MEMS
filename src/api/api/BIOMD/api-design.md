# BIOMD Api Reference

## Purpose
The purpose of this document is to outline the public interface for the BIOMD API

## References
-

## Accoronyms & Definitions
-

## API Design

Every Request is sent as a JSON-compliant object. The following is the standard used for sending requests:
```json
{
   "Expiry": 0000,
   "Type": "Request",
   "Request": {
         "Module": "<MODULE>",
         "ServiceCode": "<SERVICE_CODE>",
         "API": "<API_IDENTIFIER>",
         <!-- additional fields-- >
   }
}
```


---
### Create Single Record
- **Identifier**: `CREATE_RECORD`
- **Description**: Creates new record in the specific collection.
- **Inputs**: The record properties according to the agreed upon schema.
- **Outputs**: Generates and returns a unique identifier(UUID) for the created record.
- **Example Request**:
  ```json
  {
      "Expiry": 20000,
      "Type": "REQUEST",
      "Request": {
         "Module": "MEMS",
         "ServiceCode": "BIOMD",
         "API": "CREATE_RECORD",
         "Collection": "manufacturers",
         "Record": {
            "manufacturer_name": "",
            "country": "",
            "area": "",
            "city": "",
            "address_1": "",
            "address_2": "",
            "area_code": ""
         }
      }
   }
   ```
- **Example Response(SUCCESS)**:
  ```json
  {
      "Type": "RESPONSE",
      "Response": {
         "insertID": "<RECORD_UUID>",
         "Success": true,
         "Message": "Created Manufacturer Record"
      }
   }
  ```
- **Example Response(ERROR)**:
  ```json
  {
      "Type": "ERROR",
      "Response": {
         "Error_Code": "API-CREATE_RECORD-E001",
         "Error_Msg": "CREATE_RECORD_API: Failed to execute db query"
      }
   }
  ```

---
### Create Multiple Records
- **Identifier**: `CREATE_RECORDS`
- **Description**: Creates multiple records in the specific collection.
- **Inputs**: A list of record properties according to the agreed upon schema.
- **Outputs**: Generates and returns a unique identifier(UUID) for the created record.
- **Example Request**:
  ```json
  {
      "Expiry": 20000,
      "Type": "REQUEST",
      "Request": {
         "Module": "MEMS",
         "ServiceCode": "BIOMD",
         "API": "CREATE_RECORDS",
         "Collection": "manufacturers",
         "Records": [
               {
               "manufacturer_name": "",
               "country": "",
               "area": "",
               "city": "",
               "address_1": "",
               "address_2": "",
               "area_code": ""
            }
         ]
      }
   }
   ```
- **Example Response(SUCCESS)**:
  ```json
  {
      "Type": "RESPONSE",
      "Response": {
         "ID": [
            "<RECORD_UUID>",
         ],
         "collection": "manufacturers",
         "success": true,
         "message": "Created Records"
      }
   }
  ```
- **Example Response(ERROR)**:
  ```json
  {
      "Type": "ERROR",
      "Response": {
         "Error_Code": "API-CREATE_RECORDS-E001",
         "Error_Msg": "CREATE_RECORDS_API: Failed to execute db query"
      }
   }
  ```

---
### Find Single Record
- **Identifier**: `FIND_RECORD`
- **Description**: Find one or more records in the specific collection.
- **Inputs**: A list of queries using the following schema:
  - `field`: name of field to query for
  - `op`: Operation to perform; should be one of:
    - "eq_id": result should have an identifier specified by `value`
      - NOTE: `field` will be ignored in this operation
    - "eq": result should strictly equal to `value`
    - "sb": result should be a substring (or regex) of `value`
  - `value`: value to match
  - `projection`: [OPTIONAL] A mapping fields that should be returned in the response packet (e.g. Manufacturer_ID: 1).
    - NOTE: If not specified, all fields from the record will be returned.
  - `return_array`: Flag to indicate if the response should be an array
  - `max_list`: Specifies the maximum number of records to return when Return_Array is set to true. Default limit is 5 records
- **Outputs**: Generates and returns a unique identifier(UUID) for the created record.
- **Example Request**:
  ```json
   {
      "Expiry": 20000,
      "Type": "REQUEST",
      "Request": {
         "Module": "MEMS",
         "ServiceCode": "BIOMD",
         "API": " FIND_RECORD",
         "find": {
            "collection": "vendors",
            "queries": [
               {
                  "field": "vendor_name",
                  "op": "eq",
                  "value": "bio vend ltd"
               }
            ],
            "projection": {
               "vendor_name": 1,
               "country": 1
            },
            "return_array": false,
            "max_list": 1
         }
      }
   }
   ```
- **Example Response(SUCCESS)**:
  ```json
   {
      "Type": "RESPONSE",
      "Response": {
         "records": [
            {
               "vendor_name": "bio vend ltd",
               "country": "America"
            }
         ],
         "Success": true,
         "Message": "1 found in vendors"
      }
   }
  ```
- **Example Response(ERROR)**:
  ```json
   {
      "Type": "ERROR",
      "Response": {
         "Error_Code": "API-FIND-E001",
         "Error_Msg": "FIND_API: Failed to execute db query"
      }
   }
  ```



# Appendix

## API Template
- **Identifier**:
- **Description**:
- **Inputs**:.
- **Output**:
- **Example Request**:
  ```json
  ```
- **Example Response(SUCCESS)**:
  ```json
  ```
- **Example Response(ERROR)**:
  ```json
  ```