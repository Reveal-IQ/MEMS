<template>
  <section class="section p-4 rounded mt-4">
    <h5 class="pb-5">Equipment Location</h5>

    <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 g-3">
      <!-- Facility -->
      <div class="col-lg-6 mb-3">
        <label for="facility" class="form-label">Facility</label>
        <select
          id="facility"
          class="form-select"
          aria-label="Default select example"
        >
          <option selected>Select Facility</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
      <!-- Region -->
      <div class="col-lg-6 mb-3">
        <label for="region" class="form-label">Region</label>
        <select
          id="region"
          class="form-select"
          aria-label="Default select example"
        >
          <option selected>Select Region</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
      <!-- District -->
      <div class="col-lg-4 mb-3">
        <label for="district" class="form-label">District</label>
        <select
          id="district"
          class="form-select"
          aria-label="Default select example"
        >
          <option selected>Select District</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
      <!-- Department -->
      <div class="col-lg-4 mb-3">
        <label for="department" class="form-label">Department</label>
        <select
          id="department"
          class="form-select"
          aria-label="Default select example"
        >
          <option selected>Select Department</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
      <!-- Location -->
      <div class="col-lg-4">
        <label for="location" class="form-label">Location</label>
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            id="location"
            aria-describedby="basic-addon3"
            placeholder="Add Location Room Tags"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup></script>

<style lang="scss" scoped></style>
