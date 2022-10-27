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
  <div class="container">
    <div class="d-flex flex-row justify-content-between">
      <Btn2
        BtnName="Back"
        :icon="'arrow-left'"
        @click="goBack()"
        class="col-lg-2 col-md-3 col-sm-4 my-3"
      />
    </div>
    <Header
      title="Create New Asset"
      subTitle="Enter all details required for this medical equipment"
    />

    <main>
      <GeneralInformation />
      <EquipmentLocation />
      <MaintenanceAndSupport />
      <EquipmentAcquisition />
      <MultipleEquipmentEntry />
      <AdditionalInformation />
      <div class="d-flex justify-content-center py-3">
        <div class="">
          <Btn
            BtnName="Create Asset"
            backgroundColor="#27AE60"
            class="mb-3"
            :showLoading="true"
            @click="createRecord()"
          />

          <Btn
            BtnName="Clear Content"
            @click="clearContent()"
            :showLoading="true"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { useStore } from "vuex"; // Access Vuew Store Variables and Methods
import { ref, toRefs, watch, inject, watchEffect, computed } from "vue";

import GeneralInformation from "./ASSET-GeneralInformation.vue";
import EquipmentLocation from "./ASSET-EquipmentLocation.vue";
import EquipmentAcquisition from "./ASSET-EquipmentAcquisition.vue";
import MaintenanceAndSupport from "./ASSET-MaintenanceAndSupport.vue";
import MultipleEquipmentEntry from "./ASSET-MultipleEquipmentEntry.vue";
import AdditionalInformation from "./ASSET-AdditionalInformation.vue";

import Btn from "../BIOMD-UI/UI-Btn.vue";
import Btn2 from "../BIOMD-UI/UI-Btn2.vue";
import Header from "../BIOMD-UI/UI-FormHeader.vue";

export default {
  components: {
    GeneralInformation,
    EquipmentLocation,
    MaintenanceAndSupport,
    AdditionalInformation,
    MultipleEquipmentEntry,
    EquipmentAcquisition,
    Btn2,
    Btn,
    Header,
  },
  name: "equipment",
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
    // send Socket Request use to send rrequest packet for an API
    const sendSocketReq = (request) => {
      store.dispatch("sendSocketReq", request);
    };
    // Object to Store API Response Values
    const getValues = ref({});
    function function_name(parameters) {
      // Write Function Code here .
    }
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
            collection: "Asset",
            record: {
              assetCode: "12345AS",
              commonName: "Phototherapy Unit",
              description: "",
              serialNumber: "12345AS3456",
              model_id: "",
              manufacturer_id: "",
              manufactureDate: "",
              facility_id: "",
              department: "",
              roomTag: "",
              supportTeam: "",
              vendor_id: "",
              status: "",
              user_manual: "",
              technical_manual: "No",
              purchaseOrderNumber: "",
              project: "",
              purchaseCost: "",
              purchaseDate: "",
              acceptanceDate: "",
              warrantyDate: "",
              generalComment: "",
            },
            Institute_Code: Institute_Code.value, //Dynamically changes when another institute logged in
          },
        },
        callback: (res) => {
          if (res.Type === "RESPONSE") {
            // Console the Response Packet
            Response: {
              Success: TRUE;
              Collection: "assets";
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

    return {
      // Return variables/Display Variables in HTML DOM
      getValues,
      // Send Functionality to HTML
      goBack,
      function_name,
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
  overflow-y: scroll;
}
</style>
