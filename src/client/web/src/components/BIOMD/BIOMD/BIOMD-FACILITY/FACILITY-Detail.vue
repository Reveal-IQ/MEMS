<template>
  <div class="container-fluid">
    <nav class="d-flex gap-3 p-2">
      <small
        class="text-secondary"
        style="cursor: pointer"
        @click="changePage('dashboard')"
        >Back</small
      >
    </nav>

    <div class="d-flex flex-column p-2 mt-4">
      <div>
        <span class="title text-dark fw-normal fs-1">Site Description</span>
      </div>
      <div>
        <span class="fsXs">
          Overview of all the facilities within your site.
        </span>
      </div>
    </div>
    <div class="row p-2 mt-4 mb-5">
      <div class="col-md-6">
        <div class="mb-5">
          <div class="">
            <span class="card-title fw-normal fs-5">Summary</span>
            <!-- <p class="card-text">
                <small class="text-muted fsXs"
                  >Detailed equipment description</small
                >
              </p> -->
          </div>
          <div
            class="g-3 mb-2 mt-2 rounded-3 container py-2 align-middle"
            style="background-color: #f5f6f6"
          >
            <div class="d-flex flex-column gap-3">
              <td>
                <div class="d-flex flex-column">
                  <small class="text-secondary fsXs">Name</small>
                  <small class="fw-normal">Ghana Medical Help</small>
                </div>
              </td>

              <td>
                <div class="d-flex flex-column">
                  <small class="text-secondary fsXs">Location</small>
                  <small>Wa Region</small>
                  <small>Upper West</small>
                  <small>Ghana </small>
                </div>
              </td>
            </div>
          </div>
        </div>
        <div class="mb-5">
          <div class="d-flex justify-content-between">
            <span class="card-title fw-normal fs-5">Facility</span>
            <Btn2
              BtnName="ADD"
              backgroundColor="#54626F"
              @click="changePage('facilityInfo')"
              class="text-light rounded-3 btn-sm"
            />
            <!-- <p class="card-text">
                <small class="text-muted fsXs"
                  >Detailed equipment description</small
                >
              </p> -->
          </div>
          <div>
            <div
              class="g-3 mb-2 mt-2 rounded-3 container py-2 align-middle"
              style="background-color: #f5f6f6"
              v-for="facility in facilityList"
            >
              <div class="d-flex flex-column gap-3">
                <td>
                  <div class="d-flex flex-column">
                    <small class="text-secondary fsXs">ID</small>
                    <small class="fw-normal">{{ facility._id }}</small>
                  </div>
                </td>
                <td>
                  <div class="d-flex flex-column">
                    <small class="text-secondary fsXs">Name</small>
                    <small class="fw-normal">{{ facility.facilityName }}</small>
                  </div>
                </td>

                <td>
                  <div class="d-flex flex-column mb-2">
                    <small class="text-secondary fsXs mb-2">Departments</small>
                    <div v-for="department in departmentList">
                      <div
                        v-if="department.facilityName === facility.facilityName"
                        class="d-flex gap-3 rounded-pill justify-content-between px-3 mb-1 align-items-center"
                        style="background-color: #dcdcdc"
                      >
                        <small class="text-secondary">
                          {{ department.departmentName }}
                        </small>
                        <Btn2
                          BtnName=""
                          :icon="'window-close'"
                          backgroundColor="none"
                          @click="goBack"
                          class="text-secondary btn-sm"
                        />
                      </div>
                    </div>
                  </div>
                  <Btn2
                    BtnName="ADD"
                    backgroundColor="#54626F"
                    @click="changePage('departmentInfo')"
                    class="text-light rounded-3 btn-sm"
                  />
                </td>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import Btn2 from "../BIOMD-UI/UI-Btn2.vue";

const store = useStore();
const sendSocketReq = (request) => {
  store.dispatch("sendSocketReq", request);
};

const facilityList = ref([]);
const departmentList = ref([]);

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

const fetchDepartment = async () => {
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
            collection: "Department",
            lookups: [
              {
                localField: "facilityID",
                collection: "Facility",
                foreignField: "_id",
                as: "Facility",
              },
            ],
            projection: {
              _id: 1,
              departmentName: 1,
              shortName: 1,
              facilityName: "$Facility.facilityName",
            },
          },
        },
      },
      callback: (res) => {
        if (res.Type === "RESPONSE") {
          console.log("Response Packet -->", res.Response);
          departmentList.value = res.Response.records;
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

const emit = defineEmits(["updatePage"]);

// Navigate to selected page to edit
const changePage = async (page, props) => {
  emit("updatePage", page, props);
};

onMounted(() => {
  fetchFacility();
  fetchDepartment();
});
</script>

<style lang="scss" scoped></style>
