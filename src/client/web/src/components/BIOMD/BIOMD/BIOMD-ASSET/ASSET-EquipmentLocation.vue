<template>
  <section class="section p-4 rounded mt-4">
    <h5 class="pb-5">Equipment Location</h5>

    <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 g-3">
      <!-- Facility -->
      <div class="col-lg-6 mb-3">
        <label for="facilityList" class="form-label">Facility</label>
        <select
          id="facilityList"
          class="form-select"
          aria-label="Default select example"
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
        >
          <option selected>Select Department</option>
        </select>
      </div>
      <!-- Location -->
      <div class="col-lg-4">
        <label for="locationTag" class="form-label">Location</label>
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            id="locationTag"
            aria-describedby="basic-addon3"
            placeholder="Add Location Room Tags"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup></script>

<style lang="scss" scoped>
@import "../../BIOMD/Style/BIOMD.scss";
</style>
