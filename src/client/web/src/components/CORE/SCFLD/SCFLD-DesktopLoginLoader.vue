<!-- 
************************************
*  Created By : Reveal IQ          *
*  Author     : BharathKumar       *
*  Date       : 21 MAY 2021        *
*  Version    : 0.6.8.00.07-0921   *
************************************
-->
<template>
  <section>
    <!-- SCFLD - Reveal Logo {constant} -->
    <div class="row text-center row-logo m-0">
      <div class="col-sm-12 align-self-center">
        <img src="../../../assets/media/DeepBlueLogo.svg" />
      </div>
    </div>

    <!-- SCFLD Loader #01 {dynamic} -->
    <div class="row row-loader text-center m-0" v-if="socketStatus == null">
      <div class="col-sm-12 align-self-start">
        <!-- User Image -->
        <img :src="userPic" class="userLoginImage" />
        <div align="left" class="userName">
          <div class="headerText pt-2" id="loadername">
            {{ greeting }}
          </div>
          <div class="largeText pt-2">
            We are creating a secure connection to the Reveal servers
          </div>
        </div>
      </div>
    </div>

    <!-- SCFLD Loader #01 Error {dynamic} -->
    <div class="row row-loader text-center m-0" v-else-if="!authErr">
      <div class="col-sm-4 align-self-start d-flex justify-content-end">
        <!--  Alert Icon -->
        <span class="row align-items-center">
          <div class="col-sm-12 alertImage d-flex justify-content-center">
            <font-awesome-icon icon="exclamation-triangle" class="alertIcon" />
          </div>
        </span>
      </div>
      <div class="col-sm-6 d-flex justify-content-start pt-4">
        <div align="left" class="userName">
          <div class="largeText p-2">
            Encrountered an error with establishing secure communication to the
            Reveal server.
          </div>
          <div class="largeText p-2">
            Check your network connection and try to login again
          </div>
          <div class="row">
            <div class="col-sm-12 d-flex justify-content-end smallText">
              SCFLD-UI-001
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- SCFLD Loader #02 {dynamic} -->
    <div
      class="row row-loader text-center m-0"
      v-else-if="socketStatus == 'connected' && !userInit"
    >
      <div class="col-sm-12 align-self-start d-flex justify-content-center">
        <!-- User Image -->
        <img :src="userPic" class="userLoginImage" />
        <div align="left" class="userName">
          <div class="headerText p-2" id="loadername">
            {{ greeting }}
          </div>
          <div>
            <div class="largeText p-2">Initalising your Reveal enviroment</div>
            <div class="largeText p-2 row-loader-mutedText-01">
              Established secure line to the Reveal Server
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- SCFLD Loader #03 {dynamic} -->
    <div
      class="row row-loader text-center m-0"
      v-else-if="userInit == 'success'"
    >
      <div class="col-sm-12 align-self-start d-flex justify-content-center">
        <!-- User Image -->
        <img :src="userPic" class="userLoginImage" />
        <div align="left" class="userName">
          <div class="headerText p-2" id="loadername">
            {{ greeting }}
          </div>
          <div>
            <div class="largeText p-2">Welcome to Reveal</div>
            <div class="largeText p-2 row-loader-mutedText-01">
              Initalising your Reveal enviroment
            </div>
            <div class="largeText p-2 row-loader-mutedText-02">
              Established secure line to the Reveal Server
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- SCFLD Loader #02 Error {dynamic} -->
    <div class="row row-loader text-center m-0" v-else>
      <div class="col-sm-4 align-self-start d-flex justify-content-end">
        <!--  Alert Image -->
        <span class="row align-items-center">
          <div class="col-sm-12 alertImage d-flex justify-content-center mx-0">
            <font-awesome-icon icon="exclamation-triangle" class="alertIcon" />
          </div>
        </span>
      </div>
      <div class="col-sm-8 d-flex justify-content-start pt-4">
        <div align="left" class="userName">
          <div class="largeText p-2 py-3">
            Encrountered an error with retriving your details and setting.
          </div>
          <div class="row pt-4">
            <div class="col-sm-5">
              <div class="row mx-0">
                <button class="btn-reveal d-flex justify-content-around">
                  <span class="my-auto">
                    <font-awesome-icon icon="concierge-bell" class="bellIcon" />
                  </span>
                  <span class="my-auto"> Request Help </span>
                </button>
              </div>
            </div>
            <div class="col-sm-7">
              <div class="d-flex justify-content-end smallText">
                SCFLD-UI-001
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { toRefs } from "vue";
export default {
  props: {
    authErr: {
      type: Boolean,
      required: true,
    },
    userInit: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const { authErr, userInit } = toRefs(props);
    const socketStatus = computed(() => store.state.socketLink.socketStatus);
    const scfldState = computed(() => store.state.globalStore.appState.SCFLD);
    const greeting = ref(null);
    const userPic = ref(null);
    const UserInfo = computed(() => store.state.globalStore.UserInfo);

    function updateDefaultPic() {
      if (UserInfo.hasOwnProperty("User_Profile")) {
        userPic.value = UserInfo.User_Profile;
      } else {
        if (UserInfo.User_Sex == "male") {
          userPic.value = require("../../../assets/media/Male.png");
        } else {
          userPic.value = require("../../../assets/media/Female.png");
        }
      }
    }

    updateDefaultPic();

    /******* get greetings *******/
    let date = new Date();
    if (date.getHours() < 12) {
      greeting.value = "Good Morning";
    }
    if (date.getHours() >= 12 && date.getHours() < 16) {
      greeting.value = "Good Afternoon";
    }
    if (date.getHours() >= 16 && date.getHours() < 24) {
      greeting.value = "Good Evening ";
    }

    return {
      //local variables
      greeting,
      userPic,
      //Props
      userInit,
      authErr,
      //store variables
      UserInfo,
      store,
      socketStatus,
      scfldState
    };
  },
};
</script>
<style lang="scss" scoped>
@import "../../GLOBAL/Styles/colors.scss";
@import "../../GLOBAL/Styles/font-style.scss";
@import "./style/SCFLD.scss";
</style>
