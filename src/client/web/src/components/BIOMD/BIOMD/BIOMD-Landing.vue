<template>
  <div class="container">
    <h1 class="title mt-5">MEDICAL EQUIPMENT MANAGEMENT SYSTEM (MEMS)</h1>
    <p class="sub-title">Manage your medical equipment</p>
    <div class="d-flex flex-row justify-content-between my-5">
      <button @click="goToAsset" class="col-2 btn btn-secondary my-3">
        Asset
      </button>

      <button @click="goToModel" class="col-2 btn btn-secondary my-3">
        Model
      </button>

      <button @click="goToManufacturer" class="col-2 btn btn-secondary my-3">
        Manufacturer
      </button>

      <button @click="goToVendor" class="col-2 btn btn-secondary my-3">
        Vendor
      </button>

      <button @click="goToFacility" class="col-2 btn btn-secondary my-3">
        Facility
      </button>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["updatePage"]);

const goToAsset = async () => {
  emit("updatePage", "assetInfo");
};

const goToModel = async () => {
  emit("updatePage", "modelInfo");
};

const goToManufacturer = async () => {
  emit("updatePage", "manufacturerInfo");
};

const goToVendor = async () => {
  emit("updatePage", "vendorInfo");
};

const goToFacility = async () => {
  emit("updatePage", "facilityInfo");
};
</script>

<style lang="scss" scoped></style>
