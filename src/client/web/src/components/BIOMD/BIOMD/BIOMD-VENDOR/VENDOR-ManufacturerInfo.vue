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
            v-model="manufacturerInfo.selectedManufacturer.manufacturerName"
            @input="fetchManufacturer"
          />
        </div>
        <datalist id="manufacturerOptions">
          <option
            v-for="manufacturer in manufacturerList"
            :key="manufacturer.index"
            :value="manufacturer.manufacturerName"
          />
        </datalist>
      </div>

      <div class="col" v-if="showLabel">
        <div class="d-flex justify-content-between px-3">
          <span class="card-title fw-normal fs-6">Model</span>
          <Btn2
            v-if="!isHidden"
            BtnName="Add Model"
            :icon="'plus'"
            backgroundColor="none"
            class="text-primary btn-sm fs-6"
            @click="isHidden = !isHidden"
          />
        </div>
        <div
          class="rounded-3 container pb-1 align-middle"
          v-for="model in modelList"
          :key="model.index"
          :value="model.modelName"
        >
          <div class="d-flex flex-column gap-3">
            <td>
              <div class="d-flex flex-column">
                <small class="text-dark fsXs"> {{ model.modelName }}</small>
              </div>
            </td>
          </div>
        </div>
        <div class="d-flex flex-column" v-if="showMessage">
          <td class="text-danger fs-6">Use Add to assign Model</td>
        </div>
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

const showMessage = ref(false);

const sendSocketReq = (request) => {
  store.dispatch("sendSocketReq", request);
};

// Hide the buttons after model & manufacturer toggle
const isHidden = ref(false);
const hide = ref(false);
const showLabel = ref(false);

const manufacturerList = ref([]);
const modelList = ref([]);

const manufacturerInfo = inject("manufacturerInfo");
const GlobalVendorDefinition = inject("GlobalVendorDefinition");

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
          return selectedManufacturer === manufacturer.manufacturerName;
        }
      );
      GlobalVendorDefinition.value.manufacturerID =
        manufacturerInfo.value.selectedManufacturer._id;
      await fetchModel();
    } else {
      GlobalVendorDefinition.value.manufacturerID = null;

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
        return listedModels === model.modelName;
      });
      GlobalVendorDefinition.value.modelID =
        manufacturerInfo.value.listedModels._id;
    } else {
      GlobalVendorDefinition.value.modelID = null;

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
                  value: GlobalVendorDefinition.value.manufacturerID,
                },
              ],
              projection: {
                _id: 1,
                modelName: 1,
              },
            },
          },
        },
        callback: (res) => {
          if (res.Type === "RESPONSE") {
            console.log("Response Packet -->", res.Response);
            modelList.value = res.Response.records;

            if (modelList.value.length < 1) {
              showMessage.value = true;
            }
            if (modelList.value.length > 0) {
              showMessage.value = false;
            }

            showLabel.value = true;
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
@import "../Style/font-style.scss";
</style>
