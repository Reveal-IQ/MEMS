<template>
  <div class="container-fluid">
    <nav class="d-flex gap-3 p-2">
      <small
        class="text-secondary"
        style="cursor: pointer"
        @click="changePage('landing')"
        >Dashboard</small
      >
      <small
        class="text-secondary"
        style="cursor: pointer"
        @click="changePage('assetInfo')"
        >New Asset</small
      >
      <small
        class="text-secondary"
        style="cursor: pointer"
        @click="changePage('vendorInfo')"
        >New Model</small
      >
      <small
        class="text-secondary"
        style="cursor: pointer"
        @click="changePage('departmentInfo')"
        >Department</small
      >
      <small
        class="text-secondary"
        style="cursor: pointer"
        @click="changePage('facilityInfo')"
        >Facility</small
      >
    </nav>

    <!--Additional Page Navigation-->
    <div class="d-flex flex-column p-2 mt-4">
      <span class="title text-dark fw-normal fs-1">Dashboard</span>
      <span class="sub-title fs-6 fw-normal"
        >Snapshot for medical equipment inventory</span
      >
    </div>

    <div class="rounded mt-4" style="background-color: #e3f6f5">
      <div class="card-body">
        <h5 class="card-title" style="color: #298a85">Welcome John!</h5>
        <p class="card-text">
          <small class="text-muted"
            >This is your dashboard of medical equipment assigned to you and
            your team</small
          >
        </p>
      </div>
    </div>

    <div class="mt-4 rounded p-4">
      <span class="card-title fw-normal fs-4">Site Inventory</span>
      <p class="card-text">
        <small class="text-muted">Summary of all the asset models</small>
      </p>

      <div
        v-for="asset in assets"
        :key="asset"
        class="g-3 mb-2 rounded container py-2 align-middle"
        style="background-color: #f5f6f6"
      >
        <div class="d-flex justify-content-between" style="cursor: pointer">
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
              <small class="text-secondary fsXs">Quantity</small>
              <small>{{ asset.quantity }}</small>
            </div>
          </td>
          <td>
            <div class="d-flex flex-column">
              <small class="text-secondary fsXs">Active</small>
              <small>{{ asset.active }}</small>
            </div>
          </td>
          <td>
            <div class="d-flex flex-column">
              <small class="text-secondary fsXs">In-Service</small>
              <small>{{ asset.inService }}</small>
            </div>
          </td>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

//Variables

const assets = ref([
  {
    model: "MX-800",
    manufacturer: "Philips Healthcare",
    quantity: 20,
    active: 16,
    inService: 4,
  },
  {
    model: "MX-900",
    manufacturer: "General Electric",
    quantity: 10,
    active: 5,
    inService: 5,
  },
]);

//Functions

//Fetch Assets Information

//Lifecycle Hook

const emit = defineEmits(["updatePage"]);

// Navigate to selected page to edit
const changePage = async (page) => {
  emit("updatePage", page);
};
</script>

<style lang="scss" scoped>
@import "../Style/BIOMD.scss";
</style>
