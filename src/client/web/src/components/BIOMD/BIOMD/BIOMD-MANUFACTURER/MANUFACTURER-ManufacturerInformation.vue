<template>
  <main>
    <!-- The main form -->
    <Section sectionTitle="Manufacturer Information">
      <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 g-3">
        <!-- Manufacturer Name -->
        <div class="col">
          <Input
            label="Manufacturer Name"
            type="text"
            v-model="manufacturerInfo.manufacturerName"
            id="manufacturerName"
            placeholder="Enter Manufacturer Name"
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
            v-model="manufacturerInfo.selectedCountry.Loci_Name_Country"
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
            v-model="manufacturerInfo.selectedState.Loci_Name_State"
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
          <label for="districtList" class="form-label">District</label>
          <input
            class="form-control"
            list="districtOptions"
            id="districtList"
            placeholder="Type to search..."
            v-model="manufacturerInfo.selectedDistrict.Loci_Name_Area_L1"
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
      </div>
      <div class="row g-3 mt-3">
        <!-- Street Address 1 -->
        <div class="col-12">
          <Input
            label="Street Address 1"
            type="text"
            v-model="manufacturerInfo.streetAddress1"
            id="street1"
            placeholder="Enter Street Address 1"
          />
        </div>
        <!-- Street Address 2 -->
        <div class="col-12">
          <Input
            label="Street Address 2"
            type="text"
            v-model="manufacturerInfo.streetAddress2"
            id="street2"
            placeholder="Enter Street Address 2"
          />
        </div>
        <!-- Zip / Postal Code -->
        <div class="col-lg-3">
          <Input
            label="Zip/Postal Code"
            type="number"
            v-model="manufacturerInfo.zipCode"
            id="zip"
            placeholder="Enter Zip/Postal Code"
          />
        </div>
      </div>
    </Section>
  </main>
</template>

<script setup>
import { inject, ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import Input from "../BIOMD-UI/UI-Input.vue";
import Section from "../BIOMD-UI/UI-Section.vue";
const store = useStore();
const manufacturerInfo = inject("manufacturerInfo");
const Global_Manufacturer_Definition = inject("Global_Manufacturer_Definition");
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
      manufacturerInfo.value.selectedCountry = countryList.value.find(
        (country) => {
          return selectedCountry === country.Loci_Name_Country;
        }
      );
      Global_Manufacturer_Definition.value.manufacturerAddress.Country =
        manufacturerInfo.value.selectedCountry.Loci_Code_Country;
      // validateInput("Country");
      await fetchState();
    } else {
      // Clear Country, State, District, Mandal, Postal Code
      Global_Manufacturer_Definition.value.manufacturerAddress.Country = null;
      Global_Manufacturer_Definition.value.manufacturerAddress.State = null;
      manufacturerInfo.value.selectedState = {
        Loci_Name_Country: null,
        Loci_Code_Country: null,
      };
      Global_Manufacturer_Definition.value.manufacturerAddress.District = null;
      manufacturerInfo.value.selectedDistrict = {
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
      manufacturerInfo.value.selectedState = stateList.value.find((state) => {
        return selectedState === state.Loci_Name_State;
      });
      Global_Manufacturer_Definition.value.manufacturerAddress.State =
        manufacturerInfo.value.selectedState.Loci_Code_State;
      // validateInput("Country");
      await fetchDistrict();
    } else {
      // Clear Country, State, District, Mandal, Postal Code
      Global_Manufacturer_Definition.value.manufacturerAddress.State = null;
      Global_Manufacturer_Definition.value.manufacturerAddress.District = null;
      manufacturerInfo.value.selectedDistrict = {
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
                Global_Manufacturer_Definition.value.manufacturerAddress
                  .Country,
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
      manufacturerInfo.value.selectedDistrict = districtList.value.find(
        (state) => {
          return selectedDistrict === state.Loci_Name_Area_L1;
        }
      );
      Global_Manufacturer_Definition.value.manufacturerAddress.District =
        manufacturerInfo.value.selectedDistrict.Loci_Code_Area_L1;
      // validateInput("Country");
      // await fetchState();
    } else {
      // Clear Country, State, District, Mandal, Postal Code
      Global_Manufacturer_Definition.value.manufacturerAddress.District = null;
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
                Global_Manufacturer_Definition.value.manufacturerAddress
                  .Country,
              Loci_Code_State:
                Global_Manufacturer_Definition.value.manufacturerAddress.State,
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
