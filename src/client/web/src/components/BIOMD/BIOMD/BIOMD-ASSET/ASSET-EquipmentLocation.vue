<template>
  <Section sectionTitle="Equipment Location">
    <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 g-3">
      <!-- Facility -->
      <div class="col-lg-6 mb-3">
        <label for="facilityList" class="form-label">facility</label>
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
        <select
          id="regionList"
          class="form-select"
          aria-label="Default select example"
          v-model="region"
        >
          <option selected>Select Region</option>
        </select>
      </div>
      <!-- District -->
      <div class="col-lg-4 mb-3">
        <label for="districtList" class="form-label">District</label>
        <select
          id="districtList"
          class="form-select"
          aria-label="Default select example"
          v-model="district"
        >
          <option selected>Select District</option>
        </select>
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
          v-model="location"
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

const EquipmentLocation = inject("EquipmentLocation");
const Global_Asset_Information = inject("Global_Asset_Information");
const departmentId = inject("departmentId");
const region = inject("region");
const district = inject("district");
const location = inject("location");

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
      // await fetchModel();
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
