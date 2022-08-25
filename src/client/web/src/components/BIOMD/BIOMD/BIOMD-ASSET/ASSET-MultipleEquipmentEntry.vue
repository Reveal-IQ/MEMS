<template>
  <section class="section p-4 rounded mt-4">
    <h5 class="pb-5">Multiple Equipment Entry</h5>
    <div class="d-flex align-center">
      <p class="text-center pe-2">
        1. Serial Number - Department - Location - Comments |
      </p>
      <!-- <a class="text-center px-2 a-link">Remove</a> -->
      <font-awesome-icon icon="trash" size="1x" style="cursor: pointer" />
    </div>

    <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 g-3">
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
      <!-- Department -->
      <div class="col-lg-4 mb-3">
        <label for="departmentList" class="form-label">Department</label>
        <select
          id="departmentList"
          class="form-select"
          aria-label="Default select example"
        >
          <option selected>Select Department</option>
        </select>
      </div>
      <!-- Location -->
      <div class="col-lg-4">
        <label for="locationTag" class="form-label">Location</label>
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            id="locationTag"
            aria-describedby="basic-addon3"
            placeholder="Add Location Room Tags"
          />
        </div>
      </div>
      <!-- Comments -->
      <div class="col-lg-12 col-md-12 mb-3">
        <label for="commentSection" class="form-label">Comments</label>
        <div class="input-group">
          <textarea
            type="text"
            class="form-control"
            id="commentSection"
            aria-describedby="basic-addon3"
            placeholder="Enter Comments"
          ></textarea>
        </div>
      </div>
    </div>
    <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 g-3">
      <div class="col pt-2 pb-2 pl-3 pr-3 p-3">
        <Btn
          BtnName="Add Asset Fleet"
          backgroundColor="#1266F1"
          :icon="'plus'"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import Btn from "../BIOMD-Btn.vue";
</script>

<style lang="scss" scoped>
@import "../../BIOMD/Style/BIOMD.scss";
</style>
