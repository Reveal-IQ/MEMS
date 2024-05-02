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
      <span class="fw-bold fs-4">{{ props.facilityName }}</span>
    </div>

    <div class="row">
      <UIStatCard cardTitle="Functionality Index" :statisticsValue="percentage + '%'" />
    </div>
    <div class="mt-2 table-responsive" v-for="asset in reportList">
      <table class="table table-responsive table-borderless mb-2">
        <thead>
          <tr style="background-color: #f5f6f6">
            <th scope="col">
              <small class="text-secondary fw-normal">Active Devices</small>
            </th>
            <th scope="col">
              <small class="text-secondary fw-normal">Total Devices</small>
            </th>
            <th scope="col">
              <small class="text-secondary fw-normal">Inactive Devices</small>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr style="background-color: #f5f6f6">
            <td><small>{{ asset.active }}</small></td>
            <td><small>{{ asset.active + asset.inactive }}</small></td>
            <td><small>{{ asset.inactive }}</small></td>
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

const reportList = ref([]);
const percentage = ref();

const fetchReport = async () => {
  console.log("calling function");
  try {
    sendSocketReq({
      data: {
        Expiry: 20000,
        Type: "REQUEST",
        Request: {
          Module: "MEMS",
          ServiceCode: "BIOMD",
          API: "GET_REPORTS",
          reportType: "functionality",
        },
      },
      callback: (res) => {
        if (res.Type === "RESPONSE") {
          console.log("Response Packet -->", res.Response);
          reportList.value = res.Response.records;
          let asset = reportList.value[0];
          console.log(asset)
          percentage.value = (asset.active/(asset.active + asset.inactive))*100;
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
  fetchReport();
});
</script>

<style lang="scss" scoped></style>
