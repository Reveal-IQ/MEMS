<template>
  <section class="section p-4 rounded mt-4">
    <h5 class="pb-5 section-title largeText">Equipment Acquisition</h5>

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
        />
      </div>
      <!-- Purchase Date -->
      <div class="col-lg-4">
        <Input
          label="Purchase Date"
          type="date"
          id="purchaseDate"
          placeholder="Enter Purchase Date"
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
        />
      </div>
      <!-- Warranty Expiry Date -->
      <div class="col-lg-4">
        <Input
          label="Warranty Expiration Date"
          type="date"
          id="warrantyDate"
          placeholder="Select Warranty Expiration Date"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import Input from "../BIOMD-Input.vue";
</script>

<style lang="scss" scoped>
@import "../../BIOMD/Style/BIOMD.scss";
</style>
