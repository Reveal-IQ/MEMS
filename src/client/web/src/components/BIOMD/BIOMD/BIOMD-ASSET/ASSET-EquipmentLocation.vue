<template>
  <Section sectionTitle="Equipment Location">
    <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 g-3">
      <!-- Facility -->
      <div class="col-lg-6 mb-3">
        <label for="facilityList" class="form-label">Facility</label>
        <input
          class="form-control"
          list="facilityListOptions"
          id="facilityList"
          placeholder="Select facility"
          aria-label="Default select example"
          v-model="EquipmentLocation.selectedFacility.facility_name"
          @input="fetchFacility"
          autocomplete="off"
        />
        <datalist id="facilityListOptions">
          <option
            v-for="facility in facilityList"
            :key="facility.index"
            :value="facility.facility_name"
          ></option>
        </datalist>
      </div>
      <!-- Region -->
      <div class="col-lg-6 mb-3">
        <label for="regionList" class="form-label">Region</label>
        <input
          class="form-control"
          list="regionListOptions"
          id="regionList"
          placeholder="Select region"
          aria-label="Default select example"
          v-model="EquipmentLocation.selectedRegion.area"
          @input="fetchRegion"
          autocomplete="off"
        />
        <datalist id="regionListOptions">
          <option
            v-for="region in regionList"
            :key="region.index"
            :value="region.area"
          ></option>
        </datalist>
      </div>
      <!-- District -->
      <div class="col-lg-4 mb-3">
        <label for="districtList" class="form-label">District</label>
        <input
          class="form-control"
          list="districtListOptions"
          id="districtList"
          placeholder="Select district"
          aria-label="Default select example"
          v-model="EquipmentLocation.selectedDistrict.city"
          @input="fetchDistrict"
          autocomplete="off"
        />
        <datalist id="rdistrictListOptions">
          <option
            v-for="district in districtList"
            :key="district.index"
            :value="district.city"
          ></option>
        </datalist>
      </div>
      <!-- Department -->
      <div class="col-lg-4 mb-3">
        <label for="departmentList" class="form-label">Department</label>
        <select
          id="departmentList"
          class="form-select"
          aria-label="Default select example"
          v-model="departmentId"
        >
          <option selected>Select Department</option>
        </select>
      </div>
      <!-- Location -->
      <div class="col-lg-4">
        <Input
          label="Location"
          type="text"
          id="locationTag"
          placeholder="Add Location Tag"
          v-model="EquipmentLocation.location"
        />
      </div>
    </div>
  </Section>
</template>

<script setup>
import { ref, inject, onMounted } from "vue";
import { useStore } from "vuex";
import Input from "../BIOMD-UI/UI-Input.vue";
import Section from "../BIOMD-UI/UI-Section.vue";

const store = useStore();
const sendSocketReq = (request) => {
  store.dispatch("sendSocketReq", request);
};

const facilityList = ref(null);
const regionList = ref(null);
const districtList = ref(null);

const EquipmentLocation = inject("EquipmentLocation");
const Global_Asset_Information = inject("Global_Asset_Information");
const departmentId = inject("departmentId");

const fetchFacility = async (event) => {
  try {
    const selectedFacility = event ? event.target.value : "";
    if (
      event &&
      (!(event instanceof InputEvent) ||
        event.inputType === "insertReplacementText")
    ) {
      EquipmentLocation.value.selectedFacility = facilityList.value.find(
        (facility) => {
          return selectedFacility === facility.facility_name;
        }
      );
      Global_Asset_Information.value.facilityId =
        EquipmentLocation.value.selectedFacility._id;
      await fetchRegion();
    } else {
      Global_Asset_Information.value.facilityId = null;

      sendSocketReq({
        data: {
          Expiry: 20000,
          Type: "REQUEST",
          Request: {
            Module: "MEMS",
            ServiceCode: "BIOMD",
            API: "FIND_RECORD",
            return_array: true,
            max_list: 100,
            find: {
              collection: "Facility",
              queries: [
                {
                  field: "facility_name",
                  op: "sb",
                  value: "^",
                },
              ],
              projection: {
                _id: 1,
                facility_name: 1,
                country: 1,
                area: 1,
                city: 1,
              },
            },
          },
        },
        callback: (res) => {
          if (res.Type === "RESPONSE") {
            // Console the Response Packet
            console.log("Response Packet -->", res.Response);
            facilityList.value = res.Response.records;
          } else if (res.Type === "ERROR") {
            // Error response received during fetching
            Type: "ERROR";
            Response: {
              Error_Code: "API-CREATE_RECORD-E001";
              Error_Msg: "CREATE_RECORD_API: Failed to execute query";
            }
          }
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const fetchRegion = async (event) => {
  try {
    const selectedRegion = event ? event.target.value : "";
    if (
      event &&
      (!(event instanceof InputEvent) ||
        event.inputType === "insertReplacementText")
    ) {
      EquipmentLocation.value.selectedRegion = regionList.value.find(
        (region) => {
          return selectedRegion === region.area;
        }
      );
      Global_Asset_Information.value.region =
        EquipmentLocation.value.selectedRegion.area;
      // await fetchDistrict();
    } else {
      Global_Asset_Information.value.region = null;

      sendSocketReq({
        data: {
          Expiry: 20000,
          Type: "REQUEST",
          Request: {
            Module: "MEMS",
            ServiceCode: "BIOMD",
            API: "FIND_RECORD",
            return_array: true,
            max_list: 100,
            find: {
              collection: "Facility",
              queries: [
                {
                  field: "facility_name",
                  op: "sb",
                  value: Global_Asset_Information.value.facilityId,
                },
              ],
              projection: {
                _id: 0,
                area: 1,
              },
            },
          },
        },
        callback: (res) => {
          if (res.Type === "RESPONSE") {
            // Console the Response Packet
            console.log("Response Packet -->", res.Response);
            regionList.value = res.Response.records;
          } else if (res.Type === "ERROR") {
            // Error response received during fetching
            Type: "ERROR";
            Response: {
              Error_Code: "API-CREATE_RECORD-E001";
              Error_Msg: "CREATE_RECORD_API: Failed to execute query";
            }
          }
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// const fetchDistrict = async (event) => {
//   try {
//     const selectedDistrict = event ? event.target.value : "";
//     if (
//       event &&
//       (!(event instanceof InputEvent) ||
//         event.inputType === "insertReplacementText")
//     ) {
//       EquipmentLocation.value.selectedDistrict = districtList.value.find(
//         (district) => {
//           return selectedDistrict === district.city;
//         }
//       );
//       Global_Asset_Information.value.district =
//         EquipmentLocation.value.selectedDistrict.city;
//       // await fetchModel();
//     } else {
//       Global_Asset_Information.value.district = null;

//       sendSocketReq({
//         data: {
//           Expiry: 20000,
//           Type: "REQUEST",
//           Request: {
//             Module: "MEMS",
//             ServiceCode: "BIOMD",
//             API: "FIND_RECORD",
//             return_array: true,
//             max_list: 100,
//             find: {
//               collection: "Facility",
//               queries: [
//                 {
//                   field: "city",
//                   op: "sb",
//                   value: "^",
//                 },
//               ],
//               projection: {
//                 _id: 0,
//                 facility_name: 0,
//                 country: 0,
//                 area: 0,
//                 city: 1,
//               },
//             },
//           },
//         },
//         callback: (res) => {
//           if (res.Type === "RESPONSE") {
//             // Console the Response Packet
//             console.log("Response Packet -->", res.Response);
//             districtList.value = res.Response.records;
//           } else if (res.Type === "ERROR") {
//             // Error response received during fetching
//             Type: "ERROR";
//             Response: {
//               Error_Code: "API-CREATE_RECORD-E001";
//               Error_Msg: "CREATE_RECORD_API: Failed to execute query";
//             }
//           }
//         },
//       });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

onMounted(() => {
  fetchFacility();
});
</script>

<style lang="scss" scoped>
@import "../../BIOMD/Style/BIOMD.scss";
</style>
