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
            title="New Facility"
            subTitle="Create a new facility with this form"
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
      <FacilityInformation />

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
    const facilityName = ref(null);
    const country = ref(null);
    const region = ref(null);
    const city = ref(null);
    const streetAddress1 = ref(null);
    const streetAddress2 = ref(null);
    const zipCode = ref(null);
    const departments = ref(null);

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
              facility_name: facilityName.value,
              country: country.value,
              area: region.value,
              city: city.value,
              address_1: streetAddress1.value,
              address_2: streetAddress2.value,
              area_code: zipCode.value,
              location: {
                latitude: "5.6098816",
                longitude: "-0.2097152",
              },
              departments: departments.value,
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
              Collection: "facilities";
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

    provide("facilityName", facilityName);
    provide("country", country);
    provide("region", region);
    provide("city", city);
    provide("streetAddress1", streetAddress1);
    provide("streetAddress2", streetAddress2);
    provide("zipCode", zipCode);
    provide("departments", departments);

    return {
      goBack,
      redirectToPage,
      createRecord,
    };
  },
  components: { FacilityInformation, Btn2, Btn, Header },
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
