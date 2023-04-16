<template>
  <Section sectionTitle="General Information">
    <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 g-3">
      <!-- Equipment Number -->
      <div class="col-lg-3">
        <Input
          label="Equipment Number"
          type="number"
          id="equipmentNumber"
          placeholder="Enter Equipment Number"
          v-model="GeneralInformation.equipmentNumber"
        />
      </div>

      <!-- Equipment Common Name -->
      <div class="col-lg-4 col-md-12 mb-3">
        <label for="commonNameList" class="form-label"
          >Equipment Common Name</label
        >
        <select
          id="commonNameList"
          class="form-select"
          v-model="GeneralInformation.commonName"
        >
          <option selected disabled>Select Common Name</option>
          <option v-for="name in commonNameList" :key="name">
            {{ name }}
          </option>
        </select>
      </div>

      <!-- Equipment Description -->
      <div class="col-lg-5 col-md-12 mb-3">
        <label for="descriptionList" class="form-label"
          >Equipment Description</label
        >
        <select
          id="descriptionList"
          class="form-select"
          aria-label="Default select example"
          v-model="GeneralInformation.description"
        >
          <option selected>Select Class</option>
        </select>
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
          v-model="GeneralInformation.selectedManufacturer.manufacturer_name"
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
        <label for="modelList" class="form-label">Model</label>
        <input
          class="form-control"
          list="modelListOptions"
          id="modelList"
          placeholder="Select Model"
          aria-label="Default select example"
          v-model="GeneralInformation.selectedModel.model_name"
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

      <!-- Serial Number -->
      <div class="col-lg-6 mb-3">
        <Input
          label="Serial Number"
          type="text"
          id="serialNumber"
          placeholder="Enter Serial Number"
          v-model="GeneralInformation.serialNumber"
        />
      </div>

      <!-- Year of Manufacture -->
      <div class="col-lg-6 mb-3">
        <Input
          label="Year of manufacture"
          type="date"
          id="yearOfManufacture"
          placeholder="Enter Year of manufacture"
          v-model="GeneralInformation.manufacturerDate"
        />
      </div>
    </div>

    <div class="col-lg-12 col-md-6">
      <Btn2
        BtnName="Search Parent Equipment"
        backgroundColor="#1266F1"
        :icon="'search'"
        class="rounded-pill"
      />
    </div>
  </Section>
</template>

<script setup>
import { ref, inject, onMounted } from "vue";
import { useStore } from "vuex";

import Btn2 from "../BIOMD-UI/UI-Btn2.vue";
import Input from "../BIOMD-UI/UI-Input.vue";
import Section from "../BIOMD-UI/UI-Section.vue";

const store = useStore();
const sendSocketReq = (request) => {
  store.dispatch("sendSocketReq", request);
};

const manufacturerList = ref(null);
const modelList = ref(null);

// Inject Asset Information
const GeneralInformation = inject("GeneralInformation");
const Global_Asset_Information = inject("Global_Asset_Information");

const commonNameList = ref(["concentrator", "bp apparatus", "gun thermometer"]);

const fetchManufacturer = async (event) => {
  try {
    const selectedManufacturer = event ? event.target.value : "";
    if (
      event &&
      (!(event instanceof InputEvent) ||
        event.inputType === "insertReplacementText")
    ) {
      GeneralInformation.value.selectedManufacturer =
        manufacturerList.value.find((manufacturer) => {
          return selectedManufacturer === manufacturer.manufacturer_name;
        });
      Global_Asset_Information.value.manufacturerId =
        GeneralInformation.value.selectedManufacturer._id;
      await fetchModel();
    } else {
      Global_Asset_Information.value.manufacturerId = null;

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
      GeneralInformation.value.selectedModel = modelList.value.find((model) => {
        return selectedModel === model.model_name;
      });
      Global_Asset_Information.value.modelId =
        GeneralInformation.value.selectedModel._id;
    } else {
      Global_Asset_Information.value.modelId = null;

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
                  value: Global_Asset_Information.value.manufacturerId,
                },
              ],
              projection: {
                _id: 1,
                model_name: 1,
                model_number: 1,
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

<style lang="scss" scoped>
@import "../../BIOMD/Style/BIOMD.scss";
</style>
