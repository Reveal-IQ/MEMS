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
import { ref, toRefs, provide, computed } from "vue";

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

    const equipmentNumber = ref(null);
    const commonName = ref(null);
    const description = ref(null);
    const serialNumber = ref(null);
    const modelNumber = ref(null);
    const manufacturerId = ref(null);
    const manufacturerDate = ref(null);

    const facilityId = ref(null);
    const departmentId = ref(null);
    const region = ref(null);
    const district = ref(null);
    const location = ref(null);

    const supportTeam = ref(null);
    const vendorId = ref(null);
    const status = ref(null);
    const userManual = ref(false);
    const technicalManual = ref(false);

    const purchaseOrder = ref(null);
    const project = ref(null);
    const purchaseCost = ref(null);
    const purchaseDate = ref(null);
    const acceptanceDate = ref(null);
    const warrantyDate = ref(null);
    const comment = ref(null);

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
            collection: "Asset",
            record: {
              assetCode: equipmentNumber.value,
              commonName: commonName.value,
              description: description.value,
              serialNumber: serialNumber.value,
              model_id: modelNumber.value,
              manufacturer_id: manufacturerId.value,
              manufactureDate: manufacturerDate.value,
              facility_id: facilityId.value,
              department: departmentId.value,
              roomTag: location.value,
              supportTeam: supportTeam.value,
              vendor_id: vendorId.value,
              status: status.value,
              user_manual: userManual.value,
              technical_manual: technicalManual.value,
              purchaseOrderNumber: purchaseOrder.value,
              project: project.value,
              purchaseCost: purchaseCost.value,
              purchaseDate: purchaseDate.value,
              acceptanceDate: acceptanceDate.value,
              warrantyDate: warrantyDate.value,
              generalComment: comment.value,
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

    provide("equipmentNumber", equipmentNumber);
    provide("commonName", commonName);
    provide("description", description);
    provide("serialNumber", serialNumber);
    provide("modelNumber", modelNumber);
    provide("manufacturerId", manufacturerId);
    provide("manufacturerDate", manufacturerDate);

    provide("facilityId", facilityId);
    provide("departmentId", departmentId);
    provide("region", region);
    provide("district", district);
    provide("location", location);

    provide("supportTeam", supportTeam);
    provide("vendorId", vendorId);
    provide("status", status);
    provide("userManual", userManual);
    provide("technicalManual", technicalManual);

    provide("purchaseOrder", purchaseOrder);
    provide("project", project);
    provide("purchaseCost", purchaseCost);
    provide("purchaseDate", purchaseDate);
    provide("acceptanceDate", acceptanceDate);
    provide("warrantyDate", warrantyDate);
    provide("comment", comment);

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
  overflow-y: scroll;
}
</style>
