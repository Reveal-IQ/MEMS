<template>
  <Section sectionTitle="General Information">
    <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 g-3">
      <!-- Equipment Number -->
      <div class="col-lg-3">
        <Input
          label="Equipment Number"
          type="number"
          id="equipmentNumber"
          placeholder="Enter Equipment Number"
          v-model="assetInfo.Equipment_Number"
        />
      </div>

      <!-- Equipment Common Name -->
      <div class="col-lg-4 col-md-12 mb-3">
        <label for="commonNameList" class="form-label"
          >Equipment Common Name</label
        >
        <select id="commonNameList" class="form-select">
          <option selected disabled>Select Common Name</option>
          <option v-for="commonName in commonNameList" :key="commonName.index">
            {{ commonName }}
          </option>
        </select>
      </div>

      <!-- Equipment Description -->
      <div class="col-lg-5 col-md-12 mb-3">
        <label for="descriptionList" class="form-label"
          >Equipment Description</label
        >
        <select
          id="descriptionList"
          class="form-select"
          aria-label="Default select example"
        >
          <option selected>Select Class</option>
        </select>
      </div>

      <!-- Serial Number -->
      <div class="col-lg-3 mb-3">
        <Input
          label="Serial Number"
          type="text"
          id="serialNumber"
          placeholder="Enter Serial Number"
          v-model="assetInfo.Serial_Number"
        />
      </div>
      <!-- Model Name -->
      <div class="col-lg-4 mb-3">
        <label for="modelList" class="form-label">Model Name</label>
        <select
          id="modelList"
          class="form-select"
          aria-label="Default select example"
        >
          <option selected>Select Model Name</option>
        </select>
      </div>
      <!-- Manufacturer -->
      <div class="col-lg-5 mb-3">
        <label for="manufacturerList" class="form-label">Manufacturer</label>
        <select
          id="manufacturerList"
          class="form-select"
          aria-label="Default select example"
        >
          <option selected>Select Manufacturer</option>
        </select>
      </div>

      <!-- Year of Manufacture -->
      <div class="col-lg-3 mb-3">
        <Input
          label="Year of manufacture"
          type="date"
          id="yearOfManufacture"
          placeholder="Enter Year of manufacture"
          v-model="assetInfo.Year_of_Manufacture"
        />
      </div>
    </div>
    <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 g-3">
      <div class="col-lg-12 col-md-6">
        <!-- <Btn
          BtnName="Add Parent Asset"
          backgroundColor="#1266F1"
          :icon="'search'"
          @click="addRecord"
        /> -->
        <Btn2
          BtnName="Search Parent Equipment"
          backgroundColor="#1266F1"
          :icon="'search'"
          @click="addRecord"
          class="col-lg-3 col-md-12 rounded-pill"
        />
      </div>
    </div>
  </Section>
</template>

<script setup>
import { ref, inject, provide } from "vue";
import { useStore } from "vuex";

import Btn from "../BIOMD-UI/UI-Btn.vue";
import Btn2 from "../BIOMD-UI/UI-Btn2.vue";
import Input from "../BIOMD-UI/UI-Input.vue";
import Section from "../BIOMD-UI/UI-Section.vue";

// Inject Asset Information
const assetInfo = inject("assetInfo");

const store = useStore();

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

const commonNameList = ref(["concentrator", "bp apparatus", "gun thermometer"]);
const descriptionList = ref(null);
const modelList = ref(null);
const manufacturerList = ref(null);

provide("commonNameList", commonNameList);
</script>

<style lang="scss" scoped>
@import "../../BIOMD/Style/BIOMD.scss";
</style>
