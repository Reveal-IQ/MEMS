<template>
  <div class="container-fluid">
    <nav class="d-flex gap-3 p-2">
      <small
        class="text-secondary"
        style="cursor: pointer"
        @click="changePage('dashboard')"
        >Dashboard</small
      >
    </nav>

    <div class="d-flex flex-column p-2 mt-4">
      <span class="title text-dark fw-normal fs-1">Reports</span>
      <span class="sub-title fs-6 fw-normal"
        >Select Facility to generate reports</span
      >
    </div>

    <div class="d-flex gap-2">
      <div
        v-for="facility in facilityList"
        :key="facility.index"
        class="col-lg-4 col-md-8 col-12 p-2 mb-3 mt-4"
      >
        <label for="facilityList" class="form-label">Select Facility</label>
        <input
          class="form-control"
          list="facilityListOptions"
          id="facilityList"
          placeholder="Select facility"
          aria-label="Default select example"
          @input="fetchFacility"
          @change="
            changePage('reportsList', {
              facilityName: facility.facilityName,
            })
          "
          autocomplete="off"
        />
        <datalist id="facilityListOptions">
          <option
            v-for="facility in facilityList"
            :key="facility.index"
            :value="facility.facilityName"
          ></option>
        </datalist>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();
const sendSocketReq = (request) => {
  store.dispatch("sendSocketReq", request);
};

const facilityList = ref(null);

const emit = defineEmits(["updatePage"]);

// Navigate to selected page to edit
const changePage = async (page, props) => {
  emit("updatePage", page, props);
};

const fetchFacility = async () => {
  try {
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
            collection: "Facility",

            projection: {
              _id: 1,
              facilityName: 1,
            },
          },
        },
      },
      callback: (res) => {
        if (res.Type === "RESPONSE") {
          console.log("Response Packet -->", res.Response);
          facilityList.value = res.Response.records;
        } else if (res.Type === "ERROR") {
          Type: "ERROR";
          Response: {
            Error_Code: "API-CREATE_RECORD-E001";
            Error_Msg: "CREATE_RECORD_API: Failed to execute query";
          }
        }
      },
    });
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  fetchFacility();
});
</script>

<style lang="scss" scoped></style>
