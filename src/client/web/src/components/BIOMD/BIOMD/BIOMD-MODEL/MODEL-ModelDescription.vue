<template>
    <Section sectionTitle="Model Description">
    <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 g-3">
      <!-- Model Name -->
      <div class="col-lg-6">
        <Input
          label="Model Name"
          type="text"
          id="modelName"
          placeholder="Model Name"
          v-model="ModelDesc.modelName"
        />
      </div>

      <!-- Common Name -->
      <div class="col-lg-6">
        <Input
          label="Common Name"
          type="text"
          id="CommonName"
          placeholder="Common Name"
          v-model="ModelDesc.commonName"
        />
      </div>

      <!-- Manufacturer -->
      <div class="col-lg-6 mb-3">
        <label for="manufacturerList" class="form-label">Manufacturer</label>
        <input
          class="form-control"
          list="manufacturerListOptions"
          id="manufacturerList"
          placeholder="Select Manufacturer"
          aria-label="Default select example"
          v-model="ModelDesc.selectedManufacturer.manufacturerName"
          @input="fetchManufacturer"
          autocomplete="off"
        />
        <datalist id="manufacturerListOptions">
          <option
            v-for="manufacturer in manufacturerList"
            :key="manufacturer.index"
            :value="manufacturer.manufacturerName"
          ></option>
        </datalist>
      </div>
    </div>
  </Section>
</template>

<script setup>
import { ref, inject, onMounted, watch } from "vue";
import { useStore } from "vuex";
import Input from "../BIOMD-UI/UI-Input.vue";
import Section from "../BIOMD-UI/UI-Section.vue";

const store = useStore();
const sendSocketReq = (request) => {
  store.dispatch("sendSocketReq", request);
};

const props = defineProps([
  "manufacturerName"
])

const ModelDesc = inject("ModelDesc")
const GlobalModelInformation = inject("GlobalModelInformation")

const manufacturerList = ref(null)

const fetchManufacturer = async (event) => {
    try {
        const selectedManufacturer = event ? event.target.value : "";
        if(
          event &&
          (!(event instanceof InputEvent) || event.inputType === "insertReplacementText")
        ) {
          ModelDesc.value.selectedManufacturer = manufacturerList.value.find(
            (manufacturer) => {
              return selectedManufacturer === manufacturer.manufacturerName;
            }
          );
          GlobalModelInformation.value.manufacturerID = ModelDesc.value.selectedManufacturer._id;
        } else {
          GlobalModelInformation.value.manufacturerID = null;

          sendSocketReq({
            data: {
              Expiry: 20000,
              Type: "REQUEST",
              Request: {
                Module: "MEMS",
                ServiceCode: "BIOMD",
                API: "FIND_RECORD",
                return_array: true,
                max_list: 100,
                find: {
                  collection: "Manufacturer",
                  query: [
                    {
                      field: "manufacturerName",
                      operator: "sb",
                      value: "^"
                    }
                  ],
                  projection: {
                    _id: 1,
                    manufacturerName: 1
                  }
                }
            }
          }, callback: (res) => {
            if (res.Type === "RESPONSE") {
            // Console the Response Packet
            console.log("Response Packet -->", res.Response);
            manufacturerList.value = res.Response.records;
          } else if (res.Type === "ERROR") {
            // Error response received during fetching
            Type: "ERROR";
            Response: {
              Error_Code: "API-CREATE_RECORD-E001";
              Error_Msg: "CREATE_RECORD_API: Failed to execute query";
            }
          }
        }
          })
        }
    } catch (error) {
        console.log(error)
    }
}

onMounted(() => {
  if (!ModelDesc.value.selectedManufacturer) {
    ModelDesc.value.selectedManufacturer = { manufacturerName: '', _id: null };
  }
  ModelDesc.value.selectedManufacturer.manufacturerName = props.manufacturerName;
  console.log(props.manufacturerName)
  fetchManufacturer();
});

watch(
  () => props.manufacturerName,
  (newVal) => {
    if (newVal) {
      ModelDesc.value.selectedManufacturer.manufacturerName = newVal;
    }
  },
  { immediate: true }
);

</script>

<style lang="scss" scoped>

</style>