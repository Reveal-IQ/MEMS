<template>
  <Section sectionTitle="Maintenance and Support">
    <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 g-3">
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
          <option selected>Select Clinical Engineer</option>
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
          v-model="MaintenanceAndSupport.supportTeam"
        >
          <option selected>Select Support Team</option>
        </select>
      </div>
      <div class="col-lg-6 mb-3">
        <label for="statusList" class="form-label">Status</label>
        <select
          id="statusList"
          class="form-select"
          aria-label="Default select example"
          v-model="MaintenanceAndSupport.status"
        >
          <option selected value="Active Deployed">Active Deployed</option>
          <option
            v-for="list in statusList"
            :key="list.value"
            :value="list.value"
          >
            {{ list.name }}
          </option>
        </select>
      </div>
    </div>
    <div
      class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 g-3 mb-3"
    >
      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          value=""
          id="userManual"
          v-model="MaintenanceAndSupport.userManual"
        />
        <label class="form-check-label" for="userManual">
          User Manual Available?
        </label>
      </div>
    </div>
    <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 g-3">
      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          value=""
          id="techManual"
          v-model="MaintenanceAndSupport.technicalManual"
        />
        <label class="form-check-label" for="techManual">
          Technical Manual Available?
        </label>
      </div>
    </div>
  </Section>
</template>

<script setup>
import { ref, inject } from "vue";
import Section from "../BIOMD-UI/UI-Section.vue";

const MaintenanceAndSupport = inject("MaintenanceAndSupport");

const statusList = ref([
  { name: "Active in Storage", value: "Active in Storage" },
  { name: "Active in Service", value: "Active in Service" },
  { name: "Storage Repairable", value: "Storage Repairable" },
  { name: "Storage Parts", value: "Storage Parts" },
  { name: "Disposed", value: "Disposed" },
]);
</script>

<style lang="scss" scoped>
@import "../../BIOMD/Style/BIOMD.scss";
</style>
