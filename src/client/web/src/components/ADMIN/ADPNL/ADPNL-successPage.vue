<!-- 
************************************
*  Created By : Reveal IQ          *
*  Author     : Jyoti              *
*  Date       : 19 APR 2022        *
*  Version    : 0.13.0.01.01-0422  *
************************************
-->
<template>
  <div class="SuccessPage bodyText">
    <div class="row d-flex justify-content-center">
      <div class="col-sm-4 profileContainer">
        <div class="row d-flex justify-content-center">
          <div
            class="col-sm-12 my-5 ADPNL-headerText d-flex align-items-center justify-content-center text-success"
          >
            <font-awesome-icon
              icon="check-circle"
              size="1x"
              class="arrowIcon text-success mx-2"
            />User created
          </div>
        </div>
        <!-- Image Container -->
        <div class="row d-flex justify-content-center">
          <div class="col-sm-6 imageContainer m-2 border-2 border-rounded-top">
            <div class="row d-flex justify-content-center">
              <div class="col-sm-12 border border-0 border-rounded-top">
                <div
                  class="row justify-content-center cardButtonColor border-0 rounded-top text-light"
                >
                  <div
                    class="col-sm-4 d-flex my-2 mx-center align-self-center justify-content-center smallText"
                  >
                    Institute Info
                    <!-- {{ UserInfo.Institute_Info.Name }} -->
                  </div>
                </div>
              </div>
            </div>
            <div class="row d-flex justify-content-center">
              <img
                v-if="modalProp.UserInfo.previewPhoto != null"
                :src="modalProp.UserInfo.previewPhoto"
                class="verifyImg photoCard my-auto border border-0 rounded"
              />
            </div>
            <div class="row d-flex justify-content-center">
              <div class="col-sm-8 d-flex justify-content-center fs-5 fw-bold">
                {{ modalProp.UserInfo.firstName }}
              </div>
            </div>
            <div class="row d-flex justify-content-center institueIdStyle my-1">
              <div class="col-sm-10 d-flex justify-content-center">
                <!-- Generated Username and Password -->
                <div class="row bodyText">
                  <div class="col-sm-5 d-flex justify-content-center fw-bold">Username</div>
                  <div class="col-sm-7 d-flex justify-content-center fw-bold">Temporary Password</div>
                  <div class="col-sm-5 d-flex justify-content-center">{{userName}}</div>
                  <div class="col-sm-7 d-flex justify-content-center">{{tempPwd}}</div>
                </div>
              </div>
            </div>
            <div class="row bottomRow d-flex align-self-end my-1">
              <div
                class="col-sm-8 d-flex align-items-center justify-content-start"
              >
                <div class="row">
                  <div
                    class="col-sm-12 d-flex align-items-center justify-content-start REGIT-bodyText"
                  >
                    Powered By
                  </div>
                  <div
                    class="col-sm-12 d-flex align-items-center justify-content-start REGIT-bodyText"
                  >
                    R E V E A L
                  </div>
                </div>
              </div>
              <div
                class="col-sm-4 d-flex align-items-center justify-content-end"
              >
                <div
                  class="row qrCard m-2 card border rounded d-flex justify-content-end"
                >
                  <div class="col d-flex justify-content-center">
                    <font-awesome-icon
                      icon="qrcode"
                      size="2x"
                      class="align-self-center"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row d-flex justify-content-center text-secondary">
          <div class="col-sm-10">
            <div class="row justify-content-end">
              <div class="col-sm-8 d-flex justify-content-end">
                Go to User Profile
                <font-awesome-icon
                  icon="chevron-right"
                  size="4x"
                  class="align-self-end arrowIcon mx-2"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="row d-flex justify-content-center">
          <div class="col-sm-7 d-flex justify-content-center">
            <button
              class="btn mb-4 regitBtn REGIT-mediumText"
              @click="redirectToUserInfo"
            >
              Create New User
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { toRefs } from "@vue/reactivity";
import { useStore } from "vuex";
export default {
  name: "successPage",
  props: {
    modalProp: {
      type: Object,
      required: true,
    },
    userId: {
			type: String,
			required: true,
		},
    userName:{
      type:String
    },
    tempPwd:{
      type:String 
    },
		instituteId: {
			type: String,
			required: true,
		},
    loading: null,
    tabid: {
      type: String,
    },
  },
  emits: ["newRegistration"],
  setup(props, { emit }) {
    const store = useStore();
    // props from parent
    const { tabid, modalProp, userName,tempPwd } = toRefs(props);
    const changeServiceState = (serviceState) =>
      store.dispatch("changeServiceState", serviceState);
    const sendSocketReq = (request) => {
      store.dispatch("sendSocketReq", request);
    };

    // making App_Access and Availability values to empty to avoid using these values for the new user
    modalProp.value.App_Access={};
    modalProp.value.Availability={};

    function redirectToUserInfo() {
      emit("newRegistration");
      changeServiceState({
        service: "ADPNL",
        tabcode: tabid.value,
        status: "UserInfo",
      });
    }

    return {
      tabid,
      modalProp,
      userName,
      tempPwd,
      redirectToUserInfo,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../GLOBAL/Styles/font-style.scss";
@import "../../GLOBAL/Styles/colors.scss";
.ADPNL-headerText {
  font-size: 24px;
}
.ADPNL-smallText {
  font-size: 10px;
}
.profileContainer {
  width: 524px !important;
  min-width: 524px !important;
  max-width: 524px !important;
  margin-top: 78px;
}
.imageContainer {
  width: 395px !important;
  min-width: 395px !important;
  max-width: 395px !important;
  max-height: 561px !important;
  min-height: 561px !important;
  background: #ffffff;
  margin-top: 41px !important;
  border: 2px solid #57aecb !important;
  border-radius: 10px;
}
.arrowIcon {
  font-size: 1em;
  color: $globalButtonColor;
}
.photoCard {
  min-width: 200px !important;
  max-width: 200px !important;
  max-height: 200px !important;
  min-height: 200px !important;
  margin-top: 104.2px !important;
  margin-bottom: 16px !important;
}
.qrCard {
  min-width: 45.65px !important;
  max-width: 45.65px !important;
  max-height: 45.65px !important;
  min-height: 45.65px !important;
}
.bottomRow {
  margin-top: 63.17px !important;
  margin-bottom: 15px !important;
}
.regitBtn {
  margin-top: 40px !important;
  max-width: 500px !important;
  min-width: 500px !important;
  max-height: 80px !important;
  min-height: 80px !important;
  background: #57aecb;
  border-radius: 40px;
  color: #ffffff;
}
.cardButtonColor {
  background-color: $globalButtonColor;
  color: #ffffff;
}
.instituteName {
  color: #57aecb;
}
</style>
