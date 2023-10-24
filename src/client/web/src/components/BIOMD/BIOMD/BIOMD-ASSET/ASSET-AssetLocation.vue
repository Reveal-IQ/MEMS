<template>
  <Section sectionTitle="Asset Location">
    <!-- Facility -->
    <div class="col-lg-6 mb-3">
      <label for="facilityList" class="form-label">Facility</label>
      <input
        class="form-control"
        list="facilityListOptions"
        id="facilityList"
        placeholder="Select facility"
        aria-label="Default select example"
        v-model="AssetLocation.selectedFacility.facilityName"
        @input="fetchFacility"
        autocomplete="off"
      />
      <datalist id="facilityListOptions">
        <option
          v-for="facility in facilityList"
          :key="facility.index"
          :value="facility.facilityName"
        ></option>
      </datalist>
    </div>

    <!-- Department -->
    <div class="col-lg-6 mb-3">
      <label for="departmentList" class="form-label">Department</label>
      <input
        class="form-control"
        list="departmentListOptions"
        id="departmentList"
        placeholder="Select department"
        aria-label="Default select example"
        v-model="AssetLocation.selectedDepartment.name"
        @input="fetchDepartment"
        autocomplete="off"
      />
      <datalist id="departmentListOptions">
        <option
          v-for="department in departmentList"
          :key="department.index"
          :value="department.name"
        ></option>
      </datalist>
    </div>

    <!-- Location -->
    <div class="col-lg-6 mb-3">
      <Input
        class="form-control"
        id="locationName"
        label="locationName"
        placeholder="Enter Location"
        aria-label="Default select example"
        v-model="AssetLocation.locationName"
        autocomplete="off"
      />
    </div>
  </Section>
</template>

<script setup>
import { ref, inject, onMounted } from "vue";
import { useStore } from "vuex";

import Section from "../BIOMD-UI/UI-Section.vue";
import Input from "../BIOMD-UI/UI-Input.vue";

const store = useStore();
const sendSocketReq = (request) => {
  store.dispatch("sendSocketReq", request);
};

const facilityList = ref(null);
const departmentList = ref(null);

const AssetLocation = inject("AssetLocation");
const GlobalAssetInformation = inject("GlobalAssetInformation");

const fetchFacility = async (event) => {
  try {
    const selectedFacility = event ? event.target.value : "";
    if (
      event &&
      (!(event instanceof InputEvent) ||
        event.inputType === "insertReplacementText")
    ) {
      AssetLocation.value.selectedFacility = facilityList.value.find(
        (facility) => {
          return selectedFacility === facility.facilityName;
        }
      );
      GlobalAssetInformation.value.facilityID =
        AssetLocation.value.selectedFacility._id;
      await fetchDepartment();
    } else {
      GlobalAssetInformation.value.facilityID = null;

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
                  field: "facilityName",
                  op: "sb",
                  value: "^",
                },
              ],
              projection: {
                _id: 1,
                facilityName: 1,
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

const fetchDepartment = async (event) => {
  try {
    const selectedDepartment = event ? event.target.value : "";
    if (
      event &&
      (!(event instanceof InputEvent) ||
        event.inputType === "insertReplacementText")
    ) {
      AssetLocation.value.selectedDepartment = departmentList.value.find(
        (department) => {
          return selectedDepartment === department.name;
        }
      );
      GlobalAssetInformation.value.departmentID =
        AssetLocation.value.selectedDepartment.shortName;
    } else {
      GlobalAssetInformation.value.departmentID = null;

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
              collection: "Department",
              queries: [
                {
                  field: "facilityID",
                  op: "sb",
                  value: GlobalAssetInformation.value.facilityID,
                },
              ],
              projection: {
                _id: 1,
                facilityID: 1,
                name: 1,
                shortName: 1,
              },
            },
          },
        },
        callback: (res) => {
          if (res.Type === "RESPONSE") {
            // Console the Response Packet
            console.log("Response Packet -->", res.Response);
            departmentList.value = res.Response.records;
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

onMounted(() => {
  fetchFacility();
});
</script>

<style lang="scss" scoped>
@import "../../BIOMD/Style/BIOMD.scss";
</style>
