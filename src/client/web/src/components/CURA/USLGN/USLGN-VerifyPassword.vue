<!-- 
************************************
*  Created By : Reveal IQ          *
*  Author     : Bharathi           *
*  Date       : 24 FEB 2021        *
*  Version    : 0.6.8.00.10-0721   *
************************************
-->
<template>
  <section class="pl-2">
    <div v-if="loaderView == true">
      <!-- Login Title -->
      <section class="loginTitleSpace">
        <div class="headerText loginTitle">Verify New Password</div>
        <div class="bodyText loginsubTitle">
          Please enter your passoword again to validate and save this change
        </div>
      </section>
      <!-- User Password -->
      <div class="LoginNewSpace bodyText">
        <!-- User-Name TextBox -->
        <label class="iconFont">
          <font-awesome-icon
            icon="lock"
            :class="
              iconValid && verifyPassword != null
                ? 'userWarnicon'
                : iconValid == false && verifyPassword != null
                ? 'userSucicon'
                : iconValid == false
                ? 'userSucicon'
                : 'usericon'
            "
            size="1x"
          />
        </label>
        <input
          type="text"
          :class="
            textboxValid == true && verifyPassword != null
              ? 'userErrTextBox'
              : textboxValid == false && verifyPassword != null
              ? 'userSucTextBox'
              : 'userTextBox'
          "
          v-if="newpwdview"
          placeholder="Enter your password again"
          v-model="verifyPassword"
          @input="validatenewPassword"
          @focus="onFocus"
          @focusout="focusout"
          @keyup.enter="setPassword"
        />
        <input
          type="password"
          v-if="!newpwdview"
          placeholder="Enter your password again"
          :class="
            textboxValid == true && verifyPassword != null
              ? 'userErrTextBox'
              : textboxValid == false && verifyPassword != null
              ? 'userSucTextBox'
              : 'userTextBox'
          "
          @input="validatenewPassword"
          @keyup.enter="setPassword"
          @focus="onFocus"
          @focusout="focusout"
          v-model="verifyPassword"
        />
        <!-- Password view and Hidden Icon -->
        <label class="largeText">
          <font-awesome-icon
            v-if="!newpwdview"
            @click="verifyPasswordVision"
            icon="eye"
            :class="textboxValid == false ? 'eyeIcon1' : 'eyeIcon'"
            size="1x"
          />
        </label>
        <label class="largeText">
          <font-awesome-icon
            icon="eye-slash"
            v-if="newpwdview"
            @click="verifyPasswordVision"
            :class="textboxValid == false ? 'eyeIcon1' : 'eyeIcon'"
            size="1x"
          />
        </label>
        <label class="largeText">
          <font-awesome-icon
            v-if="textboxValid == false"
            icon="check-circle"
            style="color: #88e017"
            class="eyeIcon"
            size="1x"
          />
        </label>
      </div>
      <!-- Change password Action Button -->
      <div
        class="bodyText pt-3 actionBtn"
        @click="
          changeServiceState({ service: 'USLGN', status: 'changePassword' })
        "
        v-if="uslgnState == 'changePasswordVerify'"
      >
        Change Password ?
      </div>
      <!-- Change password Action Button -->
      <div
        class="bodyText pt-3 actionBtn"
        @click="changeServiceState({ service: 'USLGN', status: 'newPassword' })"
        v-if="uslgnState == 'newPasswordVerify'"
      >
        Forget Password ?
      </div>
      <!-- Confirm Button -->
      <div class="next">
        <!-- Error Message -->
        <Alert
          v-if="textboxValid"
          :icon="'exclamation-triangle'"
          :style="{ background: '#F39C12' }"
          :alertMsg="'The password entered does not match.'"
          :alertsubMsg="'Please try again.'"
          :accessID="'USGLN-UI-001'"
        />
        <div
          v-if="textboxValid == false"
          class="nextBtn bodyText"
          @click="setPassword"
        >
          CONFIRM
        </div>
      </div>
    </div>
    <Loader v-else />
  </section>
</template>
<script>
import { getCurrentInstance } from "vue";
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
  setup(props) {
    // local variables
    const newpwdview = ref(false);
    const verifyPassword = ref(null);
    const textboxValid = ref(null);
    const iconValid = ref(null);
    const compState = ref(null);
    const loaderView = ref(true);

    // global variables assigned to local variables
    const store = useStore();
    const instance = getCurrentInstance();
    const uslgnState = computed(() => store.state.globalStore.appState.USLGN);
    const UserInfo = computed(() => store.state.globalStore.UserInfo);

    // global actions
    const changeServiceState = (serviceState) =>
      store.dispatch("changeServiceState", serviceState);
    const sendHTTPReq = (reqPacket) => store.dispatch("sendHTTPReq", reqPacket);
    const publishNotification = (value) =>
      store.dispatch("publishNotification", value);

    // New password textbox view/hidden
    function verifyPasswordVision() {
      if (newpwdview.value == false) {
        newpwdview.value = true;
      } else {
        newpwdview.value = false;
      }
    }

    function onFocus() {
      if (verifyPassword.value == null || verifyPassword.value == "")
        iconValid.value = false;
    }

    function focusout() {
      if (verifyPassword.value == null || verifyPassword.value == "")
        iconValid.value = null;
    }

    // Verify Password Validation
    function validatenewPassword() {
      if (instance.parent.setupState.newPassword == verifyPassword.value) {
        iconValid.value = false;
        textboxValid.value = false;
      } else if (verifyPassword.value == null || verifyPassword.value == "") {
        iconValid.value = false;
        textboxValid.value = null;
      } else {
        iconValid.value = true;
        textboxValid.value = true;
      }
    }

    // New Password Set Validation
    const setPassword = async () => {
      if (textboxValid.value == false && verifyPassword.value != null) {
        loaderView.value = true;
        //Generating Salt
        var salt = crypto.randomBytes(8).toString("hex").toString();
        //Generating Hash
        var hash = crypto
          .pbkdf2Sync(verifyPassword.value, salt, 1000, 64, `sha512`)
          .toString(`hex`);
        var response_is_Expired = false;
        var newPwdauth = {
          Expiry: 20000,
          Type: "REQUEST",
          Request: {
            Module: "CURA",
            ServiceCode: "USLGN",
            API: "Set_Password",
            Password_Hash: hash,
            Hash_Salt: salt,
            Password_Expiry_Duration: 365,
          },
        };

        // to make response packet to expire
        setTimeout(() => {
          response_is_Expired = true;
        }, newPwdauth.Expiry);

        let response = await sendHTTPReq(newPwdauth);
        compState.value = false;
        if (response_is_Expired == false) {
          if (response.Response.isPasswordSet && response.Type === "RESPONSE") {
            changeServiceState({
              service: "USLGN",
              status: "Home",
            });
            publishNotification({
              message: "Successfully updated your account",
              messageCode: "USLGN-UI-001",
              messageType: "success",
              messageExpiry: 60000,
              messageIcon: "check"
            });
          } else {
            //error
            textboxValid.value = response.Response.isPasswordSet;
            console.log("Unable to Set Password");
          }
        }
      }
    };

    return {
      //local variables
      newpwdview,
      verifyPassword,
      textboxValid,
      iconValid,
      compState,
      //functions
      verifyPasswordVision,
      onFocus,
      focusout,
      validatenewPassword,
      changeServiceState,
      setPassword,
      loaderView,
      //global variables
      uslgnState,
    };
  },
};
</script>
