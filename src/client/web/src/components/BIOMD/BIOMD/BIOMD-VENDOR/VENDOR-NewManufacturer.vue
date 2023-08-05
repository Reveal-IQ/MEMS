<template>
  <Section sectionTitle="Add New Manufacturer">
    <div class="col-lg-6">
      <Input
        label="Manufacturer Name"
        type="text"
        id="manufacturerName"
        placeholder="Manufacturer Name"
        v-model="manufacturerInfo.manufacturerName"
      />
    </div>

    <Btn2
      BtnName="Submit"
      :icon="'plus'"
      backgroundColor="none"
      @click="createRecord"
      class="text-primary btn-sm"
    />
  </Section>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import Input from "../BIOMD-UI/UI-Input.vue";
import Btn2 from "../BIOMD-UI/UI-Btn2.vue";
import Section from "../BIOMD-UI/UI-Section.vue";

const store = useStore();
const Institute_Code = computed(
  () => store.state.globalStore.UserInfo.Institute_Info.Code
);

const manufacturerInfo = ref({
  manufacturerName: null,
});

const sendSocketReq = (request) => {
  store.dispatch("sendSocketReq", request);
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
        collection: "Manufacturer",
        record: {
          manufacturer_name: manufacturerInfo.value.manufacturerName,
          // country:
          //   Global_Manufacturer_Definition.value.manufacturerAddress
          //     .Country,
          // area: Global_Manufacturer_Definition.value.manufacturerAddress
          //   .State,
          // city: Global_Manufacturer_Definition.value.manufacturerAddress
          //   .District,
          // address_1: manufacturerInfo.value.streetAddress1,
          // address_2: manufacturerInfo.value.streetAddress2,
          // area_code: manufacturerInfo.value.zipCode,
        },
        Institute_Code: Institute_Code.value, //Dynamically changes when another institute logged in
      },
    },
    callback: (res) => {
      if (res.Type === "RESPONSE") {
        manufacturerInfo.value.manufacturerName = null;

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
</script>

<style lang="scss" scoped></style>
