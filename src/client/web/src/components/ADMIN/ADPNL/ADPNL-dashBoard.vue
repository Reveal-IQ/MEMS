<!-- 
************************************
*  Created By : Reveal IQ          *
*  Author     : Jyoti              *
*  Date       : 10 Feb 2022        *
*  Version    : 0.13.0.01.02-0422  *
************************************
-->
<template>
  <section>
    <!-- DASHBOARD -->
    <div v-if="true" class="d-flex flex-column mainPage">
      <div class="row d-flex justify-content-center flex-wrap first-row">
        <!-- User Base Card -->
        <div class="col-sm-3 userBaseBox m-2">
          <div class="headerText userBaseTitle">User Management</div>
          <div class="d-flex flex-column userBaseBody">
            <div class="d-flex flex-row justify-content-around userCount">
              <div class="text-center">
                <div class="headerText">{{details.Total_Users}}</div>
                <div class="bodyText">Total Users</div>
              </div>
              <div class="text-center">
                <div class="headerText">{{details.Users_Logged_In}}</div>
                <div class="bodyText">Users Logged-In</div>
              </div>
            </div>
            <div class="d-flex flex-row justify-content-center userListTitle">
              <div
                class="text-center userListBtn pt-1 bodyText"
                :tabid="tabid"
                @connectDashboard="changePg('dashBoard')"
                @click="changePg('userAccounts')"
              >
                User List
              </div>
            </div>
          </div>
        </div>
        <!-- Site Information Card -->
        <div class="col-sm-3 siteInfoBox m-2">
          <div class="headerText siteInfoTitle">Site Information</div>
          <div class="d-flex flex-column siteInfoBody bodyText">
            <div class="siteInfoText">
              Name: 
              <span class="siteInfoVal"> {{details.Site_Information.Institute_Name}}</span> 
            </div>
            <div class="siteInfoText">
              Site Code:
              <span class="siteInfoVal"> {{details.Site_Information.Institute_Code}}</span>
            </div>
            <div class="siteInfoText">
              Location: 
              <span class="siteInfoVal"> 
                {{cityName}}, {{stateCode}}, {{countryName}}
                 </span>
            </div>
            <div class="siteInfoText">
              Currency: 
              <span class="siteInfoVal"> {{details.Site_Information.Default_Currency}}</span>
            </div>
            <div class="siteInfoText">
              Time Zone: 
              <span class="siteInfoVal"> {{details.Site_Information.Default_Time_Zone}}</span>
            </div>
            <div class="d-flex flex-row justify-content-center editInfoTitle">
              <div
                class="text-center editInfoBtn pt-1 bodyText"
                @click="changePg('siteInformation')"
              >
                Edit Information
              </div>
            </div>
          </div>
        </div>
        <!-- Data Base Usage Card -->
        <div class="col-sm-3 dbUsageBox m-2">
          <div class="headerText dbUsageTitle">DataBase Usage</div>
          <div class="d-flex flex-row dbUsageBody bodyText no-gutters">
            <div class="col chartBox">
              <div class="d-flex flex-row justify-content-center">
                <div class="pieCht"></div>
              </div>
              <div class="d-flex flex-row justify-content-center insightTitle">
                <button
                  class="text-center pt-1 insightBtn"
                  @click="changePg('dataBase')"
                >
                  Insight
                </button>
              </div>
            </div>
            <div class="col">
              <div class="text-center">
                <div class="dataText headerText">100 GB</div>
                <div class="dataTitle bodyText">Total Capacity</div>
              </div>
              <div class="text-center">
                <div class="dataText headerText">50 GB</div>
                <div class="dataTitle bodyText">Used Capacity</div>
              </div>
              <div class="text-center">
                <div class="dataText headerText">10 GB</div>
                <div class="dataTitle bodyText">Monthly Usage</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row d-flex justify-content-center second-row">
        <!-- Install Base Card to Show all Active Services -->
        <div class="row d-flex justify-content-center">
          <div
            class="col-sm-8 align-items-center justify-content-start installBaseBox"
          >
            <div class="headerText installBaseTitle">Install Base</div>
            <div class="d-flex flex-row installBaseBody bodyText no-gutters">
              <table class="table table-borderless tableScroll">
                <thead>
                  <tr class="installBaseTableHead">
                    <th scope="col">Application</th>
                    <th scope="col">Version</th>
                    <th scope="col">Version Date</th>
                    <th scope="col">Install Date</th>
                    <th scope="col">Expiry Date</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody class="installBaseTableBody">
                  <tr v-for="service in details.Services" :key="service.id">
                    <td class="align-middle">{{service.App_Name}}</td>
                    <td class="align-middle">{{service.App_Version}}</td>
                    <td class="align-middle">{{new Date(service.App_Date_Version).toDateString().slice(8,10)}}-{{new Date(service.App_Date_Version).toDateString().slice(4,7).toUpperCase()}}-{{new Date(service.App_Date_Version).toDateString().slice(11)}} </td>
                    <td class="align-middle">{{new Date(service.App_Date_Install).toDateString().slice(8,10)}}-{{new Date(service.App_Date_Install).toDateString().slice(4,7).toUpperCase()}}-{{new Date(service.App_Date_Install).toDateString().slice(11)}}</td>
                    <td class="align-middle">{{new Date(service.App_Date_Expiry).toDateString().slice(8,10)}}-{{new Date(service.App_Date_Expiry).toDateString().slice(4,7).toUpperCase()}}-{{new Date(service.App_Date_Expiry).toDateString().slice(11)}}</td>
                    <td class="align-middle" :class=" (service.App_Status.toUpperCase() == 'ACTIVE')? 'activeStatus' : 'inactiveStatus'">{{service.App_Status.toUpperCase()}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Loader -->
    <div v-else class="d-flex flex-column">
      <div class="d-flex flex-wrap mainPage p-2">
        <div class="col userBoxLoding">
          <div class="boxTitleLoading"></div>
          <div class="boxBodyLoading"></div>
        </div>
        <div class="col userBoxLoding">
          <div class="boxTitleLoading"></div>
          <div class="boxBodyLoading"></div>
        </div>
        <div class="col userBoxLoding">
          <div class="boxTitleLoading"></div>
          <div class="boxBodyLoading"></div>
        </div>
      </div>
      <div class="d-flex flex-wrap mainPage p-2">
        <div class="col userBoxLoding">
          <div class="boxTitleLoading"></div>
          <div class="boxBodyLoading"></div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { ref, computed, toRefs } from "vue";
import { useStore } from "vuex";
import { mapState } from "vuex";
import { comBus } from "../../../main";
export default {
  name: "DashBorad",
  props: {
    tabid: {
      type: String,
    },
  },
  emit: ["changePage"],
  setup(props, { emit }) {
    // props from parent
    const { tabid } = toRefs(props);
    const siteinfo = ref(false);
    const countryName =ref('');
    const stateCode=ref('');
    const cityName =ref('');   
    const sendSocketReq = (request) => {
      store.dispatch("sendSocketReq", request);
    };
    const details = ref({
      Total_Users:'',
      Users_Logged_In:'',
      Site_Information:{ },
      Services:[]      
    });

    const store = useStore();
    const changeServiceState = (serviceState) =>
      store.dispatch("changeServiceState", serviceState);
    const ActiveApp = computed(() => store.state.globalStore.ActiveApp);
    // Get details to show on loading page
    async function getDetails() {
     var instinit = {
        Expiry: 20000,
        Type: "REQUEST",
        Request: {
          Module: "RCU",
          ServiceCode: ActiveApp.value.App_Code,
          TabCode: ActiveApp.value.TabCode,
          RequestID: "ADPNL-DASHBOARD",
          API: "Init_Dashboard",
        },
      };
      let res = await store.dispatch("sendHTTPReq", instinit);
      if (res.Type === "RESPONSE") {
        console.log("API Success");
      } else {
        console.log("Unable to receive the Response of Institute Information");
      }
    }

    // getDetails();

     // get User Summary.
    function assignUserSummary() {
      sendSocketReq({
        data: {
          Expiry: 20000,
          Type: "REQUEST",
          Request: {
            ServiceCode: "ADPNL",
            API: "User_Summary",
          },
        },
        callback: (res) => {
          if (res.Type === "RESPONSE") {
            details.value.Total_Users = res.Response.Total_User;
            details.value.Users_Logged_In=0; // 0 Assigned due to Active-Login user count value not implemented in the API            
          } else if (res.Type === "ERROR") {
            	// Error response received during fetching
          }
        },
      });
    }
    assignUserSummary();

 // get Site Information.
    function assignUserSiteInfo() {
      sendSocketReq({
        data: {
          Expiry: 20000,
          Type: "REQUEST",
          Request: {
            ServiceCode: "ADPNL",
            API: "Site_Info",
            Institute_Code: "DMO"
          },
        },
        callback: (res) => {
          if (res.Type === "RESPONSE") { 
            details.value.Site_Information = res.Response.Site_Info[0];
            stateCode.value=details.value.Site_Information.Institute_Address.State;
           
           // get name values using Global APIs
            fetchCountryName();
            fetchCityName();  
          } else if (res.Type === "ERROR") {
            	// Error response received during fetching
          }
        },
      });
    }
    assignUserSiteInfo();

     // get Service list
    function assignServiceList(){    
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
            details.value.Services=res.Response.services_lists;      
          } else if (res.Type === "ERROR") {
            	// Error response received during fetching
          }
        },
      });
    }
    assignServiceList();
    
    // fetch country name
    function fetchCountryName(){
      sendSocketReq({
            data: {
           Expiry: "20000",
           Type: "REQUEST",
           Request:{
              ServiceCode: "GLOBL",
              API: "GET_GEO_NAME",
              Type_Code: 'CNTY', 
              Loci_Code_Country: details.value.Site_Information.Institute_Address.Country, 
             },
            },
            callback: (res) => {
              if (res.Type === "RESPONSE") {  
               countryName.value = res.Response.Loci_Name_Country;  
              } else if (res.Type === "ERROR") {
            	// Error response received during fetching
          }
        }, 
      })
    }
     
    // fetch city name
    function fetchCityName(){
      sendSocketReq({
        data: {
           Expiry: "20000",
           Type: "REQUEST",
           Request:{
            ServiceCode: "GLOBL",
            API: "GET_GEO_NAME",
            Type_Code: "ARL2", 
            Loci_Code_Country: details.value.Site_Information.Institute_Address.Country, 
            Loci_Code_State: details.value.Site_Information.Institute_Address.State,
            Loci_Code_Area_L1: details.value.Site_Information.Institute_Address.District,
            Loci_Code_Area_L2 : details.value.Site_Information.Institute_Address.Mandal
          },
        },
        callback: (res) => {
              if (res.Type === "RESPONSE") {  
               cityName.value = res.Response.Loci_Name_Area_L2; 
              } else if (res.Type === "ERROR") {
            	// Error response received during fetching
          }
        }, 
      })
    }

    // Change Page using parent Method
    function changePg(val) {
      emit("changePage", val);
      changeServiceState({
        service: "ADPNL",
        tabcode: tabid.value,
        status: "userAccounts",
      });
    }

    return {
      siteinfo,
      details,
      getDetails,
      changePg,
      ActiveApp,
      tabid,
      countryName,
      cityName,     
      stateCode,  

      //API Integrated Functions
      assignUserSummary, 
      assignUserSiteInfo,
      assignServiceList,

      // Global APIs
      fetchCountryName,
      fetchCityName
    };
  },
  // data(){
  //     return{
  //         siteinfo: false,
  //         details: null,
  //     }
  // },
  // created() {
  //     //this.getDetails()
  // },
  // methods:{
  //     // Get details to show on loading page
  //     getDetails(){
  //         var searchinit = {
  //             ServiceCode: this.ActiveApp.App_Code,
  //             TabCode: this.ActiveApp.TabCode,
  //             RequestID: "ADPNL-DASHBOARD",
  //             Packet: {
  //                 Function: "ADPNL_DashBoard",
  //             }
  //         };
  //         this.comBus.emit("cortana", searchinit);
  //         this.comBus.on(searchinit.ServiceCode + searchinit.TabCode + searchinit.RequestID, searchResults => {
  //             this.details = searchResults.Packet.Response;
  //         });
  //     },
  // Change Page using parent Method
  // changePg(val){
  //     this.$parent.changePage(val)
  // }
  //,
  computed: mapState(["UserInfo", "ActiveApp"]),
};
</script>
<style lang="scss" scoped>
@import "./Style/ADPNL.scss";
@import "../../GLOBAL/Styles/colors.scss";
@import "../../GLOBAL/Styles/font-style.scss";
</style>
