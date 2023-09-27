<template>
  <Section sectionTitle="Add New Model">
    <div class="d-flex">
      <div class="col">
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
          <transition name="toast">
            <UIToast v-if="showToast" message="Model successfully added " />
          </transition>
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
import { ref, computed, inject } from "vue";
import { useStore } from "vuex";
import Input from "../BIOMD-UI/UI-Input.vue";
import Btn2 from "../BIOMD-UI/UI-Btn2.vue";
import Section from "../BIOMD-UI/UI-Section.vue";
import UIToast from "../BIOMD-UI/UI-Toast.vue";

const store = useStore();
const Institute_Code = computed(
  () => store.state.globalStore.UserInfo.Institute_Info.Code
);

const showToast = ref(false);

const GlobalVendorDefinition = inject("GlobalVendorDefinition");

const ModelDescription = ref({
  modelName: null,
  commonName: null,
  UMDNSCode: null,
});

const sendSocketReq = (request) => {
  store.dispatch("sendSocketReq", request);
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
          manufacturerID: GlobalVendorDefinition.value.manufacturerID,
          modelName: ModelDescription.value.modelName,
          commonName: ModelDescription.value.commonName,
          UMDNSCode: ModelDescription.value.UMDNSCode,
        },
        Institute_Code: Institute_Code.value,
      },
    },
    callback: (res) => {
      if (res.Type === "RESPONSE") {
        ModelDescription.value.modelName = null;
        ModelDescription.value.commonName = null;
        ModelDescription.value.UMDNSCode = null;

        showToast.value = true;
        setTimeout(() => {
          showToast.value = false;
        }, 3000);

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
</script>

<style lang="scss" scoped>
@import "../Style/BIOMD.scss";
</style>
