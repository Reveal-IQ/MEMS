<template>
  <section class="section p-4 rounded">
    <h5 class="pb-5">Model Description</h5>

    <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 g-3">
      <!-- Model ID -->
      <div class="col-lg-4">
        <Input
          label="Model Id"
          type="text"
          id="modelId"
          placeholder="Model Id"
        />
      </div>

      <!-- Manufacturer Select -->
      <div class="col-lg-8">
        <label for="manufacturerList" class="form-label">Manufacturer</label>
        <select
          id="manufacturerList"
          class="form-select"
          aria-label="Default select example"
        >
          <option selected>Choose a Manufacturer</option>
        </select>
      </div>

      <!-- Model Name -->
      <div class="col-lg-6">
        <Input
          label="Model Name"
          type="text"
          id="modelName"
          placeholder="Model Name"
        />
      </div>

      <!-- Model Number -->
      <div class="col-lg-6">
        <Input
          label="Model Number"
          type="text"
          id="modelNumber"
          placeholder="Model Number"
        />
      </div>

      <!-- Vendor Select -->
      <div class="col-lg-6">
        <label for="vendorList" class="form-label">Vendor</label>
        <select
          class="form-select mb-3"
          aria-label="Default select example"
          id="vendorList"
        >
          <option selected>Choose a Vendor</option>
        </select>
      </div>
    </div>
  </section>
</template>

<script setup>
import Input from "../BIOMD-Input.vue";
</script>

<style lang="scss" scoped>
@import "../Style/BIOMD.scss";
</style>
