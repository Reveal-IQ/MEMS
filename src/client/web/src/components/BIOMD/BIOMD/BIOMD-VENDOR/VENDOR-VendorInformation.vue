<template>
  <main>
    <!-- The main form -->
    <Section sectionTitle="Vendor Information">
      <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 g-3">
        <!-- Vendor Name -->
        <div class="col">
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
        <div class="col">
          <label for="countryList" class="form-label">Country</label>
          <input
            class="form-control"
            list="countryOptions"
            id="countryList"
            placeholder="Type to search..."
            v-model="vendorInfo.country"
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
          <label for="stateList" class="form-label"
            >Province/State/Region</label
          >
          <input
            class="form-control"
            list="stateOptions"
            id="stateList"
            placeholder="Type to search..."
            v-model="vendorInfo.state"
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
          <div class="select-group mb-3">
            <select
              type="text"
              class="form-select"
              id="cityList"
              aria-describedby="basic-addon3"
              placeholder="Select country"
              v-model="vendorInfo.city"
            >
              <option selected>Select city/district</option>
              <option v-for="name in cityList" :key="name">
                {{ name }}
              </option>
            </select>
          </div>
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
            v-model="vendorInfo.streetAddress1"
          />
        </div>
        <!-- Street Address 2 -->
        <div class="col-12">
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
        <!-- Site ID -->
        <div class="col-6">
          <Input
            label="Site Id"
            type="text"
            id="siteId"
            placeholder="Enter Site ID"
          />
        </div>
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
const countryList = ref(null);
const stateList = ref(null);
// const cityList = ref(["Accra", "Montreal", "Los Angeles"]);
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
          Loci_Code_Country: vendorInfo.value.country,
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
