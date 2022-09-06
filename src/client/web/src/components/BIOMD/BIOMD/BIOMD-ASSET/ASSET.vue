<template>
  <div class="container">
    <div class="d-flex flex-row justify-content-between">
      <button @click="goBack" class="col-2 btn btn-secondary my-3">Back</button>
    </div>
    <Header
      title="Create New Asset"
      subTitle="Enter all details required for this medical equipment"
    />

    <main>
      <GeneralInformation />
      <EquipmentLocation />
      <MaintenanceAndSupport />
      <EquipmentAcquisition />
      <MultipleEquipmentEntry />
      <AdditionalInformation />
      <div class="d-flex justify-content-center py-3">
        <div class="">
          <Btn
            BtnName="Create Asset"
            backgroundColor="#27AE60"
            class="mb-3"
            :showLoading="true"
            @click="createRecord"
          />

          <Btn
            BtnName="Clear Content"
            @click="clearContent"
            :showLoading="true"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, inject } from "vue";
import { useStore } from "vuex";

// Import Sections
import GeneralInformation from "./ASSET-GeneralInformation.vue";
import EquipmentLocation from "./ASSET-EquipmentLocation.vue";
import EquipmentAcquisition from "./ASSET-EquipmentAcquisition.vue";
import MaintenanceAndSupport from "./ASSET-MaintenanceAndSupport.vue";
import MultipleEquipmentEntry from "./ASSET-MultipleEquipmentEntry.vue";
import AdditionalInformation from "./ASSET-AdditionalInformation.vue";

// Import UI Components
import Header from "../BIOMD-UI/UI-FormHeader.vue";
import Btn from "../BIOMD-UI/UI-Btn.vue";

// Inject Asset Info
const assetInfo = inject("assetInfo");
const commonNameList = inject("commonNameList");

// Emit
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
    console.log("Equipment Successfully Created");
  } else {
    console.log("Unable to Create New Asset Record");
  }
}

// Clear User Input
const clearContent = async () => {
  // commonNameList.value = null;

  assetInfo.value.Equipment_Number = null;
  assetInfo.value.Serial_Number = null;
  assetInfo.value.Year_of_Manufacture = null;
};

// Navigation
const goBack = () => {
  emit("updatePage", "landing");
};
</script>

<style lang="scss" scoped>
@import "../Style/BIOMD.scss";
</style>
