<template>
    <div class="RevealContainer">
    <div class="container p-4 m-4">
      <div
        class="d-lg-flex d-md-flex d-sm-flex gap-lg-0 gap-sm-5 align-items-center justify-content-lg-between justify-content-md-between justify-content-sm-center"
      >
        <div class="mt-3">
          <Header
            title="Model"
            subTitle="Create a new model with this form"
          />
        </div>
        <div class="d-flex gap-2 d-md-block">
          <Btn2
            BtnName="Return"
            :icon="'arrow-left'"
            backgroundColor="none"
            @click="changePage('dashboard')"
            class="text-secondary btn-sm"
          />

          <Btn2
            BtnName="Dashboard"
            backgroundColor="#2A94B6"
            @click="goBack"
            class="text-light btn-sm"
          />
        </div>
      </div>

      <main>
        <ModelDescription :manufacturerName="props.manufacturerName" />
        

        <div class="d-flex justify-content-center py-3">
          <div class="">
            <Btn
              BtnName="Create Model"
              backgroundColor="#27AE60"
              class="mb-3"
              @click="createRecord"
            />

            <Btn BtnName="Clear Content" />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { ref, computed, provide, onMounted } from "vue";

import Btn from "../BIOMD-UI/UI-Btn.vue";
import Btn2 from "../BIOMD-UI/UI-Btn2.vue";
import Header from "../BIOMD-UI/UI-FormHeader.vue";
import ModelDescription from "./MODEL-ModelDescription.vue"
import { ModelRecord} from "../../../../store/modules/recordSchema";

const store = useStore();
const sendSocketReq = (request) => {
  store.dispatch("sendSocketReq", request);
};
const Institute_Code = computed(
    () => store.state.globalStore.UserInfo.Institute_Info.Code
);

const props = defineProps({
    manufacturerName: {
        type: String,
    },
})
console.log("Manufacturer Name in MODEL.vue:");

const ModelDesc = ref({
    modelName: null,
    deviceDescription: null,
    commonName: null,
    selectedManufacturer: {
        manufacturerName: null,
        _id: null,
    },
})

const GlobalModelInformation = ref({
    manufacturerID: null,
})

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
            record: new ModelRecord({
              manufacturerID: GlobalModelInformation.value.manufacturerID,
              modelName: ModelDesc.value.modelName,
              deviceDescription: ModelDesc.value.deviceDescription,
              commonName: ModelDesc.value.commonName
            }).serialize(),
            Institute_Code: Institute_Code.value,
          },
        },
        callback: (res) => {
          if (res.Type === "RESPONSE") {
            changePage("success");

            console.log("Response Packet -->", res.Response);
            // getValues.value = res.Response.Site_Info[0]; //Assigning response values to getValues Object
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

const emit = defineEmits(["updatePage"]);

const changePage = async (page, props) => {
  emit("updatePage", page, props);
};

console.log("Manufacturer Name in MODEL.vue1:", props.manufacturerName);
onMounted(() => {
    console.log("Manufacturer Name in MODEL.vue1:", props.manufacturerName);
});
provide("ModelDesc", ModelDesc);
provide("GlobalModelInformation", GlobalModelInformation);
</script>

<style lang="scss" scoped>
.RevealContainer {
  min-height: 100vh;
  max-height: 100vh;
  overflow: scroll;
}

.RevealContainer::-webkit-scrollbar {
  display: none;
}
</style>