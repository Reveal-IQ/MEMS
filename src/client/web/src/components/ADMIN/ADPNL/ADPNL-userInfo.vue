<!-- 
***********************************
*  Created By : Reveal IQ         *
*  Author     : Jyoti             *
*  Date       : 16 FEB 2022       *
*  Version    : 0.13.0.01.03-0422 *
***********************************
-->
<template>
  <div class="userInfo" v-if="clearNow">
    <!-- Progress Bar Row  -->
    <div class="row d-flex justify-content-evenly mx-0 px-0">
      <div class="col-sm-12 reveal-container my-auto">
        <div class="d-none d-lg-block">
          <div class="row justify-content-center appNavigation">
            <div class="col-sm-10 progressLine">
              <div class="progress" style="height: 5px">
                <div
                  class="progress-bar"
                  role="progressbar"
                  :style="getBarWidth()"
                />
              </div>
            </div>
            <div class="col-sm-12 smallText">
              <div
                class="row d-flex justify-content-evenly align-items-center mediumText"
                align="center"
              >
                <div class="col mx-0">
                  <div
                    class="row justify-content-center align-items-center rounded-circle border border-light border-5"
                    :class="getPercentage(1)"
                  >
                    <div class="col fw-bold text-light" align="center">1</div>
                  </div>
                </div>
                <div class="col mx-0">
                  <div
                    class="row justify-content-center align-items-center rounded-circle border border-light border-5"
                    :class="getPercentage(2)"
                  >
                    <div class="col fw-bold text-light" align="center">2</div>
                  </div>
                </div>
                <div class="col mx-0">
                  <div
                    class="row justify-content-center align-items-center rounded-circle border border-light border-5"
                    :class="getPercentage(3)"
                  >
                    <div class="col fw-bold text-light" align="center">3</div>
                  </div>
                </div>
                <div class="col mx-0">
                  <div
                    class="row justify-content-center align-items-center rounded-circle border border-light border-5"
                    :class="getPercentage(4)"
                  >
                    <div class="col fw-bold text-light" align="center">4</div>
                  </div>
                </div>
                <div class="col mx-0">
                  <div
                    class="row justify-content-center align-items-center rounded-circle border border-light border-5"
                    :class="getPercentage(5)"
                  >
                    <div class="col fw-bold text-light" align="center">5</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row d-flex align-items-center pb-5 ADPNL-subtitleText">
            <div class="col-sm-12">
              <div
                class="row d-flex justify-content-evenly align-items-center mediumText"
                align="center"
              >
                <div class="col mx-0 ADPNL-buttonText">Patient Details</div>
                <div class="col mx-0 ADPNL-buttonText">Demographics</div>
                <div class="col mx-0 ADPNL-buttonText">Application Access</div>
                <div class="col mx-0 ADPNL-buttonText">Availability</div>
                <div class="col mx-0 ADPNL-buttonText">Profile Confirmation</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- User Deatils -->
    <div class="row d-flex justify-content-start userDetails">
      <div class="col-xs-12 col-xl-2 sectionTitle mb-4 px-2 me-3">
        <div class="mediumText fw-bold">User Details</div>
      </div>
      <div class="col-sm-12 col-xl-8 sectionTitle p-0">
        <div class="row">
          <!-- First Name -->
          <div class="col-sm-4 p-1">
            <TextBox
              ref="firstNameRef"
              label-name="First Name"
              validation-type="alpha"
              :max-length="500"
              :null-error="true"
              null-error-message="Please enter First Name"
              null-error-code="UI-ADPNL-E003"
              validation-error-message="An Invalid character was entered"
              validation-error-code="UI-ADPNL-E003"
              :disable="false"
              @receiveData="assignFirstName"
            />
          </div>
          <!-- Middle Name -->
          <div class="col-sm-4 p-1">
            <TextBox
              ref="middleNameRef"
              label-name="Middle Name"
              validation-type="alpha"
              :max-length="500"
              validation-error-message="An Invalid Character was entered"
              validation-error-code="UI-ADPNL-E005"
              :disable="false"
              @receiveData="assignMiddleName"
            />
          </div>
          <!-- Last Name -->
          <div class="col-sm-4 p-1">
            <TextBox
              ref="lastNameRef"
              label-name="Last Name"
              validation-type="alpha"
              :max-length="500"
              :null-error="true"
              null-error-message="Please enter Last name"
              null-error-code="UI-ADPNL-E004"
              validation-error-message="An Invalid Character was entered"
              validation-error-code="UI-ADPNL-E004"
              :disable="false"
              @receiveData="assignLastName"
            />
          </div>
        </div>
        <!-- Date Of Birth -->
        <div class="row">
          <div class="col-sm-4 p-1">
            <DateSelect
              ref="dateOfBirthRef"
              label-name="Date of Birth"
              :min-date="minDate"
              :max-date="todayDate"
              :null-error="true"
              nullErrorMessage="Please select a date of birth"
              nullErrorCode="UI-ADPNL-E001"
              minErrorMessage="Invalid date of Birth"
              minErrorCode="UI-ADPNL-E001"
              maxErrorMessage="Invalid date of Birth"
              maxErrorCode="UI-ADPNL-E001"
              :disable="false"
              @receiveData="assignDateOfBirth"
            />
          </div>
        </div>
        <!-- Sex Selectbox -->
        <div class="row">
          <div class="col-sm-4 p-1">
            <SelectBox
              ref="sexRef"
              label-name="Sex"
              :options-list="sexList"
              :search-option="true"
              :disable="false"
              :null-error="true"
              null-error-message="Please select option from list"
              null-error-code="UI-ADPNL-E001"
              @receiveData="assignSex"
            />
          </div>
        </div>
      </div>
    </div>
    <hr />
    <!-- Contact Details -->
    <div class="row d-flex justify-content-start mt-4">
      <div class="col-xs-12 col-xl-2 sectionTitle mb-4 px-2 me-3">
        <div class="mediumText fw-bold">Contact Details</div>
      </div>
      <div class="col-sm-12 col-xl-8 sectionTitle p-0">
        <div class="row">
          <!-- Phone Number -->
          <div class="col-sm-4 p-1">
            <TextBox
              ref="phoneNumberRef"
              label-name="Phone Number"
              validation-type="numeric"
              format-type="mobilenumber"
              :max-length="10"
              :null-error="true"
              null-error-message="Please enter a  phone number"
              null-error-code="UI-ADPNL-E007"
              validation-error-message="Please enter a valid phone number"
              validation-error-code="UI-GBTXT-E001"
              format-error-message="Please enter a valid phone number"
              format-error-code="UI-GBTXT-E001"
              @receiveData="assignPhoneNumber"
            />
          </div>
          <!-- Email Address -->
          <div class="col-sm-4 p-1">
            <TextBox
              ref="emailAddressRef"
              label-name="Email Address"
              validation-type="email"
              format-type="email"
              validation-error-message="An Invalid character was entered"
              validation-error-code="UI-UI-ADPNL-E003-E015"
              format-error-message="Please enter a valid Email"
              format-error-code="UI-GBTXT-E002"
              @receiveData="assignEmailAddress"
            />
          </div>
        </div>
      </div>
    </div>
    <hr />
    <!-- Photo Identification -->
    <div class="row d-flex justify-content-start mt-4">
      <div class="col-xs-12 col-xl-2 sectionTitle mb-4 px-2 me-3">
        <div class="mediumText fw-bold">Photo Identification</div>
      </div>
      <div class="col-sm-12 col-xl-8 sectionTitle p-1">
        <div v-if="true" class="row mx-2">
          <div class="col-sm-4 p-1">
            <!-- Button trigger for camera -->
            <button
              v-if="!previewPhoto"
              type="button"
              class="btn button-color text-light"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              @click="toggleCamera()"
            >
              <font-awesome-icon
                icon="camera-retro"
                class="mx-2"
                size="1x"
              />Capture Image
            </button>
            <button
              v-if="previewPhoto"
              type="button"
              class="btn button-color text-light"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              @click="toggleCamera()"
            >
              <font-awesome-icon
                icon="camera-retro"
                class="mx-2"
                size="1x"
              />Retake
            </button>
          </div>
          <!-- User Avatar -->
          <div
            class="col-sm-4 p-1 d-flex align-items-center justify-content-center useAvatar"
            @click="useAvatar(userInfo.sex)"
          >
            Use Avatar
          </div>
        </div>
        <div v-if="true" class="row py-3 mx-2">
          <div class="col-sm-2 p-1 shadow">
            <!-- capture captured -->
            <img
              v-if="previewPhoto"
              :src="previewPhoto"
              alt=""
              class="border border-5 rounded-3 border-light previewPhoto"
            />
            <div v-else class="border border-5 rounded-3 border-light">
              <div class="card-body fs-7">
                <font-awesome-icon
                  icon="portrait"
                  class="d-flex mx-auto previewIcon"
                  size="1x"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Next Button -->
    <div
      class="row d-flex justify-content-between align-content-center mt-5 headerText text-secondary fw-bold navButtons sticky-bottom"
    >
      <div class="col-sm-3 col-xl-2 text-break mx-0" />
      <div class="col-sm-3 col-xl-2 text-break mx-0">
        <div
          v-if="showNavBtn"
          class="row d-flex justify-content-between"
          @click="redirectToNextPage()"
        >
          <div class="col-sm-9 col-xs-6 px-0 d-flex justify-content-end">
            <div class="align-self-center">Next</div>
          </div>
          <div class="col-sm-2 col-xs-6 px-0">
            <font-awesome-icon
              icon="chevron-right"
              size="4x"
              class="align-self-center"
              style="width: 16.9px; height: 30px"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
  <div
    id="staticBackdrop"
    class="modal fade"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 id="staticBackdropLabel" class="modal-title">Reveal Camera</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="toggleCamera()"
          />
        </div>
        <div class="modal-body" align="center">
          <Camera
            ref="cameraRef"
            error-message="Media capture failed ! unable to access the camera"
            error-code="UI-GBCAM-E001"
            @showPreview="showPreview()"
          />
        </div>
      </div>
    </div>
  </div>
  </div>

</template>

<script>
import { ref, reactive, watch, toRefs } from "vue";
import { useStore } from "vuex";
import TextBox from "./../../../components/GLOBAL/GLOBL-TextBox.vue";
import Camera from "./../../../components/GLOBAL/GLOBL-Camera.vue";
import SelectBox from "./../../../components/GLOBAL/GLOBL-SelectBox.vue";
import DateSelect from "./../../../components/GLOBAL/GLOBL-DateSelect.vue";
import Male from "../../../assets/media/Male.png";
import Female from "../../../assets/media/Female.png"
import { forEach } from 'lodash';
export default {
  components: {
    TextBox,
    SelectBox,
    DateSelect,
    Camera,
  },
  props: {
    tabid: {
      type: String,
    },
  },
  emits: ["receiveUserInfo"],
  setup(props, { emit }) {
    const store = useStore();
    // props from parent
    const { tabid } = toRefs(props);
    const changeServiceState = (serviceState) =>
      store.dispatch("changeServiceState", serviceState);
    const sendSocketReq = (request) => {
      store.dispatch("sendSocketReq", request);
    };
    const clearNow = ref(true);
    const progressBarPercent = ref(3);

    const sexList = reactive([
      { listName: "Male", listCode: 1 },
      { listName: "Female", listCode: 2 },
      { listName: "Intersex", listCode: 3 },
    ]);

    // ? REF variables to alter data in child components

    const cameraRef = ref(null);
    const firstNameRef = ref(null);
    const middleNameRef = ref(null);
    const lastNameRef = ref(null);
    const dateOfBirthRef = ref(null);
    const sexRef = ref(null);
    const phoneNumberRef = ref(null);
    const emailAddressRef = ref(null);
      const userInfo = ref({
      firstName: "",
      middleName: "",
      lastName: "",
      dateOfBirth: "",
      age: "",
      sex: "",
      phoneNumber: "",
      emailAddress: "",
      previewPhoto: "",
    });

    const showNavBtn = ref(null);
    const previewPhoto = ref(null);
    const todayDate = ref(null);
    const minDate = ref(null);

    function getBarWidth() {
      return { width: `${progressBarPercent.value}` + "%" };
    }

    function getPercentage(step) {
      if (step == 1 && progressBarPercent.value > 25) {
        return "progressBar-Active";
      }
      if (step == 2 && progressBarPercent.value >= 25) {
        return "progressBar-Active";
      }
      if (step == 3 && progressBarPercent.value >= 48) {
        return "progressBar-Active";
      }
      if (step == 4 && progressBarPercent.value >= 78) {
        return "progressBar-Active";
      }
      if (step == 5 && progressBarPercent.value >= 100) {
        return "progressBar-Active";
      }

      if (step == 1 && progressBarPercent.value < 1) {
        return "progressBar-Inactive";
      }
      if (step == 2 && progressBarPercent.value < 25) {
        return "progressBar-Inactive";
      }
      if (step == 3 && progressBarPercent.value < 48) {
        return "progressBar-Inactive";
      }
      if (step == 4 && progressBarPercent.value < 78) {
        return "progressBar-Inactive";
      }
      if (step == 5 && progressBarPercent.value < 100) {
        return "progressBar-Inactive";
      }
    }

    function assignFirstName(payload) {
      userInfo.value.firstName = payload;
    }

    function assignMiddleName(payload) {
      userInfo.value.middleName = payload;
    }

    function assignLastName(payload) {
      userInfo.value.lastName = payload;
    }

    function assignSex(payload) {
      userInfo.value.sex = payload;
    }

    function assignPhoneNumber(payload) {
      userInfo.value.phoneNumber = payload;
    }

    function assignEmailAddress(payload) {
      userInfo.value.emailAddress = payload;
    }

    function toggleCamera(e) {
      cameraRef.value.toggleCamera(e);
    }

    function showPreview() {
      previewPhoto.value = cameraRef.value.croppedImage;
      userInfo.value.previewPhoto = previewPhoto.value;
    }
    // to calculate the Age from Date of Birth and assigning Age to PatientInfo Array by converting string into date object
    // trunc => Returns the integral part of the a numeric expression, removing any fractional digits
    function assignDateOfBirth(payload) {
      userInfo.value.dateOfBirth = Math.floor(new Date(payload));
      userInfo.value.age = Math.trunc(
        (Date.now() - new Date(payload)) / 31557600000
      );
    }

    function useAvatar(payload){
        if(payload.listName=='Male'){
          previewPhoto.value=Male;
          userInfo.value.previewPhoto = previewPhoto.value;          
        }else if(payload.listName=='Female'){
          previewPhoto.value=Female;
          userInfo.value.previewPhoto = previewPhoto.value;
        }else {
          previewPhoto.value=Male;
          userInfo.value.previewPhoto = previewPhoto.value;
        }
    }

    watch(userInfo.value, () => {
      if (
        userInfo.value.firstName &&
        userInfo.value.lastName &&
        userInfo.value.dateOfBirth &&
        userInfo.value.sex &&
        userInfo.value.phoneNumber &&
        userInfo.value.previewPhoto
      ) {
        showNavBtn.value = true;
      } else {
        showNavBtn.value = false;
      }
    });

    // ? function created for the clearing global comp Values

    function clearAll() {
      clearNow.value = false;
      previewPhoto.value=null;
      setTimeout(() => {
        clearNow.value = true;
      }, 100);
    }

    getTodayDate();

    function getTodayDate() {
      var dd = new Date().getDate();
      var mm = new Date().getMonth() + 1;
      var yyyy = new Date().getFullYear();
      if (dd < 10) {
        dd = "0" + dd;
      }
      if (mm < 10) {
        mm = "0" + mm;
      }
      todayDate.value = yyyy + "-" + mm + "-" + dd;
      minDate.value = yyyy - 199 + "-01-01";
    }

    function redirectToNextPage() {
      emit("receiveUserInfo", userInfo.value);
      changeServiceState({
        service: "ADPNL",
        tabcode: tabid.value,
        status: "Demographics",
      });
      
    }


    return {
      // ? local vars for changing the values
      previewPhoto,
      showNavBtn,
      todayDate,
      minDate,
      userInfo,
      clearNow,
      // ? local lists - predefined
      sexList,
      progressBarPercent,
      // ? local functions
      toggleCamera,
      showPreview,
      getBarWidth,
      getPercentage, 
      // ? local functions for child components
      clearAll,
      assignFirstName,
      assignMiddleName,
      assignLastName,
      assignDateOfBirth,
      assignSex,
      assignPhoneNumber,
      assignEmailAddress,
      redirectToNextPage,
      useAvatar,
      // ? refs to modify values in child comp
      firstNameRef,
      middleNameRef,
      lastNameRef,
      dateOfBirthRef,
      sexRef,
      phoneNumberRef,
      emailAddressRef,
      cameraRef,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../GLOBAL/Styles/font-style.scss";
@import "../../GLOBAL/Styles/colors.scss";

.reveal-container {
  margin-top: 62px !important;
  max-height: 92.26px;
  position: relative;
}
.userDetails {
  margin-top: 50.74px !important;
}
.appNavigation {
  height: 54px;
  min-height: 54px;
  max-height: 54px;
}
.progressLine {
  position: absolute;
  z-index: 0;
  padding-top: 19px;
}
.progress-bar {
  position: relative;
  background: #57aecb;
  z-index: 1;
}
.rounded-circle {
  position: relative;
  background: #57aecb;
  max-width: 43px;
  min-width: 43px;
  min-height: 42px;
  max-height: 42px;
  z-index: 1;
}
.progressBar-Active {
  background: #57aecb;
  color: #57aecb;
}
.progressBar-Inactive {
  background: #adadad;
  color: #525252;
}
.button-color {
  background-color: $globalButtonColor;
  opacity: 1 !important;
}
.button-color:hover {
  opacity: 0.8 !important;
}

.useAvatar {
  width: 127px;
  height: 33px;
  border: 1.5px solid #2980b9;
  box-sizing: border-box;
  border-radius: 20px;
  color: #2980b9;
}

.navButtons {
  margin-top: 14.62px !important;
  margin-bottom: 30.38px !important;
  font-size: 14px;
  color: #adadad;
}

.previewPhoto{
  width: 110px;
  height: 110px;
}
</style>
