<template>
  <Section sectionTitle="Vendor Support">
    <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 g-3">
      <!-- Vendor Site ID -->
      <div class="col-lg-4">
        <label for="vendorSite" class="form-label">Vendor Site ID</label>
        <select
          class="form-select mb-3"
          aria-label="Default select example"
          id="vendorSite"
        >
          <option selected>Select Vendor Site</option>
        </select>
      </div>
      <!-- Personnel Assigned -->
      <div class="col-lg-8">
        <label for="personnelList" class="form-label">Personnel Assigned</label>
        <select
          class="form-select mb-3"
          aria-label="Default select example"
          id="personnelList"
        >
          <option selected>Open this select menu</option>
        </select>
      </div>
    </div>

    <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 g-3">
      <div class="col">
        <!-- <Btn
          BtnName="Add Personnel"
          backgroundColor="#1266F1"
          :icon="'search'"
          @click="addRecord"
        /> -->
        <Btn2
          BtnName="Add Personnel"
          backgroundColor="#1266F1"
          :icon="'plus'"
          @click="addRecord"
          class="rounded-pill"
        />
      </div>
    </div>
  </Section>
</template>

<script setup>
import { inject } from "vue";
import { useStore } from "vuex";

import Btn2 from "../BIOMD-UI/UI-Btn2.vue";
import Section from "../BIOMD-UI/UI-Section.vue";

const modelInfo = inject("modelInfo");

const store = useStore();

// API Call
async function addRecord() {
  var sendSocketReq = {
    Expiry: 20000,
    Type: "REQUEST",
    Request: {
      Module: "MEMS",
      ServiceCode: "BIOMD",
      API: "FIND",
    },
  };
  let res = await store.dispatch("sendHTTPReq", sendSocketReq);
  if (res.Type === "REQUEST") {
    console.log("API Success...");
  } else {
    console.log("Unable to Find Asset Parent");
  }
}
</script>

<style lang="scss" scoped>
@import "../Style/BIOMD.scss";
</style>
