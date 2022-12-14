<!-- 
************************************
Created By : Reveal Foundation  
Author     : Edward Opoku-Agyemang           
Date       : 03-Sep-2022
Version    : 0.0.2   
Description: Describe the application
************************************
-->

<template>
  <div class="RevealContainer">
    <div class="container p-4 m-4">
      <!-- Welcome Variable Rendering with Mustatsh syntax. Variable is databinded -->
      <div
        class="d-lg-flex align-items-center flex-lg-row flex-md-row flex-sm-column justify-content-between"
      >
        <div class="d-flex mt-3">
          <Header
            title="New Manufacturer"
            subTitle="Create new manufacturer with this form"
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
        <ManufacturerInformation />

        <div class="d-flex justify-content-center py-3">
          <!-- btn-green and a-link are custom css for MEMS check base.css -->
          <div class="">
            <Btn
              BtnName="Create Manufacturer"
              backgroundColor="#27AE60"
              class="mb-3"
              @click="createRecord()"
            />

            <Btn BtnName="Clear Content" />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { ref, toRefs, provide, computed } from "vue";

import ManufacturerInformation from "./MANUFACTURER-ManufacturerInformation.vue";
import Btn from "../BIOMD-UI/UI-Btn.vue";
import Btn2 from "../BIOMD-UI/UI-Btn2.vue";
import Header from "../BIOMD-UI/UI-FormHeader.vue";

export default {
  name: "manufacturer",
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

    const manufacturerInfo = ref({
      manufacturerName: null,
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

    const Global_Manufacturer_Definition = ref({
      manufacturerAddress: {
        Country: null,
        State: null,
        District: null,
      },
    });

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
            collection: "Manufacturer",
            record: {
              manufacturer_name: manufacturerInfo.value.manufacturerName,
              country:
                Global_Manufacturer_Definition.value.manufacturerAddress
                  .Country,
              area: Global_Manufacturer_Definition.value.manufacturerAddress
                .State,
              city: Global_Manufacturer_Definition.value.manufacturerAddress
                .District,
              address_1: manufacturerInfo.value.streetAddress1,
              address_2: manufacturerInfo.value.streetAddress2,
              area_code: manufacturerInfo.value.zipCode,
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
              Collection: "manufacturers";
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

    provide("manufacturerInfo", manufacturerInfo);
    provide("Global_Manufacturer_Definition", Global_Manufacturer_Definition);

    return {
      goBack,
      redirectToPage,
      createRecord,
    };
  },
  components: { ManufacturerInformation, Btn2, Btn, Header },
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
