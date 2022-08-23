<template>
  <div class="container">
    <div class="d-flex flex-row justify-content-between">
      <button @click="goBack" class="col-2 btn btn-secondary my-3">Back</button>
    </div>
    <h1 class="title">Create New Vendor</h1>
    <p class="sub-title">
      Enter all relevant information associated with this medical equipment.
    </p>

    <main>
      <VendorInformation />
      <CustomerService />
      <div class="d-flex row justify-content-center py-3">
        <!-- btn-green and a-link are custom css for MEMS check base.css -->
        <button class="btn btn-green">Create New Vendor</button>
        <a class="text-center py-2 a-link">Clear Content</a>
      </div>
    </main>
  </div>
</template>

<script setup>
import VendorInformation from "../BIOMD-VENDOR/VENDOR-VendorInformation.vue";
import CustomerService from "../BIOMD-VENDOR/VENDOR-CustomerService.vue";
const emit = defineEmits(["updatePage"]);

const goBack = () => {
  emit("updatePage", "landing");
};
</script>

<style lang="scss" scoped></style>
