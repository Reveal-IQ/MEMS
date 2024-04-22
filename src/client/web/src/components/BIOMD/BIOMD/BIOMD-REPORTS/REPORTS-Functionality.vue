<template>
  <div class="container-fluid">
    <nav class="d-flex gap-3 p-2">
      <small
        class="text-secondary"
        style="cursor: pointer"
        @click="changePage('dashboard')"
        >Back</small
      >
    </nav>

    <div class="d-flex flex-column p-2 mt-4">
      <span class="title text-dark fw-normal fs-3">Functionality Index</span>
      <nav class="d-flex gap-3 p-1">
        <small class="text-secondary" style="cursor: pointer">Print</small>
        <small class="text-secondary" style="cursor: pointer">CSV Export</small>
        <small class="text-secondary" style="cursor: pointer">Download</small>
      </nav>
    </div>

    <div class="p-2 mt-4">
      <small class="text-secondary"
        >The functionality index is the percentage of devices in the inventory
        available for use.
      </small>
    </div>
    <div class="mt-4 p-2">
      <span class="fw-bold fs-4">Navrongo Hospital</span>
    </div>

    <div class="row">
      <UIStatCard cardTitle="Functionality Index" statisticsValue="40%" />
    </div>
    <div class="row mt-4">
      <UIStatCard
        cardTitle="Active Devices"
        statisticsValue="60"
        class="fs-5 fw-normal"
      />
      <UIStatCard
        cardTitle="Inactive Devices"
        statisticsValue="90"
        class="fs-5 fw-normal"
      />
      <UIStatCard
        cardTitle="Total Devices"
        statisticsValue="150"
        class="fs-5 fw-normal"
      />
    </div>
  </div>
</template>

<script setup>
import UIStatCard from "../BIOMD-UI/UI-StatCard";

const emit = defineEmits(["updatePage"]);

const changePage = async (page, props) => {
  emit("updatePage", page, props);
};
</script>

<style lang="scss" scoped></style>
