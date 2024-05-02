<template>
  <Section sectionTitle="Department Description">
    <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 g-3">
      <!-- Department Name -->
      <div class="col-lg-6">
        <Input
          label="Department Name"
          type="text"
          id="departmentName"
          placeholder="Department Name"
          v-model="DepartmentDescription.departmentName"
        />
      </div>

      <!-- Department Number -->
      <div class="col-lg-6">
        <Input
          label="Short Name"
          type="text"
          id="shortName"
          placeholder="Short Name"
          v-model="DepartmentDescription.shortName"
        />
      </div>

      <!-- Facility -->
      <div class="col-lg-6 mb-3">
        <label for="manufacturerList" class="form-label">Facility</label>
        <input
          class="form-control"
          list="manufacturerListOptions"
          id="manufacturerList"
          placeholder="Select Manufacturer"
          aria-label="Default select example"
          v-model="DepartmentDescription.selectedFacility.facilityName"
          @input="fetchFacility"
          autocomplete="off"
        />
        <datalist id="manufacturerListOptions">
          <option
            v-for="facility in facilityList"
            :key="facility.index"
            :value="facility.facilityName"
          ></option>
        </datalist>
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

const DepartmentDescription = inject("DepartmentDescription");
const GlobalDepartmentInformation = inject("GlobalDepartmentInformation");

const facilityList = ref(null);

const fetchFacility = async (event) => {
  try {
    const selectedFacility = event ? event.target.value : "";
    if (
      event &&
      (!(event instanceof InputEvent) ||
        event.inputType === "insertReplacementText")
    ) {
      DepartmentDescription.value.selectedFacility = facilityList.value.find(
        (facility) => {
          return selectedFacility === facility.facilityName;
        }
      );
      GlobalDepartmentInformation.value.facilityID =
        DepartmentDescription.value.selectedFacility._id;
      await fetchDepartment();
    } else {
      GlobalDepartmentInformation.value.facilityID = null;

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
onMounted(() => {
  fetchFacility();
});
</script>

<style lang="scss" scoped>
@import "../Style/BIOMD.scss";
</style>
