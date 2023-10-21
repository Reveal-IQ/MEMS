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
            title="New Asset"
            subTitle="Create a new asset with this form"
          />
          {{ Institute_Code }}
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
        <AssetDetails />
        <AssetLocation />
        <MaintenanceAndSupport />
        <!-- <PurchaseDetails /> -->
        <!--<MultipleEquipmentEntry /> -->
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
  </div>
</template>

<script>
import { useStore } from "vuex"; // Access Vuew Store Variables and Methods
import { ref, toRefs, provide, computed } from "vue";

import AssetDetails from "./ASSET-AssetDetails.vue";
import AssetLocation from "./ASSET-AssetLocation.vue";
import PurchaseDetails from "./ASSET-PurchaseDetails.vue";
import MaintenanceAndSupport from "./ASSET-MaintenanceAndSupport.vue";
import MultipleEquipmentEntry from "./ASSET-MultipleEquipmentEntry.vue";
import AdditionalInformation from "./ASSET-AdditionalInformation.vue";
import { AssetRecord } from "../../../../store/modules/recordSchema";

import Btn from "../BIOMD-UI/UI-Btn.vue";
import Btn2 from "../BIOMD-UI/UI-Btn2.vue";
import Header from "../BIOMD-UI/UI-FormHeader.vue";

export default {
  components: {
    AssetDetails,
    AssetLocation,
    MaintenanceAndSupport,
    AdditionalInformation,
    MultipleEquipmentEntry,
    PurchaseDetails,
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

    const AssetDetails = ref({
      assetCode: null,
      selectedParentAsset: { _id: null },
      serialNumber: null,
      selectedManufacturer: { manufacturerName: null, _id: null },
      selectedModel: {
        modelName: null,
        _id: null,
        commonName: null,
        UMDNSCode: null,
      },
      manufacturerDate: null,
      status: "Active Deployed",
    });

    const AssetLocation = ref({
      selectedFacility: {
        _id: null,
        name: null,
      },
      selectedDepartment: {
        _id: null,
        name: null,
        shortName: null,
      },
      locationName: null,
    });

    const PurchaseDetails = ref({
      selectedPurchaseOrder: {
        _id: null,
        purchaseOrderNumber: null,
      },
      acceptanceDate: null,
    });

    const MaintenanceAndSupport = ref({
      supportTeam: null,
    });

    const AdditionalInformation = ref({
      comment: null,
    });

    const GlobalAssetInformation = ref({
      parentAssetID: null,
      manufacturerID: null,
      modelID: null,
      facilityID: null,
      departmentID: null,
      purchaseOrderID: null,
      vendorID: null,
    });

    const changePage = (page) => {
      emit("updatePage", page);
    };

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
            record: new AssetRecord({
              assetCode: AssetDetails.value.assetCode,
              parentAssetID: GlobalAssetInformation.value.parentAssetID,
              serialNumber: AssetDetails.value.serialNumber,
              manufacturerID: GlobalAssetInformation.value.manufacturerID,
              modelID: GlobalAssetInformation.value.modelID,
              manufacturerDate: AssetDetails.value.manufacturerDate,
              status: AssetDetails.value.status,
              facilityID: GlobalAssetInformation.value.facilityID,
              departmentID: GlobalAssetInformation.value.departmentID,
              locationName: AssetLocation.value.locationName,
              supportTeam: MaintenanceAndSupport.value.supportTeam,
              purchaseOrderID: GlobalAssetInformation.value.purchaseOrderID,
              acceptanceDate: PurchaseDetails.value.acceptanceDate,
              vendorID: GlobalAssetInformation.value.vendorID,
              comment: AdditionalInformation.value.comment,
            }).serialize(),
            Institute_Code: Institute_Code.value, //Dynamically changes when another institute logged in
          },
        },
        callback: (res) => {
          if (res.Type === "RESPONSE") {
            changePage("success");

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
      emit("updatePage", "dashboard");
    };

    provide("AssetDetails", AssetDetails);
    provide("AssetLocation", AssetLocation);
    provide("MaintenanceAndSupport", MaintenanceAndSupport);
    provide("PurchaseDetails", PurchaseDetails);
    provide("AdditionalInformation", AdditionalInformation);
    provide("GlobalAssetInformation", GlobalAssetInformation);

    return {
      goBack,
      redirectToPage,
      createRecord,
      changePage,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../../GLOBAL//Styles//colors.scss";
.RevealContainer {
  min-height: 100vh;
  max-height: 100vh;
  background-color: $White;
  overflow: scroll;
}

.RevealContainer::-webkit-scrollbar {
  display: none;
}
</style>
