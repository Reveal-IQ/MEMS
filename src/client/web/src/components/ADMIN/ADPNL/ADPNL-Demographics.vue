<!-- 
***********************************
*  Created By : Reveal IQ         *
*  Author     : Jyoti             *
*  Date       : 17 FEB 2022       *
*  Version    : 0.13.0.01.02-0422 *
***********************************
-->
<template>
<div class="Demographics" v-if="clearNow">
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
  <!-- Demographic Section -->
  <div class="row d-flex justify-content-start demoSection">
    <div class="col-xs-12 col-xl-2 sectionTitle mb-4 px-2 me-3">
      <div class="mediumText fw-bold">Address</div>
    </div>
    <div class="col-sm-12 col-xl-8 sectionTitle p-0">
      <div class="row">
        <div class="col-sm-4 p-1">
          <SelectBox
            ref="countryRef"
            label-name="Country"
            :search-option="true"
            :options-list="countryList"
            :disable="false"
            :null-error="true"
            null-error-message="Please select a Country"
            null-error-code="UI-GBSLT-E001"
            :min-char-limit="3"
            :not-found-error="true"
            not-found-error-message="Country Not Found"
            not-found-error-code="REGIT-UI-016"
            @receiveData="assignCountry"
            @fetchOptions="assignCountryList"
          />
        </div>
        <div class="col-sm-4 p-1">
          <SelectBox
            ref="stateRef"
            label-name="State"
            :search-option="true"
            :options-list="stateList"
            :disable="false"
            :min-char-limit="3"
            :not-found-error="true"
            not-found-error-message="A state in [Country Selected (SRS-REGIT-042)] was not found"
            not-found-error-code="UI-REGIT-017"
            :null-error="true"
            null-error-message="Please select a State"
            null-error-code="REGIT-UI-016"
            @receiveData="assignState"
            @fetchOptions="assignStateList"
          />
        </div>
        <div class="col-sm-4 p-1">
          <SelectBox
            ref="districtRef"
            label-name="District"
            :search-option="true"
            :options-list="districtList"
            :disable="false"
            :min-char-limit="3"
            :null-error="true"
            null-error-message="Please select a District"
            null-error-code="UI-GBSLT-E001"
            :not-found-error="true"
            not-found-error-message="A district in [State Selected (SRS-REGIT-048)] was not found"
            not-found-error-code="UI-REGIT-017"
            @receiveData="assignDistrict"
            @fetchOptions="assignDistrictList"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-sm-4 p-1">
          <SelectBox
            ref="cityRef"
            label-name="City"
            :search-option="true"
            :options-list="cityList"
            :disable="false"
            :min-char-limit="3"
            :null-error="true"
            null-error-message="Please select a Mandal"
            null-error-code="UI-GBSLT-E001"
            :not-found-error="true"
            not-found-error-message="A city in [District Selected (SRS-REGIT-054)] was not found"
            not-found-error-code="UI-REGIT-018"
            @receiveData="assignMandal"
            @fetchOptions="assignMandalList"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-sm-8 p-1">
          <TextBox
            ref="streetaddressRef"
            label-name="Street Address"
            validation-type="textual"
            :max-length="500"
            :null-error="true"
            null-error-message="Please enter your Address"
            validation-error-message="An Invalid Character was entered"
            validation-error-code="UI-REGIT-E007"
            :disable="false"
            @receiveData="assignStreetAddress"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-sm-4 p-1">
          <TextBox
            ref="postalcodeRef"
            label-name="Postal Code"
            validation-type="numeric"
            validation-error-message="Invalid Charecter Entered"
            validation-error-code="UI-GBTXT-E001"
            :disable="true"
          />
        </div>
      </div>
    </div>
  </div>

  <!-- Navigation Buttons -->
  <div
    class="row d-flex justify-content-between align-content-center mt-5 headerText text-secondary fw-bold navButtons sticky-bottom"
  >
  <!-- previous button -->
  <div class="col-sm-3 col-xl-2 text-break mx-0">
				<div
					class="row d-flex justify-content-between"
					@click="redirectToPreviousPage()"
				>
					<div class="col-sm-2 col-xs-6 px-0">
						<font-awesome-icon
							icon="chevron-left"
							size="4x"
							class="align-self-center arrowIcon"
              style="width: 16.9px; height: 30px"
						/>
					</div>
					<div class="col-sm-9 col-xs-6 px-0 d-flex justify-content-start">
						<div class="align-self-center">Back</div>
					</div>
				</div>
			</div>
  <!-- Next button-->
    <div class="col-sm-3 col-xl-2 text-break mx-0" />
    <div class="col-sm-3 col-xl-2 text-break mx-0">
      <div v-if="showNavBtn" class="row d-flex justify-content-between" @click="redirectToNextPage()">
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
</div>
</template>
<script>
import { useStore } from "vuex";
import { ref, reactive, watch, onMounted, toRefs } from "vue";
import TextBox from "../../GLOBAL/GLOBL-TextBox.vue";
import SelectBox from "../../GLOBAL/GLOBL-SelectBox.vue";
export default {
  components: {
    TextBox,
    SelectBox,
  },
  props: {
    tabid: {
      type: String,
    },
  },
  emits: ["receiveProgress", "receiveDemographics"],
  setup(props, { emit }) {
    // props from parent
    const { tabid } = toRefs(props);
    // store variables
    const store = useStore();
    const clearNow=ref(true);
    //progess Bar percentage value
    const progressBarPercent = ref(25);
    // demo Data
    const countryList = ref([]);
    const stateList = ref([]);
    const districtList = ref([]);
    const cityList = ref([]);
    
    // local Vars
    const showNavBtn = ref(null);
    const Demographics = ref({
      country: "",
      state: "",
      district: "",
      city: "",
      streetaddress: "",
      postalcode: "",
    });
    const country = ref(null);
    const state = ref(null);
    const district = ref(null);
    const city = ref(null);
    const streetAddress = ref(null);
    const postalCode = ref(null);
    // local Refs
    const countryRef = ref(null);
    const stateRef = ref(null);
    const districtRef = ref(null);
    const cityRef = ref(null);
    const streetaddressRef = ref(null);
    const postalcodeRef = ref(null);
    // store variables
    const changeServiceState = (serviceState) =>
      store.dispatch("changeServiceState", serviceState);
    const sendSocketReq = (request) => {
      store.dispatch("sendSocketReq", request);
    };

    // local Functions
    function redirectToPreviousPage() {
      changeServiceState({
        service: "ADPNL",
        tabcode: tabid.value,
        status: "UserInfo",
      });
    }

    function redirectToNextPage() {
      changeServiceState({
        service: "ADPNL",
        tabcode: tabid.value,
        status: "AppAccess",
      });
      emit("receiveDemographics", Demographics.value);
    }

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

    function assignCountryList(data) {
      sendSocketReq({
        data: {
          Expiry: 20000,
          Type: "REQUEST",
          Request:
          {
            Module: "GLOBAL",
            ServiceCode: "GLOBL",
            API: "GET_GEO_LIST",
            Max_List: 5, 
            Criteria: { 
              Type_Code: "CNTY", 
              Loci_Name_Country  : data 
            } 
          }
        },
        callback: (res) => {
          if (res.Type === "RESPONSE") {
            countryList.value.splice(0); //To clear previous data.            
            res.Response.Country_List.forEach(ele=>{
              let listName=ele.Loci_Name_Country;
              let listCode=ele.Loci_Code_Country;
              countryList.value.push({listName:listName,listCode:listCode});
            })
          } else if (res.Type === "ERROR") {
            // Error Response Received
          }
        },
      });
    }

    function assignCountry(data) {
      country.value = data;
      Demographics.value.country = country.value;
      // to clear the values
      stateRef.value.validOption = null;
      districtRef.value.validOption = null;
      cityRef.value.validOption = null;
      streetaddressRef.value.userInput = null;
      postalcodeRef.value.userInput = null;
    }
    
    // assigning default country based on site Origin automaticaly
    function assignDefaultCountry() {
      // assign Default option to the Country List
      sendSocketReq({
        data: {
          Expiry: 20000,
          Type: "REQUEST",
          Request:
          {
            Module: "GLOBAL",
            ServiceCode: "GLOBL",
            API: "GET_GEO_LIST",
            Max_List: 5, 
            Criteria: { 
              Type_Code: "CNTY", 
              Loci_Name_Country  : 'IND' 
            } 
          }
        },
        callback: (res) => {
          if (res.Type === "RESPONSE") {
            // assigning the default option to the select box through the Ref           
            countryList.value.push(res.Response.Country_List[0]);
            countryRef.value.selectedOption = res.Response.Country_List[0];
            countryRef.value.validOption =
            res.Response.Country_List[0].Loci_Name_Country;
            // Created temp object to assign column names according to the Global Select names
            let temp={listName:res.Response.Country_List[0].Loci_Name_Country,listCode:res.Response.Country_List[0].Loci_Code_Country};
            // Assigning temp object to convert the variable names matches according to Global selectbox 
            Demographics.value.country = temp;
          } else if (res.Type === "ERROR") {
            	// Error response received during fetching
          }
        },
      });
    }
    // assigning the default Country as soon as the Demographics Component Loads
    assignDefaultCountry();

    function assignStateList(data) {
      sendSocketReq({
        data: {
          Expiry: 20000,
          Type: "REQUEST",
          Request:
          {
            Module: "GLOBAL", 
            ServiceCode: "GLOBL",
            API: "GET_GEO_LIST",
            Max_List: 5, 
            Criteria: { 
              Type_Code: "STATE", 
              Loci_Code_Country  : Demographics.value.country.listCode,
              Loci_Name_State : data
            } 
          }
        },
        callback: (res) => {
          if (res.Type === "RESPONSE") {
            stateList.value.splice(0);  
            res.Response.State_List.forEach(ele=>{
              let listName=ele.Loci_Name_State;
              let listCode=ele.Loci_Code_State;
              stateList.value.push({listName:listName,listCode:listCode});
            })  
          } else if (res.Type === "ERROR") {
            	// Error response received during fetching
          }
        },
      });
    }

    function assignState(data) {
      state.value = data;
      Demographics.value.state = state.value;
      // to clear the values
      districtRef.value.validOption = null;
      cityRef.value.validOption = null;
      streetaddressRef.value.userInput = null;
      postalcodeRef.value.userInput = null;
    }

    function assignDistrictList(data) {
      sendSocketReq({
        data: {
          Expiry: 20000,
          Type: "REQUEST",
          Request:
          {
            Module: "GLOBAL", 
            ServiceCode: "GLOBL",
            API: "GET_GEO_LIST",
            Max_List: 5, 
            Criteria: { 
              Type_Code: "ARL1", 
              Loci_Code_Country  : Demographics.value.country.listCode,
              Loci_Code_State : Demographics.value.state.listCode,
              Loci_Name_Area_L1: data 
            } 
          }
        },
        callback: (res) => {
          if (res.Type === "RESPONSE") {
            districtList.value.splice(0);
            res.Response.ARL1_List.forEach(ele=>{
              let listName=ele.Loci_Name_Area_L1;
              let listCode=ele.Loci_Code_Area_L1;
              districtList.value.push({listName:listName,listCode:listCode});
            })
          } else if (res.Type === "ERROR") {
            	// Error response received during fetching
          }
        },
      });
    }
    function assignDistrict(data) {
      district.value = data;
      Demographics.value.district = district.value;
      // to clear the values
      cityRef.value.validOption = null;
      streetaddressRef.value.userInput = null;
      postalcodeRef.value.userInput = null;
    }

    function assignMandalList(data) {
      sendSocketReq({
        data: {
          Expiry: 20000,
          Type: "REQUEST",
          Request:
          {
            Module: "GLOBAL", 
            ServiceCode: "GLOBL",
            API: "GET_GEO_LIST",
            Max_List: 5, 
            Criteria: { 
              Type_Code: "ARL2", 
              Loci_Code_Country  : Demographics.value.country.listCode,
              Loci_Code_State : Demographics.value.state.listCode,
              Loci_Code_Area_L1: Demographics.value.district.listCode,
              Loci_Name_Area_L2: data 
            } 
          },
        },
        callback: (res) => {
          if (res.Type === "RESPONSE") {

            cityList.value.splice(0);
             res.Response.ARL2_List.forEach(ele=>{
              let listName=ele.Loci_Name_Area_L2;
              let listCode=ele.Loci_Code_Area_L2;
              let postCode=ele.Loci_Postal_Code;
              cityList.value.push({listName:listName,listCode:listCode,postalCode:postCode});
            })
          } else if (res.Type === "ERROR") {
            	// Error response received during fetching
          }
        },
      });
    }

    function assignMandal(data) {

      city.value = data;
      Demographics.value.city = city.value;
      // to clear the values of Street and Postal Code if we change the Mandal
      streetaddressRef.value.userInput = null;
      postalcodeRef.value.userInput = null;

      // assigning postal code as soon as city has been selected by the user
      postalcodeRef.value.userInput=Demographics.value.city.postalCode;
    
    }

    function assignStreetAddress(data) {
      streetAddress.value = data;
      Demographics.value.streetaddress = streetAddress.value;
    }

      function clearAll() {
      clearNow.value = false;
      setTimeout(() => {
        clearNow.value = true;
      }, 100);
    }
    watch(Demographics.value, () => {
      if (
        Demographics.value.country &&
        Demographics.value.state &&
        Demographics.value.district &&
        Demographics.value.city &&
        Demographics.value.streetaddress 

      ) {
        showNavBtn.value = true;
      } else {
        showNavBtn.value = false;
      }
    });
    return {
      progressBarPercent,
      clearNow,
      // local Var
      country,
      state,
      district,
      city,

      streetAddress,
      postalCode,
      showNavBtn,
      // local list vars
      countryList,
      stateList,
      districtList,
      cityList,

      // local fun
      getBarWidth,
      getPercentage,
      assignCountry,
      assignCountryList,
      assignDefaultCountry,
      assignState,
      assignStateList,
      assignDistrict,
      assignDistrictList,
      assignMandal,
      assignMandalList,

      assignStreetAddress,
      redirectToPreviousPage,
      redirectToNextPage,
      clearAll,
      // local Ref
      countryRef,
      stateRef,
      districtRef,
      cityRef,
      streetaddressRef,
      postalcodeRef,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "../../GLOBAL/Styles/colors.scss";
@import "../../GLOBAL/Styles/font-style.scss";

.reveal-container {
  margin-top: 62px !important;
  max-height: 92.26px;
  position: relative;
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
.demoSection {
  margin-top: 50.74px !important;
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

.navButtons {
  margin-top: 14.62px !important;
  margin-bottom: 30.38px !important;
  font-size: 14px;
  color: #adadad;
}
</style>
