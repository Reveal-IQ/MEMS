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
      <span class="title text-dark fw-normal fs-3"
        >Global Inventory Summary by Medical Device Description</span
      >
      <nav class="d-flex gap-3 p-1">
        <small class="text-secondary" style="cursor: pointer">Print</small>
        <small class="text-secondary" style="cursor: pointer">CSV Export</small>
        <small class="text-secondary" style="cursor: pointer">Download</small>
      </nav>
    </div>

    <div class="p-2 mt-4">
      <small class="text-secondary"
        >List of active and inactive medical devices grouped by their device
        description and the total value of active devices.
      </small>
    </div>
    <div class="mt-4 p-2">
      <span class="fw-bold fs-4">Navrongo Hospital</span>
    </div>

    <div class="row">
      <UIStatCard cardTitle="Overall Device Description" statisticsValue="50" />
      <UIStatCard cardTitle="Overall Active Devices" statisticsValue="40" />
      <UIStatCard cardTitle="Overall Value" statisticsValue="$20,000" />
      <UIStatCard cardTitle="Overall Inactive Devices" statisticsValue="10" />
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
              <small class="text-secondary fw-normal">Active Devices</small>
            </th>
            <th scope="col">
              <small class="text-secondary fw-normal">Total Value</small>
            </th>
            <th scope="col">
              <small class="text-secondary fw-normal">Inactive Devices</small>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr style="background-color: #f5f6f6">
            <td><small>10846</small></td>
            <td>
              <small>Circulatory Assist Units, Intra-Aortic Balloon</small>
            </td>
            <td><small>15</small></td>
            <td><small>$15,000</small></td>
            <td><small>12</small></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import UIBtn2 from "../BIOMD-UI/UI-Btn2.vue";
import UIStatCard from "../BIOMD-UI/UI-StatCard";
import UIToastGlobal from "../BIOMD-UI/UI-ToastGlobal.vue";
const emit = defineEmits(["updatePage"]);

const changePage = async (page, props) => {
  emit("updatePage", page, props);
};
</script>

<style lang="scss" scoped></style>
