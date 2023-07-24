<template>
  <Section sectionTitle="Manufacturer Information">
    <div
      class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 g-3 mb-3"
    >
      <!-- Manufacturer Information -->
      <div class="col">
        <label for="manufacturerList" class="form-label">Manufacturer</label>
        <input
          class="form-control"
          list="manufacturerOptions"
          id="manufacturerList"
          placeholder="Search and Select Manufacturer..."
          autocomplete="off"
          v-model="manufacturerInfo.selectedManufacturer.manufacturer_name"
          @input="fetchManufacturer"
        />
        <datalist id="manufacturerOptions">
          <option
            v-for="manufacturer in manufacturerList"
            :key="manufacturer.index"
            :value="manufacturer.manufacturer_name"
          />
        </datalist>
      </div>
    </div>
    <div class="col">
      <Btn2
        BtnName="Add"
        :icon="'plus'"
        backgroundColor="none"
        @click=""
        class="text-primary btn-sm"
      />

      <Btn2
        BtnName="New Manufacturer"
        :icon="'plus'"
        backgroundColor="none"
        @click=""
        class="text-primary btn-sm"
      />
    </div>
  </Section>
</template>

<script setup>
import { ref, inject, onMounted } from "vue";
import { useStore } from "vuex";

import Input from "../BIOMD-UI/UI-Input.vue";
import Section from "../BIOMD-UI/UI-Section.vue";
import Btn2 from "../BIOMD-UI/UI-Btn2.vue";

const store = useStore();
const sendSocketReq = (request) => {
  store.dispatch("sendSocketReq", request);
};

const manufacturerList = ref(null);

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
