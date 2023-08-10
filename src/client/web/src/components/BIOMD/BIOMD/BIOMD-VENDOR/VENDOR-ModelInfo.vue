<template>
  <Section sectionTitle="Add New Model">
    <!-- Manufacturer -->
    <div class="d-flex">
      <div class="col">
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

        <div class="col-lg-6">
          <Input
            label="Model Number"
            type="text"
            id="modelNumber"
            placeholder="Model Number"
            v-model="ModelDescription.modelNumber"
          />
        </div>
        <Btn2
          BtnName="Submit"
          :icon="'plus'"
          backgroundColor="none"
          @click="createRecord"
          class="text-primary btn-sm"
        />
      </div>
      <slot />
    </div>
  </Section>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import Input from "../BIOMD-UI/UI-Input.vue";
import Btn2 from "../BIOMD-UI/UI-Btn2.vue";
import Section from "../BIOMD-UI/UI-Section.vue";

const store = useStore();
const Institute_Code = computed(
  () => store.state.globalStore.UserInfo.Institute_Info.Code
);

const ModelDescription = ref({
  modelName: null,
  modelNumber: null,
  selectedManufacturer: { manufacturer_name: null, _id: null },
});

const Global_Model_Information = ref({
  manufacturerId: null,
});

const manufacturerList = ref([]);

const sendSocketReq = (request) => {
  store.dispatch("sendSocketReq", request);
};

const fetchManufacturer = async (event) => {
  try {
    const selectedManufacturer = event ? event.target.value : "";
    if (
      event &&
      (!(event instanceof InputEvent) ||
        event.inputType === "insertReplacementText")
    ) {
      ModelDescription.value.selectedManufacturer = manufacturerList.value.find(
        (manufacturer) => {
          return selectedManufacturer === manufacturer.manufacturer_name;
        }
      );
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

function createRecord() {
  // send Request as below .
  sendSocketReq({
    data: {
      Expiry: 20000,
      Type: "REQUEST",
      Request: {
        Module: "MEMS",
        ServiceCode: "BIOMD",
        API: "CREATE_RECORD",
        collection: "Model",
        record: {
          manufacturer_id: Global_Model_Information.value.manufacturerId,
          model_name: ModelDescription.value.modelName,
          model_number: ModelDescription.value.modelNumber,
        },
        Institute_Code: Institute_Code.value,
      },
    },
    callback: (res) => {
      if (res.Type === "RESPONSE") {
        ModelDescription.value.selectedManufacturer.manufacturer_name = null;
        ModelDescription.value.modelName = null;
        ModelDescription.value.modelNumber = null;

        console.log("Response Packet -->", res.Response);
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

onMounted(() => {
  fetchManufacturer();
});
</script>

<style lang="scss" scoped>
@import "../Style/BIOMD.scss";
</style>
