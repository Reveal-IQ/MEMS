<template>
  <section class="bg-white p-4 rounded mt-4">
    <h5 class="pb-5">Equipment Acquisition</h5>

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
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
      <!-- Project -->
      <div class="col-lg-8">
        <label for="project" class="form-label">Projects</label>
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            id="project"
            aria-describedby="basic-addon3"
            placeholder="Tag Associated Projects"
          />
        </div>
      </div>
      <!-- Purchase Cost -->
      <div class="col-lg-4">
        <label for="purchaseCost" class="form-label">Purchase Cost</label>
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            id="purchaseCost"
            aria-describedby="basic-addon3"
            placeholder="Enter Purchase Cost"
          />
        </div>
      </div>
      <!-- Purchase Date -->
      <div class="col-lg-4">
        <label for="purchaseDate" class="form-label">Purchase Date</label>
        <div class="input-group mb-3">
          <input
            type="date"
            class="form-control"
            id="purchaseDate"
            aria-describedby="basic-addon3"
          />
        </div>
      </div>
      <!-- Vendor -->
      <div class="col-lg-4 mb-3">
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
      <!-- Acceptance Date -->
      <div class="col-lg-4">
        <label for="acceptanceDate" class="form-label">Acceptance Date</label>
        <div class="input-group mb-3">
          <input
            type="date"
            class="form-control"
            id="acceptanceDate"
            aria-describedby="basic-addon3"
          />
        </div>
      </div>
      <!-- Warranty Expiry Date -->
      <div class="col-lg-4">
        <label for="warrantyDate" class="form-label"
          >Warranty Expiry Date</label
        >
        <div class="input-group mb-3">
          <input
            type="date"
            class="form-control"
            id="warrantyDate"
            aria-describedby="basic-addon3"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup></script>

<style lang="scss" scoped></style>
