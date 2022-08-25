<template>
  <div class="container">
    <div class="d-flex flex-row justify-content-between">
      <button @click="goBack" class="col-2 btn btn-secondary my-3">Back</button>
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
          <Btn BtnName="Create Model" backgroundColor="#27AE60" class="mb-3" />

          <Btn BtnName="Clear Content" />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import Header from "../BIOMD-FormHeader.vue";
import ModelDescription from "../BIOMD-MODEL/MODEL-ModelDescription.vue";
import VendorSupport from "../BIOMD-MODEL/MODEL-VendorSupport.vue";
import Btn from "../BIOMD-Btn.vue";

const emit = defineEmits(["updatePage"]);

const goBack = async () => {
  emit("updatePage", "landing");
};
</script>

<style lang="scss" scoped></style>
