<script>
export default {
  name: "ManufacturerInformation",
};
</script>
<template>
  <main>
    <!-- The main form -->
    <section class="section p-4 rounded">
      <h5 class="pb-5">Manufacturer Information</h5>

      <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 g-3">
        <!-- Manufacturer Name -->
        <div class="col">
          <label for="manufacturerName" class="form-label"
            >Manufacturer Name</label
          >
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              id="manufacturerName"
              aria-describedby="basic-addon3"
              placeholder="Enter manufacturer name"
            />
          </div>
        </div>
        <!-- Country -->
        <div class="col">
          <label for="countryList" class="form-label">Country</label>
          <select
            id="countryList"
            class="form-select"
            aria-label="Default select example"
          >
            <option selected>Choose a Country</option>
          </select>
        </div>
        <!-- Province/State/Region -->
        <div class="col">
          <label for="stateList" class="form-label"
            >Province/State/Region</label
          >
          <select
            id="stateList"
            class="form-select"
            aria-label="Default select example"
          >
            <option selected>Choose a State</option>
          </select>
        </div>
        <!-- City/District -->
        <div class="col">
          <label for="cityList" class="form-label">City/District</label>
          <select
            id="cityList"
            class="form-select"
            aria-label="Default select example"
          >
            <option selected>Choose a City</option>
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
        <div class="col col-lg-6">
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
      </div>
    </section>
  </main>
</template>
<style lang="scss" scoped>
@import "../Style/BIOMD.scss";
</style>
