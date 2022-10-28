<template>
  <main>
    <!-- The main form -->
    <Section sectionTitle="Vendor Information">
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
              placeholder="Enter Vendor Name"
              v-model="vendorName"
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
              v-model="country"
            >
              <option selected>Select country</option>
              <option v-for="name in countryList" :key="name">
                {{ name }}
              </option>
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
              v-model="region"
            >
              <option selected>Select province/state/region</option>
              <option v-for="name in regionList" :key="name">
                {{ name }}
              </option>
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
              v-model="city"
            >
              <option selected>Select city/district</option>
              <option v-for="name in cityList" :key="name">
                {{ name }}
              </option>
            </select>
          </div>
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
            v-model="streetAddress1"
          />
        </div>
        <!-- Street Address 2 -->
        <div class="col-12">
          <Input
            label="Street Address 2"
            type="text"
            id="street2"
            placeholder="Enter Street Address 2"
            v-model="streetAddress2"
          />
        </div>
        <!-- Zip / Postal Code -->
        <div class="col-lg-6">
          <Input
            label="Zip/Postal Code"
            type="number"
            id="zip"
            placeholder="Enter Zip/Postal Code"
            v-model="zipCode"
          />
        </div>
        <!-- Site ID -->
        <div class="col-6">
          <Input
            label="Site Id"
            type="text"
            id="siteId"
            placeholder="Enter Site ID"
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

const vendorName = inject("vendorName");
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
