<script setup></script>

<template>
  <main>
    <section class="section p-4 rounded">
      <h5 class="pb-5">Facility Information</h5>

      <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 g-3">
        <!-- Facility Name -->
        <div class="col">
          <label for="facilityName" class="form-label">Facility Name</label>
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              id="facilityName"
              aria-describedby="basic-addon3"
              placeholder="Enter details"
            />
          </div>
        </div>
        <!-- Country -->
        <div class="col">
          <label for="country" class="form-label">Country</label>
          <select
            id="country"
            class="form-select"
            aria-label="Default select example"
          >
            <option selected>Choose a Country</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
        <!-- Province/State/Region -->
        <div class="col">
          <label for="state" class="form-label">Province/State/Region</label>
          <select
            id="state"
            class="form-select"
            aria-label="Default select example"
          >
            <option selected>Choose a State</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
        <!-- City/District -->
        <div class="col">
          <label for="city" class="form-label">City/District</label>
          <select
            id="city"
            class="form-select"
            aria-label="Default select example"
          >
            <option selected>Choose a City</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
      </div>
      <div class="row g-3 mt-3">
        <!-- Street Address 1 -->
        <div class="col-12">
          <label for="street1" class="form-label">Street Address 1</label>
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              id="street1"
              aria-describedby="basic-addon3"
              placeholder="Enter details"
            />
          </div>
        </div>
        <!-- Street Address 2 -->
        <div class="col-12">
          <label for="street2" class="form-label">Street Address 2</label>
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              id="street2"
              aria-describedby="basic-addon3"
              placeholder="Enter details"
            />
          </div>
        </div>
        <!-- Zip / Postal Code -->
        <div class="col-lg-5">
          <label for="zip" class="form-label">Zip/Postal Code</label>
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              id="zip"
              aria-describedby="basic-addon3"
              placeholder="Enter details"
            />
          </div>
        </div>

        <!-- GPS Coordinates -->
        <div class="col-lg-5">
          <label for="gps" class="form-label">GPS Coordinates</label>
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              id="gps"
              aria-describedby="basic-addon3"
              placeholder="Enter details"
            />
          </div>
        </div>
        <div class="col-lg-2">
          <a class="a-link">Generate GPS Coordinates</a>
        </div>

        <!-- Department List -->
        <div class="col-12">
          <label for="department" class="form-label">Departments List</label>
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              id="department"
              aria-describedby="basic-addon3"
              placeholder="Enter details"
            />
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped></style>
