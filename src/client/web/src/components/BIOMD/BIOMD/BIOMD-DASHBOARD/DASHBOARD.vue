<template>
  <div class="container-fluid">
    <nav class="d-flex gap-3 p-2">
      <small
        class="text-secondary"
        style="cursor: pointer"
        @click="changePage('dashboard')"
        >Dashboard</small
      >
      <small
        class="text-secondary"
        style="cursor: pointer"
        @click="changePage('assetInfo')"
        >New Asset</small
      >
      <small
        class="text-secondary"
        style="cursor: pointer"
        @click="changePage('vendorInfo')"
        >New Vendor</small
      >
      <small
        class="text-secondary"
        style="cursor: pointer"
        @click="changePage('departmentInfo')"
        >Department</small
      >
      <small
        class="text-secondary"
        style="cursor: pointer"
        @click="changePage('facilityInfo')"
        >Facility</small
      >
    </nav>

    <div class="d-flex flex-column p-2 mt-4">
      <span class="title text-dark fw-normal fs-1">Dashboard</span>
      <span class="sub-title fs-6 fw-normal"
        >Snapshot for medical equipment inventory</span
      >
    </div>

    <div class="rounded mt-4 p-2" style="background-color: #e3f6f5">
      <div class="card-body">
        <h5 class="card-title" style="color: #298a85">
          Welcome {{ userName.User_First_Name }}!
        </h5>
        <p class="card-text">
          <small class="text-muted"
            >This is your dashboard of medical equipment assigned to you and
            your team</small
          >
        </p>
      </div>
    </div>

    <div class="row p-2 mt-4">
      <div class="col-sm-12 col-lg-9 col-12">
        <div class="mb-5">
          <div class="">
            <span class="card-title fw-normal fs-4">Site Inventory</span>
            <p class="card-text">
              <small class="text-muted">Summary of all the asset models</small>
            </p>
          </div>

          <div class="mb-2 mt-2" v-if="modelList == 0">
            <UIToastGlobal
              message="Assets have not been assigned"
              message2="Use New Vendor to create new Models and Manufacturers."
              :icon="'exclamation-triangle'"
              backgroundColor="#FFF0DA"
            >
              <UIBtn2
                BtnName="New Model"
                backgroundColor="#FFFFFF"
                class="text-success btn-sm"
                @click="changePage('vendorInfo')"
              />
            </UIToastGlobal>
          </div>
          <div
            v-else
            v-for="model in modelList"
            :key="model.index"
            class="g-3 mb-2 mt-2 rounded container py-2 align-middle"
            style="background-color: #f5f6f6"
            @click="
              changePage('dashboardModel', {
                modelName: model.modelName,
                manufacturerID: model.manufacturerID,
                commonName: model.commonName,
                manufacturerName: model.manufacturerName,
                modelID: model._id,
              })
            "
          >
            <div class="" style="cursor: pointer">
              <div class="row">
                <td class="col-3">
                  <div class="d-flex flex-column">
                    <small class="text-secondary fsXs">Model</small>
                    <small class="fw-normal">{{ model.modelName }}</small>
                  </div>
                </td>
                <td class="col-3">
                  <div class="d-flex flex-column">
                    <small class="text-secondary fsXs">Manufacturer</small>
                    <small>{{ model.manufacturerName }}</small>
                  </div>
                </td>
                <td class="col-2">
                  <div
                    class="d-flex flex-column justify-content-center text-center"
                  >
                    <small class="text-secondary fsXs">Quantity</small>
                    <!-- <small>---</small> -->
                  </div>
                </td>
                <td class="col-2">
                  <div
                    class="d-flex flex-column justify-content-center text-center"
                  >
                    <small class="text-secondary fsXs">Active</small>
                    <!-- <small>6</small> -->
                  </div>
                </td>
                <td class="col-2">
                  <div
                    class="d-flex flex-column justify-content-end text-center"
                  >
                    <small class="text-secondary fsXs">In-Service</small>
                    <!-- <small>4</small> -->
                  </div>
                </td>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row p-2 mb-5">
      <div class="col-sm-12 col-lg-9 col-12">
        <div class="">
          <span class="card-title fw-normal fs-4">Manufacturer</span>
          <p class="card-text">
            <small class="text-muted">Profile of Manufacturer and Models</small>
          </p>
        </div>

        <div class="mb-5 mt-2" v-if="manufacturerList == 0">
          <UIToastGlobal
            message="Manufacturer has not been added"
            message2="Use New Vendor to create new Models and Manufacturers."
            :icon="'exclamation-triangle'"
            backgroundColor="#FFF0DA"
          >
            <UIBtn2
              BtnName="New Model"
              backgroundColor="#FFFFFF"
              class="text-success btn-sm"
              @click="changePage('vendorInfo')"
            />
          </UIToastGlobal>
        </div>
        <div v-else>
          <div
            v-for="manufacturer in manufacturerList"
            :key="manufacturer.index"
            class="g-3 mb-2 mt-2 rounded container py-2 align-middle"
            style="background-color: #f5f6f6"
            @click="
              changePage('dashboardManufacturerProfile', {
                manufacturerName: manufacturer.manufacturerName,
                manufacturerID: manufacturer._id,
              })
            "
          >
            <div class="" style="cursor: pointer">
              <div class="row">
                <td class="col-4">
                  <small class="text-secondary fsXs">Manufacturer Name</small>
                  <div class="">
                    <small class="fw-normal"
                      >{{ manufacturer.manufacturerName }}
                    </small>
                  </div>
                </td>
                <td class="col-4">
                  <small class="text-secondary fsXs">Model</small>
                  <div class="">
                    <span
                      v-for="model in modelList"
                      :key="model.index"
                      class=""
                    >
                      <small
                        class=""
                        v-if="
                          model.manufacturerName ===
                          manufacturer.manufacturerName
                        "
                      >
                        | {{ model.modelName }}
                      </small>
                    </span>
                  </div>
                </td>
                <td class="col">
                  <small class="text-secondary fsXs">Vendor</small>
                  <div class="">
                    <span v-for="vendor in vendorList" :key="vendor.index">
                      <small
                        v-if="
                          vendor.manufacturer === manufacturer.manufacturerName
                        "
                        >{{ vendor.vendorName }} |
                      </small>
                      <!-- <small v-else class="text-muted"
                        >No Vendor Assigned</small
                      > -->
                    </span>
                  </div>
                </td>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import UIToastGlobal from "../BIOMD-UI/UI-ToastGlobal.vue";
import UIBtn2 from "../BIOMD-UI/UI-Btn2.vue";

const store = useStore();

const userName = computed(() => store.state.globalStore.UserInfo);

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
              manufacturer: "$Manufacturer.manufacturerName",
              vendorName: 1,
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

//Lifecycle Hook

const emit = defineEmits(["updatePage"]);

// Navigate to selected page to edit
const changePage = async (page, props) => {
  emit("updatePage", page, props);
};

onMounted(() => {
  fetchModel();
  fetchManufacturer();
  fetchVendor();
});
</script>

<style lang="scss" scoped>
@import "../Style/BIOMD.scss";
</style>
