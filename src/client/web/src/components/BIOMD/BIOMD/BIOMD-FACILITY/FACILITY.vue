<template>
  <div class="container">
    <div class="d-flex flex-row justify-content-between">
      <button @click="goBack" class="col-2 btn btn-secondary my-3">Back</button>
    </div>
    <Header
      title="Create New Facility"
      subTitle="Enter all details required for this medical facility"
    />

    <main>
      <FacilityInformation />

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
import Header from "../BIOMD-FormHeader.vue";
import FacilityInformation from "../BIOMD-FACILITY/FACILITY-FacilityInformation.vue";
import Btn from "../BIOMD-Btn.vue";

const emit = defineEmits(["updatePage"]);

const goBack = () => {
  emit("updatePage", "landing");
};
</script>

<style lang="scss" scoped></style>
