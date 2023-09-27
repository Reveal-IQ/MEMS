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
            v-model="ModelDescription.selectedManufacturer.manufacturerName"
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
            label="Common Name"
            type="text"
            id="commonName"
            placeholder="Common Number"
            v-model="ModelDescription.commonName"
          />
        </div>
        <div class="col-lg-6">
          <Input
            label="UMDNS Code"
            type="text"
            id="UMDNSCode"
            placeholder="Common Number"
            v-model="ModelDescription.UMDNSCode"
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
  commonName: null,
  UMDNSCode: null,
  selectedManufacturer: { manufacturerName: null, _id: null },
});

const GlobalModelInformation = ref({
  manufacturerID: null,
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
          return selectedManufacturer === manufacturer.manufacturerName;
        }
      );
      GlobalModelInformation.value.manufacturerID =
        ModelDescription.value.selectedManufacturer._id;
    } else {
      GlobalModelInformation.value.manufacturerID = null;

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
          manufacturerID: GlobalModelInformation.value.manufacturerID,
          modelName: ModelDescription.value.modelName,
          commonName: ModelDescription.value.commonName,
          UMDNSCode: ModelDescription.value.UMDNSCode,
        },
        Institute_Code: Institute_Code.value,
      },
    },
    callback: (res) => {
      if (res.Type === "RESPONSE") {
        ModelDescription.value.selectedManufacturer.manufacturerName = null;
        ModelDescription.value.modelName = null;
        ModelDescription.value.commonName = null;
        ModelDescription.value.UMDNSCode = null;

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
