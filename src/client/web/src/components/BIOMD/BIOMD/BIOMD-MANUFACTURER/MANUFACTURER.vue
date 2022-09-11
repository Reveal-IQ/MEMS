<template>
  <div class="container">
    <div class="d-flex flex-row justify-content-between">
      <Btn2
        BtnName="Back"
        :icon="'arrow-left'"
        @click="goBack"
        class="col-lg-2 col-md-3 col-sm-4 my-3"
      />
    </div>
    <Header
      title="Create New Manufacturer"
      subTitle="Enter all details required for this equipment manufacturer"
    />

    <main>
      <ManufacturerInformation />

      <div class="d-flex justify-content-center py-3">
        <!-- btn-green and a-link are custom css for MEMS check base.css -->
        <div class="">
          <Btn
            BtnName="Create Manufacturer"
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

import ManufacturerInformation from "../BIOMD-MANUFACTURER/MANUFACTURER-ManufacturerInformation.vue";

import Header from "../BIOMD-UI/UI-FormHeader.vue";
import Btn from "../BIOMD-UI/UI-Btn.vue";
import Btn2 from "../BIOMD-UI/UI-Btn2.vue";

const emit = defineEmits(["updatePage"]);

const goBack = () => {
  emit("updatePage", "landing");
};

const store = useStore();

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
    console.log("something went wrong");
  }
}
</script>

<style lang="scss" scoped></style>
