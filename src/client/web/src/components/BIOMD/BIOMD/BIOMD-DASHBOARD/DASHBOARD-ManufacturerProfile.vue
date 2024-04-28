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
          props.manufacturerName
        }}</span>
      </div>
      <div>
        <span class="fsXs">
          Manufacturer Profile or Model Details can be edited by selecting the
          Vendor
        </span>
      </div>
    </div>
    <div class="row p-2 mt-4 mb-5">
      <div class="col-md-6">
        <div class="mb-5">
          <div class="">
            <span class="card-title fw-normal fs-5">Manufacturer Profile</span>
            <!-- <p class="card-text">
              <small class="text-muted fsXs"
                >Detailed equipment description</small
              >
            </p> -->
          </div>
          <div
            class="g-3 mb-2 mt-2 rounded-3 container py-2 align-middle"
            style="background-color: #f5f6f6"
          >
            <div class="d-flex flex-column gap-3">
              <td>
                <div class="d-flex flex-column">
                  <small class="text-secondary fsXs">ID</small>
                  <small class="fw-normal">{{ props.manufacturerID }}</small>
                </div>
              </td>

              <td>
                <div class="d-flex flex-column">
                  <small class="text-secondary fsXs">Name</small>
                  <small>{{ props.manufacturerName }} </small>
                </div>
              </td>
              <td>
                <div class="d-flex flex-column">
                  <small class="text-secondary fsXs">Vendor List</small>

                  <span v-for="vendor in vendorList" :key="vendor.index">
                    <small
                      v-if="vendor.manufacturerName === props.manufacturerName"
                      >{{ vendor.vendorName }}</small
                    >
                    <!-- <small v-else class="text-muted">No Vendor Assigned</small> -->
                  </span>
                </div>
              </td>
            </div>
          </div>
        </div>
        <div class="mb-5">
          <div class="">
            <span class="card-title fw-normal fs-5">Models</span>
            <!-- <p class="card-text">
              <small class="text-muted fsXs"
                >Detailed equipment description</small
              >
            </p> -->
          </div>
          <div v-for="model in modelList" :key="model.index">
            <div
              v-if="model.manufacturerName === props.manufacturerName"
              class="g-3 mb-2 mt-2 rounded-3 container py-2 align-middle"
              style="background-color: #f5f6f6"
            >
              <div class="d-flex flex-column gap-3">
                <td>
                  <div class="d-flex flex-column">
                    <small class="text-secondary fsXs">Name</small>
                    <small class="fw-normal">{{ model.modelName }}</small>
                  </div>
                </td>

                <td>
                  <div class="d-flex flex-column">
                    <small class="text-secondary fsXs">Code</small>
                    <small>{{ model.UMDNSCode }} </small>
                  </div>
                </td>
                <td>
                  <div class="d-flex flex-column">
                    <small class="text-secondary fsXs"
                      >Device Description</small
                    >
                    <small>{{ model.deviceDescription }}</small>
                  </div>
                </td>
                <td>
                  <div class="d-flex flex-column">
                    <small class="text-secondary fsXs">Common Name</small>
                    <small>{{ model.commonName }}</small>
                  </div>
                </td>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="mb-5">
          <div class="">
            <span class="card-title fw-normal fs-5">Vendor Description</span>
            <!-- <p class="card-text">
              <small class="text-muted fsXs"
                >Detailed equipment description</small
              >
            </p> -->
          </div>
          <div>
            <div v-for="vendor in vendorList" :key="vendor.index">
              <div
                v-if="vendor.manufacturerName === props.manufacturerName"
                class="g-3 mb-2 mt-2 rounded-3 container py-2 align-middle"
                style="background-color: #f5f6f6"
              >
                <div class="d-flex flex-column gap-3">
                  <!-- <td>
                    <div class="d-flex flex-column">
                      <small class="text-secondary fsXs">ID</small>
                      <small class="fw-normal">{{ props.vendorID }}</small>
                    </div>
                  </td> -->

                  <td>
                    <div class="d-flex flex-column">
                      <small class="text-secondary fsXs">Name</small>
                      <small>{{ vendor.vendorName }} </small>
                    </div>
                  </td>
                  <td>
                    <div class="d-flex flex-column">
                      <small class="text-secondary fsXs"
                        >Manufacturer List</small
                      >
                      <span>
                        <small v-if="vendor.manufacturerName">{{
                          vendor.manufacturerName
                        }}</small>
                        <small v-else class="text-muted"
                          >No Manufacturer Assigned</small
                        >
                      </span>
                    </div>
                  </td>
                  <div class="d-flex gap-2 d-md-block">
                    <Btn2
                      BtnName="EDIT"
                      backgroundColor="gray"
                      @click="editPage"
                      class="text-light btn-sm rounded-pill"
                    />
                  </div>
                </div>
              </div>
              <!-- <div
                v-if="vendorList.manufacturerName !== props.manufacturerName"
                class="g-3 mb-2 mt-2 rounded-3 container py-2 align-middle"
                style="background-color: #f5f6f6"
              >
                <small class="text-secondary"
                  >Vendor Description Unavailable</small
                >
              </div> -->
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
import Btn2 from "../BIOMD-UI/UI-Btn2.vue";

const store = useStore();

const sendSocketReq = (request) => {
  store.dispatch("sendSocketReq", request);
};

//Variables
const modelList = ref([]);
const manufacturerList = ref([]);
const vendorList = ref([]);

//Functions

//Fetch Model Information
const fetchModel = async () => {
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
            collection: "Model",
            lookups: [
              {
                localField: "manufacturerID",
                collection: "Manufacturer",
                foreignField: "_id",
                as: "Manufacturer",
              },
            ],
            projection: {
              _id: 1,
              manufacturerName: "$Manufacturer.manufacturerName",
              modelName: 1,
              commonName: 1,
              UMDNSCode: 1,
              deviceDescription: 1,
            },
          },
        },
      },
      callback: (res) => {
        if (res.Type === "RESPONSE") {
          console.log("Response Packet -->", res.Response);
          modelList.value = res.Response.records;
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
//Fetch Manufacturer Information
const fetchManufacturer = async () => {
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
            collection: "Manufacturer",
            projection: {
              _id: 1,
              manufacturerName: 1,
            },
          },
        },
      },
      callback: (res) => {
        if (res.Type === "RESPONSE") {
          console.log("Response Packet -->", res.Response);
          manufacturerList.value = res.Response.records;
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
// Fetch Vendor Information
const fetchVendor = async () => {
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
            collection: "Vendor",
            lookups: [
              {
                localField: "manufacturerList.manufacturer",
                collection: "Manufacturer",
                foreignField: "_id",
                as: "Manufacturer",
              },
            ],
            projection: {
              _id: 1,
              manufacturerName: "$Manufacturer.manufacturerName",
              vendorName: 1,
              manufacturer: "$Manufacturer.manufacturerName",
            },
          },
        },
      },
      callback: (res) => {
        if (res.Type === "RESPONSE") {
          console.log("Response Packet -->", res.Response);
          vendorList.value = res.Response.records;
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

const props = defineProps([
  "manufacturerName",
  "manufacturerID",
  "vendorName",
  "manufacturer",
  "vendorID",
]);

const emit = defineEmits(["updatePage"]);

const changePage = async (page, props) => {
  emit("updatePage", page, props);
};

onMounted(() => {
  fetchModel();
  fetchManufacturer();
  fetchVendor();
});
</script>

<style lang="scss" scoped></style>
