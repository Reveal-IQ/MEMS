<!-- 
************************************
*  Created By : Reveal IQ          *
*  Author     : Jyoti              *
*  Date       : 20 May 2022        *
*  Version    : 0.13.0.05.09-0522  *
************************************
-->
<template>
  <div class="userListPage d-flex justify-content-center">
    <!-- ********  User Page *********-->
    <div class="col-12 col-xl-10 d-flex flex-column">
      <div class="d-flex flex-column formHeight">
        <div class="col bodyText">
          <div class="d-flex flex-column">
            <div class="row  headerArea">
              <!-- Heading -->
              <div class="col-sm-5">
                <div class="ADPNL-headerText userAccountsTitleText">
                  User Profile
                </div>
              </div>

              <!-- Password Reset -->
              <div class="col-sm-3 d-flex align-self-center justify-content-center">
                  <div
                    v-if="password==null"
                    class="d-flex align-self-center justify-content-center"
                  >
                    <font-awesome-icon
                      icon="user-circle"
                      class="userIcon IconFont d-flex align-self-center"
                      size="1x"
                    />
                    <div
                      class="addUserOption bodyText"
                      ref="AddUser"
                      @click="resetPassword(ID_User)"
                    >
                     Password Reset 
                    </div>
                  </div>
                  <div v-else  class="d-flex justify-content-start text-dark">
                   Temporary Password : <span class="fw-bold pl-1">&nbsp; {{password}}</span>
                  </div>

              </div>
              <!-- Delete User  -->
              <div class="col-sm-1 d-flex align-self-center">
                  <div
                    class="d-flex align-self-center justify-content-start"
                  >
                    <font-awesome-icon
                      icon="user-circle"
                      class="userIcon IconFont d-flex align-self-center"
                      size="1x"
                    />
                    <div
                      class="addUserOption bodyText"
                      ref="AddUser"
                       @click="deleteUser(ID_User)"
                    >
                      Delete
                    </div>
                  </div>
              </div>
               <!-- Edit User  -->
              <div class="col-sm-1 d-flex align-self-center">
                  <div
                    class="d-flex align-self-center justify-content-end"
                  >
                    <font-awesome-icon
                      icon="user-circle"
                      class="userIcon IconFont d-flex align-self-center"
                      size="1x"
                    />
                    <div
                      class="addUserOption bodyText"
                      ref="AddUser"
                      @click="editUser('AddUser')"
                    >
                      Edit
                    </div>
                  </div>
              </div>
               <!-- Dashboard  -->
               <div class="col-sm-2 d-flex align-self-center justify-content-center">
                <div
                  class="row dashboardButton d-flex align-items-center justify-content-center text-light"
                  style="max-height: 25px"
                >
                  <div class="col-sm-2">
                    <font-awesome-icon
                      icon="align-left"
                      class="align-self-center"
                      style="width: 15px; height: 15px"
                    />
                  </div>
                  <div
                    class="col-sm-8 ADPNL-subtitleText"
                    @click="navigDashoard('dashBoard')"
                    ref="dashboard"
                  >
                    Dashboard
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- *********** User Profile Section **********-->
          <div class="d-flex flex-column personalInfoBox userProfile">
            <div class="confirmSecHeading d-flex flex-row align-items-center">
              <span class="ADPNL-titleText confirmSecTitle"
                >User Information</span
              >
            </div>
            <div class="d-flex flex-column flex-lg-row containerSpace">
              <div class="col personalInfoCon">
                <div class="row">
                  <div class="col picInfoCon">
                    <div class="useInfoTextTitle">Photo Identification</div>
                    <img
                    v-if="modalProp.User_Profile.User_Profile != null"
                    :src="modalProp.User_Profile.User_Profile"
                    class="verifyImg"
                  />
                  </div>

                  <div class="col nameCol">
                    <div class="useInfoTextTitle">Full Name</div>
                    <div class="text-capitalize">
                    {{ modalProp.User_Profile.User_First_Name }}
                    {{ modalProp.User_Profile.User_Middle_Name }}
                    {{ modalProp.User_Profile.User_Last_Name }}
                    </div>
                    <div class="useInfoTextTitle">Date of Birth</div>
                    <div class="text-capitalize">
                    {{new Date(modalProp.User_Profile.User_Date_Birth).toDateString().slice(4, 7).toUpperCase() }}-{{new Date(modalProp.User_Profile.User_Date_Birth).toDateString().slice(8,10).toUpperCase() }}-{{new Date(modalProp.User_Profile.User_Date_Birth).toDateString().slice(11, 15).toUpperCase() }} |
                    {{ modalProp.User_Profile.User_Age }}
                    </div>
                    <div class="useInfoTextTitle">Sex</div>
                    <div class="text-capitalize">
                      {{ modalProp.User_Profile.User_Sex }}
                    </div>

                    <div class="useInfoTextTitle">Username</div>
                    <div>
                      {{ modalProp.User_Profile.User_Name }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="col addressInfoCon">
                <div class="row">
                  <div class="col contactCol">
                    <div class="useInfoTextTitle">Phone Number</div>
                    <div>+91-{{ modalProp.User_Profile.Contact_Phone_Number }}</div>

                    <div class="useInfoTextTitle">Email</div>
                    <div>{{ modalProp.User_Profile.User_Email }}</div>

                    <div class="useInfoTextTitle">Address</div>
                    <div>{{ modalProp.User_Profile.User_Address_Street }}</div>
                  <div>{{ modalProp.User_Profile.User_Address_Postal_Code }}</div>
                  <div>{{ modalProp.User_Profile.User_Address_City }}</div>
                    <div>
                      {{ modalProp.User_Profile.User_Address_State}},
                    {{ modalProp.User_Profile.User_Address_Country }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- *********** Application Access **********-->
          <div class="d-flex flex-column personalInfoBox">
            <div class="confirmSecHeading d-flex align-items-center">
              <span class="ADPNL-titleText confirmSecTitle"
                >Application Access</span
              >
            </div>
            <div class="row AppContainer containerSpace">
              <!-- ***** User Accesseble Services/Licenced Application *****-->
              <div
              v-for="service in modalProp.App_Access"
              :key="service.id"
              class="col-sm-6"
            >
              <div
                class="d-flex align-items-center justify-content-center appStyle text-capitalize"
              >
                {{ service.App_Name}}
                |
                {{ service.App_Module }}
                Module
              </div>
            </div>
            </div>
          </div>
          <!-- *********** Physician Availability Schedule **********-->
          <div class="d-flex flex-column personalInfoBox">
            <div class="confirmSecHeading d-flex align-items-center">
              <span class="ADPNL-titleText confirmSecTitle"
                >Physician General Availability</span
              >
            </div>
            <div class="col-12 d-flex flex-column containerSpace">
            <div>Select a date to review avaiability.</div>
            <!-- <div class="d-flex flex-wrap daysBody">
              {{ modalProp.Availability.day }}
            
            </div> -->
            <!-- showDay -->
            <div
              v-if="true"
              class="d-flex flex-column flex-lg-row availabilityDetails pt-2"
            >
             
              <div class="d-flex flex-wrap">
                <div class="duration">
                  <div class="row">
                    <div
                      v-for="(slot, index) in modalProp.Availability"
                      :key="index"
                      class="timeSlotBox"
                    >
                      <div class="textSlotTitle pt-1 text-center">
                        {{ slot.Block_ID }}
                      </div>
                      <div class="textSlotBody fw-bold text-center">
                        {{ slot.Block_Time_Start }}
                      </div>
                      <div class="patLimit d-flex justify-content-center">
                        LIMIT:{{ slot.Block_Patient_Limit }}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            <div
              v-else
              class="d-flex flex-row justify-content-center align-items-center bodyText py-5"
              style="font-weight: 500"
            >
              The Selected day is Inactive.
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, computed, toRefs } from "@vue/reactivity";
import { useStore } from "vuex";
const crypto = require("crypto");

export default {
  props: {
    tabid: {
      type: String,
    },
    ID_User:{
      type:String
    }
  },
  emits: ["connectDashboard","navigateUserAccount"],
  setup(props, { emit }) {
    const store = useStore();
    // props from parent
    const { tabid ,ID_User} = toRefs(props);
    const changeServiceState = (serviceState) =>
      store.dispatch("changeServiceState", serviceState);
    const sendSocketReq = (request) => {
      store.dispatch("sendSocketReq", request);
    };
    const defaultPic = ref(null);
    const selectedDay = ref("MONDAY");
    const showDay = ref(null);
    const dayStart = ref(null);
    const dayEnd = ref(null);
    const selectedSlots = ref([]);
    const Service_List = ref([]);
    const password = ref(null);
    const modalProp = ref({ 
      User_Profile:{},
      App_Access:[],
      Availability:[],
    });

    const days = ref([
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
      "SUNDAY",
    ]);
    const months=ref(["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]);

    // getUser details
    function getuserList() {     
       sendSocketReq({
        data: {
          Expiry: 20000,
          Type: "REQUEST",
          Request: {
            ServiceCode: "ADPNL",
            API: "User_Search",
            User_Profile: "TRUE",
            ID_User:ID_User.value
          },
        },
        callback: (res) => {
          if (res.Type === "RESPONSE") {
            // console.log("User Profile response is -->",res.Response); 
            modalProp.value.User_Profile = res.Response.User_Profile;
            modalProp.value.App_Access = res.Response.App_Access;
             modalProp.value.Availability = res.Response.Availability; 
            // payload used for App_Access Service and service used for Service_List
            modalProp.value.App_Access.forEach(payload=>{  
            Service_List.value.forEach(service => {
             if(service.Service_Code == payload.Service_Code){
               payload['App_Name']=service.App_Name;
               payload['App_Module']=service.App_Module;              
             } 
              
            })
            })   
            

             console.log("Modal Prop values",modalProp.value);
          } else if (res.Type === "ERROR") {
            	// Error response received during fetching
          }
        },
      });
    }
    getuserList();
    // Reset Password
    function resetPassword(payload) {
        password.value=crypto.randomBytes(6).toString("hex").toString();
        let salt = crypto.randomBytes(8).toString("hex").toString();
        let hash = crypto
				.pbkdf2Sync(password.value, salt, 1000, 64, `sha512`)
				.toString(`hex`);

        console.log("Password -->",password.value,"salt value -->",salt,"Hash value -->",hash);

        // API Request
        sendSocketReq({
        data: {
        Expiry: 20000,
        Type: "REQUEST",
        Request: { 
          ServiceCode: "ADPNL",
          API: "User_Password_Reset",
          ID_User: payload,
          Password_Salt:salt,
          Password_Hash:hash
          }
        },
        callback: (res) => {
          if (res.Type === "RESPONSE") {
            console.log("Password Reset API -->",res.Response);           
          } else if (res.Type === "ERROR") {
            	// Error response received during fetching
          }
        },
      });
    }

    // Delete User
    function deleteUser(payload){
       sendSocketReq({
        data: {
        Expiry: 20000,
        Type: "REQUEST",
        Request: { 
          ServiceCode: "ADPNL",
          API: "User_Delete",
          ID_User: payload
          }
        },
        callback: (res) => {
          if (res.Type === "RESPONSE") {
            // console.log("Delete User API -->",res.Response);
            redirectToNextPage();         
          } else if (res.Type === "ERROR") {
            	// Error response received during fetching
          }
        },
      });
    }

    async function redirectToNextPage() {
      emit("navigateUserAccount","userAccounts")
    }

    // Go backe to Dashboard
     function navigDashoard(val) {
      emit("connectDashboard", val);
    }

    // Change to User Frendly Time Format
    function changeTimeFormat(time, isEndTime) {
      let hours = Number(time.slice(0, 2));
      let minutes = time.slice(2, 4);
      if (isEndTime) {
        if (Number(minutes) == 59) {
          minutes = "00";
          hours = ++hours;
        } else if (Number(minutes) > 0 && Number(minutes) < 59) {
          minutes = Number(minutes) + 1;
          if (minutes < 10) minutes = `0${minutes}`;
          else minutes = `${minutes}`;
        }
      }
      if (hours >= 12 && hours <= 23) {
        if (hours != 12) hours = hours - 12;
        if (hours < 10) hours = `0${hours}`;
        return `${hours}:${minutes} PM`;
      } else if (hours == 0 || hours == 24) {
        return `12:${minutes} AM`;
      } else {
        if (hours < 10) hours = `0${hours}`;
        return `${hours}:${minutes} AM`;
      }
    }

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
            Service_List.value=res.Response.services_lists;     
          } else if (res.Type === "ERROR") {
            	// Error response received during fetching
          }
        },
      });
    }
    assignServiceList();


    created: {
      //  onDaySelection(selectedDay.value)
    }

    computed(() => mapState(["ActiveApp"]));
    return {
      //Local Variables
      tabid,
      ID_User,
      defaultPic,
      selectedDay,
      showDay,
      dayStart,
      dayEnd,
      selectedSlots,
      days,
      modalProp,
      Service_List,
      password,
      //Local Functions
      resetPassword,
      deleteUser,
      redirectToNextPage,
      navigDashoard,
      changeTimeFormat,
      getuserList,
      assignServiceList
    };
  },
};
</script>
<style lang="scss" scoped>
@import "./Style/ADPNL.scss";
@import "../../GLOBAL/Styles/font-style.scss";

.ADPNL-headerText {
  font-size: 24px;
}
.ADPNL-subtitleText{
  font-size: 12px;
//   display: flex;
// align-items: center;
}
.userListPage {
  color: black;
  min-width: 100vw !important;
  max-width: 100vw !important;
  min-height: 100% !important;
  max-height: 100% !important;
}

.headerArea{
  margin-top: 70px !important;
}
.userProfile{
  margin-top: 84px !important;
}
.userAccountsTitleText {
  color: rgba(0, 0, 0, 1);
  font-weight: bold;
  opacity: 0.6;
}
.addUserOption {
  color: #2980b9;
  padding: 0 20px 0 10px;
  cursor: pointer;
}
.dashboardButton {
  background: #54626f;
  border-radius: 20px;
  max-height: 25px !important;
  max-width: 122px !important;
}
.personalInfoHeading {
  background: #16a085;
  width: 100%;
  height: 40px;
}
.confirmSecHeading {
  width: 100%;
  height: 40px;
  background: #adadad;
}
.confirmSecTitle {
  font-size: 24px;
  font-weight: 500;
  color: #ffffff;
  padding-left: 40px;
}
.picCon {
  width: 200px;
  height: 200px;
  background: rgba(189, 195, 199, 0.1);
}
.useInfoTextTitle {
  color: #000000;
  font-weight: 500;
  padding: 20px 0 5px 0;
}
.AppContainer {
  width: 50%;
}
.appStyle {
  width: 200px;
  height: 40px;
  margin-bottom: 10px;
  background: #ace7e7;
  border-radius: 20px;
}
.reveal-container {
  margin-top: 62px !important;
  max-height: 92.26px;
  position: relative;
  margin-bottom: 73.74px !important;
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

.textSlotTitle {
  color: white;
}
.textSlotBody {
  margin-top: 21px;
  color: white;
  font-size: 14px;
  font-weight: 400;
}
.patLimit {
  margin-top: 15px;
  font-size: 12px;
  color: white;
  outline: none;
}
.timeSlotBox {
  margin-right: 40px;
  margin-top: 15px;
  width: 100px;
  height: 100px;
  background: #636363;
  border-radius: 10px;
}
.duration {
  margin: 20px 0 0 0;
}
.createUser {
  width: 500px !important;
  height: 80px !important;
  color: white;
  background: #27ae60;
  border-radius: 40px;
}
</style>
