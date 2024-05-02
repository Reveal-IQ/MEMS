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
        >Global Inventory Summary by Department</span
      >
      <nav class="d-flex gap-3 p-1">
        <small class="text-secondary" style="cursor: pointer">Print</small>
        <small class="text-secondary" style="cursor: pointer">CSV Export</small>
        <small class="text-secondary" style="cursor: pointer">Download</small>
      </nav>
    </div>

    <div class="p-2 mt-4">
      <small class="text-secondary"
        >List of active and inactive medical devices grouped by their
        departments and the total value of active devices.
      </small>
    </div>
    <div class="mt-4 p-2">
      <span class="fw-bold fs-4">{{ props.facilityName }}</span>
    </div>

    <div class="row">
      <UIStatCard
        cardTitle="Overall Departments"
        :statisticsValue="reportList.length"
        class="fs-4 fw-normal"
      />
      <UIStatCard
        cardTitle="Overall Active Devices"
        :statisticsValue="overallActive"
        class="fs-4 fw-normal"
      />
      <UIStatCard
        cardTitle="Overall Value"
        :statisticsValue="'$' + overallValue"
        class="fs-4 fw-normal"
      />
      <UIStatCard
        cardTitle="Overall Inactive Devices"
        :statisticsValue="overallInactive"
        class="fs-4 fw-normal"
      />
    </div>
    <div class="mt-4 table-responsive">
      <table
        class="table table-responsive table-borderless mb-2"
        v-for="record in reportList"
        :key="record.department"
      >
        <thead>
          <tr style="background-color: #f5f6f6">
            <th scope="col">
              <small class="text-secondary fw-normal">Department</small>
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
              <small>{{ record.department }}</small>
            </td>
            <td>
              <small>{{ record.active }}</small>
            </td>
            <td>
              <small>{{"$" + record.totalCost }}</small>
            </td>
            <td>
              <small>{{ record.inactive }}</small>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import UIBtn2 from "../BIOMD-UI/UI-Btn2.vue";
import UIStatCard from "../BIOMD-UI/UI-StatCard";
import UIToastGlobal from "../BIOMD-UI/UI-ToastGlobal.vue";
import { useStore } from "vuex";
const store = useStore();
const sendSocketReq = (request) => {
  store.dispatch("sendSocketReq", request);
};

const reportList = ref([]);
const overallValue = ref(0);
const overallActive = ref(0);
const overallInactive = ref(0);

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
          reportType: "department",
        },
      },
      callback: (res) => {
        if (res.Type === "RESPONSE") {
          console.log("Response Packet -->", res.Response);
          reportList.value = res.Response.records;
          
           //calculate overall metrics (should probably be pulled out into a seperate services just to be clean)
          overallActive.value = 0;
          overallInactive.value = 0;
          overallValue.value = 0;
          var assetList = reportList.value;
          assetList.forEach((asset) => {
            overallValue.value += asset.totalCost;
            overallActive.value += asset.active;
            overallInactive.value += asset.inactive;
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
  fetchReport();
});
</script>

<style lang="scss" scoped></style>