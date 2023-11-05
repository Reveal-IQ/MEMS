<!-- 
************************************
*  Created By : Reveal IQ          *
*  Author     : Jyoti              *
*  Date       : 04 April 2022      *
*  Version    : 0.13.0             *
************************************
-->
<template>
  <div class="col-12 col-xl-10 d-flex flex-column confirmPage">
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
                <div class="col mx-0 ADPNL-buttonText">
                  Profile Confirmation
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ******** Header for User Confirmation Page *********-->

    <div class="d-flex flex-column formHeight appCollection">
      <!-- ******* Top banner of Verify card ********-->
      <div class="col bodyText">
        <!-- *********** Demographic Section **********-->
        <div class="d-flex flex-column personalInfoBox">
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
                    v-if="modalProp.UserInfo.previewPhoto != null"
                    :src="modalProp.UserInfo.previewPhoto"
                    class="verifyImg"
                  />
                  <!-- <div class="picCon"></div> -->
                </div>

                <div class="col nameCol">
                  <div class="useInfoTextTitle">Full Name</div>
                  <div class="text-capitalize">
                    {{ modalProp.UserInfo.firstName }}
                    {{ modalProp.UserInfo.middleName }}
                    {{ modalProp.UserInfo.lastName }}
                  </div>
                  <div class="useInfoTextTitle">Date of Birth</div>
                  <div class="text-capitalize">
                     {{new Date(modalProp.UserInfo.dateOfBirth).toDateString().slice(4, 7).toUpperCase() }}-{{new Date(modalProp.UserInfo.dateOfBirth).toDateString().slice(8,10).toUpperCase() }}-{{new Date(modalProp.UserInfo.dateOfBirth).toDateString().slice(11, 15).toUpperCase() }} |
                    {{ modalProp.UserInfo.age }}
                  </div>
                  <div class="useInfoTextTitle">Sex</div>
                  <div class="text-capitalize">
                    {{ modalProp.UserInfo.sex.listName }}
                  </div>

                  <div class="useInfoTextTitle">Username</div>
                  <div>{{ username }}</div>

                </div>
              </div>
            </div>
            <div class="col addressInfoCon">
              <div class="row">
                <div class="col contactCol">
                  <div class="useInfoTextTitle">Phone Number</div>
                  <div>+91-{{ modalProp.UserInfo.phoneNumber }}</div>
                  <!-- <div v-if="modalProp.altMobile">
                    +91-{{ modalProp.altMobile }}
                  </div> -->
                  <div class="useInfoTextTitle">Email</div>
                  <div>{{ modalProp.UserInfo.emailAddress }}</div>

                  <div class="useInfoTextTitle">Address</div>
                  <div>{{ modalProp.Demographics.streetaddress }}</div>
                  <div>{{ modalProp.Demographics.postalcode }}</div>
                  <div>{{ modalProp.Demographics.city.listName }}</div>
                  <div>
                    {{ modalProp.Demographics.state.listName }},
                    {{ modalProp.Demographics.country.listName }}
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
              v-for="service in modalProp.AppAccess.activeServices"
              :key="service.id"
              class="col-sm-6"
            >
              <div
                class="d-flex align-items-center justify-content-center appStyle"
              >
                {{ service.App_Name }}
                |
                {{ service.App_Module.toLowerCase() }}
                Module
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <div class="row d-flex justify-content-center">
      <div
        class="d-flex align-items-center justify-content-center createUser"
        @click="redirectToNextPage()"
      >
        Create User
      </div>
    </div>
  </div>
</template>
<script>
import { ref, computed, toRefs } from "@vue/reactivity";
const crypto = require("crypto");
import { useStore } from "vuex";
import { forEach } from 'lodash';
export default {
  props: {
    modalProp: {
      type: Object,
      required: true,
    },
    loading: null,
    tabid: {
      type: String,
    },
  },
  emit:["tempPassword","userName"],
  setup(props, { emit }) {
    const store = useStore();
    // props from parent
    const { tabid, modalProp, loading } = toRefs(props);
    const changeServiceState = (serviceState) =>
      store.dispatch("changeServiceState", serviceState);
    const sendSocketReq = (request) => {
      store.dispatch("sendSocketReq", request);
    };
    const ID_User_Granted = computed(
      () => store.state.globalStore.UserInfo.ID_User
    );

    const password = ref('');
    const salt=ref('');
    const Hash_Salt=ref('');
    const progressBarPercent = ref(100);
    const defaultPic = ref(null);
  
      
    // Generating UserName
    let firstName=(modalProp.value.UserInfo.firstName).slice(0,1);
    let lastName =(modalProp.value.UserInfo.lastName);    
    const username = ref(firstName.toLowerCase()+lastName.toLowerCase());
    emit("userName",username.value);
  
    //Extract Some column of active services based on the Create_Visit Request packet columns.
   const activeServices = ref([]);
   const services = modalProp.value.AppAccess.activeServices;
   services.forEach(service => {
     let Service_Code = service.Service_Code;
      let Access_Code = null;      
      let User_Licence  = null;
      let App_Icon = service.App_Icon;
      let Version = service.App_Version;
      let Version_Schema =service.Version_Schema; 
      let Date_Time_Granted =Date.now();
      let Date_Time_Expiry="";
      activeServices.value.push({
        Service_Code:Service_Code,
        Access_Code:Access_Code,
        App_Icon:App_Icon,
        User_Licence:User_Licence,
        Version:Version,
        Version_Schema:Version_Schema,
        Date_Time_Granted:Date_Time_Granted,
        Date_Time_Expiry:Date_Time_Expiry,
        ID_User_Granted:ID_User_Granted.value
      })
   });
  
   // To generate Hash_Salt we need to import Crypto librarory
   // password have 5 digit random Alphanumeric value
   function generatePwd(){
     password.value=crypto.randomBytes(6).toString("hex").toString();
     emit("tempPassword",password.value);
     console.log("Generated Password Value -->",password.value);
   }
   // salt  have 16 digit random alphanumeric value
   function generateSalt(){
     salt.value = crypto.randomBytes(8).toString("hex").toString();
     console.log("Generated Salt Value -->",salt.value);
   }
   //  use crypto() to generate Hash_salt
   function generateHashSalt(){
     Hash_Salt.value=crypto
				.pbkdf2Sync(password.value, salt.value, 1000, 64, `sha512`)
				.toString(`hex`);
    // console.log("Hash Salt Value -->",Hash_Salt.value);   
   }

   generatePwd();
   generateSalt();
   generateHashSalt();

    // Go to user Accounts Page
    function gotoUserAccounts() {
      // this.$parent.gotoUserAccounts()
      // this.$parent.clear()
    }

    // Submit form
    function confirmProfile() {
      // this.$parent.submit();
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

    async function redirectToNextPage() {
      await registerNewUser();  
    }

    // Go backe to New User page
    function editProfile() {
      this.$parent.userRegistration = false;
      setTimeout(() => {
        this.$parent.editInfo = this.modalProp;
      });
      setTimeout(() => {
        this.$parent.enableTextBox();
      });
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


  //  Register new user/Create new user
  function registerNewUser() {

			sendSocketReq({
				data: {
					Expiry: 20000,
					Type: "REQUEST",
					Request: {
						ServiceCode: "ADPNL",
						API: "User_Create",
            Institute_Code:"DMO",
						User_Profile: {								
									User_First_Name:modalProp.value.UserInfo.firstName,
									User_Middle_Name: modalProp.value.UserInfo.middleName,
									User_Last_Name: modalProp.value.UserInfo.lastName,
                  Contact_Phone_Number:modalProp.value.UserInfo.phoneNumber,
                  Emergency_Contact:[],
                  User_Name: username.value,
                  Hash_Salt: salt.value,
                  Password_Hash: Hash_Salt.value ,
                  Date_Time_Pwd_Set:Date.now(),
                  Date_Time_Pwd_Expiry:Date.now(),
                  User_Group: '',
                  User_Department: '', 
                  Flag_New_User: false,
                  Address_Country_Code: modalProp.value.Demographics.country.listCode,
                  Address_State_Code: modalProp.value.Demographics.state.listCode,
                  Address_District_Code: modalProp.value.Demographics.district.listCode,
                  Address_City_Code: modalProp.value.Demographics.city.listCode,
                  Address_Street:modalProp.value.Demographics.streetaddress,
                  Address_Postal_Code:modalProp.value.Demographics.postalcode,
                  User_Email:modalProp.value.UserInfo.emailAddress,
									User_Date_Birth: modalProp.value.UserInfo.dateOfBirth,
									User_Age: modalProp.value.UserInfo.age,
                  User_Blood_Group:'',
									User_Sex: modalProp.value.UserInfo.sex.listName,
                  Version_Schema: "0.5"						
						},
            App_Access:activeServices.value,
					},
				},
				callback: (res) => {
					if (res.Type === "RESPONSE") {
						// If we receive an success Response
						console.log("--Received response--",res.Response);
            changeServiceState({
                 service: "ADPNL",
                 tabcode: tabid.value,
                 status: "SuccessPage",
            });

					} else if (res.Type === "ERROR") {
						// If we receive an Error Response
						console.log("--Error--" , res.Response);
					}
				},
			});
		}

    computed(() => mapState(["ActiveApp"]));
    return {
      //Local Variables
      tabid,
      ID_User_Granted,
      activeServices,
      services,
      modalProp,
      loading,
      defaultPic,
      progressBarPercent,
      username,
      password,
      salt,
      Hash_Salt,
      //Local Functions
      gotoUserAccounts,
      getBarWidth,
      getPercentage,
      redirectToNextPage,
      // generate Hash functions
      generatePwd,
      generateSalt,
      generateHashSalt,

      // onDaySelection,
      confirmProfile,
      editProfile,
      changeTimeFormat,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "./Style/ADPNL.scss";
@import "../../GLOBAL/Styles/font-style.scss";


.confirmPage{
  max-height: 100vh;
  min-height: 100vh;
  overflow-y: scroll;
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
}
.appCollection{
   margin-top: 73.74px !important;
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
