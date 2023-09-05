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
        v-model="MaintenanceAndSupport.supportTeam"
      >
        <option selected>Assign Support Team</option>
      </select>
    </div>
    <!-- <div class="col-lg-6 mb-3">
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
    </div> -->
  </Section>
</template>

<script setup>
import { ref, inject } from "vue";
import Section from "../BIOMD-UI/UI-Section.vue";

const MaintenanceAndSupport = inject("MaintenanceAndSupport");

// const statusList = ref([
//   { name: "Active in Storage", value: "Active in Storage" },
//   { name: "Active in Service", value: "Active in Service" },
//   { name: "Storage Repairable", value: "Storage Repairable" },
//   { name: "Storage Parts", value: "Storage Parts" },
//   { name: "Disposed", value: "Disposed" },
// ]);
</script>

<style lang="scss" scoped>
@import "../../BIOMD/Style/BIOMD.scss";
</style>
