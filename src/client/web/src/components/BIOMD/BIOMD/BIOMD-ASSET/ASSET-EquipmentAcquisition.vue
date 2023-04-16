<template>
  <Section sectionTitle="Equipment Acquisition">
    <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 g-3">
      <!-- Purchase Order Number -->
      <div class="col-lg-4 mb-3">
        <label for="purchaseOrder" class="form-label"
          >Purchase Order Number</label
        >
        <select
          id="purchaseOrder"
          class="form-select"
          aria-label="Default select"
        >
          <option selected>Select PO Number</option>
        </select>
      </div>

      <!-- Project -->
      <div class="col-lg-8">
        <Input
          label="Project"
          type="text"
          id="projectName"
          placeholder="Enter Project"
          v-model="EquipmentAcquisition.project"
        />
      </div>
    </div>
    <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 g-3">
      <!-- Purchase Cost -->
      <div class="col-lg-4">
        <Input
          label="Purchase Cost"
          type="number"
          id="purchaseCost"
          placeholder="Enter Purchase Cost"
          v-model="EquipmentAcquisition.purchaseCost"
        />
      </div>
      <!-- Purchase Date -->
      <div class="col-lg-4">
        <Input
          label="Purchase Date"
          type="date"
          id="purchaseDate"
          placeholder="Enter Purchase Date"
          v-model="EquipmentAcquisition.purchaseDate"
        />
      </div>
      <!-- Vendor -->
      <div class="col-lg-4 mb-3">
        <label for="vendorList" class="form-label">Vendor</label>
        <input
          class="form-control"
          list="vendorListOptions"
          id="vendorList"
          placeholder="Select Vendor"
          aria-label="Default select example"
          v-model="EquipmentAcquisition.selectedVendor.vendor_name"
          @input="fetchVendor"
          autocomplete="off"
        />
        <datalist id="vendorListOptions">
          <option
            v-for="vendor in vendorList"
            :key="vendor.index"
            :value="vendor.vendor_name"
          ></option>
        </datalist>
      </div>
      <!-- Acceptance Date -->
      <div class="col-lg-4">
        <Input
          label="Acceptance Date"
          type="date"
          id="acceptanceDate"
          placeholder="Select Acceptance Date"
          v-model="EquipmentAcquisition.acceptanceDate"
        />
      </div>
      <!-- Warranty Expiry Date -->
      <div class="col-lg-4">
        <Input
          label="Warranty Expiration Date"
          type="date"
          id="warrantyDate"
          placeholder="Select Warranty Expiration Date"
          v-model="EquipmentAcquisition.warrantyDate"
        />
      </div>
    </div>
  </Section>
</template>

<script setup>
import { ref, inject, onMounted } from "vue";
import { useStore } from "vuex";

import Input from "../BIOMD-UI/UI-Input.vue";
import Section from "../BIOMD-UI/UI-Section.vue";

const store = useStore();
const sendSocketReq = (request) => {
  store.dispatch("sendSocketReq", request);
};

const vendorList = ref(null);

const EquipmentAcquisition = inject("EquipmentAcquisition");
const Global_Asset_Information = inject("Global_Asset_Information");

const fetchVendor = async (event) => {
  try {
    const selectedVendor = event ? event.target.value : "";
    if (
      event &&
      (!(event instanceof InputEvent) ||
        event.inputType === "insertReplacementText")
    ) {
      EquipmentAcquisition.value.selectedVendor = vendorList.value.find(
        (vendor) => {
          return selectedVendor === vendor.vendor_name;
        }
      );
      Global_Asset_Information.value.vendorId =
        EquipmentAcquisition.value.selectedVendor._id;
      // await fetchModel();
    } else {
      Global_Asset_Information.value.vendorId = null;

      sendSocketReq({
        data: {
          Expiry: 20000,
          Type: "REQUEST",
          Request: {
            Module: "MEMS",
            ServiceCode: "BIOMD",
            API: "FIND_RECORD",
            return_array: true,
            max_list: 100,
            find: {
              collection: "Vendor",
              queries: [
                {
                  field: "vendor_name",
                  op: "sb",
                  value: "^",
                },
              ],
              projection: {
                _id: 1,
                vendor_name: 1,
              },
            },
          },
        },
        callback: (res) => {
          if (res.Type === "RESPONSE") {
            // Console the Response Packet
            console.log("Response Packet -->", res.Response);
            vendorList.value = res.Response.records;
          } else if (res.Type === "ERROR") {
            // Error response received during fetching
            Type: "ERROR";
            Response: {
              Error_Code: "API-CREATE_RECORD-E001";
              Error_Msg: "CREATE_RECORD_API: Failed to execute query";
            }
          }
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  fetchVendor();
});
</script>

<style lang="scss" scoped>
@import "../../BIOMD/Style/BIOMD.scss";
</style>
