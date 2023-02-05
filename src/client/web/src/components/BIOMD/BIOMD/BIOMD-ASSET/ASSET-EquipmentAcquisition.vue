<template>
  <Section sectionTitle="Equipment Acquisition">
    <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 g-3">
      <!-- Purchase Order Number -->
      <div class="col-lg-4 mb-3">
        <label for="purchaseOrder" class="form-label"
          >Purchase Order Number</label
        >
        <select
          id="purchaseOrder"
          class="form-select"
          aria-label="Default select"
        >
          <option selected>Select PO Number</option>
        </select>
      </div>

      <!-- Project -->
      <div class="col-lg-8">
        <Input
          label="Project"
          type="text"
          id="projectName"
          placeholder="Enter Project"
          v-model="project"
        />
      </div>
    </div>
    <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 g-3">
      <!-- Purchase Cost -->
      <div class="col-lg-4">
        <Input
          label="Purchase Cost"
          type="number"
          id="purchaseCost"
          placeholder="Enter Purchase Cost"
          v-model="purchaseCost"
        />
      </div>
      <!-- Purchase Date -->
      <div class="col-lg-4">
        <Input
          label="Purchase Date"
          type="date"
          id="purchaseDate"
          placeholder="Enter Purchase Date"
          v-model="purchaseDate"
        />
      </div>
      <!-- Vendor -->
      <div class="col-lg-4 mb-3">
        <label for="vendorList" class="form-label">Vendor</label>
        <select
          id="vendorList"
          class="form-select"
          aria-label="Default select example"
        >
          <option selected>Select Vendor</option>
        </select>
      </div>
      <!-- Acceptance Date -->
      <div class="col-lg-4">
        <Input
          label="Acceptance Date"
          type="date"
          id="acceptanceDate"
          placeholder="Select Acceptance Date"
          v-model="acceptanceDate"
        />
      </div>
      <!-- Warranty Expiry Date -->
      <div class="col-lg-4">
        <Input
          label="Warranty Expiration Date"
          type="date"
          id="warrantyDate"
          placeholder="Select Warranty Expiration Date"
          v-model="warrantyDate"
        />
      </div>
    </div>
  </Section>
</template>

<script setup>
import { ref, inject } from "vue";

import Input from "../BIOMD-UI/UI-Input.vue";
import Section from "../BIOMD-UI/UI-Section.vue";

const purchaseOrder = inject("purchaseOrder");
const project = inject("project");
const purchaseCost = inject("purchaseCost");
const purchaseDate = inject("purchaseDate");
const acceptanceDate = inject("acceptanceDate");
const warrantyDate = inject("warrantyDate");
</script>

<style lang="scss" scoped>
@import "../../BIOMD/Style/BIOMD.scss";
</style>
