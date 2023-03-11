<template>
  <Section sectionTitle="Equipment Location">
    <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 g-3">
      <!-- Facility -->
      <div class="col-lg-6 mb-3">
        <label for="facilityList" class="form-label">Facility</label>
        <select
          id="facilityList"
          class="form-select"
          aria-label="Default select example"
          v-model="facilityId"
        >
          <option selected>Select Facility</option>
        </select>
      </div>
      <!-- Region -->
      <div class="col-lg-6 mb-3">
        <label for="regionList" class="form-label">Region</label>
        <select
          id="regionList"
          class="form-select"
          aria-label="Default select example"
          v-model="region"
        >
          <option selected>Select Region</option>
        </select>
      </div>
      <!-- District -->
      <div class="col-lg-4 mb-3">
        <label for="districtList" class="form-label">District</label>
        <select
          id="districtList"
          class="form-select"
          aria-label="Default select example"
          v-model="district"
        >
          <option selected>Select District</option>
        </select>
      </div>
      <!-- Department -->
      <div class="col-lg-4 mb-3">
        <label for="departmentList" class="form-label">Department</label>
        <select
          id="departmentList"
          class="form-select"
          aria-label="Default select example"
          v-model="departmentId"
        >
          <option selected>Select Department</option>
        </select>
      </div>
      <!-- Location -->
      <div class="col-lg-4">
        <Input
          label="Location"
          type="text"
          id="locationTag"
          placeholder="Add Location Tag"
          v-model="location"
        />
      </div>
    </div>
  </Section>
</template>

<script setup>
import { ref, inject } from "vue";

import Input from "../BIOMD-UI/UI-Input.vue";
import Section from "../BIOMD-UI/UI-Section.vue";

const facilityId = inject("facilityId");
const departmentId = inject("departmentId");
const region = inject("region");
const district = inject("district");
const location = inject("location");
</script>

<style lang="scss" scoped>
@import "../../BIOMD/Style/BIOMD.scss";
</style>
