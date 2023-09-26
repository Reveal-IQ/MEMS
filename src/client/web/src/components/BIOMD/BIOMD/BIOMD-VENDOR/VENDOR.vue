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
        class="d-lg-flex d-md-flex d-sm-flex gap-lg-0 gap-sm-5 align-items-center justify-content-lg-between justify-content-md-between justify-content-sm-center"
      >
        <div class="mt-3">
          <Header
            title="Create New Vendor"
            subTitle="Enter all details required for this equipment vendor"
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
        <VendorInformation />
        <CustomerService />
        <ManufacturerInformation />
        <div class="d-flex justify-content-center py-3">
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
import { ref, provide, computed } from "vue";

import VendorInformation from "./VENDOR-VendorInformation.vue";
import CustomerService from "./VENDOR-CustomerService.vue";
import ManufacturerInformation from "./VENDOR-ManufacturerInfo.vue";
import ModelInformation from "./VENDOR-ModelInfo.vue";
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

    const manufacturerInfo = ref({
      selectedManufacturer: { manufacturer_name: null, _id: null },
      listedModels: { model_name: null, _id: null },
    });

    const contactInfo = ref([
      {
        contactNumber: null,
        representativeName: null,
        email: null,
        contactType: null,
      },
    ]);

    const Global_Vendor_Definition = ref({
      vendorAddress: {
        Country: null,
        State: null,
        District: null,
      },
      manufacturerId: null,
      modelId: null,
    });

    const changePage = async (page) => {
      emit("updatePage", page);
    };

    const sendSocketReq = (request) => {
      store.dispatch("sendSocketReq", request);
    };

    function createRecord() {
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
              contact_info: [
                {
                  contact_number: contactInfo.value.contactNumber,
                  representative_name: contactInfo.value.representativeName,
                  email: contactInfo.value.email,
                  contact_type: contactInfo.value.contactType,
                },
              ],
              manufacturer_list: [
                {
                  manufacturer: Global_Vendor_Definition.value.manufacturerId,
                  model_list: [
                    { model_id: Global_Vendor_Definition.value.modelId },
                  ],
                },
              ],
            },
            Institute_Code: Institute_Code.value,
          },
        },
        callback: (res) => {
          if (res.Type === "RESPONSE") {
            changePage("success");

            console.log("Response Packet -->", res.Response);
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

    provide("vendorInfo", vendorInfo);
    provide("manufacturerInfo", manufacturerInfo);
    provide("contactInfo", contactInfo);
    provide("Global_Vendor_Definition", Global_Vendor_Definition);

    return {
      goBack,
      changePage,
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
