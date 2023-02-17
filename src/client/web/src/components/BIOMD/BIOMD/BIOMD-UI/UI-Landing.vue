<template>
  <div class="container">
    <h1 class="title mt-5">MEDICAL EQUIPMENT MANAGEMENT SYSTEM (MEMS)</h1>
    <p class="sub-title">Manage your medical equipment</p>

    <!-- Inventory Statistics -->

    <div class="d-flex justify-content-between mt-5 mb-1 px-2">
      <h4 class="text-uppercase text-muted fs-5 fw-bold">Medical Equipment Inventory</h4>
      <Btn2
        BtnName="New Asset"
        backgroundColor="#0F7BC9"
        @click="changePage('assetInfo')"
        :icon="'plus'"
        class="text-light btn-sm"
      />
    </div>

    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 my-3">
      <UIStatCard stats="200" statName="Active Assets" :icon="'check'" />

      <UIStatCard stats="50" statName="Life Support" :icon="'heart'" />

      <UIStatCard stats="50" statName="Diagnostic" :icon="'x-ray'" />

      <UIStatCard stats="100" statName="Therapeutic" :icon="'laptop-medical'" />
    </div>

    <!-- Institute Information -->
    <div class="d-flex justify-content-between mt-3 mb-1 px-2 ">
      <h4 class="text-uppercase text-muted fs-5 fw-bold">Institute Profile</h4>
      <Btn2
        BtnName="Institute Profile"
        backgroundColor="#0F7BC9"
        @click="changePage('facilityInfo')"
        :icon="'eye'"
        class="text-light btn-sm"
      />
    </div>
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-2 my-3">
      <UIStatCard stats="15" statName="Departments" :icon="'hospital'" />

      <UIStatCard stats="30" statName="Wards" :icon="'door-open'" />
    </div>

    <!-- Vendors -->
    <div class="d-flex justify-content-between mt-3 mb-1 px-2">
      <h4 class="text-uppercase text-muted fs-5 fw-bold">Vendors</h4>
      <Btn2
        BtnName="New Vendor"
        backgroundColor="#0F7BC9"
        @click="changePage('vendorInfo')"
        :icon="'plus'"
        class="text-light btn-sm"
      />
    </div>
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-2 my-3">
      <UIStatCard stats="15" statName="Total Vendors" :icon="'hospital'" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Card from "../BIOMD-UI/UI-Card.vue";
import Btn2 from "./UI-Btn2.vue";
import UIStatCard from "./UI-StatCard.vue";
import UICard2 from "./UI-Card2.vue";

const emit = defineEmits(["updatePage"]);

// Navigate to selected page to edit
const changePage = async (page) => {
  emit("updatePage", page);
};
</script>

<style lang="scss" scoped>
@import "../Style/BIOMD.scss";
</style>
