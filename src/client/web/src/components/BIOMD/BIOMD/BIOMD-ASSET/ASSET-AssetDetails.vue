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
      <label for="parentAssetList" class="form-label">Parent Asset</label>
      <select
        id="parentAssetList"
        class="form-select"
        aria-label="Default select example"
        v-model="AssetDetails.selectedParentAsset._id"
      >
        <option selected>Select Parent Asset</option>
      </select>
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
        v-model="AssetDetails.selectedManufacturer.manufacturer_name"
        @input="fetchManufacturer"
        autocomplete="off"
      />
      <datalist id="manufacturerListOptions">
        <option
          v-for="manufacturer in manufacturerList"
          :key="manufacturer.index"
          :value="manufacturer.manufacturer_name"
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
          v-model="AssetDetails.selectedModel.model_name"
          @input="fetchModel"
          autocomplete="off"
        />
        <datalist id="modelListOptions">
          <option
            v-for="model in modelList"
            :key="model.index"
            :value="model.model_name"
          ></option>
        </datalist>
      </div>
      <div class="py-3 px-2" v-if="AssetDetails.selectedModel.model_name">
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
        v-model="AssetDetails.manufacturerDate"
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
        <option selected value="Active Deployed">Active Deployed</option>
        <option
          v-for="list in statusList"
          :key="list.value"
          :value="list.value"
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
const modelProfile = ref(null);

const statusList = ref([
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
          return selectedManufacturer === manufacturer.manufacturer_name;
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
                  field: "manufacturer_name",
                  op: "sb",
                  value: "^",
                },
              ],
              projection: {
                _id: 1,
                manufacturer_name: 1,
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
        return selectedModel === model.model_name;
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
                  field: "manufacturer_id",
                  op: "sb",
                  value: GlobalAssetInformation.value.manufacturerID,
                },
              ],
              projection: {
                _id: 1,
                model_name: 1,
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

onMounted(() => {
  fetchManufacturer();
});
</script>

<style lang="scss" scoped></style>
