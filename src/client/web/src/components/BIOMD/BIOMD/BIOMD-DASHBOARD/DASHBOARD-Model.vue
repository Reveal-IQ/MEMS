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
      <span class="title text-dark fw-normal fs-1">{{ props.modelName }}</span>
      <span class="sub-title fs-6 fw-normal"
        >Philips Healthcare | Monitor, Vital Monitor</span
      >
    </div>

    <div class="mt-4 rounded p-4">
      <span class="card-title fw-normal fs-4">Asset Inventory</span>
      <p class="card-text">
        <small class="text-muted"
          >List of all the asset associated models</small
        >
      </p>

      <div class="mb-3">
        <div class="d-flex gap-5">
          <td>
            <div class="d-flex flex-column">
              <small class="text-secondary fsXs">Quantity</small>
              <small class="fw-normal">20</small>
            </div>
          </td>
          <td>
            <div class="d-flex flex-column">
              <small class="text-secondary fsXs">Active</small>
              <small class="fw-normal">18</small>
            </div>
          </td>
          <td>
            <div class="d-flex flex-column">
              <small class="text-secondary fsXs">In-Service</small>
              <small>4</small>
            </div>
          </td>
        </div>
      </div>

      <div
        v-for="asset in assets"
        :key="asset"
        class="mb-2 rounded container py-2 align-middle"
        style="background-color: #f5f6f6"
      >
        <div
          class="d-flex justify-content-between"
          style="cursor: pointer"
          @click="changePage('dashboardAssetDetail')"
        >
          <td class="d-flex position-relative">
            <span
              class="position-absolute border border-light top-50 start-0 p-2 translate-middle rounded-circle bg-success"
            ></span>
            <div class="d-flex flex-column ms-4">
              <small class="text-secondary fsXs">Equipment Number</small>
              <small class="fw-normal">{{ asset.equipmentNumber }}</small>
            </div>
          </td>
          <td>
            <div class="d-flex flex-column">
              <small class="text-secondary fsXs">Model</small>
              <small class="fw-normal">{{ asset.model }}</small>
            </div>
          </td>
          <td>
            <div class="d-flex flex-column">
              <small class="text-secondary fsXs">Manufacturer</small>
              <small>{{ asset.manufacturer }}</small>
            </div>
          </td>
          <td>
            <div class="d-flex flex-column">
              <small class="text-secondary fsXs">Acceptance Date</small>
              <small>{{ asset.acceptanceDate }}</small>
            </div>
          </td>
          <td>
            <div class="d-flex flex-column">
              <small class="text-secondary fsXs">Vendor</small>
              <small>{{ asset.vendor }}</small>
            </div>
          </td>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

//Define Props
const props = defineProps(['modelName','modelID']);

//Variables
const assets = ref([
  {
    equipmentNumber: 12838,
    model: "MX-800",
    manufacturer: "Philips Healthcare",
    quantity: 20,
    active: 16,
    inService: 4,
    acceptanceDate: "11-Jun-23",
    vendor: "Ghana Medical Help",
  },
  {
    equipmentNumber: 12839,
    model: "MX-900",
    manufacturer: "General Electric",
    quantity: 10,
    active: 5,
    inService: 5,
    acceptanceDate: "12-Jun-23",
    vendor: "Ghana Medical Help",
  },
]);

const emit = defineEmits(["updatePage"]);

// Navigate to selected page to edit
const changePage = async (page) => {
  emit("updatePage", page);
};
</script>

<style lang="scss" scoped>
@import "../Style/font-style.scss";
</style>
