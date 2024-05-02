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
        >Annual Medical Devices Inflow</span
      >
      <nav class="d-flex gap-3 p-1">
        <small class="text-secondary" style="cursor: pointer">Print</small>
        <small class="text-secondary" style="cursor: pointer">CSV Export</small>
        <small class="text-secondary" style="cursor: pointer">Download</small>
      </nav>
    </div>

    <div class="p-2 mt-4">
      <small class="text-secondary"
        >Type and count of devices added to inventory for the selected year.
      </small>
    </div>

    <div class="row mt-4">
      <div class="col-lg-4">
        <div class="form-floating">
          <select
            name="year"
            id="yearId"
            v-model="selectedYear"
            class="form-select"
            :onChange="() => fetchReport()"
          >
            <option v-for="(year, y) in yearsList" :key="y" :value="year">
              {{ year }}
            </option>
          </select>
          <label for="yearId">Select Year</label>
        </div>
      </div>
      <div class="mt-2 px-3" v-if="selectedYear">
        <small
          >Report generated for accepted assets from 1/1/{{ selectedYear }} to
          {{ currentYear }}</small
        >
      </div>
    </div>

    <div class="mt-4 p-2">
      <span class="fw-bold fs-4">{{ props.facilityName }}</span>
    </div>

    <div class="row">
      <UIStatCard
        cardTitle="Overall Accepted Devices"
        :statisticsValue="overallDevices"
        class="fs-4 fw-normal"
      />
      <UIStatCard
        cardTitle="Overall Value"
        :statisticsValue="'$'+overallValue"
        class="fs-4 fw-normal"
      />
    </div>
    <div class="mt-2 table-responsive" v-for="asset in reportList">
      <table class="table table-responsive table-borderless mb-2">
        <thead>
          <tr style="background-color: #f5f6f6">
            <th scope="col" width="20%">
              <small class="text-secondary fw-normal">Device Code</small>
            </th>
            <th scope="col" width="50%">
              <small class="text-secondary fw-normal">Device Description</small>
            </th>
            <th scope="col">
              <small class="text-secondary fw-normal">Accepted Devices</small>
            </th>
            <th scope="col">
              <small class="text-secondary fw-normal">Total Value</small>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr style="background-color: #f5f6f6">
            <td>
              <small>{{ asset.UMDNSCode }}</small>
            </td>
            <td>
              <small>{{ asset.description }}</small>
            </td>
            <td><small>{{ asset.acceptedDevices }}</small></td>
            <td><small>{{ "$" + asset.totalCost }}</small></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import UIStatCard from "../BIOMD-UI/UI-StatCard";
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
const store = useStore();
const sendSocketReq = (request) => {
  store.dispatch("sendSocketReq", request);
};

const yearsList = ref([]);
const selectedYear = ref(null);
const currentYear = ref(new Date().toLocaleDateString());
const getYearsList = () => {
  const startYear = 1990;
  const endYear = new Date().getFullYear();
  for (let i = endYear; i >= startYear; i--) {
    yearsList.value = [...yearsList.value, i];
  }
};

const reportList = ref([]);
const overallDevices = ref(0);
const overallValue = ref(0);

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
          reportType: "inflow",
          reportSpecs: {
            year: selectedYear.value
          }
        },
      },
      callback: (res) => {
        if (res.Type === "RESPONSE") {
          console.log("Response Packet -->", res.Response);
          reportList.value = res.Response.records;
          //calculate overall devices and value (should probably be pulled out into a seperate services just to be clean)
          overallDevices.value = 0;
          overallValue.value = 0;
          var assetList = reportList.value;
          assetList.forEach((asset) => {
            overallValue.value += asset.totalCost;
            overallDevices.value += asset.acceptedDevices;
          });
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
  getYearsList();
});
</script>

<style lang="scss" scoped></style>
