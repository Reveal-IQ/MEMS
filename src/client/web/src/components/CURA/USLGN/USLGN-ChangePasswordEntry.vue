<!-- 
************************************
*  Created By : Reveal IQ          *
*  Author     : Bharathi           *
*  Date       : 24 FEB 2021        *
*  Version    : 0.6.8.00.05-0621   *
************************************
-->
<template>
  <section class="pl-2 mt-5" style="padding-top: 36px">
    <div v-if="uslgnState == 'changePassword'">
      <!-- ****** Login Title *******-->
      <div>
        <!-- ***** Login Title *******-->
        <section class="loginTitleSpace">
          <div class="xlargeText loginTitle">Change Password</div>
          <div class="bodyText loginsubTitle">
            Your password has expired, please enter a new password
          </div>
        </section>
        <!-- ******** Old Password *********-->
        <div class="LoginNewSpace bodyText">
          <div class="bodyText">
            <label class="iconFont">
              <font-awesome-icon
                icon="lock"
                :class="
                  iconValid == true && currentPassword != null
                    ? 'userWarnicon'
                    : iconValid == false && currentPassword != null
                    ? 'userSucicon'
                    : iconValid == false
                    ? 'userSucicon'
                    : 'usericon'
                "
                size="1x"
              />
            </label>
            <!-- ******* text Formate Password ********-->
            <input
              type="text"
              v-if="oldView"
              @input="validatecurrentPassword"
              @focus="onFocus('currentPwd')"
              @focusout="focusout('currentPwd')"
              :class="
                textboxValid == true && currentPassword != null
                  ? 'userErrTextBox'
                  : textboxValid == false && currentPassword != null
                  ? 'userSucTextBox'
                  : 'userTextBox'
              "
              placeholder="Enter your current password"
              v-model="currentPassword"
            />
            <!-- ******* Password Formate ********-->
            <input
              type="password"
              v-if="!oldView"
              @input="validatecurrentPassword"
              @focus="onFocus('currentPwd')"
              @focusout="focusout('currentPwd')"
              placeholder="Enter your current password"
              :class="
                textboxValid == true && currentPassword != null
                  ? 'userErrTextBox'
                  : textboxValid == false && currentPassword != null
                  ? 'userSucTextBox'
                  : 'userTextBox'
              "
              v-model="currentPassword"
            />
            <!-- ***** Password view and Hidden Icon *****-->
            <label class="largeText">
              <font-awesome-icon
                v-if="!oldView"
                @click="oldPasswordVision"
                icon="eye"
                class="eyeIcon"
                size="1x"
              />
            </label>
            <label class="largeText">
              <font-awesome-icon
                v-if="oldView"
                @click="oldPasswordVision"
                icon="eye-slash"
                class="eyeIcon"
                size="1x"
              />
            </label>
          </div>
        </div>
        <!-- ******* New Password Textbox ********-->
        <div class="LoginNewSpace mt-3 bodyText">
          <div class="bodyText">
            <label class="iconFont">
              <font-awesome-icon
                icon="lock"
                :class="
                  newiconValid == true && newPassword != null
                    ? 'userWarnicon'
                    : newiconValid == false && newPassword != null
                    ? 'userSucicon'
                    : newiconValid == false
                    ? 'userSucicon'
                    : 'usericon'
                "
                size="1x"
              />
            </label>
            <input
              type="text"
              v-if="newpwdView"
              @input="newPasswordValidation"
              @focus="onFocus('newPwd')"
              @focusout="focusout('newPwd')"
              :class="
                newtextboxValid == true && newPassword != null
                  ? 'userErrTextBox'
                  : newtextboxValid == false && newPassword != null
                  ? 'userSucTextBox'
                  : 'userTextBox'
              "
              placeholder="Enter your new password"
              v-model="newPassword"
            />
            <input
              type="password"
              v-if="!newpwdView"
              @input="newPasswordValidation"
              @focus="onFocus('newPwd')"
              @focusout="focusout('newPwd')"
              :class="
                newtextboxValid == true && newPassword != null
                  ? 'userErrTextBox'
                  : newtextboxValid == false && newPassword != null
                  ? 'userSucTextBox'
                  : 'userTextBox'
              "
              placeholder="Enter your new password"
              v-model="newPassword"
            />
            <!-- ***** Password view and Hidden Icon *****-->
            <label class="largeText">
              <font-awesome-icon
                v-if="!newpwdView"
                @click="newPasswordVision"
                icon="eye"
                :class="newtextboxValid == false ? 'eyeIcon1' : 'eyeIcon'"
                size="1x"
              />
            </label>
            <label class="largeText">
              <font-awesome-icon
                v-if="newpwdView"
                @click="newPasswordVision"
                icon="eye-slash"
                :class="newtextboxValid == false ? 'eyeIcon1' : 'eyeIcon'"
                size="1x"
              />
            </label>
            <label class="largeText">
              <font-awesome-icon
                v-if="newtextboxValid == false"
                @click="newPasswordVision"
                icon="check-circle"
                class="eyeIcon"
                style="color: #88e017"
                size="1x"
              />
            </label>
          </div>
        </div>
        <!--******** Forget Password ********-->
        <div
          class="bodyText pt-3 actionBtn"
          @click="
            changeServiceState({
              service: 'USLGN',
              status: 'newPassword',
            })
          "
        >
          ForgetPassword ?
        </div>
        <div style="height: 250px">
          <!-- ********* Password Validation **********-->
          <PasswordValid ref="pwdValid" />
          <!-- ********* Error Message **********-->
        </div>
        <div class="next">
          <!--********* Validate *********-->
          <div
            v-if="textboxValid == false && newtextboxValid == false"
            class="validateBtn bodyText"
            @click="confirmPassword"
          >
            CONFIRM
          </div>
          <!-- ********* Error Message ********-->
          <Alert
            v-if="!errorCard"
            :icon="'exclamation-triangle'"
            :style="{ background: '#F39C12' }"
            :alertMsg="'Incorrrect current password.'"
            :alertsubMsg="'Please try again'"
            :accessID="'USGLN-UI-001'"
          />
        </div>
      </div>
      <Loader
        v-if="compState == true && uslgnState == 'changePasswordVerify'"
      />
    </div>
    <!-- ******** Verify password *********-->
    <VerifyPassword v-if="uslgnState == 'changePasswordVerify'" />
  </section>
</template>
<script>
import { useStore } from "vuex";
import {
  ref,
  computed,
  onMounted,
  onUpdated,
  onBeforeMount,
  onBeforeUpdate,
  watch
} from "vue";
import PasswordValid from "./USLGN-PasswordValid";
import Alert from "./USLGN-Alert";
import VerifyPassword from "./USLGN-VerifyPassword";
import Loader from "./USLGN-Loader";
const crypto = require("crypto");
export default {
  components: { PasswordValid, Alert, VerifyPassword, Loader },
  setup() {
    // local variables
    const currentPassword = ref(null);
    const textboxValid = ref(null);
    const iconValid = ref(null);
    const newPassword = ref(null);
    const newtextboxValid = ref(null);
    const newiconValid = ref(null);
    const oldView = ref(false);
    const newpwdView = ref(false);
    const compState = ref(null);
    const errorCard = ref(true);
    const invalidChar = ref(null);
    //refs
    const pwdValid = ref(null);
    //store variables
    const state = ref(null);
    const store = useStore();
    const uslgnState = computed(() => store.state.globalStore.appState.USLGN);
    const Hash_Salt = computed(
      () => store.state.globalStore.UserInfo.Hash_Salt
    );
    const changeServiceState = (serviceState) =>
      store.dispatch("changeServiceState", serviceState);
    const sendHTTPReq = (reqPacket) => store.dispatch("sendHTTPReq", reqPacket);
    /******* old password View or Hidden Text ********/
    function oldPasswordVision() {
      if (oldView.value == false) {
        oldView.value = true;
      } else {
        oldView.value = false;
      }
    }
    /******* new password View or Hidden Text ********/
    function newPasswordVision() {
      if (newpwdView.value == false) {
        newpwdView.value = true;
      } else {
        newpwdView.value = false;
      }
    }
    /********  Current Password validaion ********/
    function validatecurrentPassword() {
      if (currentPassword.value.length >= 6) {
        textboxValid.value = false;
        iconValid.value = false;
        errorCard.value = true;
      } else if (currentPassword.value == null || currentPassword.value == "") {
        textboxValid.value = null;
        iconValid.value = false;
      } else {
        iconValid.value = true;
        textboxValid.value = true;
      }
    }
    /******** New Password Validation ********/
    function newPasswordValidation(input) {
      invalidChar.value = input;
      pwdValid.value.validateText(newPassword);
      pwdValid.value.errorinput =
        "Please remove the following " + " " + input.data;
      if (
        pwdValid.value.character == true &&
        pwdValid.value.number == true &&
        pwdValid.value.lowercase == true &&
        pwdValid.value.uppercase == true &&
        pwdValid.value.specialChar == true
      ) {
        newiconValid.value = false;
        newtextboxValid.value = false;
        if (pwdValid.value.errorMsg == true) {
          newtextboxValid.value = true;
          iconValid.value = false;
          newiconValid.value = true;
        }
      } else if (newPassword.value == null || newPassword.value == "") {
        newtextboxValid.value = null;
        newiconValid.value = false;
      } else {
        newiconValid.value = true;
        newtextboxValid.value = true;
      }
    }
    function onFocus(state) {
      if (
        state == "currentPwd" &&
        (currentPassword.value == null || currentPassword.value == "")
      ) {
        iconValid.value = false;
      }
      if (
        state == "newPwd" &&
        (newPassword.value == null || newPassword.value == "")
      ) {
        newiconValid.value = false;
      }
    }
    function focusout(state) {
      if (
        state == "currentPwd" &&
        (currentPassword.value == null || currentPassword.value == "")
      ) {
        iconValid.value = null;
      }
      if (
        state == "newPwd" &&
        (newPassword.value == null || newPassword.value == "")
      ) {
        newiconValid.value = null;
      }
    }
    /************ Password Confirmation ***********/
    const confirmPassword = async () => {
      compState.value = true;
      var hash = crypto
        .pbkdf2Sync(currentPassword.value, Hash_Salt.value, 1000, 64, `sha512`)
        .toString("hex");
      var response_is_Expired = false;
      var currentPwdAuth = {
        Expiry: 20000,
        Type: "REQUEST",
        Request: {
          Module: "CURA",
          ServiceCode: "USLGN",
          API: "Authenticate_Password",
          Password_Hash: hash,
        },
      };
      // to make response packet to expire
      setTimeout(() => {
        response_is_Expired = true;
      }, currentPwdAuth.Expiry);

      let res = await sendHTTPReq(currentPwdAuth);

      if (response_is_Expired == false) {
        if (res.Type == "RESPONSE") {
          compState.value = false;
          changeServiceState({
            service: "USLGN",
            status: "changePasswordVerify",
          });
        } else {
          // Error
          errorCard.value = res.Response.isAuthenticated;
          textboxValid.value = true;
          iconValid.value = true;
        }
      } else {
        // Expiry
        console.log("Response Packet is Expired Please try Again");
      }
    };

watch(uslgnState, (newValue, oldValue) => {
      if (newValue == "changePassword" && oldValue == "changePasswordVerify") {
        setTimeout(() => {
          pwdValid.value.validateText(newPassword);
          if (
            pwdValid.value.character == true &&
            pwdValid.value.number == true &&
            pwdValid.value.lowercase == true &&
            pwdValid.value.uppercase == true &&
            pwdValid.value.specialChar == true
          ) {
            iconValid.value = false;
            textboxValid.value = false;
            if (pwdValid.value.errorMsg == true) {
              textboxValid.value = true;
              iconValid.value = true;
            }
          } else if (newPassword.value == null || newPassword.value == "") {
            iconValid.value = false;
            textboxValid.value = null;
          } else {
            iconValid.value = true;
            textboxValid.value = true;
          }
        }, 100);
      }
    });

    return {
      //variables
      currentPassword,
      uslgnState,
      textboxValid,
      iconValid,
      newPassword,
      newtextboxValid,
      newiconValid,
      oldView,
      newpwdView,
      compState,
      errorCard,
      pwdValid,
      state,
      Hash_Salt,
      invalidChar,
      //functions
      oldPasswordVision,
      newPasswordVision,
      validatecurrentPassword,
      newPasswordValidation,
      onFocus,
      focusout,
      confirmPassword,
      //global mutation
      changeServiceState,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "../../GLOBAL/Styles/font-style.scss";
@import "./Style/USLGN.scss";
@media only screen and (min-width: 1366px) and (max-width: 1920px) {
  .next {
    margin: 40px 0px 0px 0px;
  }
  .loginTitleSpace {
    padding: 0 0 calc(50px - 0.5em) 0;
  }
}

</style>