<template>
  <Section sectionTitle="Model Description">
    <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 g-3">
      <!-- Model Name -->
      <div class="col-lg-6">
        <Input
          label="Model Name"
          type="text"
          id="modelName"
          placeholder="Model Name"
          v-model="modelName"
        />
      </div>

      <!-- Model Number -->
      <div class="col-lg-6">
        <Input
          label="Model Number"
          type="text"
          id="modelNumber"
          placeholder="Model Number"
          v-model="modelNumber"
        />
      </div>

      <!-- Vendor Select -->
      <div class="col-lg-6">
        <label for="vendorList" class="form-label">Vendor</label>
        <select
          id="vendorList"
          class="form-select"
          aria-label="Default select example"
          v-model="vendor"
        >
          <option selected disabled>Choose a Vendor</option>
          <option v-for="name in vendorList" :key="name" :value="name">
            {{ name }}
          </option>
        </select>
      </div>

      <!-- Vendor Site ID -->
      <div class="col-lg-6">
        <Input
          label="Vendor Site ID"
          type="text"
          id="vendorSiteId"
          placeholder="Site ID"
          v-model="vendorSiteId"
        />
      </div>
    </div>
  </Section>
</template>

<script setup>
import { ref, inject } from "vue";
import Input from "../BIOMD-UI/UI-Input.vue";
import Section from "../BIOMD-UI/UI-Section.vue";

const vendor = inject("vendor");
const modelName = inject("modelName");
const modelNumber = inject("modelNumber");
const vendorSiteId = inject("vendorSiteId");

const vendorList = ref([
  "General Electric",
  "Ghana Medical Help",
  "Ghana Health Service",
]);
</script>

<style lang="scss" scoped>
@import "../Style/BIOMD.scss";
</style>
