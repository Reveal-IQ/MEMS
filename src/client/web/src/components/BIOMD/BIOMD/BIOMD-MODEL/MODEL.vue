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
        class="d-lg-flex d-md-flex d-sm-flex gap-lg-0 gap-sm-5 align-items-center justify-content-lg-between justify-content-md-between justify-content-sm-center"
      >
        <div class="mt-3">
          <Header
            title="Equipment Model"
            subTitle="Create a new equipment model with this form"
          />
        </div>
        <div class="d-flex gap-2 d-md-block">
          <Btn2
            BtnName="Return"
            :icon="'arrow-left'"
            backgroundColor="none"
            @click="goBack"
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
        <ModelDescription />

        <div class="d-flex justify-content-center py-3">
          <div class="">
            <Btn
              BtnName="Create Model"
              backgroundColor="#27AE60"
              class="mb-3"
              @click="createRecord"
            />

            <Btn BtnName="Clear Content" @click="clearContent" />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { ref, computed, provide } from "vue";

import Btn from "../BIOMD-UI/UI-Btn.vue";
import Btn2 from "../BIOMD-UI/UI-Btn2.vue";
import Header from "../BIOMD-UI/UI-FormHeader.vue";
import ModelDescription from "../BIOMD-MODEL/MODEL-ModelDescription.vue";

export default {
  components: { ModelDescription, Btn2, Btn, Header },
  name: "model",
  props: {
    tabid: {
      type: String,
    },
  },
  emits: ["updatePage"],
  setup(props, { emit }) {
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

    const ModelDescription = ref({
      modelName: null,
      modelNumber: null,
      selectedManufacturer: { manufacturer_name: null, _id: null },
      vendorSiteId: null,
    });

    const Global_Model_Information = ref({
      manufacturerId: null,
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
              manufacturer_id: Global_Model_Information.value.manufacturerId,
              model_name: ModelDescription.value.modelName,
              model_number: ModelDescription.value.modelNumber,
              vendor_site_ID: ModelDescription.value.vendorSiteId,
            },
            Institute_Code: Institute_Code.value,
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

    const clearContent = () => {
      ModelDescription.value.modelName = null;
      ModelDescription.value.modelNumber = null;
      ModelDescription.value.vendorSiteId = null;
    };

    provide("ModelDescription", ModelDescription);
    provide("Global_Model_Information", Global_Model_Information);

    return {
      goBack,
      redirectToPage,
      createRecord,
      clearContent,
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
