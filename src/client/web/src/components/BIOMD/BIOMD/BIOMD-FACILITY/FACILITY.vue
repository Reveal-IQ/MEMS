<template>
  <div class="container">
    <div class="d-flex flex-row justify-content-between">
      <button @click="goBack" class="col-2 btn btn-secondary my-3">Back</button>
    </div>
    <Header
      title="Create New Facility"
      subTitle="Enter all details required for this medical facility"
    />

    <main>
      <FacilityInformation />

      <div class="d-flex justify-content-center py-3">
        <div class="">
          <Btn
            BtnName="Create Asset"
            backgroundColor="#27AE60"
            class="mb-3"
            @click="createRecord"
          />

          <Btn BtnName="Clear Content" />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useStore } from "vuex";

import FacilityInformation from "../BIOMD-FACILITY/FACILITY-FacilityInformation.vue";

import Header from "../BIOMD-UI/UI-FormHeader.vue";
import Btn from "../BIOMD-UI/UI-Btn.vue";

const store = useStore();

// API Call
async function createRecord() {
  var sendSocketReq = {
    Expiry: 20000,
    Type: "REQUEST",
    Request: {
      Module: "MEMS",
      ServiceCode: "BIOMD",
      API: "CREATE_RECORD",
    },
  };
  let res = await store.dispatch("sendHTTPReq", sendSocketReq);
  if (res.Type === "REQUEST") {
    console.log("API Success...");
  } else {
    console.log("Something Went Wrong");
  }
}

const emit = defineEmits(["updatePage"]);

const goBack = () => {
  emit("updatePage", "landing");
};
</script>

<style lang="scss" scoped></style>
