<template>
  <Section sectionTitle="Equipment Location">
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
    <!-- Department -->
    <div class="col-lg-6 mb-3">
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
    <div class="col-lg-6 mb-3">
      <UITagInput
        v-model="EquipmentLocation.location"
        label="Location"
        customDelimiter=","
        placeholder="Enter Location Tag"
      />
    </div>
  </Section>
</template>

<script setup>
import { ref, inject, onMounted } from "vue";
import { useStore } from "vuex";

import Section from "../BIOMD-UI/UI-Section.vue";
import UITagInput from "../BIOMD-UI/UI-TagInput.vue";

const store = useStore();
const sendSocketReq = (request) => {
  store.dispatch("sendSocketReq", request);
};

const facilityList = ref(null);

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

onMounted(() => {
  fetchFacility();
});
</script>

<style lang="scss" scoped>
@import "../../BIOMD/Style/BIOMD.scss";
</style>
