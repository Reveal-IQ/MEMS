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
        >New Model</small
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
        <h5 class="card-title" style="color: #298a85">Welcome John!</h5>
        <p class="card-text">
          <small class="text-muted"
            >This is your dashboard of medical equipment assigned to you and
            your team</small
          >
        </p>
      </div>
    </div>

    <div class="row p-2 mt-4 mb-5">
      <div class="col-md-6">
        <div class="mb-5">
          <div class="">
            <span class="card-title fw-normal fs-4">Site Inventory</span>
            <p class="card-text">
              <small class="text-muted">Summary of all the asset models</small>
            </p>
          </div>

          <div
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
            <div class="d-flex justify-content-between" style="cursor: pointer">
              <td>
                <div class="d-flex flex-column">
                  <small class="text-secondary fsXs">Model</small>
                  <small class="fw-normal">{{ model.modelName }}</small>
                </div>
              </td>
              <td>
                <div class="d-flex flex-column">
                  <small class="text-secondary fsXs">Manufacturer</small>
                  <small>{{ model.manufacturerName }}</small>
                </div>
              </td>
              <!-- <td>
                <div class="d-flex flex-column">
                  <small class="text-secondary fsXs">Quantity</small>
                  <small>10</small>
                </div>
              </td> -->
              <!-- <td>
                <div class="d-flex flex-column">
                  <small class="text-secondary fsXs">Active</small>
                  <small>6</small>
                </div>
              </td> -->
              <!-- <td>
                <div class="d-flex flex-column">
                  <small class="text-secondary fsXs">In-Service</small>
                  <small>4</small>
                </div>
              </td> -->
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

//Variables
const modelList = ref([]);
const manufacturerList = ref([]);

const modelInfo = ref({
  listedModels: { modelName: null, _id: null },
  selectedManufacturer: { manufacturerName: null, _id: null },
});

const GlobalModelDefinition = ref({
  modelID: null,
  manufacturerID: null,
});

//Functions
const fetchManufacturer = async (event) => {
  try {
    const selectedManufacturer = event ? event.target.value : "";
    if (
      event &&
      (!(event instanceof InputEvent) ||
        event.inputType === "insertReplacementText")
    ) {
      modelInfo.value.selectedManufacturer = manufacturerList.value.find(
        (manufacturer) => {
          return selectedManufacturer === manufacturer.manufacturerName;
        }
      );
      GlobalModelDefinition.value.manufacturerID =
        modelInfo.value.selectedManufacturer._id;
      // await fetchModel();
    } else {
      GlobalModelDefinition.value.manufacturerID = null;

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
              queries: [
                {
                  field: "manufacturerName",
                  op: "sb",
                  value: "^",
                },
              ],
              projection: {
                _id: 1,
                manufacturerName: 1,
              },
            },
          },
        },
        callback: (res) => {
          if (res.Type === "RESPONSE") {
            // Console the Response Packet
            console.log("Response Packet -->", res.Response);
            manufacturerList.value = res.Response.records;
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
            // queries: [
            //   {
            //     field: "manufacturerID",
            //     op: "eq_id",
            //     value: "65345154d006d7001269c2a9",
            //   },
            // ],
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
              manufacturerID: 1,
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

//Lifecycle Hook

const emit = defineEmits(["updatePage"]);

// Navigate to selected page to edit
const changePage = async (page, props) => {
  emit("updatePage", page, props);
};

onMounted(() => {
  fetchModel();
  // fetchManufacturer();
});
</script>

<style lang="scss" scoped>
@import "../Style/BIOMD.scss";
</style>
