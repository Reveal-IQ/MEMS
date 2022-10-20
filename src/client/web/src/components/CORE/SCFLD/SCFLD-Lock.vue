<!-- 
************************************
*  Created By : Reveal IQ          *
*  Author     : BharathKumar       *
*  Date       : 21 MAY 2021        *
*  Version    : 0.6.8.00.08-0921   *
************************************
-->
<template>
  <section>
    <!-- Reveal Logo -->
    <div class="row row-logo text-center">
      <div class="col-sm-12 align-self-center">
        <img src="../../../assets/media/DeepBlueLogo.svg" />
      </div>
    </div>

    <!-- SCFLD Lock message -->
    <div
      class="row row-loader text-center m-0"
      v-if="
        scfldState == 'Locked' &&
        socketStatus != 'disconnected' &&
        socketStatus != 'Error: websocket error'
      "
    >
      <div class="col-sm-4 align-self-start d-flex justify-content-end m-0">
        <!-- Lock Icon -->
        <span class="row align-items-center">
          <div class="col-sm-12 userLoginImage d-flex justify-content-center">
            <font-awesome-icon icon="lock" class="lockIcon my-auto" />
          </div>
        </span>
      </div>
      <div class="col-sm-6 d-flex justify-content-start">
        <div align="left" class="userName mx-3">
          <div class="largeText px-0 gx-0">
            We have locked the session due to inactivity. This helps protect
            your patient data.
          </div>
          <div class="row">
            <div class="col-sm-12">
              <div class="d-flex justify-content-end smallText">
                SCFLD-UI-002
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12">
              <UserVerification />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- SCFLD internet Connectivity Error -->
    <div
      class="row row-loader text-center"
      v-if="
        socketStatus == 'disconnected' ||
        socketStatus == 'Error: websocket error'
      "
    >
      <div class="col-sm-4 align-self-start d-flex justify-content-end p-0 m-0">
        <!-- User Image -->
        <span class="row align-items-center">
          <div class="col-sm-12 userLoginImage d-flex justify-content-center">
            <font-awesome-icon icon="exclamation-triangle" class="alertIcon" />
          </div>
        </span>
      </div>
      <div class="col-sm-8 col-xl-6 d-flex justify-content-start pt-4">
        <div align="left" class="userName">
          <section>
            <div class="largeText p-2">
              There is an issue with communicating with the server. We are
              trying to restablish the secure line to Reveal server.
            </div>
            <div class="largeText p-2">
              Please check your network connection.
            </div>
            <div class="col-sm-12">
              <div class="d-flex justify-content-end smallText">
                SCFLD-UI-001
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import UserVerification from "./SCFLD-UserVerification.vue";
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  components: {
    UserVerification,
  },
  setup() {
    const store = useStore();
    const socketStatus = computed(() => store.state.socketLink.socketStatus);
    const scfldState = computed(() => store.state.globalStore.appState.SCFLD);
    return {
      socketStatus,
      scfldState,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "../../GLOBAL/Styles/colors.scss";
@import "../../GLOBAL/Styles/font-style.scss";
@import "./style/SCFLD.scss";
.userLoginImage {
  border: 5px solid #f39c12 !important;
  margin: 0 30px 0 0;
  border-radius: 50%;
  box-sizing: border-box;
  height: 20vh;
  width: 20vh;
}
.lockIcon {
  font-size: 5em;
  color: #f39c12; 
}
.alertIcon {
  font-size: 8em;
  color: #f39c12;
}
.row-loader {
  height: 45vh;
}
.row-logo {
  height: 35vh;
}
.row-adds {
  height: 12vh;
}
.row-loader-mutedText-01 {
  color: #c0c0c0;
}
.row-loader-mutedText-02 {
  color: #e8e8e8;
}
.userName {
  position: relative;
}
.btn {
  color: rgb(255, 255, 255);
  background-color: #607d8b;
}
.row-bgColor {
  background-color: white;
}
.img-size {
  height: 100px;
  width: 100px;
}
.btn-reveal {
  background-color: white;
  border: 1px solid #489eed;
  box-sizing: border-box;
  border-radius: 20px;
  height: 40px;
  padding: 0;
}
</style>







