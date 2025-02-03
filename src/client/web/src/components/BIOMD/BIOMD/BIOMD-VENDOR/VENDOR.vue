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
            :title="mode === 'edit' ? 'Edit Vendor' : 'Create New Vendor'"
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
              :BtnName="mode === 'edit' ? 'Edit Vendor' : 'Create Vendor'"
              backgroundColor="#27AE60"
              class="mb-3"
              @click="handleSubmit"
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
import { ref, provide, computed, watch } from "vue";

import VendorInformation from "./VENDOR-VendorInformation.vue";
import CustomerService from "./VENDOR-CustomerService.vue";
import ManufacturerInformation from "./VENDOR-ManufacturerInfo.vue";
import ModelInformation from "./VENDOR-ModelInfo.vue";
import Btn from "../BIOMD-UI/UI-Btn.vue";
import Btn2 from "../BIOMD-UI/UI-Btn2.vue";
import Header from "../BIOMD-UI/UI-FormHeader.vue";
import UIToast from "../BIOMD-UI/UI-Toast.vue";
import { VendorRecord } from "../../../../store/modules/recordSchema";

export default {
  components: {
    CustomerService,
    VendorInformation,
    ManufacturerInformation,
    ModelInformation,
    Btn2,
    Btn,
    Header,
    UIToast,
  },
  name: "vendor",
  // Define Props here
  props: {
    tabid: {
      type: String,
    },
    mode: {
      type: String,
      default: "create",
    },
    vendorData: {
      type: Object,
      default: () => ({}),
    },
    manufacturerData: {
      type: Object,
      default: () => ({}),
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

    const vendorInfo = ref(
      props.mode === 'edit' && props.vendorData ? {
        vendorName: props.vendorData.vendorName,
        country: props.vendorData.country,
        area: props.vendorData.area,
        city: props.vendorData.city,
        address1: props.vendorData.address_1,
        address2: props.vendorData.address_2,
        areaCode: props.vendorData.zipCode,
        contactInfo: props.vendorData.contactInfo?.map(contact => ({
          number: contact.number,
          name: contact.name,
          email: contact.email,
          type: contact.type
        })) || [],
        selectedCountry: { 
        Loci_Name_Country: null, 
        Loci_Code_Country: null 
      },
      selectedState: { 
        Loci_Name_State: null, 
        Loci_Code_State: null 
      },
      selectedDistrict: {
        Loci_Name_Area_L1: null,
        Loci_Code_Area_L1: null,
      },
      streetAddress1: null,
      streetAddress2: null,
      zipCode: null,
    } : {
        vendorName: null,
        country: null,
        area: null,
        city: null, 
        address1: null,
        address2: null,
        areaCode: null,
        // selectedCountry: { Loci_Name_Country: null, Loci_Code_Country: null },
        // selectedState: { Loci_Name_State: null, Loci_Code_State: null },
        // selectedDistrict: {
        //   Loci_Name_Area_L1: null,
        //   Loci_Code_Area_L1: null,
        // },
        // streetAddress1: null,
        // streetAddress2: null,
        // zipCode: null,
    }
  );

    const manufacturerInfo = ref(
      props.mode === 'edit' ? {
        selectedManufacturer: {
          manufacturerName: props.manufacturerData.manufacturerName,
          _id: props.manufacturerData._id,
        },
        listedModels: {
          modelName: props.manufacturerData.listedModels.modelName,
          _id: props.manufacturerData.listedModels._id,
        },
      } : {
      selectedManufacturer: { manufacturerName: null, _id: null },
      listedModels: { modelName: null, _id: null },
    });

    const contactInfo = ref([
      {
        number: null,
        name: null,
        email: null,
        type: "Biomedical Service",
      },
    ]);

    const GlobalVendorDefinition = ref({
      vendorAddress: {
        Country: null,
        State: null,
        District: null,
      },
      manufacturerID: null,
      modelID: null,
    });

    const changePage = async (page) => {
      emit("updatePage", page);
    };

    const sendSocketReq = (request) => {
      store.dispatch("sendSocketReq", request);
    };

    if (props.mode === 'edit' && props.vendorData._id) {
      fetchVendor();
    }

    const fetchVendor = async () => {
      try {
        sendSocketReq({
          data: {
            Expiry: 2000,
            Type: "REQUEST",
            Request: {
              Module: "MEMS",
              ServiceCode: "BIOMD",
              return_array: true,
              max_list: 100,
              find: {
                collection: "Vendor",
                queries: [
                  {
                    field: "_id",
                    op: "eq",
                    value: props.vendorData._id,
                  },
                ],
                lookups: [
                  {
                    localField: "manufacturerList.manufacturer",
                    collection: "Manufacturer",
                    foreignField: "_id",
                    as: "Manufacturer"
                  }
                ],
                projection: {
                  _id: 1,
                  vendorName: 1,
                  country: 1,
                  area: 1,
                  city: 1,
                  address_1: 1,
                  address_2: 1,
                  areaCode: 1,
                  // contactInfo: 1,
                  // manufacturerList: 1,
                  // "Manufacturer.manufacturerName": 1
                }
              }
            }
          },
          callback: (res) => {
            if (res.Type === "RESPONSE") {
              console.log("Vendor Details --->", res.Response);
              vendorInfo.value = res.Response.records[0];
            }
          }
        });
      } catch (error) {
        console.log(error);
      }
    }

    function handleSubmit() {
      const vendorRecord = new VendorRecord({
        vendorName: vendorInfo.value.vendorName,
        country: GlobalVendorDefinition.value.vendorAddress.Country,
        area: GlobalVendorDefinition.value.vendorAddress.State,
        city: GlobalVendorDefinition.value.vendorAddress.District,
        address_1: vendorInfo.value.streetAddress1,
        address_2: vendorInfo.value.streetAddress2,
        areaCode: vendorInfo.value.zipCode,
        contactInfo: [
          {
            number: contactInfo.value.number,
            name: contactInfo.value.name,
            email: contactInfo.value.email,
            type: contactInfo.value.type,
          },
        ],
        manufacturerList: [
          {
            manufacturer: GlobalVendorDefinition.value.manufacturerID,
          },
        ],
      }).serialize();

      sendSocketReq({
        data: {
          Expiry: 20000,
          Type: "REQUEST",
          Request: {
            Module: "MEMS",
            ServiceCode: "BIOMD",
            API: props.mode === 'edit' ? "UPDATE_RECORD" : "CREATE_RECORD",
            collection: "Vendor",
            ...(props.mode === 'edit'
              ? {
                filter: {
                  _id: props.vendorData._id,
                },
                update: {
                  $set: vendorRecord,
                },
              }
              : {
                record: vendorRecord,
              }
            ),
            Institute_Code: Institute_Code.value,
          },
        },
        callback: (res) => {
          if (res.Type === "RESPONSE") {
            changePage("success")
          }
        }
      })
    }

    watch(() => props.vendorData, (newData) => {
      vendorInfo.value = {
        vendorName: newData.vendorName,
        country: GlobalVendorDefinition.value.vendorAddress.Country,
        area: GlobalVendorDefinition.value.vendorAddress.State,
        city: GlobalVendorDefinition.value.vendorAddress.District,
        address_1: vendorInfo.value.streetAddress1,
        address_2: vendorInfo.value.streetAddress2,
        areaCode: vendorInfo.value.zipCode,
        // selectedCountry: {
        //   Loci_Name_Country: newData.selectedCountry.Loci_Name_Country,
        //   Loci_Code_Country: newData.selectedCountry.Loci_Code_Country,
        // },
        // selectedState: {
        //   Loci_Name_State: newData.selectedState.Loci_Name_State,
        //   Loci_Code_State: newData.selectedState.Loci_Code_State,
        // },
        // selectedDistrict: {
        //   Loci_Name_Area_L1: newData.selectedDistrict.Loci_Name_Area_L1,
        //   Loci_Code_Area_L1: newData.selectedDistrict.Loci_Code_Area_L1,
        // },
        // streetAddress1: newData.streetAddress1,
        // streetAddress2: newData.streetAddress2,
        // zipCode: newData.zipCode,
      }
  }, {immediate: true})

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
            record: new VendorRecord({
              vendorName: vendorInfo.value.vendorName,
              country: GlobalVendorDefinition.value.vendorAddress.Country,
              area: GlobalVendorDefinition.value.vendorAddress.State,
              city: GlobalVendorDefinition.value.vendorAddress.District,
              address_1: vendorInfo.value.streetAddress1,
              address_2: vendorInfo.value.streetAddress2,
              areaCode: vendorInfo.value.zipCode,
              contactInfo: [
                {
                  number: contactInfo.value.number,
                  name: contactInfo.value.name,
                  email: contactInfo.value.email,
                  type: contactInfo.value.type,
                },
              ],
              manufacturerList: [
                {
                  manufacturer: GlobalVendorDefinition.value.manufacturerID,
                },
              ],
            }).serialize(),
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
    provide("GlobalVendorDefinition", GlobalVendorDefinition);

    return {
      goBack,
      changePage,
      redirectToPage,
      // createRecord,
      handleSubmit,
      fetchVendor
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
