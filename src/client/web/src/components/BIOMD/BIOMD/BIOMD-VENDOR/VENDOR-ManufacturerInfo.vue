<template>
  <Section sectionTitle="Manufacturer Information">
    <div
      class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 g-3 mb-3"
    >
      <!-- Manufacturer Information -->
      <div class="col">
        <label for="manufacturerList" class="form-label">Manufacturer</label>
        <div class="input-group">
          <input
            class="form-control"
            list="manufacturerOptions"
            id="manufacturerList"
            placeholder="Search and Select Manufacturer..."
            autocomplete="off"
            v-model="manufacturerInfo.selectedManufacturer.manufacturer_name"
            @input="fetchManufacturer"
          />
        </div>
        <datalist id="manufacturerOptions">
          <option
            v-for="manufacturer in manufacturerList"
            :key="manufacturer.index"
            :value="manufacturer.manufacturer_name"
          />
        </datalist>
      </div>

      <div class="col">
        <table class="table table-borderless fs-6">
          <thead>
            <tr>
              <th scope="col" class="fs-6">Model</th>
              <th scope="col" class="fs-6"></th>

              <Btn2
                v-if="!isHidden"
                BtnName="Add Model"
                :icon="'plus'"
                backgroundColor="none"
                class="text-primary btn-sm fs-6"
                @click="isHidden = !isHidden"
              />
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="model in modelList"
              :key="model.index"
              :value="model.model_name"
              v-if="modelList.length !== 0"
            >
              <td scope="row">{{ model.model_name }}</td>

              <td>{{ model.model_number }}</td>
            </tr>
            <tr v-else>
              <td scope="row" class="text-danger fs-6" v-if="!isHidden">
                Use Add to assign Model
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <NewManufacturer v-if="hide">
      <button
        type="button"
        class="btn-close"
        aria-label="Close"
        @click="hide = !hide"
      ></button>
    </NewManufacturer>
    <ModelInfo v-if="isHidden">
      <button
        type="button"
        class="btn-close"
        aria-label="Close"
        @click="isHidden = !isHidden"
      ></button>
    </ModelInfo>
    <div class="col" v-if="!hide && !isHidden">
      <Btn2
        BtnName="Add"
        :icon="'plus'"
        backgroundColor="none"
        @click=""
        class="text-primary btn-sm"
      />

      <Btn2
        BtnName="Add Manufacturer"
        :icon="'plus'"
        backgroundColor="none"
        class="text-primary btn-sm fs-6"
        @click="hide = !hide"
      />
    </div>
  </Section>
</template>

<script setup>
import { ref, inject, onMounted, computed } from "vue";
import { useStore } from "vuex";

import NewManufacturer from "./VENDOR-NewManufacturer.vue";
import ModelInfo from "./VENDOR-ModelInfo.vue";
import Input from "../BIOMD-UI/UI-Input.vue";
import Section from "../BIOMD-UI/UI-Section.vue";
import Btn2 from "../BIOMD-UI/UI-Btn2.vue";

const store = useStore();

const sendSocketReq = (request) => {
  store.dispatch("sendSocketReq", request);
};

// Hide the buttons after model & manufacturer toggle
const isHidden = ref(false);
const hide = ref(false);

const manufacturerList = ref([]);
const modelList = ref([]);

const manufacturerInfo = inject("manufacturerInfo");
const Global_Vendor_Definition = inject("Global_Vendor_Definition");

const fetchManufacturer = async (event) => {
  try {
    const selectedManufacturer = event ? event.target.value : "";
    if (
      event &&
      (!(event instanceof InputEvent) ||
        event.inputType === "insertReplacementText")
    ) {
      manufacturerInfo.value.selectedManufacturer = manufacturerList.value.find(
        (manufacturer) => {
          return selectedManufacturer === manufacturer.manufacturer_name;
        }
      );
      Global_Vendor_Definition.value.manufacturerId =
        manufacturerInfo.value.selectedManufacturer._id;
      await fetchModel();
    } else {
      Global_Vendor_Definition.value.manufacturerId = null;

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
    }
  } catch (error) {
    console.log(error);
  }
};

const fetchModel = async (event) => {
  try {
    const listedModels = event ? event.target.value : "";
    if (
      event &&
      (!(event instanceof InputEvent) ||
        event.inputType === "insertReplacementText")
    ) {
      manufacturerInfo.value.listedModels = modelList.value.find((model) => {
        return listedModels === model.model_name;
      });
      Global_Vendor_Definition.value.modelId =
        manufacturerInfo.value.listedModels._id;
    } else {
      Global_Vendor_Definition.value.modelId = null;

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
                  value: Global_Vendor_Definition.value.manufacturerId,
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
@import "../Style/BIOMD.scss";
</style>
