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
            title="New Facility"
            subTitle="Create a new facility with this form"
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
        <FacilityInformation />
        <!-- <SuccessPage /> -->

        <div class="d-flex justify-content-center py-3">
          <div class="">
            <Btn
              BtnName="Create Facility"
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
import { useStore } from "vuex"; // Access Vuew Store Variables and Methods
import { ref, toRefs, provide, computed } from "vue";
import FacilityInformation from "./FACILITY-FacilityInformation.vue"; // Based on the requirement import keywords
import Btn from "../BIOMD-UI/UI-Btn.vue";
import Btn2 from "../BIOMD-UI/UI-Btn2.vue";
import Header from "../BIOMD-UI/UI-FormHeader.vue";
import SuccessPage from "../BIOMD-UI/UI-SuccessPage.vue";

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
    const facilityInfo = ref({
      facilityName: null,
      selectedCountry: { Loci_Name_Country: null, Loci_Code_Country: null },
      selectedState: { Loci_Name_State: null, Loci_Code_State: null },
      selectedDistrict: {
        Loci_Name_Area_L1: null,
        Loci_Code_Area_L1: null,
      },
      streetAddress1: null,
      streetAddress2: null,
      zipCode: null,
      departments: [],
    });

    const Global_Facility_Definition = ref({
      facilityAddress: {
        Country: null,
        State: null,
        District: null,
      },
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
            collection: "Facility",
            record: {
              facility_name: facilityInfo.value.facilityName,
              country: Global_Facility_Definition.value.facilityAddress.Country,
              area: Global_Facility_Definition.value.facilityAddress.State,
              city: Global_Facility_Definition.value.facilityAddress.District,
              address_1: facilityInfo.value.streetAddress1,
              address_2: facilityInfo.value.streetAddress2,
              area_code: facilityInfo.value.zipCode,
              departments: facilityInfo.value.departments,
            },
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
      emit("updatePage", "landing");
    };

    provide("facilityInfo", facilityInfo);
    provide("Global_Facility_Definition", Global_Facility_Definition);

    return {
      goBack,
      redirectToPage,
      createRecord,
      changePage,
    };
  },
  components: { FacilityInformation, Btn2, Btn, Header, SuccessPage },
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
