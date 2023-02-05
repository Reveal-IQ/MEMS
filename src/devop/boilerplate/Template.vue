<!-- 
************************************
Created By : Reveal Foundation  
Author     : < Name >           
Date       : < DD-MON-YYYY >    
Version    : < #.#.# >   
Description: < Describe the application >          
************************************
-->

<template>
  <div class="RevealContainer">
    <div class="container p-4 m-4">
      <!-- Welcome Variable Rendering with Mustatsh syntax. Variable is databinded -->
      <h4 class="d-flex justify-content-center">{{ variable }}</h4>
      <br />

      <div class="row d-flex justify-content-center">
        <div class="col-6 shadow siteInfoBox m-2">
          <div class="card-header">Site Information</div>
          <div class="row">
            <div class="col-7">
              <div class="d-flex flex-column">
                <div class="fs-4 fw-bold m-2">
                  Name:
                  <span class="fw-normal"> {{ getValues.Institute_Name }}</span>
                </div>
                <div class="fs-4 fw-bold m-2">
                  Site Code:
                  <span class="fw-normal"> {{ getValues.Institute_Code }}</span>
                </div>
                <div class="fs-4 fw-bold m-2">
                  Contact:
                  <span class="fw-normal">
                    {{ getValues.Contact_Telephone }}</span
                  >
                </div>
              </div>
            </div>
            <div class="col-5">
              <img
                src="../../../assets/media/Female.png"
                alt=""
                width="230"
                height="230"
                class="m-2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex"; // Access Vuew Store Variables and Methods
import { ref, toRefs, watch, inject, watchEffect, computed } from "vue"; // Based on the requirement import keywords

export default {
  name: "VueComponent",

  // Define Props here
  props: {},

  // Emit value can pass within this array
  emits: [],

  setup(props, { emit }) {
    const { props_variable } = toRefs(props); // include variables from the props with help of toRefs

    const store = useStore();
    const Institute_Code = computed(
      () => store.state.globalStore.UserInfo.Institute_Info.Code
    );
    const variable = ref("Welcome to New Component"); // Declare New Variables

    // change Servive state is used to Navigate to the component
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
    function apicalls() {
      // send Request as below .
      sendSocketReq({
        data: {
          Expiry: 20000,
          Type: "REQUEST", // Request packet
          Request: {
            ServiceCode: "ADPNL", // App name should edit here
            API: "Site_Info", // API Name should be edit here
            Institute_Code: Institute_Code.value, //Dynamically changes when another institute logged in
          },
        },
        callback: (res) => {
          if (res.Type === "RESPONSE") {
            // Console the Response Packet
            console.log("Response Packet -->", res.Response);
            getValues.value = res.Response.Site_Info[0]; //Assigning response values to getValues Object
          } else if (res.Type === "ERROR") {
            // Error response received during fetching
          }
        },
      });
    }

    //Call API Request
    apicalls();

    return {
      // Return variables/Display Variables in HTML DOM
      variable,
      getValues,
      // Send Functionality to HTML
      function_name,
      redirectToPage,
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