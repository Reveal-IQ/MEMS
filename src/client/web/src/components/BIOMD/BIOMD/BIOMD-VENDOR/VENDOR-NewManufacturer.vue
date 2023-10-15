<template>
  <Section sectionTitle="Add New Manufacturer">
    <div class="d-flex">
      <div class="col">
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
      </div>
      <slot />
    </div>
  </Section>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import Input from "../BIOMD-UI/UI-Input.vue";
import Btn2 from "../BIOMD-UI/UI-Btn2.vue";
import Section from "../BIOMD-UI/UI-Section.vue";
import { ManufacturerRecord } from "../../../../store/modules/recordSchema";

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
        record: new ManufacturerRecord({
          manufacturer_name: manufacturerInfo.value.manufacturerName,
        }).serialize(),
        Institute_Code: Institute_Code.value,
      },
    },
    callback: (res) => {
      if (res.Type === "RESPONSE") {
        manufacturerInfo.value.manufacturerName = null;

        console.log("Response Packet -->", res.Response);
      } else if (res.Type === "ERROR") {
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
