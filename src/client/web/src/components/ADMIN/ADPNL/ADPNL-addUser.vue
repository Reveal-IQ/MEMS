<!-- 
************************************
*  Created By : Reveal IQ          *
*  Author     : Jyoti              *
*  Date       : 16 FEB 2022        *
*  Version    : 0.13.0.01.02-0422  *
************************************
-->
<template>
  <div
    class="row d-flex align-self-center justify-content-center"
    style="max-width: 1150px"
  >
    <!-- Header section -->
    <div
      v-if="adminpanelState != 'SuccessPage'"
      class="row header_section d-flex align-self-center justify-content-center"
    >
      <div class="col-sm-8 d-flex align-self-center justify-content-start">
        <div class="addUserTitleBox">
          <div class="ADPNL-titleText addUserTitle">
            <span style="cursor: pointer">User Accounts</span>
            <span class="newUserTitle"> / New User</span>
          </div>
          <div class="ADPNL-subtitleText addUserText" style="line-height: 15px">
            Fillin the user details and capture a profile image for
            identification purposes.
          </div>
        </div>
      </div>
      <div
        class="col-sm-2 d-flex align-self-center justify-content-end ADPNL-buttonText text-decoration-underline"
        @click="clearChildForm()"
      >
        Clear form
      </div>
      <div class="col-sm-2 d-flex align-self-center justify-content-end">
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

    <!-- Child Components -->
    <div class="row childComponent m-1 p-1">
      <div class="col-sm-12">
        <keep-alive v-if="toggleComp">
          <UserInfo
            :tabid="tabid"
            v-if="adminpanelState == 'UserInfo'"
            ref="UserInfoRef"
            @receiveUserInfo="assignUserInfo"
        /></keep-alive>
        <keep-alive v-if="toggleComp">
          <Demographics
            :tabid="tabid"
            v-if="adminpanelState == 'Demographics'"
            ref="DemographicsRef"
            @receiveDemographics="assignDemographics"
          />
        </keep-alive>
        <keep-alive v-if="toggleComp">
          <AppAccess
            :tabid="tabid"
            v-if="adminpanelState == 'AppAccess'"
            ref="AppAccessRef"
            @receiveAppAccess="assignAppAccess"
          />
        </keep-alive>
        <keep-alive v-if="toggleComp">
          <Confirmation
            :tabid="tabid"
            v-if="adminpanelState == 'Confirmation'"
            :user_id="ID_User"
            :institute_id="ID_Institute"
            :modal-prop="userProfileInfo"
            @userName="assignUserName"
            @tempPassword="assignTempPwd"
            ref="Confirmation"
          />
        </keep-alive>
        <keep-alive>
          <SuccessPage
            :tabid="tabid"
            v-if="adminpanelState == 'SuccessPage'"
            :user_id="ID_User"
            :institute_id="ID_Institute"
            :modal-prop="userProfileInfo"
            :userName="userName"
            :tempPwd="tempPassword"
            ref="SuccessPage"
            @newRegistration="clearAllComponents"
          />
        </keep-alive>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, toRefs, computed } from "vue";
import { useStore } from "vuex";
import UserInfo from "./ADPNL-userInfo.vue";
import Demographics from "./ADPNL-Demographics.vue";
import AppAccess from "./ADPNL-appAccess.vue";
import Confirmation from "./ADPNL-confirmation.vue";
import SuccessPage from "./ADPNL-successPage.vue";

export default {
  components: {
    UserInfo,
    Demographics,
    AppAccess,
    Confirmation,
    SuccessPage,
  },
  props: {
    tabid: {
      type: String,
    },
  },
  emits: ["connectDashboard"],
  setup(props, { emit }) {
    const store = useStore();
    const { tabid } = toRefs(props);
    const ID_User=ref(null);
    const ID_Institute=ref(null);
    const UserInfoRef = ref(null);
    const DemographicsRef = ref(null);
    const AppAccessRef = ref(null);
    const toggleComp = ref(true);
    const userName=ref('');
    const tempPassword=ref('');
    const adminpanelState = computed(
      () => store.state.globalStore.appState.ADPNL[`${tabid.value}`]
    );
    const sendSocketReq = (request) => {
			store.dispatch("sendSocketReq", request);
		};
    const userProfileInfo = ref({
      UserInfo: "null",
      Demographics: "null",
      AppAccess: "null",
      Availability: "null",
    });

    //set UserInfo and demographic values to the userProfile object
    function assignUserInfo(userData) {
      userProfileInfo.value.UserInfo = userData;
    }
    function assignDemographics(demographicsData) {
      userProfileInfo.value.Demographics = demographicsData;
    }
    function assignAppAccess(appAccessData) {
      userProfileInfo.value.AppAccess = appAccessData;
    }

    function clearChildForm() {
      if (adminpanelState.value == "UserInfo") {
        UserInfoRef.value.clearAll();
      } else if (adminpanelState.value == "Demographics") {
        DemographicsRef.value.clearAll();
      } else if (adminpanelState.value == "AppAccess") {
        AppAccessRef.value.clearAll();
      }
    }

    // To assign user name and pass to success component 
    function assignUserName(payload){
      userName.value=payload;
    }
    function assignTempPwd(payload){
      tempPassword.value=payload;
    }

    function clearAllComponents() {
      // keep-alive components will be deactivated to remove data in them
      toggleComp.value = false;
      // keep-alive components will be activated with small interval
      setTimeout(() => {
        toggleComp.value = true;
      }, 100);
    }

    function navigDashoard(val) {
      emit("connectDashboard", val);
    }

  // Create new user Request
  sendSocketReq({
			data: {
				Expiry: 20000,
				Type: "REQUEST",
				Request: {
					Module: "ADMIN",
					ServiceCode: "ADPNL",
					API: "User_Create",
          Institute_Code:"DMO"
				},
			},
			callback: (res) => {
				if (res.Type === "RESPONSE") {
					ID_User.value = res.Response.ID_User;
					ID_Institute.value = res.Response.ID_Institute;
				} else if (res.Type === "ERROR") {
					// If we receive an Error Response
				}
			},
		});

    return {
      tabid,
      ID_User,
      ID_Institute,
      adminpanelState,
      userProfileInfo,
      UserInfoRef,
      DemographicsRef,
      AppAccessRef,
      toggleComp,
      // confirmation values to success page
      userName,
      tempPassword,
      clearChildForm,
      navigDashoard,
      assignUserInfo,
      assignDemographics,
      assignAppAccess,
      clearAllComponents,
      assignUserName,
      assignTempPwd
    };
  },
};
</script>
<style lang="scss" scoped>
.ADPNL-titleText {
  font-size: 24px;
}
.ADPNL-subtitleText {
  font-size: 12px;
}
.ADPNL-buttonText {
  font-size: 13px;
}
.header_section {
  margin-top: 60px !important;
  //margin-bottom: 62px;
}
.addUserTitle {
  color: #000000;
  font-size: 24px;
}
.addUserText {
  color: rgba(0, 0, 0, 0.6);
  padding-top: 5px;
}
.newUserTitle {
  color: #c4c4c4;
  opacity: 0.6;
}
.dashboardButton {
  background: #54626f;
  border-radius: 20px;
}
.childComponent {
  // margin-top: 50.74px !important;
  max-height: 788px !important;
  min-height: 788px !important;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.childComponent::-webkit-scrollbar {
  display: none;
}

// Media query for less than 768 screen resoluation
@media (max-height: 768px) {
  .childComponent {
    max-height: 460px !important;
    min-height: 460px !important;
    overflow-y: scroll !important;
  }
}
</style>
