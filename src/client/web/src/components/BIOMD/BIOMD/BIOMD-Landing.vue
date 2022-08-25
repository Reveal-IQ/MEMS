<template>
  <div class="container">
    <h1 class="title mt-5">MEDICAL EQUIPMENT MANAGEMENT SYSTEM (MEMS)</h1>
    <p class="sub-title">Manage your medical equipment</p>

    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 my-3">
      <div class="col">
        <a @click="goToAsset">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Equipment Registration</h5>
              <p class="card-text">
                Use this form to Register all new Medical Equipment.
              </p>
            </div>
            <div class="card-footer">
              <small class="text-muted">Total Equipment: 40</small>
            </div>
          </div>
        </a>
      </div>

      <div class="col">
        <a @click="goToManufacturer">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Manufacturer Data</h5>
              <p class="card-text">
                Use this form to Register all Manufacturers.
              </p>
            </div>
            <div class="card-footer">
              <small class="text-muted">Manufacturer List: 20</small>
            </div>
          </div>
        </a>
      </div>

      <div class="col">
        <a @click="goToModel">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Model Data</h5>
              <p class="card-text">
                Use this form to Register all Manufacturer Models.
              </p>
            </div>
            <div class="card-footer">
              <small class="text-muted">Model List: 20</small>
            </div>
          </div>
        </a>
      </div>

      <div class="col">
        <a @click="goToVendor">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Vendor Data</h5>
              <p class="card-text">
                Use this form to Register all Equipment Vendors.
              </p>
            </div>
            <div class="card-footer">
              <small class="text-muted">Vendor List: 20</small>
            </div>
          </div>
        </a>
      </div>

      <div class="col">
        <a @click="goToFacility">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Facility Data</h5>
              <p class="card-text">Use this form to Register all Facilities.</p>
            </div>
            <div class="card-footer">
              <small class="text-muted">Facility: 1</small>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["updatePage"]);

const goToAsset = async () => {
  emit("updatePage", "assetInfo");
};

const goToModel = async () => {
  emit("updatePage", "modelInfo");
};

const goToManufacturer = async () => {
  emit("updatePage", "manufacturerInfo");
};

const goToVendor = async () => {
  emit("updatePage", "vendorInfo");
};

const goToFacility = async () => {
  emit("updatePage", "facilityInfo");
};
</script>

<style lang="scss" scoped>
.card {
  cursor: pointer;
}
</style>
