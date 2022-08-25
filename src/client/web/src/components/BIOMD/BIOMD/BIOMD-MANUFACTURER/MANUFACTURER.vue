<template>
  <div class="container">
    <div class="d-flex flex-row justify-content-between">
      <button @click="goBack" class="col-2 btn btn-secondary my-3">Back</button>
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
          />

          <Btn BtnName="Clear Content" />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import Header from "../BIOMD-FormHeader.vue";
import ManufacturerInformation from "../BIOMD-MANUFACTURER/MANUFACTURER-ManufacturerInformation.vue";
import Btn from "../BIOMD-Btn.vue";

const emit = defineEmits(["updatePage"]);

const goBack = () => {
  emit("updatePage", "landing");
};
</script>

<style lang="scss" scoped></style>
