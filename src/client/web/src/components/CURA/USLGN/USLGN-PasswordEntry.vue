<!-- 
************************************
*  Created By : Reveal IQ          *
*  Author     : Bharathi           *
*  Date       : 24 FEB 2021        *
*  Version    : 0.6.8.00.07-0721   *
************************************
-->
<template>
  <section class="pl-2">
    <div v-if="!loader">
      <!-- ***** Login Title *******-->
      <section class="loginTitleSpace">
        <div class="headerText loginTitle">Login</div>
        <div class="bodyText loginsubTitle">
          Experience next generation health data management
        </div>
      </section>
      <!-- ******** Password ***********-->
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
        <!-- ********* password-Name TextBox *********-->
        <input
          type="text"
          v-if="passView"
          :class="
            textboxValid == true && password != null
              ? 'userErrTextBox'
              : textboxValid == false && password != null
              ? 'userSucTextBox'
              : 'userTextBox'
          "
          v-model="password"
          @focus="onFocus"
          @focusout="focusout"
          @input="validatePassword"
          @keyup.enter="passwordAuthentication"
        />
        <!-- ****** Password Formate TextBox *******-->
        <input
          type="password"
          v-if="!passView"
          :class="
            textboxValid == true && password != null
              ? 'userErrTextBox'
              : textboxValid == false && password != null
              ? 'userSucTextBox'
              : 'userTextBox'
          "
          v-model="password"
          placeholder="Enter your Password"
          @input="validatePassword"
          @focus="onFocus"
          @focusout="focusout"
          @keyup.enter="passwordAuthentication"
        />
        <!-- ***** Password view and Hidden Icon *****-->
        <label class="largeText">
          <font-awesome-icon
            v-if="!passView"
            @click="passwordView"
            icon="eye"
            class="eyeIcon"
            size="1x"
          />
        </label>
        <label class="largeText">
          <font-awesome-icon
            v-if="passView"
            @click="passwordView"
            icon="eye-slash"
            class="eyeIcon"
            size="1x"
          />
        </label>
      </div>
      <!--******** Forget Password ********-->
      <div
        class="bodyText pt-3 actionBtn"
        @click="changeServiceState({ service: 'USLGN', status: 'newPassword' })"
      >
        Forget Password?
      </div>
      <div class="next">
        <div
          v-if="textboxValid == false"
          class="nextBtn bodyText"
          @click="passwordAuthentication"
        >
          <p class="my-auto">LOGIN</p>
        </div>
        <alert
          v-if="textboxValid && password.length >= 6"
          :icon="'exclamation-triangle'"
          :style="{ background: '#F39C12' }"
          :alertMsg="'An incorrect password was entered.!'"
          :accessID="'USGLN-UI-001'"
        />
      </div>
    </div>
    <Loader v-else />
  </section>
</template>
<script>
import { useRouter } from "vue-router";
import { ref, computed } from "vue";
import { useStore } from "vuex";
import Alert from "./USLGN-Alert";
import Loader from "./USLGN-Loader";
const crypto = require("crypto");
export default {
  components: {
    Alert,
    Loader,
  },
  setup() {
    //local variables
    const passView = ref(false);
    const password = ref(null);
    const textboxValid = ref(null);
    const iconValid = ref(null);
    const errorCard = ref(null);
    const loader = ref(null);
    //store variables
    const changeState = computed(() => store.state.globalStore.changeState);
    const UserInfo = computed(() => store.state.globalStore.UserInfo);
    const Hash_Salt = computed(() => store.state.globalStore.UserInfo.Hash_Salt);
    const sendHTTPReq = (req) => store.dispatch("sendHTTPReq", req);
    const changeServiceState= (serviceState) => store.dispatch("changeServiceState", serviceState);
    const store = useStore();
    const router = useRouter();
    /******* Validate Password ******/
    function validatePassword() {
      if (password.value.length >= 6) {
        textboxValid.value = false;
        iconValid.value = false;
      } else if (password.value == null || password.value == "" ||password.value.length < 6) {
        errorCard.value = null;
        iconValid.value = false;
        textboxValid.value = null;
      }
    }
    /******** password/Text view or Hidden Validation*******/
    function passwordView() {
      if (passView.value == false) {
        passView.value = true;
      } else {
        passView.value = false;
      }
    }

    /******** password Authentication *********/
    const passwordAuthentication = async () => {
      if (textboxValid.value == false) {
        loader.value = true;
        var hash = crypto
          .pbkdf2Sync(password.value, Hash_Salt.value, 1000, 64, `sha512`)
          .toString("hex");
        var response_is_Expired = false;
        var pwdAuth = {
          Expiry: 20000,
          Type: "REQUEST",
          Request: {
            Module: "CURA",
            ServiceCode: "USLGN",
            API: "Login_User",
            Password_Hash: hash,
          },
        };
        // to make response packet to expire
        setTimeout(() => {
          response_is_Expired = true;
        }, pwdAuth.Expiry);
        
        let res = await sendHTTPReq(pwdAuth);
        console.log("this response packet ",res)
        loader.value = false;
        if (response_is_Expired == false) {
          if (res.Type === "RESPONSE") {
            localStorage.setItem("Token", res.Response.Refresh_Token);
            localStorage.setItem(
              "IssuedAt",
              JSON.stringify(res.Response.Issued_At)
            );
            localStorage.setItem(
              "ExpiresIn",
              JSON.stringify(res.Response.Expires_In)
            );
            store.commit("UpdateActiveApp", {
              App_Name: "Home",
              App_Code: "Home",
              TabCode: "01",
            });
            /****** Changing route to SCFLD ******/
            console.log("Updating Service to SCFLD");
            router.push({ name: "SCFLD" });
          } else {
            console.log("Unable to get Response Please try again");
            textboxValid.value = true;
            iconValid.value = true;
          }
        } else {
          console.log("Response packet is expired please try again");
        }
      }
    };
    function onFocus(event) {
      if (password.value == null || password.value == "")
        iconValid.value = false;
    }
    function focusout(event) {
      if (password.value == null || password.value == "")
        iconValid.value = null;
    }

    return {
      // variables
      passView,
      password,
      textboxValid,
      iconValid,
      errorCard,
      loader,
      changeState,
      UserInfo,
      Hash_Salt,
      // functions
      validatePassword,
      passwordView,
      changeServiceState,
      passwordAuthentication,
      onFocus,
      focusout,
    };
  },
};
</script>
<style lang="scss" scoped>
.actionBtn {
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
}
</style>