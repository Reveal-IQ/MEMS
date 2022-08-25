<template>
  <Section sectionTitle="General Information">
    <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 g-3">
      <!-- Equipment Number -->
      <div class="col-lg-3">
        <Input
          label="Equipment Number"
          type="number"
          id="equipmentNumber"
          placeholder="Enter Equipment Number"
        />
      </div>

      <!-- Equipment Common Name -->
      <div class="col-lg-4 col-md-12 mb-3">
        <label for="commonNameList" class="form-label"
          >Equipment Common Name</label
        >
        <select
          id="commonNameList"
          class="form-select"
          aria-label="Default select example"
        >
          <option selected>Select Common Name</option>
        </select>
      </div>

      <!-- Equipment Description -->
      <div class="col-lg-5 col-md-12 mb-3">
        <label for="descriptionList" class="form-label"
          >Equipment Description</label
        >
        <select
          id="descriptionList"
          class="form-select"
          aria-label="Default select example"
        >
          <option selected>Select Class</option>
        </select>
      </div>

      <!-- Serial Number -->
      <div class="col-lg-4 mb-3">
        <Input
          label="Serial Number"
          type="text"
          id="serialNumber"
          placeholder="Enter Serial Number"
        />
      </div>
      <!-- Model Name -->
      <div class="col-lg-4 mb-3">
        <label for="modelList" class="form-label">Model Name</label>
        <select
          id="modelList"
          class="form-select"
          aria-label="Default select example"
        >
          <option selected>Select Model Name</option>
        </select>
      </div>
      <!-- Manufacturer -->
      <div class="col-lg-4 mb-3">
        <label for="manufacturerList" class="form-label">Manufacturer</label>
        <select
          id="manufacturerList"
          class="form-select"
          aria-label="Default select example"
        >
          <option selected>Select Manufacturer</option>
        </select>
      </div>

      <!-- Year of Manufacture -->
      <div class="col-lg-4 mb-3">
        <Input
          label="Year of manufacture"
          type="date"
          id="yearOfManufacture"
          placeholder="Enter Year of manufacture"
        />
      </div>
    </div>
    <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 g-3">
      <div class="col pt-2 pb-2 pl-3 pr-3 p-3">
        <Btn
          BtnName="Add Parent Asset"
          backgroundColor="#1266F1"
          :icon="'search'"
        />
      </div>
    </div>
  </Section>
</template>

<script setup>
import Btn from "../BIOMD-Btn.vue";
import Input from "../BIOMD-Input.vue";
import Section from "../BIOMD-Section.vue";
</script>

<style lang="scss" scoped>
@import "../../BIOMD/Style/BIOMD.scss";
</style>
