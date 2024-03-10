<template>
  <Section sectionTitle="Equipment Acquisition">
    <!-- Purchase Order Number -->
    <div class="col-lg-6 mb-3">
      <label for="purchaseOrder" class="form-label"
        >Purchase Order Number</label
      >
      <select
        id="purchaseOrder"
        class="form-select"
        aria-label="Default select"
      >
        <option selected>Select PO</option>
      </select>
    </div>

    <!-- Acceptance Date -->
    <div class="col-lg-6">
      <Input
        label="Acceptance Date"
        type="date"
        id="acceptanceDate"
        placeholder="Select Acceptance Date"
        v-model="PurchaseDetails.acceptanceDate"
      />
    </div>

    <div class="col-lg-12">
      <div class="py-3 px-2">
        <span class="fw-bold">PO Details</span>
        <div class="d-flex flex-column gap-1">
          <span>Vendor: </span>
          <span>Purchase Order: </span>
          <span>Purchase Date: </span>
        </div>
      </div>
      <div class="py-3 px-2">
        <span class="fw-bold">Select Equipment Line Item</span>
        <table class="table table-striped table-borderless">
          <thead class="">
            <tr>
              <th scope="col"></th>
              <th scope="col">Item Name</th>
              <th scope="col">Unit Price</th>
              <th scope="col">Currency</th>
              <th scope="col">Quantity</th>
              <th scope="col">Received Quantity</th>
              <th scope="col">Project</th>
            </tr>
          </thead>
          <tbody class="align-middle">
            <tr>
              <td scope="row">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="defaultCheck1"
                  />
                </div>
              </td>
              <td scope="row">Intellivue MX800</td>
              <td scope="row">80</td>
              <td scope="row">USD</td>
              <td scope="row">20</td>
              <td scope="row">8</td>
              <td scope="row">GMH</td>
            </tr>
          </tbody>
        </table>
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

const PurchaseDetails = inject("PurchaseDetails");
const GlobalAssetInformation = inject("GlobalAssetInformation");

// const fetchVendor = async (event) => {
//   try {
//     const selectedVendor = event ? event.target.value : "";
//     if (
//       event &&
//       (!(event instanceof InputEvent) ||
//         event.inputType === "insertReplacementText")
//     ) {
//       PurchaseDetails.value.selectedVendor = vendorList.value.find(
//         (vendor) => {
//           return selectedVendor === vendor.vendor_name;
//         }
//       );
//       GlobalAssetInformation.value.vendorID =
//         PurchaseDetails.value.selectedVendor._id;
//     } else {
//       GlobalAssetInformation.value.vendorID = null;

//       sendSocketReq({
//         data: {
//           Expiry: 20000,
//           Type: "REQUEST",
//           Request: {
//             Module: "MEMS",
//             ServiceCode: "BIOMD",
//             API: "FIND_RECORD",
//             return_array: true,
//             max_list: 100,
//             find: {
//               collection: "Vendor",
//               queries: [
//                 {
//                   field: "vendor_name",
//                   op: "sb",
//                   value: "^",
//                 },
//               ],
//               projection: {
//                 _id: 1,
//                 vendor_name: 1,
//               },
//             },
//           },
//         },
//         callback: (res) => {
//           if (res.Type === "RESPONSE") {
//             // Console the Response Packet
//             console.log("Response Packet -->", res.Response);
//             vendorList.value = res.Response.records;
//           } else if (res.Type === "ERROR") {
//             // Error response received during fetching
//             Type: "ERROR";
//             Response: {
//               Error_Code: "API-CREATE_RECORD-E001";
//               Error_Msg: "CREATE_RECORD_API: Failed to execute query";
//             }
//           }
//         },
//       });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

onMounted(() => {
  // fetchVendor();
});
</script>

<style lang="scss" scoped>
@import "../../BIOMD/Style/BIOMD.scss";
</style>
