<template>
  <div class="memsBg">
    <div class="container">
      <div class="row">
        <Landing v-if="compState === 'landing'" @update-page="updatePage" />
        <div v-else class="row">
          <div>
            <ASSET v-if="compState === 'assetInfo'" @update-page="updatePage" />
            <FACILITY
              v-else-if="compState === 'facilityInfo'"
              @update-page="updatePage"
            />
            <MODEL
              v-else-if="compState === 'modelInfo'"
              @update-page="updatePage"
            />
            <VENDOR
              v-else-if="compState === 'vendorInfo'"
              @update-page="updatePage"
            />
            <MANUFACTURER
              v-else="compState === 'manufacturerInfo'"
              @update-page="updatePage"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ASSET from "../BIOMD/BIOMD-ASSET/ASSET.vue";
import FACILITY from "../BIOMD/BIOMD-FACILITY/FACILITY.vue";
import VENDOR from "../BIOMD/BIOMD-VENDOR/VENDOR.vue";
import MODEL from "../BIOMD/BIOMD-MODEL/MODEL.vue";
import MANUFACTURER from "../BIOMD/BIOMD-MANUFACTURER/MANUFACTURER.vue";
import Landing from "../BIOMD/BIOMD-UI/UI-Landing.vue";

import { ref, provide } from "vue";

const compState = ref("landing"); //asset, facility, model, manufacturer, vendor

// Collect Data for Model
const modelInfo = ref({
  Model_Id: null,
  Manufacturer_Name: null,
  Model_Name: null,
  Model_Number: null,
  Vendor_Name: null,
  Vendor_Site: null,
  Personnel_Name: null,
});

// Collect Data for Manufacturer
const manufacturerInfo = ref({
  Manufacturer_Name: null,
  Country: null,
  State: null,
  City: null,
  Street_Address_1: null,
  Street_Address_2: null,
  Zip: null,
});

// Collect Data for Facility
const facilityInfo = ref({
  Facility_Name: null,
  Country: null,
  State: null,
  City: null,
  Street_Address_1: null,
  Street_Address_2: null,
  Zip: null,
  GPS_Coordinates: null,
});

// Collect Data for Vendor
const vendorInfo = ref({
  Vendor_Name: null,
  Country: null,
  State: null,
  City: null,
  Street_Address_1: null,
  Street_Address_2: null,
  Zip: null,
  Site_Id: null,
  Customer_Service: [
    {
      Contact_Number: null,
      Contact_Name: null,
      Email: null,
      Personnel_Type: null,
    },
  ],
});

// Collect Data for Asset
const assetInfo = ref({
  Equipment_Number: null,
  Equipment_Common_Name: null,
  Equipment_Description: null,
  Serial_Number: null,
  Model_Name: null,
  Manufacturer_Name: null,
  Year_of_Manufacture: null,
  Facility_Name: null,
  Region: null,
  District: null,
  Department: null,
  Location: null,
  Clinical_Engineer: null,
  Support_Team: null,
  Vendor_Name: null,
  Status: null,
  User_Manual: null,
  Technical_Manual: null,
  Purchase_Order_Number: null,
  Project_Name: null,
  Purchase_Cost: null,
  Purchase_Date: null,
  Vendor_Name: null,
  Acceptance_Date: null,
  Warranty_Expiration_Date: null,
  Comments: null,
});

const updatePage = (page) => {
  compState.value = page;
};

provide("assetInfo", assetInfo);
provide("modelInfo", modelInfo);
provide("manufacturerInfo", manufacturerInfo);
provide("vendorInfo", vendorInfo);
provide("facilityInfo", facilityInfo);
</script>

<style lang="scss" scoped>
@import "../BIOMD/Style/BIOMD.scss";
</style>
