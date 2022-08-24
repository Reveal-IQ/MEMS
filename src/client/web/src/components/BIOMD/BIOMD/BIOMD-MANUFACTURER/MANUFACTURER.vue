<template>
  <div class="container">
    <div class="d-flex flex-row justify-content-between">
      <button @click="goBack" class="col-2 btn btn-secondary my-3">Back</button>
    </div>
    <h1 class="title">Create New Manufacturer</h1>
    <p class="sub-title">
      Enter all relevant information associated with this Manufacturer.
    </p>

    <main>
      <ManufacturerInformation />

      <div class="d-flex justify-content-center py-3">
        <!-- btn-green and a-link are custom css for MEMS check base.css -->
        <div class="">
          <Btn
            BtnName="Create Manufacturer"
            backgroundColor="#27AE60"
            class="mb-3"
          />

          <Btn BtnName="Clear Content" />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import ManufacturerInformation from "../BIOMD-MANUFACTURER/MANUFACTURER-ManufacturerInformation.vue";
import Btn from "../BIOMD-Btn.vue";

const emit = defineEmits(["updatePage"]);

const goBack = () => {
  emit("updatePage", "landing");
};
</script>

<style lang="scss" scoped></style>
