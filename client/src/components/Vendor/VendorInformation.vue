<script>
export default {
  name: "VendorInformation",
};
</script>
<template>
  <main>
    <!-- The main form -->
    <form class="bg-white p-4 rounded">
      <h5 class="pb-5">Vendor Information</h5>

      <!-- 
        The code below uses bootstrap to use grid and align 
        itself in different way when the screen size is different.

        row-col-sm-2: this sets how the row and col should be aligned when the screen size is smaller than 768px. 
        row-cols-md-3: this sets how the row and col should be aligned when the screen size is between 768px and 992px.
        g-3: this sets the gutters of the row and col.

        to learn more look at : https://getbootstrap.com/docs/5.2/layout/grid/
      -->
      <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 g-3">
        <!-- Vendor Name -->
        <div class="col">
          <label for="basic-url" class="form-label">Vendor Name</label>
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
          <div class="select-group mb-3">
            <select
              type="text"
              class="form-select"
              id="basic-url"
              aria-describedby="basic-addon3"
              placeholder="Select country"
            >
              <option selected>Select country</option>
              <!-- <option value="United States">United States</option>
              <option value="Canada">Canada</option>
              <option value="Ghana">Ghana</option> -->
            </select>
          </div>
        </div>
        <!-- Province/State/Region -->
        <div class="col">
          <label for="basic-url" class="form-label"
            >Province/State/Region</label
          >
          <div class="select-group mb-3">
            <select
              type="text"
              class="form-select"
              id="basic-url"
              aria-describedby="basic-addon3"
              placeholder="Select country"
            >
              <option selected>Select province/state/region</option>
              <!-- <option value="Ontario">Ontario</option>
              <option value="Quebec">Quebec</option>
              <option value="British Colombia">British Colombia</option> -->
            </select>
          </div>
        </div>
        <!-- City/District -->
        <div class="col">
          <label for="basic-url" class="form-label">City/District</label>
          <div class="select-group mb-3">
            <select
              type="text"
              class="form-select"
              id="basic-url"
              aria-describedby="basic-addon3"
              placeholder="Select country"
            >
              <option selected>Select city/district</option>
              <!-- <option value="Toronto">Toronto</option>
              <option value="Ottawa">Ottawa</option>
              <option value="Hamilton"> Hamilton</option> -->
            </select>
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
        <div class="col-6">
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
        <!-- Site ID -->
        <div class="col-6">
          <label for="basic-url" class="form-label">Site ID</label>
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
    <br />
    <!-- Secondary form -->
    <form class="bg-white p-4 rounded">
      <h5 class="pb-5">Customer Service Contact</h5>
      <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 g-3">
        <!-- Contact Number -->
        <div class="col">
          <label for="basic-url" class="form-label">Contact Number</label>
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
        <!-- Representative Name -->
        <div class="col">
          <label for="basic-url" class="form-label">Representative Name</label>
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
        <!-- Email  -->
        <div class="col">
          <label for="basic-url" class="form-label">Email</label>
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
        <!-- Type of Personnel -->
        <div class="col">
          <label for="basic-url" class="form-label">Type of Personnel</label>
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
      <br />
      <button class="btn btn-blue">Add New Contact</button>
    </form>
    <!-- The final button -->
    <div class="d-flex row justify-content-center py-3">
      <!-- btn-green and a-link are custom css for MEMS check base.css -->
      <button class="btn btn-green">Create New Vendor</button>
      <a class="text-center py-2 a-link">Clear Content</a>
    </div>
  </main>
</template>
<style></style>
