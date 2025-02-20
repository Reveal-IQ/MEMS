<template>
  <Section sectionTitle="Model Description">
    <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 g-3">
      <!-- Model Name -->
      <div class="col-lg-6">
        <Input label="Model Name" type="text" id="modelName" placeholder="Model Name" v-model="ModelDesc.modelName" />
      </div>

      <!-- Common Name -->
      <div class="col-lg-6">
        <Input label="Common Name" type="text" id="CommonName" placeholder="Common Name"
          v-model="ModelDesc.commonName" />
      </div>

      <!-- Device Description -->
      <div class="col-lg-6">
        <Input label="Device Description" type="text" id="deviceDescription" placeholder="Device Description"
          v-model="ModelDesc.deviceDescription" />
      </div>

      <!-- Manufacturer -->
      <!-- <div class="col-lg-6 mb-3">
        <label for="manufacturerList" class="form-label">Manufacturer</label>
        <input class="form-control" list="manufacturerListOptions" id="manufacturerList"
          placeholder="Select Manufacturer" aria-label="Default select example"
          v-model="ModelDesc.selectedManufacturer.manufacturerName" @input="fetchManufacturer" autocomplete="off" />
        <datalist id="manufacturerListOptions">
          <option v-for="manufacturer in manufacturerList" :key="manufacturer.index"
            :value="manufacturer.manufacturerName"></option>
        </datalist>
      </div> -->
    </div>
  </Section>
</template>

<script setup>
import { ref, inject, onMounted, watch, computed } from "vue";
import { useStore } from "vuex";
import Input from "../BIOMD-UI/UI-Input.vue";
import Section from "../BIOMD-UI/UI-Section.vue";

const store = useStore();
const sendSocketReq = (request) => {
  store.dispatch("sendSocketReq", request);
};

const { manufacturerName, manufacturerID } = defineProps({
  manufacturerName: {
    type: String,
  },
  manufacturerID: {
    type: String,
  },
})

const ModelDesc = inject("ModelDesc")
const GlobalModelInformation = inject("GlobalModelInformation")

// const manufacturerList = ref(null)

// const fetchManufacturer = async (event) => {
//   try {
//     // If there is no event, do not reset the manufacturerID.
//     if (!event) {
//       return;
//     }
//     const selectedManufacturer = event.target.value;
//     if (!(event instanceof InputEvent) || event.inputType === "insertReplacementText") {
//       ModelDesc.value.selectedManufacturer = manufacturerList.value.find(
//         (manufacturer) => selectedManufacturer === manufacturer.manufacturerName
//       );
//       GlobalModelInformation.value.manufacturerID = ModelDesc.value.selectedManufacturer._id;
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

onMounted(() => {
  if (!ModelDesc.value.selectedManufacturer) {
    ModelDesc.value.selectedManufacturer = { manufacturerName: '', _id: null };
  }
  ModelDesc.value.selectedManufacturer.manufacturerName = manufacturerName;
  ModelDesc.value.selectedManufacturer._id = manufacturerID;
  if (GlobalModelInformation) {
    GlobalModelInformation.value.manufacturerID = manufacturerID;
  }
  // fetchManufacturer();
});

</script>

<style lang="scss" scoped></style>