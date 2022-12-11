<!-- 
************************************
Created By : Reveal Foundation  
Author     : Edward Opoku-Agyemang           
Date       : < 03-Sep-2022 >    
Version    : < 0.0.1 >   
Description: < Describe the application >          
************************************
-->

<template>
  <div class="RevealContainer">
    <div class="container p-4 m-4">
      <div
        class="d-lg-flex align-items-center flex-lg-row flex-md-row flex-sm-column justify-content-between"
      >
        <div class="d-flex mt-3">
          <Header
            title="Equipment Model"
            subTitle="Create a new equipment model with this form"
          />
        </div>
        <div class="d-flex">
          <span class="d-sm-block">
            <Btn2
              BtnName="Return"
              :icon="'arrow-left'"
              backgroundColor="none"
              @click="goBack"
              class="text-secondary"
            />
          </span>
          <span class="ms-4 d-sm-block">
            <Btn2
              BtnName="Dashboard"
              backgroundColor="#2A94B6"
              @click="goBack"
              class="text-light"
            />
          </span>
        </div>
      </div>

      <main>
        <ModelDescription />

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

<script>
import { useStore } from "vuex"; // Access Vuew Store Variables and Methods
import { ref, toRefs, computed, provide } from "vue";

import Btn from "../BIOMD-UI/UI-Btn.vue";
import Btn2 from "../BIOMD-UI/UI-Btn2.vue";
import Header from "../BIOMD-UI/UI-FormHeader.vue";
import ModelDescription from "../BIOMD-MODEL/MODEL-ModelDescription.vue";

export default {
  components: { ModelDescription, Btn2, Btn, Header },
  name: "model",
  // Define Props here
  props: {
    tabid: {
      type: String,
    },
  },
  // Emit value can pass within this array
  emits: ["updatePage"],
  setup(props, { emit }) {
    const { props_variable } = toRefs(props); // include variables from the props with help of toRefs
    const store = useStore();
    const Institute_Code = computed(
      () => store.state.globalStore.UserInfo.Institute_Info.Code
    );

    const changeServiceState = (serviceState) =>
      store.dispatch("changeServiceState", serviceState);
    //Redirect to another page
    function redirectToPage() {
      changeServiceState({
        service: "<App_Name>",
        tabcode: tabid.value,
        status: "<Navigate_To_This_Page>",
      });
    }
    const modelName = ref(null);
    const modelNumber = ref(null);
    const vendorSiteId = ref(null);
    const vendor = ref(null);
    // send Socket Request use to send rrequest packet for an API
    const sendSocketReq = (request) => {
      store.dispatch("sendSocketReq", request);
    };

    // Function to Send Request and Get Response by this template code .
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
              vendor_id: vendor.value,
              model_name: modelName.value,
              model_number: modelNumber.value,
              vendor_site_ID: vendorSiteId.value,
            },
            Institute_Code: Institute_Code.value, //Dynamically changes when another institute logged in
          },
        },
        callback: (res) => {
          if (res.Type === "RESPONSE") {
            // Console the Response Packet
            Type: "RESPONSE";
            Response: {
              // ID:
              Success: TRUE;
              Collection: "equipment_models";
              Message: "Created Record";
            }

            console.log("Response Packet -->", res.Response);
            getValues.value = res.Response.Site_Info[0]; //Assigning response values to getValues Object
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

    const goBack = () => {
      emit("updatePage", "landing");
    };

    provide("modelName", modelName);
    provide("modelNumber", modelNumber);
    provide("vendorSiteId", vendorSiteId);
    provide("vendor", vendor);

    return {
      goBack,
      redirectToPage,
      createRecord,
    };
  },
};
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
