<template>
  <section class="section p-4 rounded mt-4">
    <h5 class="pb-5">Customer Service Contact</h5>
    <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 g-3">
      <!-- Contact Number -->
      <div class="col">
        <label for="contactNumber" class="form-label">Contact Number</label>
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            id="contactNumber"
            aria-describedby="basic-addon3"
            placeholder="Enter details"
          />
        </div>
      </div>
      <!-- Representative Name -->
      <div class="col">
        <label for="repName" class="form-label">Representative Name</label>
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            id="repName"
            aria-describedby="basic-addon3"
            placeholder="Enter details"
          />
        </div>
      </div>
      <!-- Email  -->
      <div class="col">
        <label for="email" class="form-label">Email</label>
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            id="email"
            aria-describedby="basic-addon3"
            placeholder="Enter details"
          />
        </div>
      </div>
      <!-- Type of Personnel -->
      <div class="col">
        <label for="personnelType" class="form-label">Type of Personnel</label>
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            id="personnelType"
            aria-describedby="basic-addon3"
            placeholder="Enter details"
          />
        </div>
      </div>
    </div>
    <div class="col pt-2 pb-2 pl-3 pr-3 p-3">
      <Btn
        BtnName="Add New Contact"
        backgroundColor="#1266F1"
        :icon="'plus'"
        class=""
      />
    </div>
  </section>
</template>

<script setup>
import Btn from "../BIOMD-Btn.vue";
</script>

<style lang="scss" scoped>
@import "../Style/BIOMD.scss";
</style>
