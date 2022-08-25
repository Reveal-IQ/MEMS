<template>
  <div class="container">
    <div class="d-flex flex-row justify-content-between">
      <button @click="goBack" class="col-2 btn btn-secondary my-3">Back</button>
    </div>
    <h1 class="title headerText">Create New Equipment</h1>
    <p class="sub-title bodyText">
      Enter all relevant information associated with this medical equipment.
    </p>

    <main>
      <GeneralInformation />
      <EquipmentLocation />
      <MaintenanceAndSupport />
      <EquipmentAcquisition />
      <MultipleEquipmentEntry />
      <AdditionalInformation />
      <div class="d-flex justify-content-center py-3">
        <div class="">
          <Btn BtnName="Create Asset" backgroundColor="#27AE60" class="mb-3" />

          <Btn BtnName="Clear Content" />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import AdditionalInformation from "./ASSET-AdditionalInformation.vue";
import EquipmentAcquisition from "./ASSET-EquipmentAcquisition.vue";
import EquipmentLocation from "./ASSET-EquipmentLocation.vue";
import GeneralInformation from "./ASSET-GeneralInformation.vue";
import MultipleEquipmentEntry from "./ASSET-MultipleEquipmentEntry.vue";
import MaintenanceAndSupport from "./ASSET-MaintenanceAndSupport.vue";
import Btn from "../BIOMD-Btn.vue";
import { inject } from "vue";

const emit = defineEmits(["updatePage"]);

const assetInfo = inject("assetInfo");

// navigations
const goBack = () => {
  emit("updatePage", "landing");
};
</script>

<style lang="scss" scoped>
@import "../Style/BIOMD.scss";
</style>
