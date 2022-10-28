<template>
  <main>
    <!-- The main form -->
    <Section sectionTitle="Manufacturer Information">
      <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 g-3">
        <!-- Manufacturer Name -->
        <div class="col">
          <Input
            label="Manufacturer Name"
            type="text"
            v-model="manufacturerName"
            id="manufacturerName"
            placeholder="Enter Manufacturer Name"
          />
        </div>
        <!-- Country -->
        <div class="col">
          <label for="countryList" class="form-label">Country</label>
          <select
            id="countryList"
            class="form-select"
            aria-label="Default select example"
            v-model="country"
          >
            <option selected disabled>Choose a Country</option>
            <option v-for="name in countryList" :key="name">
              {{ name }}
            </option>
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
            v-model="region"
          >
            <option selected disabled>Choose a Region</option>
            <option v-for="name in regionList" :key="name">
              {{ name }}
            </option>
          </select>
        </div>
        <!-- City/District -->
        <div class="col">
          <label for="cityList" class="form-label">City/District</label>
          <select
            id="cityList"
            class="form-select"
            aria-label="Default select example"
            v-model="city"
          >
            <option selected disabled>Choose a City</option>
            <option v-for="name in cityList" :key="name">
              {{ name }}
            </option>
          </select>
        </div>
      </div>
      <div class="row g-3 mt-3">
        <!-- Street Address 1 -->
        <div class="col-12">
          <Input
            label="Street Address 1"
            type="text"
            v-model="streetAddress1"
            id="street1"
            placeholder="Enter Street Address 1"
          />
        </div>
        <!-- Street Address 2 -->
        <div class="col-12">
          <Input
            label="Street Address 2"
            type="text"
            v-model="streetAddress2"
            id="street2"
            placeholder="Enter Street Address 2"
          />
        </div>
        <!-- Zip / Postal Code -->
        <div class="col-lg-3">
          <Input
            label="Zip/Postal Code"
            type="number"
            v-model="zipCode"
            id="zip"
            placeholder="Enter Zip/Postal Code"
          />
        </div>
      </div>
    </Section>
  </main>
</template>

<script setup>
import { inject, ref } from "vue";
import Input from "../BIOMD-UI/UI-Input.vue";
import Section from "../BIOMD-UI/UI-Section.vue";

const manufacturerName = inject("manufacturerName");
const country = inject("country");
const region = inject("region");
const city = inject("city");
const streetAddress1 = inject("streetAddress1");
const streetAddress2 = inject("streetAddress2");
const zipCode = inject("zipCode");

const countryList = ref(["Ghana", "Canada", "USA"]);
const regionList = ref(["Greater Accra", "Quebec", "California"]);
const cityList = ref(["Accra", "Montreal", "Los Angeles"]);
</script>

<style lang="scss" scoped>
@import "../Style/BIOMD.scss";
</style>
