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
      <div>
        <span class="title text-dark fw-normal fs-1">{{
          props.assetCode
        }}</span>
      </div>
      <div>
        <span class="badge rounded-pill bg-success fsXs text-uppercase">{{
          props.status
        }}</span>
      </div>
    </div>

    <div class="row p-2 mt-4 mb-5" v-for="asset in assetProfile" :key="asset">
      <div class="col-md-5">
        <div class="mb-5">
          <div class="">
            <span class="card-title fw-normal fs-5">Profile</span>
            <p class="card-text">
              <small class="text-muted fsXs"
                >Detailed equipment description</small
              >
            </p>
          </div>
          <div
            class="g-3 mb-2 mt-2 rounded-3 container py-2 align-middle"
            style="background-color: #f5f6f6"
          >
            <div class="d-flex flex-column gap-3">
              <td>
                <div class="d-flex flex-column">
                  <small class="text-secondary fsXs">Equipment Number</small>
                  <small class="fw-normal">{{ asset.assetCode }}</small>
                </div>
              </td>
              <td v-if="parentAssetProfile == 0">
                <div class="d-flex flex-column">
                  <small class="text-secondary fsXs">Parent Name</small>
                  <small class="text-muted">
                    No Parent Equipment Assigned
                  </small>
                </div>
              </td>
              <td v-else>
                <div
                  class="d-flex flex-column"
                  v-for="parent in parentAssetProfile"
                >
                  <small class="text-secondary fsXs">Parent Name</small>
                  <small
                    >{{ parent.parentAssetCode }} |
                    {{ parent.parentModelName }} |
                    {{ parent.parentManufaturerName }}
                  </small>
                </div>
              </td>
              <td>
                <div class="d-flex flex-column">
                  <small class="text-secondary fsXs">Serial Number</small>
                  <small>{{ asset.serialNumber }}</small>
                </div>
              </td>
              <td>
                <div class="d-flex flex-column">
                  <small class="text-secondary fsXs">Manufacturer</small>
                  <small>{{ asset.manufacturerName }}</small>
                </div>
              </td>
              <td>
                <div class="d-flex flex-column">
                  <small class="text-secondary fsXs">Model</small>
                  <small>{{ asset.modelName }}</small>
                </div>
              </td>
              <td>
                <div class="d-flex flex-column">
                  <small class="text-secondary fsXs">Year of Manufacture</small>
                  <small>{{ asset.manufactureDate }}</small>
                </div>
              </td>
            </div>
          </div>
        </div>
        <div class="mb-5">
          <div>
            <span class="card-title fw-normal fs-5">Location</span>
            <p class="card-text">
              <small class="text-muted fsXs">Physical asset location</small>
            </p>
          </div>
          <div
            class="g-3 mb-2 mt-2 rounded-3 container py-2 align-middle"
            style="background-color: #f5f6f6"
          >
            <div class="d-flex flex-column gap-3">
              <td>
                <div class="d-flex flex-column">
                  <small class="text-secondary fsXs">Facility</small>
                  <small class="fw-normal">{{ asset.facilityName }}</small>
                </div>
              </td>
              <td>
                <div class="d-flex flex-column">
                  <small class="text-secondary fsXs">Department</small>
                  <small>ICU</small>
                </div>
              </td>
              <td>
                <div class="d-flex flex-column">
                  <small class="text-secondary fsXs">Location</small>
                  <small>{{ asset.locationName }}</small>
                </div>
              </td>
            </div>
          </div>
        </div>
        <div class="mb-5">
          <div>
            <span class="card-title fw-normal fs-5">Maintenance</span>
            <p class="card-text">
              <small class="text-muted fsXs">Assigned support teams</small>
            </p>
          </div>
          <div
            class="g-3 mb-2 mt-2 rounded-3 container py-2 align-middle"
            style="background-color: #f5f6f6"
          >
            <div class="d-flex flex-column gap-3">
              <td>
                <div class="d-flex flex-column">
                  <small class="text-secondary fsXs"
                    >Assigned Clinical Engineer</small
                  >
                  <small class="fw-normal">John Doe</small>
                </div>
              </td>
              <td>
                <div class="d-flex flex-column">
                  <small class="text-secondary fsXs"
                    >Assigned Support Team</small
                  >
                  <small>Life Support Team</small>
                </div>
              </td>
            </div>
          </div>
        </div>

        <!-- <div class="mb-5">
          <div>
            <span class="card-title fw-normal fs-5">Purchase Order</span>
            <p class="card-text">
              <small class="text-muted fsXs">PO Details</small>
            </p>
          </div>
          <div
            class="g-3 mb-2 mt-2 rounded-3 container py-2 align-middle"
            style="background-color: #f5f6f6"
          >
            <div class="d-flex flex-column gap-3">
              <td>
                <div class="d-flex flex-column">
                  <small class="text-secondary fsXs">PO Number</small>
                  <small class="fw-normal">CIP-23234</small>
                </div>
              </td>
              <td>
                <div class="d-flex flex-column">
                  <small class="text-secondary fsXs">Acceptance Date</small>
                  <small>12-Jun-22</small>
                </div>
              </td>
              <td>
                <div class="d-flex flex-column">
                  <small class="text-secondary fsXs">Vendor</small>
                  <small>Ghana Medical Help</small>
                </div>
              </td>
            </div>
          </div>
        </div> -->
        <div class="mb-5">
          <div>
            <span class="card-title fw-normal fs-5"
              >Additional Information</span
            >
          </div>
          <div
            class="g-3 mb-2 mt-2 rounded-3 container py-2 align-middle"
            style="background-color: #f5f6f6"
          >
            <div class="d-flex flex-column gap-3">
              <td>
                <div class="d-flex flex-column">
                  <small class="fw-normal" v-if="asset.comment">{{
                    asset.comment
                  }}</small>
                  <small class="fw-normal text-secondary" v-else
                    >No comments added</small
                  >
                </div>
              </td>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-7">
        <div class="mb-5">
          <div class="">
            <span class="card-title fw-normal fs-5">Work Order</span>
            <p class="card-text">
              <small class="text-muted fsXs"
                >List of all the work orders associated to this model</small
              >
            </p>
          </div>
          <div
            v-for="work in workOrders"
            :key="work"
            class="mb-2 mt-2 rounded container py-2 align-middle"
            style="background-color: #f5f6f6"
          >
            <div class="d-flex justify-content-between" style="cursor: pointer">
              <td class="d-flex position-relative">
                <span
                  class="position-absolute border border-light top-50 start-0 p-2 translate-middle rounded-circle bg-success"
                ></span>
                <div class="d-flex flex-column ms-4">
                  <small class="text-secondary fsXs">ID</small>
                  <small class="fw-normal">{{ work.ID }}</small>
                </div>
              </td>
              <td>
                <div class="d-flex flex-column">
                  <small class="text-secondary fsXs">Title</small>
                  <small class="fw-normal">{{ work.title }}</small>
                </div>
              </td>
              <td>
                <div class="d-flex flex-column">
                  <small class="text-secondary fsXs">Days Open</small>
                  <small>{{ work.daysOpen }}</small>
                </div>
              </td>
              <td>
                <div class="d-flex flex-column">
                  <small class="text-secondary fsXs">Date Open</small>
                  <small>{{ work.dateOpen }}</small>
                </div>
              </td>
            </div>
          </div>
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

const props = defineProps([
  "assetCode",
  "status",
  "modelName",
  "parentAssetID",
  "manufacturerName",
]);

const assetProfile = ref({});
const parentAssetProfile = ref({});

const workOrders = ref([
  {
    ID: 12838,
    title: "Initial Inspection",
    daysOpen: 5,
    dateOpen: "20-Sep-23",
  },
  {
    ID: 12835,
    title: "Replace PCB",
    daysOpen: 32,
    dateOpen: "23-Aug-23",
  },
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
                field: "assetCode",
                op: "sb",
                value: props.assetCode,
              },
            ],
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
              {
                localField: "facilityID",
                collection: "Facility",
                foreignField: "_id",
                as: "Facility",
              },
              {
                localField: "parentAssetID",
                collection: "Asset",
                foreignField: "_id",
                as: "ParentAsset",
              },
            ],
            projection: {
              _id: 1,
              assetCode: 1,
              modelID: 1,
              parentAssetID: 1,

              manufacturerName: "$Manufacturer.manufacturerName",
              modelName: "$Model.modelName",
              facilityName: "$Facility.facilityName",

              status: 1,
              manufactureDate: 1,
              serialNumber: 1,
              locationName: 1,
              comment: 1,

              parentAssetCode: "$ParentAsset.assetCode",
              parentModel: "$ParentAsset.modelID",
              parentManufacturer: "$ParentAsset.manufacturerID",
            },
          },
        },
      },

      callback: (res) => {
        if (res.Type === "RESPONSE") {
          console.log("Response Packet -->", res.Response);
          assetProfile.value = res.Response.records;
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

const fetchParentAsset = async () => {
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
                field: "_id",
                op: "eq_id",
                value: props.parentAssetID,
              },
            ],
            lookups: [
              {
                localField: "_id",
                collection: "Asset",
                foreignField: "_id",
                as: "ParentAsset",
              },
              {
                localField: "modelID",
                collection: "Model",
                foreignField: "_id",
                as: "ParentModel",
              },
              {
                localField: "manufacturerID",
                collection: "Manufacturer",
                foreignField: "_id",
                as: "ParentManufacturer",
              },
            ],
            projection: {
              _id: 1,
              parentAssetCode: "$ParentAsset.assetCode",
              parentModelName: "$ParentModel.modelName",
              parentManufaturerName: "$ParentManufacturer.manufacturerName",
            },
          },
        },
      },

      callback: (res) => {
        if (res.Type === "RESPONSE") {
          console.log("Response Packet -->", res.Response);
          parentAssetProfile.value = res.Response.records;
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
  fetchParentAsset();
});
</script>

<style lang="scss" scoped>
@import "../Style/font-style.scss";
</style>
