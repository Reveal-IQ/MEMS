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
      title="Create New Model"
      subTitle="Enter all details required for this equipment model"
    />

    <main>
      <ModelDescription />
      <VendorSupport />
      <div class="d-flex justify-content-center py-3">
        <div class="">
          <Btn
            BtnName="Create Model"
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

import ModelDescription from "../BIOMD-MODEL/MODEL-ModelDescription.vue";
import VendorSupport from "../BIOMD-MODEL/MODEL-VendorSupport.vue";

import Header from "../BIOMD-UI/UI-FormHeader.vue";
import Btn from "../BIOMD-UI/UI-Btn.vue";
import Btn2 from "../BIOMD-UI/UI-Btn2.vue";

const emit = defineEmits(["updatePage"]);

const store = useStore();

// Create Record
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
    console.log("API Success");
  } else {
    console.log("Something went wrong");
  }
}

const goBack = async () => {
  emit("updatePage", "landing");
};
</script>

<style lang="scss" scoped></style>
