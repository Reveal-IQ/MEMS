<template>
  <div class="container-fluid">
    <nav class="d-flex gap-3 p-2">
      <small
        class="text-secondary"
        style="cursor: pointer"
        @click="
          changePage('reportsList', {
            facilityName: props.facilityName,
          })
        "
        >Back</small
      >
    </nav>

    <div class="d-flex flex-column p-2 mt-4">
      <span class="title text-dark fw-normal fs-3"
        >Annual Medical Devices Inflow</span
      >
      <nav class="d-flex gap-3 p-1">
        <small class="text-secondary" style="cursor: pointer">Print</small>
        <small class="text-secondary" style="cursor: pointer">CSV Export</small>
        <small class="text-secondary" style="cursor: pointer">Download</small>
      </nav>
    </div>

    <div class="p-2 mt-4">
      <small class="text-secondary"
        >Type and count of devices added to inventory for the selected year.
      </small>
    </div>

    <div class="row mt-4">
      <div class="col-lg-4">
        <div class="form-floating">
          <select
            name="year"
            id="yearId"
            v-model="selectedYear"
            class="form-select"
          >
            <option v-for="(year, y) in yearsList" :key="y" :value="year">
              {{ year }}
            </option>
          </select>
          <label for="yearId">Select Year</label>
        </div>
      </div>
      <div class="mt-2 px-3" v-if="selectedYear">
        <small
          >Report generated for accepted assets from 1/1/{{ selectedYear }} to
          {{ currentYear }}</small
        >
      </div>
    </div>

    <div class="mt-4 p-2">
      <span class="fw-bold fs-4">{{ props.facilityName }}</span>
    </div>

    <div class="row">
      <UIStatCard
        cardTitle="Overall Accepted Devices"
        statisticsValue="40"
        class="fs-4 fw-normal"
      />
      <UIStatCard
        cardTitle="Overall Value"
        statisticsValue="$10,000"
        class="fs-4 fw-normal"
      />
    </div>
    <div class="mt-4 table-responsive">
      <table class="table table-responsive table-borderless mb-2">
        <thead>
          <tr style="background-color: #f5f6f6">
            <th scope="col">
              <small class="text-secondary fw-normal">Device Code</small>
            </th>
            <th scope="col">
              <small class="text-secondary fw-normal">Device Description</small>
            </th>
            <th scope="col">
              <small class="text-secondary fw-normal">Accepted Devices</small>
            </th>
            <th scope="col">
              <small class="text-secondary fw-normal">Total Value</small>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr style="background-color: #f5f6f6">
            <td><small>10846</small></td>
            <td>
              <small>Circulatory Assist Units, Intra-Aortic Balloon</small>
            </td>
            <td><small>12</small></td>
            <td><small>$15,000</small></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const yearsList = ref([]);
const selectedYear = ref(null);
const currentYear = ref(new Date().toLocaleDateString());
const getYearsList = () => {
  const startYear = 1990;
  const endYear = new Date().getFullYear();
  for (let i = endYear; i >= startYear; i--) {
    yearsList.value = [...yearsList.value, i];
  }
};
import UIStatCard from "../BIOMD-UI/UI-StatCard";
const emit = defineEmits(["updatePage"]);
const changePage = async (page, props) => {
  emit("updatePage", page, props);
};
const props = defineProps(["facilityName", "facilityID"]);
onMounted(() => {
  getYearsList();
});
</script>

<style lang="scss" scoped></style>
