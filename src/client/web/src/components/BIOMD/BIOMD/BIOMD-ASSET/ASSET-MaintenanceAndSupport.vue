<template>
  <Section sectionTitle="Maintenance and Support">
    <!-- Assign Clinical Engineer -->
    <div class="col-lg-6 mb-3">
      <label for="clinicalEngineerList" class="form-label"
        >Assign Clinical Engineer</label
      >
      <select
        id="clinicalEngineerList"
        class="form-select"
        aria-label="Default select example"
      >
        <option selected>Assign Clinical Engineer</option>
      </select>
    </div>
    <!-- Assign Support Team -->
    <div class="col-lg-6 mb-3">
      <label for="supportTeamList" class="form-label"
        >Assign Support Team</label
      >
      <select
        id="supportTeamList"
        class="form-select"
        aria-label="Default select example"
      >
        <option selected>Assign Support Team</option>
      </select>
    </div>
  </Section>
</template>

<script setup>
import { inject } from "vue";
import Section from "../BIOMD-UI/UI-Section.vue";

const MaintenanceAndSupport = inject("MaintenanceAndSupport");
</script>

<style lang="scss" scoped>
@import "../../BIOMD/Style/BIOMD.scss";
</style>
