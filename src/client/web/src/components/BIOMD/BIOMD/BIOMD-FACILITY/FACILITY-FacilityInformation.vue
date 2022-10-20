<template>
  <main>
    <Section sectionTitle="Facility Information">
      <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 g-3">
        <!-- Facility Name -->
        <div class="col">
          <Input
            label="Facility Name"
            type="text"
            id="facilityName"
            placeholder="Enter Facility Name"
          />
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
          <Input
            label="Street Address 1"
            type="text"
            id="street1"
            placeholder="Enter Street Address 1"
          />
        </div>
        <!-- Street Address 2 -->
        <div class="col-12">
          <Input
            label="Street Address 2"
            type="text"
            id="street2"
            placeholder="Enter Street Address 2"
          />
        </div>
        <!-- Zip / Postal Code -->
        <div class="col-lg-3">
          <Input
            label="Zip/Postal Code"
            type="number"
            id="zip"
            placeholder="Enter Zip/Postal Code"
          />
        </div>

        <!-- GPS Coordinates -->
        <div class="col-lg-6">
          <Input
            label="GPS Coordinates"
            type="text"
            id="gps"
            placeholder="Select GPS Coordinates"
          />
        </div>

        <div class="col-lg-3 align-self-center g-3">
          <Btn2
            BtnName="Generate GPS Coordinates"
            :icon="'globe'"
            class="rounded-pill"
          />
        </div>

        <!-- Department List -->
        <div class="col-12">
          <Input
            label="Department"
            type="text"
            id="departmentTag"
            placeholder="Add Department Tag"
          />
        </div>
      </div>
    </Section>
  </main>
</template>

<script setup>
import Btn2 from "../BIOMD-UI/UI-Btn2.vue";
import Input from "../BIOMD-UI/UI-Input.vue";
import Section from "../BIOMD-UI/UI-Section.vue";
</script>

<style lang="scss" scoped>
@import "../Style/BIOMD.scss";
</style>
