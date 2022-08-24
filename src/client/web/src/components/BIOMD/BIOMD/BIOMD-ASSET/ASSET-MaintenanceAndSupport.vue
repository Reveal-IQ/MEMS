<template>
  <section class="section p-4 rounded mt-4">
    <h5 class="pb-5">Maintenance And Support</h5>

    <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 g-3">
      <!-- Assign Clinical Engineer -->
      <div class="col-lg-6 mb-3">
        <label for="clinicalEngineer" class="form-label"
          >Assign Clinical Engineer</label
        >
        <select
          id="clinicalEngineer"
          class="form-select"
          aria-label="Default select example"
        >
          <option selected>Select Clinical Engineer</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
      <!-- Assign Support Team -->
      <div class="col-lg-6 mb-3">
        <label for="supportTeam" class="form-label">Assign Support Team</label>
        <select
          id="supportTeam"
          class="form-select"
          aria-label="Default select example"
        >
          <option selected>Select Support Team</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
      <!-- Vendor -->
      <div class="col-lg-6 mb-3">
        <label for="vendor" class="form-label">Vendor</label>
        <select
          id="vendor"
          class="form-select"
          aria-label="Default select example"
        >
          <option selected>Select Vendor</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
      <!-- Status -->
      <div class="col-lg-6 mb-3">
        <label for="status" class="form-label">Status</label>
        <select
          id="status"
          class="form-select"
          aria-label="Default select example"
        >
          <option selected>Select Equipment Status</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
    </div>
    <div
      class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 g-3 mb-3"
    >
      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          value=""
          id="flexCheckDefault"
        />
        <label class="form-check-label" for="flexCheckDefault">
          User Manual Available?
        </label>
      </div>
    </div>
    <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 g-3">
      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          value=""
          id="flexCheckDefault"
        />
        <label class="form-check-label" for="flexCheckDefault">
          Technical Manual Available?
        </label>
      </div>
    </div>
  </section>
</template>

<script setup></script>

<style lang="scss" scoped>
@import "../../BIOMD/Style/BIOMD.scss";
</style>
