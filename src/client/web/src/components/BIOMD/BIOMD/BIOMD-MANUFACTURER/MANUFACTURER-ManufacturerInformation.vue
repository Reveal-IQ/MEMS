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
            v-model="manufacturerName"
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
            v-model="manufacturerInfo.country"
            @input="fetchCountry()"
            @change="fetchState()"
            autocomplete="off"
          />
          <datalist id="countryOptions">
            <option
              v-for="country in countryList"
              :key="country.index"
              :value="country.Loci_Code_Country"
            >
              {{ country.Loci_Name_Country }}
            </option>
          </datalist>
        </div>

        <!-- Province/State/Region -->
        <div class="col">
          <label for="stateList" class="form-label">State</label>
          <input
            class="form-control"
            list="stateOptions"
            id="stateList"
            placeholder="Type to search..."
            v-model="manufacturerInfo.state"
            @input="fetchState()"
            autocomplete="off"
          />
          <datalist id="stateOptions">
            <option
              v-for="state in stateList"
              :key="state.index"
              :value="state.Loci_Code_State"
            >
              {{ state.Loci_Name_State }}
            </option>
          </datalist>
        </div>

        <!-- City/District -->
        <div class="col">
          <label for="cityList" class="form-label">City/District</label>
          <select
            id="cityList"
            class="form-select"
            aria-label="Default select example"
            v-model="city"
          >
            <option selected disabled>Choose a City</option>
            <option v-for="name in cityList" :key="name">
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
            v-model="streetAddress1"
            id="street1"
            placeholder="Enter Street Address 1"
          />
        </div>
        <!-- Street Address 2 -->
        <div class="col-12">
          <Input
            label="Street Address 2"
            type="text"
            v-model="streetAddress2"
            id="street2"
            placeholder="Enter Street Address 2"
          />
        </div>
        <!-- Zip / Postal Code -->
        <div class="col-lg-3">
          <Input
            label="Zip/Postal Code"
            type="number"
            v-model="zipCode"
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
const countryList = ref(null);
const stateList = ref(null);
// const districtList = ref(null);
const sendSocketReq = (request) => {
  store.dispatch("sendSocketReq", request);
};
function fetchCountry() {
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
  // console.log(data.Request);
}
function fetchState() {
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
          Loci_Code_Country: manufacturerInfo.value.country,
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
onMounted(() => {
  fetchCountry();
});
</script>

<style lang="scss" scoped>
@import "../Style/BIOMD.scss";
</style>
