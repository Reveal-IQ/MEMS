<template>
  <section class="bg-white p-4 rounded">
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
      <!-- <ButtonComponent>Add Parent Component</ButtonComponent> -->
      <div class="col">
        <button class="btn btn-primary rounded-pill btn-small">
          Add Parent Component
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path
              d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
// import ButtonComponent from "../Ui/ButtonComponent.vue";
</script>

<style lang="scss" scoped></style>
