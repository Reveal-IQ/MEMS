<template>
  <div class="container py-5">
    <h1 class="title">Create New Equipment</h1>
    <p class="sub-title">
      Enter all relevant information associated with this medical equipment.
    </p>
    <main>
      <GeneralInformation />
      <EquipmentLocation />
      <MaintenanceAndSupport />
      <EquipmentAcquisition />
      <MultipleEquipmentEntry />
      <AdditionalInformation />
      <div class="d-flex row justify-content-center py-3">
        <!-- btn-green and a-link are custom css for MEMS check base.css -->
        <button class="btn btn-green">Create New Facility</button>
        <a class="text-center py-2 a-link">Clear Content</a>
      </div>
    </main>
  </div>
</template>
<script>
import GeneralInformation from "@/components/Asset/GeneralInformation.vue";
import EquipmentLocation from "@/components/Asset/EquipmentLocation.vue";
import MaintenanceAndSupport from "@/components/Asset/MaintenanceAndSupport.vue";
import EquipmentAcquisition from "@/components/Asset/EquipmentAcquisition.vue";
import MultipleEquipmentEntry from "@/components/Asset/MultipleEquipmentEntry.vue";
import AdditionalInformation from "@/components/Asset/AdditionalInformation.vue";

export default {
  name: "AssetScreen",
  components: {
    GeneralInformation,
    EquipmentLocation,
    MaintenanceAndSupport,
    EquipmentAcquisition,
    MultipleEquipmentEntry,
    AdditionalInformation,
  },
};
</script>
<style></style>
