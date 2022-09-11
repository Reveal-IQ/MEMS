<template>
  <div class="container">
    <div class="d-flex flex-row justify-content-between">
      <button @click="goBack" class="col-2 btn btn-secondary my-3">Back</button>
    </div>
    <Header
      title="Create New Vendor"
      subTitle="Enter all details required for this equipment vendor"
    />

    <main>
      <VendorInformation />
      <CustomerService />
      <div class="d-flex justify-content-center py-3">
        <!-- btn-green and a-link are custom css for MEMS check base.css -->
        <div class="">
          <Btn
            BtnName="Create Vendor"
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
import { ref, inject } from "vue";
import { useStore } from "vuex";

import VendorInformation from "../BIOMD-VENDOR/VENDOR-VendorInformation.vue";
import CustomerService from "../BIOMD-VENDOR/VENDOR-CustomerService.vue";

import Header from "../BIOMD-UI/UI-FormHeader.vue";
import Btn from "../BIOMD-UI/UI-Btn.vue";

const vendorInfo = inject("vendorInfo");

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
