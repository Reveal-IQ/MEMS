<template>
  <div class="container-fluid">
    <nav class="d-flex gap-3 p-2">
      <small
        class="text-secondary"
        style="cursor: pointer"
        @click="changePage('dashboard')"
        >Back</small
      >
    </nav>

    <div class="d-flex flex-column p-2 mt-4">
      <span class="title text-dark fw-normal fs-1">{{ props.modelName }}</span>
      <span class="sub-title fs-6 fw-normal"
        >{{ props.manufacturerName }} | {{ props.commonName }}</span
      >
    </div>

    <div class="mt-4 rounded p-4">
      <span class="card-title fw-normal fs-4">Asset Inventory</span>
      <p class="card-text">
        <small class="text-muted"
          >List of all the asset associated models</small
        >
      </p>

      <div class="mb-3">
        <div class="d-flex gap-5">
          <td>
            <div class="d-flex flex-column">
              <small class="text-secondary fsXs">Quantity</small>
              <small class="fw-normal">20</small>
            </div>
          </td>
          <td>
            <div class="d-flex flex-column">
              <small class="text-secondary fsXs">Active</small>
              <small class="fw-normal">18</small>
            </div>
          </td>
          <td>
            <div class="d-flex flex-column">
              <small class="text-secondary fsXs">In-Service</small>
              <small>4</small>
            </div>
          </td>
        </div>
      </div>

      <div v-if="assetList == 0" class="d-flex gap-2 mt-2 align-middle">
        <span class="text-muted fs-6"
          >There are no assets assigned to {{ props.manufacturerName }} model
          {{ props.modelName }} |</span
        >

        <span
          class="text-primary"
          style="cursor: pointer"
          @click="changePage('assetInfo')"
          >Create New Asset</span
        >
      </div>

      <div
        v-else
        v-for="asset in assetList"
        :key="asset"
        class="mb-2 rounded container py-2 align-middle"
        style="background-color: #f5f6f6"
      >
        <div
          class="d-flex justify-content-between row"
          style="cursor: pointer"
          @click="
            changePage('dashboardAssetDetail', {
              assetCode: asset.assetCode,
              status: asset.status,
            })
          "
        >
          <td class="d-flex position-relative col-sm col">
            <span
              class="position-absolute border border-light top-50 start-0 p-2 translate-middle rounded-circle bg-success"
            ></span>
            <div class="d-flex flex-column ms-4">
              <small class="text-secondary fsXs">Equipment Number</small>
              <small class="fw-normal">{{ asset.assetCode }}</small>
            </div>
          </td>
          <td class="col-sm col">
            <div class="d-flex flex-column">
              <small class="text-secondary fsXs">Model</small>
              <small class="fw-normal">{{ asset.modelName }}</small>
            </div>
          </td>
          <td class="col-sm col">
            <div class="d-flex flex-column">
              <small class="text-secondary fsXs">Manufacturer</small>
              <small>{{ asset.manufacturerName }}</small>
            </div>
          </td>
          <td class="col-sm col">
            <div class="d-flex flex-column">
              <small class="text-secondary fsXs">Status</small>
              <small>{{ asset.status }}</small>
            </div>
          </td>
          <td class="col-sm col">
            <div class="d-flex flex-column">
              <small class="text-secondary fsXs">Vendor</small>
              <small>- - -</small>
            </div>
          </td>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();

const sendSocketReq = (request) => {
  store.dispatch("sendSocketReq", request);
};

//Variables
const assetList = ref([]);

const props = defineProps([
  "modelName",
  "modelID",
  "manufacturerID",
  "commonName",
  "manufacturerName",
]);

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
            queries: [
              {
                field: "modelID",
                op: "eq_id",
                value: props.modelID,
              },
            ],
            lookups: [
              {
                localField: "manufacturerID",
                collection: "Manufacturer",
                foreignField: "_id",
                as: "Manufacturer",
              },
              {
                localField: "modelID",
                collection: "Model",
                foreignField: "_id",
                as: "Model",
              },
            ],
            projection: {
              _id: 1,
              assetCode: 1,
              status: 1,
              manufacturerName: "$Manufacturer.manufacturerName",
              modelName: "$Model.modelName",
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

// Navigate to selected page to edit
const changePage = async (page, props) => {
  emit("updatePage", page, props);
};

onMounted(() => {
  fetchAsset();
});
</script>

<style lang="scss" scoped>
@import "../Style/font-style.scss";
</style>
