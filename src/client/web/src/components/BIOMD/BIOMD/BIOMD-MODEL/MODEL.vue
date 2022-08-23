<template>
  <div class="container">
    <div class="d-flex flex-row justify-content-between">
      <button @click="goBack" class="col-2 btn btn-secondary my-3">Back</button>
    </div>
    <h1 class="title">Create New Model</h1>
    <p class="sub-title">
      Enter all relevant information associated with this medical equipment.
    </p>

    <main>
      <ModelDescription />
      <VendorSupport />
      <div class="d-flex row justify-content-center py-3">
        <!-- btn-green and a-link are custom css for MEMS check base.css -->
        <button class="btn btn-green">Create New Model</button>
        <a class="text-center py-2 a-link">Clear Content</a>
      </div>
    </main>
  </div>
</template>

<script setup>
import ModelDescription from "../BIOMD-MODEL/MODEL-ModelDescription.vue";
import VendorSupport from "../BIOMD-MODEL/MODEL-VendorSupport.vue";
const emit = defineEmits(["updatePage"]);

const goBack = async () => {
  emit("updatePage", "landing");
};
</script>

<style lang="scss" scoped></style>
