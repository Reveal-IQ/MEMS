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
            title="Department"
            subTitle="Create a new department with this form"
          />
        </div>
        <div class="d-flex gap-2 d-md-block">
          <Btn2
            BtnName="Return"
            :icon="'arrow-left'"
            backgroundColor="none"
            @click="changePage('facilityDetail')"
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
        <ModelDescription />

        <div class="d-flex justify-content-center py-3">
          <div class="">
            <Btn
              BtnName="Create Department"
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
import { useStore } from "vuex";
import { ref, computed, provide } from "vue";

import Btn from "../BIOMD-UI/UI-Btn.vue";
import Btn2 from "../BIOMD-UI/UI-Btn2.vue";
import Header from "../BIOMD-UI/UI-FormHeader.vue";
import ModelDescription from "../BIOMD-MODEL/MODEL-ModelDescription.vue";
import { DepartmentRecord } from "../../../../store/modules/recordSchema";

export default {
  components: { ModelDescription, Btn2, Btn, Header },
  name: "model",
  props: {
    tabid: {
      type: String,
    },
  },
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

    const DepartmentDescription = ref({
      departmentName: null,
      shortName: null,
      selectedFacility: { facilityName: null, _id: null },
    });

    const GlobalDepartmentInformation = ref({
      facilityID: null,
    });

    const sendSocketReq = (request) => {
      store.dispatch("sendSocketReq", request);
    };

    const changePage = async (page) => {
      emit("updatePage", page);
    };

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
            collection: "Department",
            record: new DepartmentRecord({
              facilityID: GlobalDepartmentInformation.value.facilityID,
              departmentName: DepartmentDescription.value.departmentName,
              shortName: DepartmentDescription.value.shortName,
            }).serialize(),
            Institute_Code: Institute_Code.value,
          },
        },
        callback: (res) => {
          if (res.Type === "RESPONSE") {
            changePage("success");

            console.log("Response Packet -->", res.Response);
            // getValues.value = res.Response.Site_Info[0]; //Assigning response values to getValues Object
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

    provide("DepartmentDescription", DepartmentDescription);
    provide("GlobalDepartmentInformation", GlobalDepartmentInformation);

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
.RevealContainer {
  min-height: 100vh;
  max-height: 100vh;
  overflow: scroll;
}

.RevealContainer::-webkit-scrollbar {
  display: none;
}
</style>
