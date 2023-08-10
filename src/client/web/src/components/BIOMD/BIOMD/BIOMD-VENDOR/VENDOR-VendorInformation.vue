<template>
  <main>
    <!-- The main form -->
    <Section sectionTitle="Vendor Information">
      <!-- Vendor Name -->
      <div class="col-lg-6">
        <label for="vendorName" class="form-label">Vendor Name</label>
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            id="vendorName"
            aria-describedby="basic-addon3"
            placeholder="Enter Vendor Name"
            v-model="vendorInfo.vendorName"
          />
        </div>
      </div>
      <!-- Country -->
      <div class="col-lg-6">
        <label for="countryList" class="form-label">Country</label>
        <input
          class="form-control mb-3"
          list="countryOptions"
          id="countryList"
          placeholder="Type to search..."
          v-model="vendorInfo.selectedCountry.Loci_Name_Country"
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

      <div class="col-lg-6">
        <label for="stateList" class="form-label">Province/State/Region</label>
        <input
          class="form-control mb-3"
          list="stateOptions"
          id="stateList"
          placeholder="Type to search..."
          v-model="vendorInfo.selectedState.Loci_Name_State"
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
      <div class="col-lg-6">
        <label for="districtList" class="form-label">District</label>
        <input
          class="form-control mb-3"
          list="districtOptions"
          id="districtList"
          placeholder="Type to search..."
          v-model="vendorInfo.selectedDistrict.Loci_Name_Area_L1"
          @input="fetchDistrict"
          autocomplete="off"
        />
        <datalist id="districtOptions">
          <option
            v-for="district in districtList"
            :key="district.index"
            :value="district.Loci_Name_Area_L1"
          ></option>
        </datalist>
      </div>
      <div class="col-lg-6">
        <Input
          label="Street Address 1"
          type="text"
          id="street1"
          placeholder="Enter Street Address 1"
          v-model="vendorInfo.streetAddress1"
        />
      </div>
      <!-- Street Address 2 -->
      <div class="col-lg-6">
        <Input
          label="Street Address 2"
          type="text"
          id="street2"
          placeholder="Enter Street Address 2"
          v-model="vendorInfo.streetAddress2"
        />
      </div>
      <!-- Zip / Postal Code -->
      <div class="col-lg-6">
        <Input
          label="Zip/Postal Code"
          type="number"
          id="zip"
          placeholder="Enter Zip/Postal Code"
          v-model="vendorInfo.zipCode"
        />
      </div>
    </Section>
  </main>
</template>

<script setup>
import { inject, ref, onMounted } from "vue";
import { useStore } from "vuex";
import Input from "../BIOMD-UI/UI-Input.vue";
import Section from "../BIOMD-UI/UI-Section.vue";
const store = useStore();
const vendorInfo = inject("vendorInfo");
const Global_Vendor_Definition = inject("Global_Vendor_Definition");
const countryList = ref(null);
const stateList = ref(null);
const districtList = ref(null);
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
      vendorInfo.value.selectedCountry = countryList.value.find((country) => {
        return selectedCountry === country.Loci_Name_Country;
      });
      Global_Vendor_Definition.value.vendorAddress.Country =
        vendorInfo.value.selectedCountry.Loci_Code_Country;
      // validateInput("Country");
      await fetchState();
    } else {
      // Clear Country, State, District, Mandal, Postal Code
      Global_Vendor_Definition.value.vendorAddress.Country = null;
      Global_Vendor_Definition.value.vendorAddress.State = null;
      vendorInfo.value.selectedState = {
        Loci_Name_Country: null,
        Loci_Code_Country: null,
      };
      Global_Vendor_Definition.value.vendorAddress.District = null;
      vendorInfo.value.selectedDistrict = {
        Loci_Name_Area_L1: null,
        Loci_Code_Area_L1: null,
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
      vendorInfo.value.selectedState = stateList.value.find((state) => {
        return selectedState === state.Loci_Name_State;
      });
      Global_Vendor_Definition.value.vendorAddress.State =
        vendorInfo.value.selectedState.Loci_Code_State;
      // validateInput("Country");
      await fetchDistrict();
    } else {
      // Clear Country, State, District, Mandal, Postal Code
      Global_Vendor_Definition.value.vendorAddress.State = null;
      Global_Vendor_Definition.value.vendorAddress.District = null;
      vendorInfo.value.selectedDistrict = {
        Loci_Name_Area_L1: null,
        Loci_Code_Area_L1: null,
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
                Global_Vendor_Definition.value.vendorAddress.Country,
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

const fetchDistrict = async (event) => {
  try {
    const selectedDistrict = event ? event.target.value : "";
    if (
      event &&
      (!(event instanceof InputEvent) ||
        event.inputType === "insertReplacementText")
    ) {
      // determine if the value is in the datalist. If so, someone selected a value in the list!
      vendorInfo.value.selectedDistrict = districtList.value.find((state) => {
        return selectedDistrict === state.Loci_Name_Area_L1;
      });
      Global_Vendor_Definition.value.vendorAddress.District =
        vendorInfo.value.selectedDistrict.Loci_Code_Area_L1;
      // validateInput("Country");
      // await fetchState();
    } else {
      // Clear Country, State, District, Mandal, Postal Code
      Global_Vendor_Definition.value.vendorAddress.District = null;
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
              Type_Code: "ARL1",
              Loci_Code_Country:
                Global_Vendor_Definition.value.vendorAddress.Country,
              Loci_Code_State:
                Global_Vendor_Definition.value.vendorAddress.State,
              Loci_Name_District: "",
            },
          },
        },
        callback: (res) => {
          if (res.Type === "RESPONSE") {
            console.log("Response Packet -->", res.Response);
            districtList.value = res.Response.ARL1_List; //Assigning response values to getValues Object
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
