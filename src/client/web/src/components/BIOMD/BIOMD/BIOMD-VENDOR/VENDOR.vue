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
  <div class="RevealContainer mb-5">
    <div class="container p-4 m-4">
      <div
        class="d-lg-flex align-items-center flex-lg-row flex-md-row flex-sm-column justify-content-between"
      >
        <div class="d-flex mt-3">
          <Header
            title="Create New Vendor"
            subTitle="Enter all details required for this equipment vendor"
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
              @click="goNext"
              class="text-light"
            />
          </span>
        </div>
      </div>

      <main>
        <VendorInformation />
        <CustomerService />
        <ManufacturerInformation>
          <Btn2
            BtnName="Add Manufacturer"
            backgroundColor="#1266F1"
            :icon="'plus'"
            @click="changePage('manufacturerInfo')"
            class="rounded-pill"
          />
        </ManufacturerInformation>
        <ModelInformation>
          <Btn2
            BtnName="Add Model"
            backgroundColor="#1266F1"
            :icon="'plus'"
            @click="changePage('modelInfo')"
            class="rounded-pill"
          />
        </ModelInformation>
        <div class="d-flex justify-content-center py-3">
          <!-- btn-green and a-link are custom css for MEMS check base.css -->
          <div class="">
            <Btn
              BtnName="Create Vendor"
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
import { ref, toRefs, provide, computed } from "vue";

import VendorInformation from "../BIOMD-VENDOR/VENDOR-VendorInformation.vue";
import CustomerService from "../BIOMD-VENDOR/VENDOR-CustomerService.vue";
import ManufacturerInformation from "../BIOMD-VENDOR/VENDOR-ManufacturerInfo.vue";
import ModelInformation from "../BIOMD-VENDOR/VENDOR-ModelInfo.vue";
import Btn from "../BIOMD-UI/UI-Btn.vue";
import Btn2 from "../BIOMD-UI/UI-Btn2.vue";
import Header from "../BIOMD-UI/UI-FormHeader.vue";

export default {
  components: {
    CustomerService,
    VendorInformation,
    ManufacturerInformation,
    ModelInformation,
    Btn2,
    Btn,
    Header,
  },
  name: "vendor",
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
    const vendorInfo = ref({
      vendorName: null,
      selectedCountry: { Loci_Name_Country: null, Loci_Code_Country: null },
      selectedState: { Loci_Name_State: null, Loci_Code_State: null },
      selectedDistrict: {
        Loci_Name_Area_L1: null,
        Loci_Code_Area_L1: null,
      },
      streetAddress1: null,
      streetAddress2: null,
      zipCode: null,
    });

    const Global_Vendor_Definition = ref({
      vendorAddress: {
        Country: null,
        State: null,
        District: null,
      },
    });

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
            collection: "Vendor",
            record: {
              vendor_name: vendorInfo.value.vendorName,
              country: Global_Vendor_Definition.value.vendorAddress.Country,
              area: Global_Vendor_Definition.value.vendorAddress.State,
              city: Global_Vendor_Definition.value.vendorAddress.District,
              address_1: vendorInfo.value.streetAddress1,
              address_2: vendorInfo.value.streetAddress2,
              areaCode: vendorInfo.value.zipCode,
              contactID: [],
              manufacturer_id: [],
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
              Collection: "vendors";
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

    const changePage = async (page) => {
      emit("updatePage", page);
    };

    provide("vendorInfo", vendorInfo);
    provide("Global_Vendor_Definition", Global_Vendor_Definition);

    return {
      // Return variables/Display Variables in HTML DOM
      getValues,
      // Send Functionality to HTML
      goBack,
      changePage,
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
  overflow: scroll;
}
.RevealContainer::-webkit-scrollbar {
  display: none;
}
</style>
