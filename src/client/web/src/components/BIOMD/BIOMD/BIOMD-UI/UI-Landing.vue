<template>
  <div class="container">
    <h1 class="title mt-5">MEDICAL EQUIPMENT MANAGEMENT SYSTEM (MEMS)</h1>
    <p class="sub-title">Manage your medical equipment</p>

    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 my-3">
      <Card
        CardTitle="Equipment Registration"
        CardText="Use this form to Register all new Medical Equipment."
        @click="changePage('assetInfo')"
      />

      <Card
        CardTitle="Manufacturer Data"
        CardText="Use this form to Register all Manufacturers."
        @click="changePage('manufacturerInfo')"
      />

      <Card
        CardTitle="Model Data"
        CardText="Use this form to Register all Models."
        @click="changePage('modelInfo')"
      />

      <Card
        CardTitle="Vendor Data"
        CardText="Use this form to Register all Vendors."
        @click="changePage('vendorInfo')"
      />

      <Card
        CardTitle="Facility Data"
        CardText="Use this form to Register all Facilities."
        @click="changePage('facilityInfo')"
      />
    </div>
  </div>
</template>

<script setup>
import Card from "../BIOMD-UI/UI-Card.vue";

import { ref } from "vue";

const emit = defineEmits(["updatePage"]);

// Navigate to selected page to edit
const changePage = async (page) => {
  emit("updatePage", page);
};
</script>

<style lang="scss" scoped>
@import "../Style/BIOMD.scss";
</style>
