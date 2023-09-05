<template>
  <Section sectionTitle="Manufacturer">
    <div class="col-lg-6 mb-3">
      <Input
        label="Serial Number"
        type="text"
        id="serialNumber"
        placeholder="Enter Serial Number"
        v-model="GeneralInformation.serialNumber"
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

// Inject Asset Information
const GeneralInformation = inject("GeneralInformation");
const Global_Asset_Information = inject("Global_Asset_Information");

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

<style lang="scss" scoped></style>
