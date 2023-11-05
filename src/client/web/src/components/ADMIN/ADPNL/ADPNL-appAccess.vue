<!-- 
************************************
*  Created By : Reveal IQ          *
*  Author     : Jyoti              *
*  Date       : 17 FEB 2022        *
*  Version    : 0.13.0.01.02-0422  *
************************************
-->
<template>
<div class="AppAccess" v-if="clearNow">
  <!-- Progress Bar Row  -->
  <div class="row d-flex justify-content-evenly mx-0 px-0">
    <div class="col-sm-12 reveal-container my-auto">
      <div class="d-none d-md-block">
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

  <!--Application Access -->
  <div class="d-flex flex-column appAccess">
    <div class="appAccessHeading d-flex align-items-center">
      <span class="xlargeText appAccessTitle">Application Access</span>
    </div>

    <div class="col-10 col-md-12">
      <!-- User Accesseble Services  / Lienced Services-->
      <div class="pl-4 pt-4 d-flex flex-wrap">
        <!-- User Accesseble  Services Title -->
        <div class="col userAccServiceBox">
          <div class="largeText appAccessText">User Accessable Services</div>
          <div class="h6">
            The following apps are accessable to the user.
          </div>
            <!-- User Accesseble Search Option -->
            
          <div class="d-flex flex-row align-items-center schService">
              <font-awesome-icon
                icon="search"
                class="schServiceIcon"
                size="1x"
              />
              <input
                type="text-align-start"
                class="schServiceInput"
                ref="search"
                v-model="activeServiceSch"
                @input="searchActiveService()"
                autocomplete="off"
                placeholder="Search Service"
              />
              <font-awesome-icon
                v-show="false"
                @click="activeServiceSch = null"
                icon="times-circle"
                class="clearSchServiceIcon"
                size="1x"
              />
          </div>
          <div v-if="activeServices.length > 0" class="d-flex flex-column userAccessServicesList">
        
            <!-- Show only search results for User Accesseble Services -->
            <div v-if="activeServiceSchList && activeServiceSch">
              <div v-if="activeServiceSchList.length > 0">
                <div v-for="service in activeServiceSchList" :key="service.id">
                  <div
                    class="d-flex flex-row justify-content-between align-items-center normalApp"
                    v-if="service.App_Display !== false"
                  >
                    <div class="d-flex flex-row align-items-center">
                      <div class="serviceIcon">
                        <font-awesome-icon :icon="service.App_Icon" size="1x" />
                      </div>
                      <div class="row">
                      <div class="bodyText serviceName  text-capitalize ">
                        {{ service.App_Name }} <br>
                        </div>
                        <div class="body text service text-capitalize">
                        {{ service.App_Module.toLowerCase() }} Module
                      </div>
                    </div>
                    </div>
                    <!-- Remove user accessability which are not CORE or CURA  -->
                    <div class="versionSub serviceRemoveOption"
                      @click="removeService(service)" >
                      Remove
                    </div>
                  </div>
                </div>
              </div>
              <div
                v-else
                class="d-flex flex-row align-items-center"
                style="padding-left: 115px; font-weight: 500"
              >
                No Application Found
              </div>
            </div>
            <!-- Show All User Accessible Services -->
            <div v-else>
              <div v-for="service in activeServices.slice(0,5)" :key="service.id">
                <div
                  class="d-flex flex-row justify-content-between align-items-center normalApp"
                  v-if="service.App_Display !== false"
                >
                  <div class="d-flex flex-row align-items-center">
                    <div class="serviceIcon">
                      <font-awesome-icon :icon="service.App_Icon" size="1x" />
                    </div>
                    <div class="row">
                      <div class="bodyText serviceName  text-capitalize ">
                        {{ service.App_Name }} <br>
                        </div>
                        <div class="body text service text-capitalize">
                        {{ service.App_Module.toLowerCase() }} Module
                      </div>
                    </div>
                  </div>

                  <div class="versionSub serviceRemoveOption"
                    @click="removeService(service)"
                  >
                    Remove
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Licenced Application -->
        <div class="d-flex flex-column appAccess"></div>
        <div class="col userAccServiceBox">
          <!-- Licenced Application Title -->
          <div class="largeText appAccessText ">Licensed Application</div>
          <div class="h6">
            The following apps are accessable to the user.
          </div>
        
          <!-- Search option for Licenced Application -->
          
          <div class="d-flex flex-row align-items-center schService">
              <font-awesome-icon
                icon="search"
                class="schServiceIcon"
                size="1x"
              />
              <input
                type="text"
                align="justify"
                class="schServiceInput"
                ref="search"
                v-model="serviceSch"
                @input="searchService()"
                autocomplete="off"
                placeholder="Search Service"
              />
              <font-awesome-icon
                v-show="false"
                @click="serviceSch = null"
                icon="times-circle"
                class="clearSchServiceIcon"
                size="1x"
              />
            </div>
          <div
            v-if="serviceList.length > 0"
            class="d-flex flex-column userAccessServicesList"
          >
    <!-- Show Search result for Licenced Application -->

            <div v-if="serviceSchList && serviceSch">
              <div v-if="serviceSchList.length > 0">
                <div v-for="service in serviceSchList" :key="service.id">
      
                  <div
                    class="d-flex flex-row justify-content-between align-items-center normalApp"
                    v-if="service.App_Display !== false"
                  >
                    <div class="d-flex flex-row align-items-center">
                      <div class="serviceIcon">
                        <font-awesome-icon :icon="service.App_Icon" size="1x" />
                      </div>
                      <div class="row">
                      <div class="bodyText serviceName  text-capitalize ">
                        {{ service.App_Name }} <br>
                        </div>
                        <div class="body text service text-capitalize">
                        {{ service.App_Module.toLowerCase() }} Module
                      </div>
                    </div>
                  </div>
                    <div
                      class="versionSub serviceAddOption"
                      @click="addService(service)"
                    >
                      Add
                    </div>
                  </div>
                </div>
              </div>
            <div
            
                v-else
                class="d-flex flex-row align-items-center"
                style="padding-left: 115px; font-weight: 500"
              >
                No Application Found
              </div>
            </div>
            <!-- Show All Licenced Application -->
            <div v-else>
              <div v-for="service in serviceList.slice(0,5)" :key="service.id">
                <div
                    class="d-flex flex-row justify-content-between align-items-center normalApp"
                    v-if="service.App_Display !== false"
                  >
                    <div class="d-flex flex-row align-items-center">
                      <div class="serviceIcon">
                        <font-awesome-icon :icon="service.App_Icon" size="1x" />
                      </div>
                      <div class="row">
                      <div class="bodyText serviceName  text-capitalize ">
                        {{ service.App_Name }} <br>
                        </div>
                        <div class="body text service text-capitalize">
                        {{ service.App_Module.toLowerCase() }} Module
                      </div>
                    </div>
                  </div>
                    <div
                      class="versionSub serviceAddOption"
                      @click="addService(service)"
                    >
                      Add
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Navigation Button -->
  <div
    class="row d-flex justify-content-between align-content-center mt-5 headerText text-secondary fw-bold navButtons sticky-bottom"
  >
  <!-- Previous button -->
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
  <!-- Next Button -->
    <div class="col-sm-3 col-xl-2 text-break mx-0" />
    <div class="col-sm-3 col-xl-2 text-break mx-0">
      <div v-if="true" class="row d-flex justify-content-between" @click="redirectToNextPage()">
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
import { ref, reactive, watch, toRefs,computed } from "vue";
import { useStore } from "vuex";
import { forEach } from 'lodash';
export default {
  components: {},
  props: {
    tabid: {
      type: String,
    },
  },
   emits: ["receiveProgress", "receiveAppAccess"],
  setup(props,{emit}) {
    const store = useStore();

    // props from parent
    const { tabid } = toRefs(props);
    const changeServiceState = (serviceState) =>
      store.dispatch("changeServiceState", serviceState);
    const sendSocketReq = (request) => {
      store.dispatch("sendSocketReq", request);
    };
    const appAccess=ref({
     activeServices:[], 
    })
    const progressBarPercent = ref(50);
    const clearNow = ref(true);
    const activeServiceSch = ref("");
    const activeServiceSchList = ref("");
    const serviceSch = ref("");
    const serviceSchList = ref("");
    const Date_Time_Granted = ref("");
    const Date_Time_Expiry = ref("");
 
    //Demo data
    const serviceList = ref([ ]);
    // Demo Data
    const activeServices = ref([ ]);

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

    // To Sort Services in Alphabetical Order
    function sortArray(arr) {
      arr.sort((a, b) =>
        (a["App_Name"] || "")
          .toString()
          .localeCompare((b["App_Name"] || "").toString())
      );
      return arr;
    }

    // Get Service List on Loading Page
    function getServiceList() {
      // Latest Request Packet
      sendSocketReq({
        data: {
         Expiry: 20000,
         Type: "REQUEST",
         Request: {
            ServiceCode: "ADPNL",
            API: "Services_Lists" }
        },
        callback: (res) => {
          if (res.Type === "RESPONSE") {

            serviceList.value = res.Response.services_lists;       
          } 
        },
      });
    }
    getServiceList();

    
    // To add a service TO Active Serivce List
    function addService(service) { 
      let index = serviceList.value.indexOf(service);
      serviceList.value.splice(index, 1);
      // Adding selected service to the Active Service array 
      activeServices.value.push(service);  
        // Assigning Active Services UI
        assignActiveServices(service);
    }

    // To remove a service TO Active Serivce List
    function removeService(service) {
      let index = activeServices.value.indexOf(service);
      activeServices.value.splice(index, 1);
      serviceList.value.push(service);
      Date_Time_Expiry.value =Date.now();
    }

    // To Search and Filter Licenced Services
    function searchService() {
      if (
        serviceSch.value != null &&
        serviceSch.value != "" &&
        serviceSch.value.length > 0
      ) {
        serviceSchList.value = serviceList.value.filter((service) => {
          return (
            service.App_Name.toLowerCase().search(
              serviceSch.value.toLowerCase()
            ) >= 0
          );
        });
      } else {
        serviceSchList.value = null;
      }
    }
    // To Search and Filter Active Services
    function searchActiveService() {
      if (
        activeServiceSch.value != null &&
        activeServiceSch.value != "" &&
        activeServiceSch.value.length > 0
      ) {

        activeServiceSchList.value = activeServices.value.filter((service) => {
          return (
            service.App_Name.toLowerCase().search(
              activeServiceSch.value.toLowerCase()
            ) >= 0
          );
        });
      } else {
        activeServiceSchList.value = null;
      }
    }

    //clearAll function
    function clearAll() {
      clearNow.value = false;
      activeServices.value=[];
      appAccess.value={};
      activeServices.value=[];
      setTimeout(() => {
        clearNow.value = true;
        getServiceList()
      }, 100);
    }

    //Redirect to previous page
    function redirectToPreviousPage(){
        changeServiceState({
				service: "ADPNL",
				tabcode: tabid.value,
				status: "Demographics",        
			});      
    }
   
   function assignActiveServices(payload){
     appAccess.value.activeServices.push(payload);
     console.log(appAccess.value.activeServices);
   }

    // nextPage function
     function redirectToNextPage() {
      emit("receiveAppAccess", appAccess.value);
      changeServiceState({
          service: "ADPNL",
          tabcode: tabid.value,        
          status: "Confirmation"        
      });   
      
    }

    return {
      progressBarPercent,
      clearNow,
      activeServiceSch,
      activeServiceSchList,
      serviceSch,
      serviceSchList,
      serviceList,
      activeServices,
      appAccess,
      Date_Time_Granted,
      Date_Time_Expiry,
      //return function
      getBarWidth,
      getPercentage,
      redirectToPreviousPage,
      assignActiveServices,
      redirectToNextPage,
      clearAll,
      //API function
      getServiceList,
      addService,
      removeService,
      searchService,
      searchActiveService,
    };
  },
};
</script>

<style lang="scss" scoped>
.reveal-container {
  margin-top: 62px !important;
  max-height: 92.26px;
  position: relative;
}
.appAccess {
  margin-top: 50.74px !important;
  background: rgba(144, 164, 174, 0.05);
}
.userAccServiceBox {
  padding-left: 40px;
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
.navButtons {
  margin-top: 14.62px !important;
  margin-bottom: 30.38px !important;
  font-size: 14px;
  color: #adadad;
}

.appAccessHeading {
  height: 40px;
  background: #90a4ae;
  margin: 10px 25px 10px 25px !important;
  padding:10px 25px 15px 25px;
}
.appAccessTitle {
  font-weight: 500;
  font-size: 24px;
  font-weight: 500;
  color: #ffffff;
  margin: 10px 25px 10px 25px !important;
  padding:10px 25px 15px 25px;
}
.appAccessText {
  margin-bottom: 5px !important;
  color: #000000;
  font-weight: 500;
  padding-left:25px;
}

.h6{
  padding-left:25px;
}

.normalApp {
  background: rgba(189, 195, 199, 0.1);
  width: 287.07px;
  height: 60px;
  margin: 10px 25px 10px 25px !important;
  padding:10px 25px 15px 25px;
  border: 1px solid #bdc3c7;
}
.serviceIcon {
  width: 20px;
  height: 20px;
}
.serviceName {
  padding-left: 25px;
  min-width: fit-content;
  font-size: 12px;
}
.service {
  padding-left: 25px;
  min-width: fit-content;
  font-size: 10px;
}
.serviceAddOption {
  padding-left:25px;
  color:#e67e22;
  cursor: pointer;
}
.serviceRemoveOption {
  padding-left:25px;
  color: #e67e22;
  cursor: pointer;
}
.schService {
  margin: 10px 55px 20px 55px;
  width: 180px !important;
  height: 25px !important;
  background: #ffffff;
  color: rgba(0, 0, 0, 0.5);
  margin-top: 20px !important;
  margin-bottom: 5px !important;
  margin-left: 27px;
  border: 1px solid #2980b9;
  box-sizing: border-box;
  border-radius: 25px;
}
.schServiceIcon {
  margin: 0 10px 0 10px;
  font-size: 14px;
  color: #2980b9;
  margin-right: 10px;
}
.clearSchServiceIcon {
  font-size: 14px;
  margin-left: -20px;
  color: #2980b9;

}
.schServiceInput {
  color: rgba(0, 0, 0, 0.5);
  outline: none;
  font-size: 14px;
  background: none;
  border: 0;

}

</style>
