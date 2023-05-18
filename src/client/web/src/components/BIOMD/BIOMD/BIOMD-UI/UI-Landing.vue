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
              <th scope="col">Asset Code</th>
              <th scope="col">Serial Number</th>
              <th scope="col">Model</th>
              <th scope="col">Manufacturer</th>
              <th scope="col">Facility</th>
              <th scope="col">Department</th>
              <th scope="col">Location</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="equipment in inventoryList">
              <td>{{ equipment.assetCode}}</td>
              <td>{{ equipment.serialNumber}}</td>
              <td>{{ equipment.model.model_name}}</td>
              <td>{{ equipment.manufacturer.manufacturer_name}}</td>
              <td>{{ equipment.facility.facility_name }}</td>
              <td>{{ equipment.department}}</td>
              <td>{{ equipment.roomTag}}</td>
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
              <td>{{ vendor.vendor_name}}</td>
              <td>{{ vendor.manufacturers}}</td>
              <td>{{ vendor.contact[0].name}}</td>
              <td>{{ vendor.contact[0].number}}</td>
              <td>{{ vendor.contact[0].email}}</td>
              <td>{{ vendor.location}}</td>
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
import { ref, onMounted } from 'vue';
import { useStore } from "vuex";

//Variables
const vendorSupport = ref(null);
const inventoryList = ref(null);
const store = useStore();

//Functions
const sendSocketReq = (request) => {
  store.dispatch("sendSocketReq", request);
};

//Fetch Vendor Support Information
var fetchVendor = () => {
  var req =
  {
    Expiry: 20000,
    Type: "REQUEST",
    Request: {
      Module: "MEMS",
      ServiceCode: "BIOMD",
      API: "LIST_VENDORS",
      list: {
        projection: {
          "vendor_name": 1,
          "contact": 1,
          "manufacturers": 1,
        }
      }
    }
  }
  
  sendSocketReq({
    data: req,
    callback: (res) => {
      let vendorList = res.Response.records

      //List Manufacturers
      vendorList = vendorList.map( (i) => {
        i.manufacturers = i.manufacturers.map(
          e => e.manufacturer_name
        ).join(", ");

        return i
      }
      )

      vendorSupport.value = vendorList
    }
  }
  )
}

//Fetch Assets Support Information
var fetchAssets = () => {
  var req =
  {
    Expiry: 20000,
    Type: "REQUEST",
    Request: {
      Module: "MEMS",
      ServiceCode: "BIOMD",
      API: "LIST_ASSETS",
      list: {
        projection: {
          "assetCode": 1,
          "serialNumber": 1,
          "department":1,
          "roomTag":1
        }
      }
    }
  }
  
  sendSocketReq({
    data: req,
    callback: (res) => {
      inventoryList.value = res.Response.records

      console.log("Vendor Support: "+ JSON.stringify(inventoryList))
    }
  }
  )
}

//Lifecycle Hook
onMounted(() => {
  fetchVendor();
  fetchAssets();
});


const emit = defineEmits(["updatePage"]);

// Navigate to selected page to edit
const changePage = async (page) => {
  emit("updatePage", page);
};
</script>

<style lang="scss" scoped>
@import "../Style/BIOMD.scss";
</style>
