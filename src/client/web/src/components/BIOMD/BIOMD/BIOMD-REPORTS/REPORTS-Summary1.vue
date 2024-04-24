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
      <span class="fw-bold fs-4">{{ props.facilityName }}</span>
    </div>

    <div class="row">
      <UIStatCard
        cardTitle="Overall Device Description"
        statisticsValue="50"
        class="fs-4 fw-normal"
      />
      <UIStatCard
        cardTitle="Overall Active Devices"
        statisticsValue="40"
        class="fs-4 fw-normal"
      />
      <UIStatCard
        cardTitle="Overall Value"
        statisticsValue="$20,000"
        class="fs-4 fw-normal"
      />
      <UIStatCard
        cardTitle="Overall Inactive Devices"
        statisticsValue="10"
        class="fs-4 fw-normal"
      />
    </div>
    <div class="mt-4 table-responsive">
      <table
        class="table table-responsive table-borderless mb-2"
        v-for="asset in assetList"
      >
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
            <td>
              <small>{{ asset.assetCode }}</small>
            </td>
            <td>
              <small>{{ asset.commonName }}</small>
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
import { ref, onMounted } from "vue";
import UIStatCard from "../BIOMD-UI/UI-StatCard";
import { useStore } from "vuex";

const store = useStore();
const sendSocketReq = (request) => {
  store.dispatch("sendSocketReq", request);
};

const assetList = ref([]);

const fetchAsset = async () => {
  try {
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
            collection: "Asset",
            lookups: [
              {
                localField: "modelID",
                collection: "Model",
                foreignField: "_id",
                as: "Model",
              },
              {
                localField: "manufacturerID",
                collection: "Manufacturer",
                foreignField: "_id",
                as: "Manufacturer",
              },
            ],
            projection: {
              _id: 1,
              assetCode: 1,
              modelName: "$Model.modelName",
              commonName: "$Model.commonName",
              UMDNSCode: "$Model.UMDNSCode",
              manufacturerName: "$Manufacturer.manufacturerName",
            },
          },
        },
      },
      callback: (res) => {
        if (res.Type === "RESPONSE") {
          console.log("Response Packet -->", res.Response);
          assetList.value = res.Response.records;
        } else if (res.Type === "ERROR") {
          Type: "ERROR";
          Response: {
            Error_Code: "API-CREATE_RECORD-E001";
            Error_Msg: "CREATE_RECORD_API: Failed to execute query";
          }
        }
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const emit = defineEmits(["updatePage"]);

const changePage = async (page, props) => {
  emit("updatePage", page, props);
};

const props = defineProps(["facilityName", "facilityID"]);

onMounted(() => {
  fetchAsset();
});
</script>

<style lang="scss" scoped></style>
