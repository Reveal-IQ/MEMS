<template>
  <main>
    <Section sectionTitle="Facility Information">
      <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 g-3">
        <!-- Facility Name -->
        <div class="col">
          <Input
            label="Facility Name"
            type="text"
            id="facilityName"
            placeholder="Enter Facility Name"
            v-model="facilityInfo.facilityName"
          />
        </div>
        <!-- Country -->
        <div class="col">
          <label for="countryList" class="form-label">Country</label>
          <input
            class="form-control"
            list="countryOptions"
            id="countryList"
            placeholder="Type to search..."
            v-model="facilityInfo.selectedCountry.Loci_Name_Country"
            @input="fetchCountry"
            autocomplete="off"
          />
          <datalist id="countryOptions">
            <option
              v-for="country in countryList"
              :key="country.index"
              :value="country.Loci_Name_Country"
            ></option>
          </datalist>
        </div>
        <!-- Province/State/Region -->
        <div class="col">
          <label for="stateList" class="form-label"
            >Province/State/Region</label
          >
          <input
            class="form-control"
            list="stateOptions"
            id="stateList"
            placeholder="Type to search..."
            v-model="facilityInfo.selectedState.Loci_Name_State"
            @input="fetchState"
            autocomplete="off"
          />
          <datalist id="stateOptions">
            <option
              v-for="state in stateList"
              :key="state.index"
              :value="state.Loci_Name_State"
            ></option>
          </datalist>
        </div>
        <!-- City/District -->
        <div class="col">
          <label for="cityList" class="form-label">City/District</label>
          <select
            id="cityList"
            class="form-select"
            aria-label="Default select example"
            v-model="facilityInfo.city"
          >
            <option selected>Choose a City</option>
            <option v-for="name in cityList" :key="name" :value="name">
              {{ name }}
            </option>
          </select>
        </div>
      </div>
      <div class="row g-3 mt-3">
        <!-- Street Address 1 -->
        <div class="col-12">
          <Input
            label="Street Address 1"
            type="text"
            id="street1"
            placeholder="Enter Street Address 1"
            v-model="facilityInfo.streetAddress1"
          />
        </div>
        <!-- Street Address 2 -->
        <div class="col-12">
          <Input
            label="Street Address 2"
            type="text"
            id="street2"
            placeholder="Enter Street Address 2"
            v-model="facilityInfo.streetAddress2"
          />
        </div>
        <!-- Zip / Postal Code -->
        <div class="col-lg-3">
          <Input
            label="Zip/Postal Code"
            type="number"
            id="zip"
            placeholder="Enter Zip/Postal Code"
            v-model="facilityInfo.zipCode"
          />
        </div>

        <!-- GPS Coordinates -->
        <div class="col-lg-6">
          <Input
            label="GPS Coordinates"
            type="text"
            id="gps"
            placeholder="Select GPS Coordinates"
          />
        </div>

        <div class="col-lg-3 align-self-center g-3">
          <Btn2
            BtnName="Generate GPS Coordinates"
            :icon="'globe'"
            class="rounded-pill"
          />
        </div>

        <!-- Department List -->
        <div class="col-12">
          <Input
            label="Department"
            type="text"
            id="departmentTag"
            placeholder="Add Department Tag"
            v-model="facilityInfo.departments"
          />
        </div>
      </div>
    </Section>
  </main>
</template>

<script setup>
import { ref, inject, onMounted } from "vue";
import { useStore } from "vuex";
import Btn2 from "../BIOMD-UI/UI-Btn2.vue";
import Input from "../BIOMD-UI/UI-Input.vue";
import Section from "../BIOMD-UI/UI-Section.vue";
const store = useStore();
const facilityInfo = inject("facilityInfo");
const Global_Facility_Definition = inject("Global_Facility_Definition");
const countryList = ref(null);
const stateList = ref(["Greater Accra", "Quebec", "California"]);
const cityList = ref(["Accra", "Montreal", "Los Angeles"]);
const sendSocketReq = (request) => {
  store.dispatch("sendSocketReq", request);
};
const fetchCountry = async (event) => {
  try {
    const selectedCountry = event ? event.target.value : "";
    if (
      event &&
      (!(event instanceof InputEvent) ||
        event.inputType === "insertReplacementText")
    ) {
      // determine if the value is in the datalist. If so, someone selected a value in the list!
      facilityInfo.value.selectedCountry = countryList.value.find((country) => {
        return selectedCountry === country.Loci_Name_Country;
      });
      Global_Facility_Definition.value.facilityAddress.Country =
        facilityInfo.value.selectedCountry.Loci_Code_Country;
      // validateInput("Country");
      await fetchState();
    } else {
      // Clear Country, State, District, Mandal, Postal Code
      Global_Facility_Definition.value.facilityAddress.Country = null;
      Global_Facility_Definition.value.facilityAddress.State = null;
      facilityInfo.value.selectedState = {
        Loci_Name_Country: null,
        Loci_Code_Country: null,
      };
      Global_Facility_Definition.value.facilityAddress.District = null;
      facilityInfo.value.selectedDistrict = {
        Loci_Name_Country: null,
        Loci_Code_Country: null,
      };
      sendSocketReq({
        data: {
          Expiry: 20000,
          Type: "REQUEST",
          Request: {
            Module: "GLOBAL",
            ServiceCode: "GLOBL",
            API: "GET_GEO_LIST",
            Max_List: 500,
            Criteria: {
              Type_Code: "CNTY",
              Loci_Name_Country: "",
            },
          },
        },
        callback: (res) => {
          if (res.Type === "RESPONSE") {
            console.log("Response Packet -->", res.Response);
            countryList.value = res.Response.Country_List; //Assigning response values to getValues Object
          } else if (res.Type === "ERROR") {
            // Error response received during fetching
            Type: "ERROR";
            Response: {
              Error_Code: "API-GET_GEO_LIST-E001";
              Error_Msg: "GET_GEO_LIST_API: Failed to execute query";
            }
          }
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};
const fetchState = async (event) => {
  try {
    const selectedState = event ? event.target.value : "";
    if (
      event &&
      (!(event instanceof InputEvent) ||
        event.inputType === "insertReplacementText")
    ) {
      // determine if the value is in the datalist. If so, someone selected a value in the list!
      facilityInfo.value.selectedState = stateList.value.find((state) => {
        return selectedState === state.Loci_Name_State;
      });
      Global_Facility_Definition.value.facilityAddress.State =
        facilityInfo.value.selectedState.Loci_Code_State;
      // validateInput("Country");
      // await fetchState();
    } else {
      // Clear Country, State, District, Mandal, Postal Code
      Global_Facility_Definition.value.facilityAddress.State = null;
      Global_Facility_Definition.value.facilityAddress.District = null;
      facilityInfo.value.selectedDistrict = {
        Loci_Name_Country: null,
        Loci_Code_Country: null,
      };
      sendSocketReq({
        data: {
          Expiry: 20000,
          Type: "REQUEST",
          Request: {
            Module: "GLOBAL",
            ServiceCode: "GLOBL",
            API: "GET_GEO_LIST",
            Max_List: 500,
            Criteria: {
              Type_Code: "STATE",
              Loci_Code_Country:
                Global_Facility_Definition.value.facilityAddress.Country,
              Loci_Name_State: "",
            },
          },
        },
        callback: (res) => {
          if (res.Type === "RESPONSE") {
            console.log("Response Packet -->", res.Response);
            stateList.value = res.Response.State_List; //Assigning response values to getValues Object
          } else if (res.Type === "ERROR") {
            // Error response received during fetching
            Type: "ERROR";
            Response: {
              Error_Code: "API-GET_GEO_LIST-E001";
              Error_Msg: "GET_GEO_LIST_API: Failed to execute query";
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
  fetchCountry();
});
</script>

<style lang="scss" scoped>
@import "../Style/BIOMD.scss";
</style>
