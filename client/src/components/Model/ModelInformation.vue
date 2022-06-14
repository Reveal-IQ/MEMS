<script setup>
import ButtonComponent from "@/components/Ui/ButtonComponent.vue";
</script>

<template>
  <main>
    <form action="">
      <section class="bg-white p-4 rounded">
        <h5 class="pb-5">Facility Information</h5>

        <div
          class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 g-3"
        >
          <!-- Model ID -->
          <div class="col-lg-4">
            <label for="modelId" class="form-label">Model ID</label>
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                id="modelId"
                aria-describedby="basic-addon3"
                placeholder="Enter details"
              />
            </div>
          </div>

          <!-- Manufacturer Select -->
          <div class="col-lg-8">
            <label for="manufacturer" class="form-label">Manufacturer</label>
            <select
              id="manufacturer"
              class="form-select"
              aria-label="Default select example"
            >
              <option selected>Choose a Manufacturer</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>

          <!-- Model Name -->
          <div class="col-lg-6">
            <label for="modelName" class="form-label">Model Name</label>
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                id="modelName"
                aria-describedby="basic-addon3"
                placeholder="Enter details"
              />
            </div>
          </div>

          <!-- Model Number -->
          <div class="col-lg-6">
            <label for="modelNumber" class="form-label">Model Number</label>
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                id="modelNumber"
                aria-describedby="basic-addon3"
                placeholder="Enter details"
              />
            </div>
          </div>

          <!-- Vendor Select -->
          <div class="col-lg-6">
            <label for="vendor" class="form-label">Vendor</label>
            <select
              class="form-select mb-3"
              aria-label="Default select example"
              id="vendor"
            >
              <option selected>Choose a Vendor</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
        </div>
      </section>

      <section class="bg-white p-4 rounded mt-4">
        <h5 class="pb-5">Vendor Support</h5>

        <div
          class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 g-3"
        >
          <!-- Vendor Site ID -->
          <div class="col-lg-4">
            <label for="vendorSite" class="form-label">Vendor Site ID</label>
            <select
              class="form-select mb-3"
              aria-label="Default select example"
              id="vendorSite"
            >
              <option selected>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <div class="col">
            <ButtonComponent>Add New Site ID</ButtonComponent>
          </div>
        </div>
        <div
          class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 g-3"
        >
          <!-- Personnel Assigned -->
          <div class="col-lg-6">
            <label for="personnel" class="form-label">Personnel Assigned</label>
            <select
              class="form-select mb-3"
              aria-label="Default select example"
              id="personnel"
            >
              <option selected>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
        </div>

        <div
          class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 g-3"
        >
          <ButtonComponent>Add Personnel</ButtonComponent>
        </div>
      </section>
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
