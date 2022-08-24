<script>
export default {
  name: "VendorInformation",
};
</script>
<template>
  <main>
    <!-- The main form -->
    <section class="section p-4 rounded">
      <h5 class="pb-5">Vendor Information</h5>

      <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 g-3">
        <!-- Vendor Name -->
        <div class="col">
          <label for="vendorName" class="form-label">Vendor Name</label>
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              id="vendorName"
              aria-describedby="basic-addon3"
              placeholder="Enter details"
            />
          </div>
        </div>
        <!-- Country -->
        <div class="col">
          <label for="countryList" class="form-label">Country</label>
          <div class="select-group mb-3">
            <select
              type="text"
              class="form-select"
              id="countryList"
              aria-describedby="basic-addon3"
              placeholder="Select country"
            >
              <option selected>Select country</option>
            </select>
          </div>
        </div>
        <!-- Province/State/Region -->
        <div class="col">
          <label for="statelist" class="form-label"
            >Province/State/Region</label
          >
          <div class="select-group mb-3">
            <select
              type="text"
              class="form-select"
              id="statelist"
              aria-describedby="basic-addon3"
              placeholder="Select country"
            >
              <option selected>Select province/state/region</option>
            </select>
          </div>
        </div>
        <!-- City/District -->
        <div class="col">
          <label for="cityList" class="form-label">City/District</label>
          <div class="select-group mb-3">
            <select
              type="text"
              class="form-select"
              id="cityList"
              aria-describedby="basic-addon3"
              placeholder="Select country"
            >
              <option selected>Select city/district</option>
            </select>
          </div>
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
        <div class="col-6">
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
        <!-- Site ID -->
        <div class="col-6">
          <label for="siteId" class="form-label">Site ID</label>
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              id="siteId"
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
