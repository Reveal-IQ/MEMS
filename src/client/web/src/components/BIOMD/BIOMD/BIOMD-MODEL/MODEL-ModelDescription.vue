<template>
  <Section sectionTitle="Model Description">
    <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 g-3">
      <!-- Model Name -->
      <div class="col-lg-6">
        <Input
          label="Model Name"
          type="text"
          id="modelName"
          placeholder="Model Name"
          v-model="ModelDescription.modelName"
        />
      </div>

      <!-- Model Number -->
      <div class="col-lg-6">
        <Input
          label="Model Number"
          type="text"
          id="modelNumber"
          placeholder="Model Number"
          v-model="ModelDescription.modelNumber"
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
          v-model="ModelDescription.selectedManufacturer.manufacturer_name"
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

      <!-- Vendor Site ID -->
      <div class="col-lg-6">
        <Input
          label="Vendor Site ID"
          type="text"
          id="vendorSiteId"
          placeholder="Site ID"
          v-model="ModelDescription.vendorSiteId"
        />
      </div>
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

const ModelDescription = inject("ModelDescription");
const Global_Model_Information = inject("Global_Model_Information");

const manufacturerList = ref([]);

const fetchManufacturer = async (event) => {
  try {
    const selectedManufacturer = event ? event.target.value : "";
    if (
      event &&
      (!(event instanceof InputEvent) ||
        event.inputType === "insertReplacementText")
    ) {
      ModelDescription.value.selectedManufacturer =
        manufacturerList.value.find((manufacturer) => {
          return selectedManufacturer === manufacturer.manufacturer_name;
        });
      Global_Model_Information.value.manufacturerId =
        ModelDescription.value.selectedManufacturer._id;
    } else {
      Global_Model_Information.value.manufacturerId = null;

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

onMounted(() => {
  fetchManufacturer();
});
</script>

<style lang="scss" scoped>
@import "../Style/BIOMD.scss";
</style>
