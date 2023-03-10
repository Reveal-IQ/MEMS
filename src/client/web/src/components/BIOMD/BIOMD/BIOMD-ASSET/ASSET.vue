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
            title="New Asset"
            subTitle="Create a new asset with this form"
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

    const GeneralInformation = ref({
      equipmentNumber: null,
      commonName: null,
      description: null,
      serialNumber: null,
      selectedManufacturer: { manufacturer_name: null, _id: null },
      selectedModel: { model_name: null, _id: null, model_number: null },
      manufacturerDate: null,
    });

    const EquipmentLocation = ref({
      selectedFacility: null,
    })
    
    const Global_Asset_Information = ref({
      manufacturerId: null,
      modelId: null,
      facilityId: {_id: null, facility_name: null},
    });

    // const facilityId = ref(null);
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
              assetCode: GeneralInformation.value.equipmentNumber,
              commonName: GeneralInformation.value.commonName,
              description: GeneralInformation.value.description,
              serialNumber: GeneralInformation.value.serialNumber,
              model_id: Global_Asset_Information.value.modelId,
              manufacturer_id: Global_Asset_Information.value.manufacturerId,
              manufactureDate: GeneralInformation.value.manufacturerDate,
              facility_id: Global_Asset_Information.value.facilityId,
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

    // const getManufacturer = () => {
    //   sendSocketReq({
    //     data: {
    //       Expiry: 20000,
    //       Type: "REQUEST",
    //       Request: {
    //         Module: "MEMS",
    //         ServiceCode: "BIOMD",
    //         API: "FIND_RECORD",
    //         return_array: true,
    //         max_list: 100,
    //         find: {
    //           collection: "Manufacturer",
    //           queries: [
    //             {
    //               field: "manufacturer_name",
    //               op: "sb",
    //               value: "^",
    //             },
    //           ],
    //           projection: {
    //             _id: 1,
    //             manufacturer_name: 1,
    //           },
    //         },
    //         Institute_Code: Institute_Code.value, //Dynamically changes when another institute logged in
    //       },
    //     },
    //     callback: (res) => {
    //       if (res.Type === "RESPONSE") {
    //         // Console the Response Packet
    //         console.log("Response Packet -->", res.Response);
    //         Response: {
    //           Success: "TRUE";
    //           Collection: "manufacturers";
    //           Message: "Find Record";
    //         }
    //         const ManufacturerNameArray = [];
    //         res.Response.records.forEach((manufacturer) => {
    //           ManufacturerNameArray.push(manufacturer.manufacturer_name, manufacturer._id);
    //         });

    //         GeneralInformation.value.manufacturerId = ManufacturerNameArray;
    //       } else if (res.Type === "ERROR") {
    //         // Error response received during fetching
    //         Type: "ERROR";
    //         Response: {
    //           Error_Code: "API-CREATE_RECORD-E001";
    //           Error_Msg: "CREATE_RECORD_API: Failed to execute query";
    //         }
    //       }
    //     },
    //   });
    // };

    const goBack = () => {
      emit("updatePage", "landing");
    };

    provide("GeneralInformation", GeneralInformation);
    provide("EquipmentLocation", EquipmentLocation);
    provide("Global_Asset_Information", Global_Asset_Information);

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
      // getManufacturer,
    };
  },
  // mounted() {
  //   this.getManufacturer();
  // },
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
