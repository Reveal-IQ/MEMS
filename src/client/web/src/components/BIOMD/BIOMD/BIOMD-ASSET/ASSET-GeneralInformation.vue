<template>
  <Section sectionTitle="General Information">
    <!-- Equipment Number -->
    <div class="col-lg-6 mb-3">
      <Input
        label="Equipment Number"
        type="number"
        id="equipmentNumber"
        placeholder="Enter Equipment Number"
        v-model="GeneralInformation.equipmentNumber"
      />
    </div>

    <!-- Equipment Class -->
    <div class="col-lg-6 mb-3">
      <label for="descriptionList" class="form-label">Equipment Class</label>
      <select
        id="descriptionList"
        class="form-select"
        aria-label="Default select example"
        v-model="GeneralInformation.description"
      >
        <option selected>Select Equipment Class</option>
      </select>
    </div>

    <!-- Equipment Common Name -->
    <div class="col-lg-6 mb-3">
      <label for="commonNameList" class="form-label">Common Name</label>
      <select
        id="commonNameList"
        class="form-select"
        v-model="GeneralInformation.commonName"
      >
        <option selected disabled>Select Common Name</option>
        <option v-for="name in commonNameList" :key="name">
          {{ name }}
        </option>
      </select>
    </div>

    <!-- Equipment Description -->
    <div class="col-lg-6 mb-3">
      <label for="descriptionList" class="form-label">Equipment Type</label>
      <select
        id="descriptionList"
        class="form-select"
        aria-label="Default select example"
        v-model="GeneralInformation.description"
      >
        <option selected>Select Equipment Type</option>
      </select>
    </div>

    <!-- Parent Asset -->
    <div class="col-lg-6 mb-3">
      <label for="descriptionList" class="form-label">Parent Asset</label>
      <select
        id="descriptionList"
        class="form-select"
        aria-label="Default select example"
        v-model="GeneralInformation.description"
      >
        <option selected>Select Parent Asset</option>
      </select>
    </div>
  </Section>
</template>

<script setup>
import { ref, inject } from "vue";

import Input from "../BIOMD-UI/UI-Input.vue";
import Section from "../BIOMD-UI/UI-Section.vue";

// Inject Asset Information
const GeneralInformation = inject("GeneralInformation");

const commonNameList = ref(["concentrator", "bp apparatus", "gun thermometer"]);
</script>

<style lang="scss" scoped>
@import "../../BIOMD/Style/BIOMD.scss";
</style>
