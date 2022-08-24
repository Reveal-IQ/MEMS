<template>
  <section class="section p-4 rounded">
    <h5 class="pb-5">General Information</h5>

    <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 g-3">
      <!-- Equipment Number -->
      <div class="col-lg-3">
        <label for="equipmentNumber" class="form-label">Equipment Number</label>
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            id="equipmentNumber"
            aria-describedby="basic-addon3"
            placeholder="Enter details"
          />
        </div>
      </div>

      <!-- Equipment Common Name -->
      <div class="col-lg-4 col-md-12 mb-3">
        <label for="equipmentCommonName" class="form-label"
          >Equipment Common Name</label
        >
        <select
          id="equipmentCommonName"
          class="form-select"
          aria-label="Default select example"
        >
          <option selected>Select Common Name</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>

      <!-- Equipment Description -->
      <div class="col-lg-5 col-md-12 mb-3">
        <label for="equipmentDescription" class="form-label"
          >Equipment Description</label
        >
        <select
          id="equipmentDescription"
          class="form-select"
          aria-label="Default select example"
        >
          <option selected>Select Class</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>

      <!-- Serial Number -->
      <div class="col-lg-4 mb-3">
        <label for="serialNumber" class="form-label">Serial Number</label>
        <div class="input-group">
          <input
            type="text"
            class="form-control"
            id="serialNumber"
            aria-describedby="basic-addon3"
            placeholder="Enter details"
          />
        </div>
      </div>
      <!-- Model Name -->
      <div class="col-lg-4 mb-3">
        <label for="modelName" class="form-label">Model Name</label>
        <select
          id="modelName"
          class="form-select"
          aria-label="Default select example"
        >
          <option selected>Select Model Name</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
      <!-- Manufacturer -->
      <div class="col-lg-4 mb-3">
        <label for="manufacturer" class="form-label">Manufacturer</label>
        <select
          id="manufacturer"
          class="form-select"
          aria-label="Default select example"
        >
          <option selected>Select Manufacturer</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>

      <!-- Year of Manufacture -->
      <div class="col-lg-4 mb-3">
        <label for="yearOfManufacture" class="form-label"
          >Year of Manufacture</label
        >
        <div class="input-group mb-3">
          <input
            type="date"
            class="form-control"
            id="yearOfManufacture"
            aria-describedby="basic-addon3"
          />
        </div>
      </div>
    </div>
    <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 g-3">
      <div class="col">
        <Btn
          BtnName="Add Parent Asset"
          backgroundColor="#1266F1"
          :icon="'search'"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import Btn from "../BIOMD-Btn.vue";
</script>

<style lang="scss" scoped>
@import "../../BIOMD/Style/BIOMD.scss";
</style>
