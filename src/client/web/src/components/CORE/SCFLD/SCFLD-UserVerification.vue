<!-- 
************************************
*  Created By : Reveal IQ          *
*  Author     : BharathKumar       *
*  Date       : 21 MAY 2021        *
*  Version    : 0.6.8.00.03-0921   *
************************************
-->
<template>
  <section class="UserVerification-Container">
    <div class="row">
      <div class="col LoginNewSpace bodyText">
        <label class="iconFont"
          ><font-awesome-icon icon="user" class="userSucicon" size="1x"
        /></label>
        <div class="userBox mediumText text-dark">
          <span
            v-if="UserInfo.User_Group == 'DRX' || UserInfo.User_Group == 'DRJ'"
            >Dr.</span
          >
          {{ UserInfo.User_Name_First }} {{ UserInfo.User_Name_Last }}
          <span class="px-2 text-secondary">|</span>
          <span class="btn mediumText text-secondary" @click="navigateToUSLGN"
            >Switch User</span
          >
        </div>
      </div>
    </div>
    <div class="row">
      <div class="LoginNewSpace bodyText">
        <label class="iconFont">
          <font-awesome-icon
            icon="lock"
            :class="
              iconValid == true && password != null
                ? 'userWarnicon'
                : iconValid == false && password != null
                ? 'userSucicon'
                : iconValid == false
                ? 'userSucicon'
                : 'usericon'
            "
            size="1x"
          />
        </label>
        <!-- ****** Password Formate TextBox *******-->
        <input
          type="password"
          :class="
            textboxValid == true && password != null
              ? 'userErrTextBox'
              : textboxValid == false && password != null
              ? 'userSucTextBox'
              : 'userTextBox'
          "
          v-model="password"
          placeholder="Please enter your password"
          @input="validatePassword"
          @focus="onFocus"
          @focusout="focusout"
          @keyup.enter="passwordAuthentication"
        />
      </div>
    </div>
    <div class="row">
      <div class="LoginNewSpace bodyText text-danger" v-if="errMessage == true">
        Incorrect Password. Please try again.
      </div>
    </div>
    <div class="row mx-5">
      <div class="next">
        <div
          v-if="textboxValid == false"
          class="nextBtn bodyText"
          @click="passwordAuthentication()"
        >
          <p class="my-auto">UNLOCK</p>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const crypto = require("crypto");
export default {
  setup() {
    //local variables
    const password = ref(null);
    const textboxValid = ref(null);
    const iconValid = ref(null);
    const errorCard = ref(null);
    const errMessage = ref(null);
    //actions
    const changeServiceState = (serviceState) =>
      store.dispatch("changeServiceState", serviceState);
    const sendHTTPReq = (req) => store.dispatch("sendHTTPReq", req);
    //store variables
    const store = useStore();
    const router = useRouter();
    const UserInfo = computed(() => store.state.globalStore.UserInfo);
    const HashSalt = computed(() => store.state.globalStore.UserInfo.Hash_Salt);
    // Validate Password
    function validatePassword() {
      errMessage.value = false;
      if (password.value.length >= 6) {
        textboxValid.value = false;
        iconValid.value = false;
      } else if (password.value == null || password.value == "") {
        iconValid.value = false;
        textboxValid.value = null;
      }
    }
    // password Authentication
    const passwordAuthentication = async () => {
      var hash = crypto
        .pbkdf2Sync(password.value, HashSalt.value, 1000, 64, `sha512`)
        .toString("hex");
      var response_is_Expired = false;
      var pwdAuth = {
        Expiry: 20000,
        Type: "REQUEST",
        Request: {
          Module: "CURA",
          ServiceCode: "USLGN",
          API: "Authenticate_Password",
          Password_Hash: hash,
        },
      };

      let res = await sendHTTPReq(pwdAuth);

      if (res.Type === "RESPONSE") {
        if (res.Response.isAuthenticated == true) {
          changeServiceState({
            service: "SCFLD",
            status: "Unlocked",
          });
        }
      } else {
        console.log("Unable to get Response Please try again");
        textboxValid.value = true;
        iconValid.value = true;
        errMessage.value = true;
      }
    };
    function onFocus() {
      if (password.value == null || password.value == "")
        iconValid.value = false;
    }
    function focusout() {
      if (password.value == null || password.value == "")
        iconValid.value = null;
    }
    function navigateToUSLGN() {
      location.reload();
    }
    return {
      // local variables
      UserInfo,
      errMessage,
      password,
      textboxValid,
      iconValid,
      errorCard,
      //store variabe
      UserInfo,
      // functions
      validatePassword,
      passwordAuthentication,
      onFocus,
      focusout,
      navigateToUSLGN,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "./../../GLOBAL/Styles/colors.scss";
@import "./../../GLOBAL/Styles/font-style.scss";
@import "../SCFLD/style/SCFLD.scss";

</style>
