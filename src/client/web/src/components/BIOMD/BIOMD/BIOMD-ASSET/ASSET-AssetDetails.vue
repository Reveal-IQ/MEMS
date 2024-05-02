<template>
  <Section sectionTitle="Asset Details">
    <!-- Equipment Number -->
    <div class="col-lg-6 mb-3">
      <Input
        label="Equipment Number"
        type="text"
        id="assetCode"
        placeholder="Enter Equipment Number"
        v-model="AssetDetails.assetCode"
      />
    </div>

    <!-- Parent Asset -->
    <div class="col-lg-6 mb-3">
      <div>
        <label for="assetList" class="form-label">Parent Equipment</label>
        <input
          class="form-control"
          list="assetListOptions"
          id="assetList"
          placeholder="Select Parent Equipment"
          aria-label="Default select example"
          v-model="AssetDetails.selectedParentAsset.assetCode"
          @input="fetchParentAsset"
          autocomplete="off"
        />
        <datalist id="assetListOptions">
          <option
            v-for="asset in assetList"
            :key="asset.index"
            :value="asset.assetCode"
          ></option>
        </datalist>
      </div>
      <div class="py-3 px-2" v-if="AssetDetails.selectedParentAsset.assetCode">
        <span class="fw-bold">Asset Profile</span>
        <div class="d-flex flex-column gap-1">
          <div>
            <span
              >Manufacturer:
              {{ AssetDetails.selectedParentAsset.manufacturerName }}</span
            >
          </div>
          <div>
            <span>Model: {{ AssetDetails.selectedParentAsset.modelName }}</span>
          </div>

          <div>
            <span
              >Serial Number:
              {{ AssetDetails.selectedParentAsset.serialNumber }}</span
            >
          </div>
          <div class="d-flex gap-3 align-items-center">
            <span>Status: </span>
            <span class="badge rounded-pill bg-success">{{
              AssetDetails.selectedParentAsset.status
            }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="col-lg-6 mb-3">
      <Input
        label="Serial Number"
        type="text"
        id="serialNumber"
        placeholder="Enter Serial Number"
        v-model="AssetDetails.serialNumber"
      />
    </div>
    <!-- Manufacturer -->
    <div class="col-lg-6 mb-3">
      <label for="manufacturerList" class="form-label">Manufacturer</label>
      <input
        class="form-control"
        list="manufacturerListOptions"
        id="manufacturerList"
        placeholder="Select Manufacturer"
        aria-label="Default select example"
        v-model="AssetDetails.selectedManufacturer.manufacturerName"
        @input="fetchManufacturer"
        autocomplete="off"
      />
      <datalist id="manufacturerListOptions">
        <option
          v-for="manufacturer in manufacturerList"
          :key="manufacturer.index"
          :value="manufacturer.manufacturerName"
        ></option>
      </datalist>
    </div>

    <!-- Model Name -->
    <div class="col-lg-6 mb-3">
      <div>
        <label for="modelList" class="form-label">Model</label>
        <input
          class="form-control"
          list="modelListOptions"
          id="modelList"
          placeholder="Select Model"
          aria-label="Default select example"
          v-model="AssetDetails.selectedModel.modelName"
          @input="fetchModel"
          autocomplete="off"
        />
        <datalist id="modelListOptions">
          <option
            v-for="model in modelList"
            :key="model.index"
            :value="model.modelName"
          ></option>
        </datalist>
      </div>
      <div class="py-3 px-2" v-if="AssetDetails.selectedModel.modelName">
        <span class="fw-bold">Model Profile</span>
        <div class="d-flex flex-column gap-1">
          <span>Common Name: {{ AssetDetails.selectedModel.commonName }}</span>
          <span>UMDNS Code: {{ AssetDetails.selectedModel.UMDNSCode }}</span>
        </div>
      </div>
    </div>

    <!-- Year of Manufacture -->
    <div class="col-lg-6 mb-3">
      <Input
        label="Year of manufacture"
        type="date"
        id="yearOfManufacture"
        placeholder="Enter Year of manufacture"
        v-model="AssetDetails.manufactureDate"
      />
    </div>

    <div class="col-lg-6 mb-3">
      <label for="statusList" class="form-label">Status</label>
      <select
        id="statusList"
        class="form-select"
        aria-label="Default select example"
        v-model="AssetDetails.status"
      >
        <option
          v-for="list in statusList"
          :key="list.value"
          :value="list.value"
          :selected="list.selected"
        >
          {{ list.name }}
        </option>
      </select>
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

const manufacturerList = ref(null);
const modelList = ref(null);
const assetList = ref(null);

const statusList = ref([
  { name: "Active Deployed", value: "Active Deployed", selected: true },
  { name: "Active in Storage", value: "Active in Storage" },
  { name: "Active in Service", value: "Active in Service" },
  { name: "Storage Repairable", value: "Storage Repairable" },
  { name: "Storage Parts", value: "Storage Parts" },
  { name: "Disposed", value: "Disposed" },
]);

// Inject Asset Information
const AssetDetails = inject("AssetDetails");
const GlobalAssetInformation = inject("GlobalAssetInformation");

const fetchManufacturer = async (event) => {
  try {
    const selectedManufacturer = event ? event.target.value : "";
    if (
      event &&
      (!(event instanceof InputEvent) ||
        event.inputType === "insertReplacementText")
    ) {
      AssetDetails.value.selectedManufacturer = manufacturerList.value.find(
        (manufacturer) => {
          return selectedManufacturer === manufacturer.manufacturerName;
        }
      );
      GlobalAssetInformation.value.manufacturerID =
        AssetDetails.value.selectedManufacturer._id;
      await fetchModel();
    } else {
      GlobalAssetInformation.value.manufacturerID = null;

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

const fetchModel = async (event) => {
  try {
    const selectedModel = event ? event.target.value : "";
    if (
      event &&
      (!(event instanceof InputEvent) ||
        event.inputType === "insertReplacementText")
    ) {
      AssetDetails.value.selectedModel = modelList.value.find((model) => {
        return selectedModel === model.modelName;
      });
      GlobalAssetInformation.value.modelID =
        AssetDetails.value.selectedModel._id;
    } else {
      GlobalAssetInformation.value.modelID = null;

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
              queries: [
                {
                  field: "manufacturerID",
                  op: "eq_id",
                  value: GlobalAssetInformation.value.manufacturerID,
                },
              ],
              projection: {
                _id: 1,
                modelName: 1,
                commonName: 1,
                UMDNSCode: 1,
              },
            },
          },
        },
        callback: (res) => {
          if (res.Type === "RESPONSE") {
            // Console the Response Packet
            console.log("Response Packet -->", res.Response);
            modelList.value = res.Response.records;
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

const fetchParentAsset = async (event) => {
  try {
    const selectedParentAsset = event ? event.target.value : "";
    if (
      event &&
      (!(event instanceof InputEvent) ||
        event.inputType === "insertReplacementText")
    ) {
      AssetDetails.value.selectedParentAsset = assetList.value.find((asset) => {
        return selectedParentAsset === asset.assetCode;
      });
      GlobalAssetInformation.value.parentAssetID =
        AssetDetails.value.selectedParentAsset._id;
    } else {
      GlobalAssetInformation.value.parentAssetID = null;

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
                  value: "^",
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
              ],
              projection: {
                _id: 1,
                assetCode: 1,
                status: 1,
                serialNumber: 1,
                modelName: "$Model.modelName",
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
    }
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  fetchManufacturer();
  fetchParentAsset();
});
</script>

<style lang="scss" scoped>
@import "../../../BIOMD/BIOMD/Style/font-style.scss";
</style>
