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
        @click="goBack"
        class="col-lg-2 col-md-3 col-sm-4 my-3"
      />
    </div>
    <Header
      title="Create New Vendor"
      subTitle="Enter all details required for this equipment vendor"
    />

    <main>
      <VendorInformation />
      <CustomerService />
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
</template>

<script>
import { useStore } from "vuex"; // Access Vuew Store Variables and Methods
import { ref, toRefs, provide, computed } from "vue";

import VendorInformation from "../BIOMD-VENDOR/VENDOR-VendorInformation.vue";
import CustomerService from "../BIOMD-VENDOR/VENDOR-CustomerService.vue";
import Btn from "../BIOMD-UI/UI-Btn.vue";
import Btn2 from "../BIOMD-UI/UI-Btn2.vue";
import Header from "../BIOMD-UI/UI-FormHeader.vue";

export default {
  components: { CustomerService, VendorInformation, Btn2, Btn, Header },
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
    const vendorName = ref(null);
    const country = ref(null);
    const region = ref(null);
    const city = ref(null);
    const streetAddress1 = ref(null);
    const streetAddress2 = ref(null);
    const zipCode = ref(null);

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
              vendor_name: vendorName.value,
              country: country.value,
              area: region.value,
              city: city.value,
              address_1: streetAddress1.value,
              address_2: streetAddress2.value,
              areaCode: zipCode.value,
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

    provide("vendorName", vendorName);
    provide("country", country);
    provide("region", region);
    provide("city", city);
    provide("streetAddress1", streetAddress1);
    provide("streetAddress2", streetAddress2);
    provide("zipCode", zipCode);

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

<style lang="scss" scoped></style>
