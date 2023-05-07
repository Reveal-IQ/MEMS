<template>
  <div class="container">

    <div class="row">
      <div class="col" style="margin-bottom:100px">
        <h1 class="title mt-5">Inventory Dashboard</h1>
      </div>
    </div>

    <!--Medical Equipment Table-->
    <div class="row justify-content-between">
      <div class="col-8" style="margin-bottom:20px">
        <h3 class="sub-title">Medical Equipment</h3>
      </div>
      <div class="col-4 content-left">
        <a class="btn btn-primary" style="margin-right:20px" href="#" role="button">Export</a>
        <a class="btn btn-primary" href="#" role="button">Add New</a>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Equipment ID</th>
              <th scope="col">Serial Number</th>
              <th scope="col">Model</th>
              <th scope="col">Manufacturer</th>
              <th scope="col">Department</th>
              <th scope="col">Location</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="equipment in inventoryList">
              <td v-for="equipmentDetail in equipment">{{ equipmentDetail }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!--Vendor Support Table-->
    <div class="row justify-content-between" style="margin-bottom:20px; margin-top:100px">
      <div class="col-8">
        <h3 class="sub-title">Vendor Support</h3>
      </div>
      <div class="col-4 content-left">
        <a class="btn btn-primary" style="margin-right:20px" href="#" role="button">Export</a>
        <a class="btn btn-primary" href="#" role="button">Add New</a>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Vendor</th>
              <th scope="col">Manufacturers</th>
              <th scope="col">Contact Name</th>
              <th scope="col">Contact Number</th>
              <th scope="col">Email</th>
              <th scope="col">Location</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="vendor in vendorSupport">
              <td v-for="vendorDetail in vendor">{{ vendorDetail }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>


    <!--Additional Page Navigation-->
    <div class="col-8" style="margin-bottom:20px; margin-top:100px">
      <h3 class="sub-title">Create New Records</h3>
    </div>
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 my-3">
      <Card CardTitle="Equipment Registration" CardText="Use this form to Register all new Medical Equipment."
        @click="changePage('assetInfo')" />

      <Card CardTitle="Manufacturer Data" CardText="Use this form to Register all Manufacturers."
        @click="changePage('manufacturerInfo')" />

      <Card CardTitle="Model Data" CardText="Use this form to Register all Models." @click="changePage('modelInfo')" />

      <Card CardTitle="Vendor Data" CardText="Use this form to Register all Vendors." @click="changePage('vendorInfo')" />

      <Card CardTitle="Facility Data" CardText="Use this form to Register all Facilities."
        @click="changePage('facilityInfo')" />
    </div>
  </div>
</template>

<script setup>
//Vue.js Composition API

//Imports
import Card from "../BIOMD-UI/UI-Card.vue";
import { ref } from "vue";

//Demo Data
var inventoryList =
  [{
    EquipmentID: "A1404",
    SerialNumber: "A358302F1",
    Model: "MX800",
    Manufacturer: "Philips",
    Department: "ICU",
    Location: "Bay 7"
  },
  {
    EquipmentID: "12D78",
    SerialNumber: "C3E720345",
    Model: "Connex",
    Manufacturer: "Baxter",
    Department: "PACU",
    Location: "Bay 16"
  }]

var vendorSupport =
  [{
    Vendor: "Life Care Technology Ghana Ltd",
    Manufacturers: "Drager, Masimo, Zoll, Baxter",
    ContactName: "John Dowe",
    ContactNumber: "+233 246509395",
    Email: "N/A",
    Location: "Labone Crescent , ECO bank Junction , House no.7 , Accra"
  },
  {
    Vendor: "Philips West Africa",
    Manufacturers: "Philips",
    ContactName: "Evelyn Lokko",
    ContactNumber: "+233 242439406",
    Email: "evelyn.lokko@philips.com",
    Location: "2nd Floor BPAHeights, #11 Dodi Lane, Airport Residential Area"
  }]


const emit = defineEmits(["updatePage"]);

// Navigate to selected page to edit
const changePage = async (page) => {
  emit("updatePage", page);
};
</script>

<style lang="scss" scoped>
@import "../Style/BIOMD.scss";
</style>
