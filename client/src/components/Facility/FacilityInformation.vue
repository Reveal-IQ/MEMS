<script setup></script>

<template>
  <main>
    <form action="" class="bg-white p-4 rounded">
      <h5 class="pb-5">Facility Information</h5>

      <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 g-3">
        <!-- Facility Name -->
        <div class="col">
          <label for="basic-url" class="form-label">Facility Name</label>
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              id="basic-url"
              aria-describedby="basic-addon3"
              placeholder="Enter details"
            />
          </div>
        </div>
        <!-- Country -->
        <div class="col">
          <label for="basic-url" class="form-label">Country</label>
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              id="basic-url"
              aria-describedby="basic-addon3"
              placeholder="Enter details"
            />
          </div>
        </div>
        <!-- Province/State/Region -->
        <div class="col">
          <label for="basic-url" class="form-label"
            >Province/State/Region</label
          >
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              id="basic-url"
              aria-describedby="basic-addon3"
              placeholder="Enter details"
            />
          </div>
        </div>
        <!-- City/District -->
        <div class="col">
          <label for="basic-url" class="form-label">City/District</label>
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              id="basic-url"
              aria-describedby="basic-addon3"
              placeholder="Enter details"
            />
          </div>
        </div>
      </div>
      <div class="row g-3 mt-3">
        <!-- Street Address 1 -->
        <div class="col-12">
          <label for="basic-url" class="form-label">Street Address 1</label>
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              id="basic-url"
              aria-describedby="basic-addon3"
              placeholder="Enter details"
            />
          </div>
        </div>
        <!-- Street Address 2 -->
        <div class="col-12">
          <label for="basic-url" class="form-label">Street Address 2</label>
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              id="basic-url"
              aria-describedby="basic-addon3"
              placeholder="Enter details"
            />
          </div>
        </div>
        <!-- Zip / Postal Code -->
        <div class="col-lg-5">
          <label for="basic-url" class="form-label">Zip/Postal Code</label>
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              id="basic-url"
              aria-describedby="basic-addon3"
              placeholder="Enter details"
            />
          </div>
        </div>

        <!-- GPS Coordinates -->
        <div class="col-lg-5">
          <label for="basic-url" class="form-label">GPS Coordinates</label>
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              id="basic-url"
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
          <label for="basic-url" class="form-label">Departments List</label>
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              id="basic-url"
              aria-describedby="basic-addon3"
              placeholder="Enter details"
            />
          </div>
        </div>
      </div>
    </form>
    <!-- The final button -->
    <div class="d-flex row justify-content-center py-3">
      <!-- btn-green and a-link are custom css for MEMS check base.css -->
      <button class="btn btn-green">Create New Facility</button>
      <a class="text-center py-2 a-link">Clear Content</a>
    </div>
  </main>
</template>

<style lang="scss" scoped></style>
