<!-- 
************************************
*  Created By : Reveal IQ          *
*  Author     : Bharathi           *
*  Date       : 24 FEB 2021        *
*  Version    : 0.6.8.00.07-0621   *
************************************
-->
<template>
  <section class="pl-2">
    <div v-if="uslgnState == 'newPassword'">
      <!-- ****** Login title *******-->
      <section class="loginTitleSpace">
        <div class="headerText loginTitle">New Password</div>
        <div class="bodyText loginsubTitle">
          Please enter new password to secure your account
        </div>
      </section>
      <!-- ******** User Password ***********-->
      <div class="LoginNewSpace bodyText">
        <!-- ********* User-Name TextBox *********-->
        <label class="iconFont">
          <font-awesome-icon
            icon="lock"
            :class="
              iconValid && newPassword != null
                ? 'userWarnicon'
                : iconValid == false && newPassword != null
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
          v-if="!newpwdview"
          :class="
            textboxValid && newPassword != null
              ? 'userErrTextBox'
              : textboxValid == false && newPassword != null
              ? 'userSucTextBox'
              : 'userTextBox'
          "
          v-model="newPassword"
          placeholder="Enter a new password"
          @input="validatenewPassword"
          @keyup.enter="validateState"
          @focus="onFocus"
          @focusout="focusout"
        />
        <input
          type="password"
          v-if="newpwdview"
          :class="
            textboxValid && newPassword != null
              ? 'userErrTextBox'
              : textboxValid == false && newPassword != null
              ? 'userSucTextBox'
              : 'userTextBox'
          "
          @input="validatenewPassword"
          placeholder="Enter a new password"
          @keyup.enter="validateState"
          v-model="newPassword"
          @focus="onFocus"
          @focusout="focusout"
        />
        <!-- ***** Password view and Hidden Icon *****-->
        <label class="largeText">
          <font-awesome-icon
            v-if="!newpwdview"
            @click="passwordVision"
            icon="eye"
            :class="textboxValid == false ? 'eyeIcon1' : 'eyeIcon'"
            size="1x"
          />
        </label>
        <label class="largeText">
          <font-awesome-icon
            v-if="newpwdview"
            @click="passwordVision"
            icon="eye-slash"
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
      <div style="height: 250px" class="pt-4">
        <!-- ******** Password validation *********-->
        <passwordValid ref="pwdValid" />
        <!-- ********* Error Message **********-->
      </div>
      <!-- ******** Validate Button ********-->
      <div class="validateWrapper mt-5">
        <div
          v-if="textboxValid == false"
          class="validateBtn bodyText"
          @click="validateState"
        >
          VALIDATE
        </div>
      </div>
    </div>
    <!-- ******** Verify Password Component ********-->
    <div v-else>
      <verifyPassword ref="verifyPassword" />
    </div>
  </section>
</template>
<script>
import { useStore } from "vuex";
import { ref, computed, watch } from "vue";
import passwordValid from ".//USLGN-PasswordValid";
import verifyPassword from "./USLGN-VerifyPassword";
export default {
  components: {
    passwordValid,
    verifyPassword,
  },
  setup() {
    //local variables
    const pwdValid = ref(null);
    const newpwdview = ref("false");
    const newPassword = ref(null);
    const textboxValid = ref(null);
    const iconValid = ref(null);
    const store = useStore();
    const userInput = ref(null);
    //store variables
    const uslgnState = computed(() => store.state.globalStore.appState.USLGN);
    const changeServiceState = (serviceState) =>
      store.dispatch("changeServiceState", serviceState);

    /****** New password View /hidden*******/
    function passwordVision() {
      if (newpwdview.value == false) {
        newpwdview.value = true;
      } else {
        newpwdview.value = false;
      }
    }
    function onFocus(event) {
      if (newPassword.value == null || newPassword.value == "")
        iconValid.value = false;
    }
    function focusout(event) {
      if (newPassword.value == null || newPassword.value == "")
        iconValid.value = null;
    }

    /******** Password state Switching ******/
    function validateState() {
      if (textboxValid.value == false)
        changeServiceState({
          service: "USLGN",
          status: "newPasswordVerify",
        });
    }

    /*********  New Password Validation ********/
    function validatenewPassword(event) {
      userInput.value = event.data;
      pwdValid.value.validateText(newPassword);
      pwdValid.value.errorinput =
        "Please remove the following " + " " + userInput.value;
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
    }

    watch(uslgnState, (newValue, oldValue) => {
      if (newValue == "newPassword" && oldValue == "newPasswordVerify") {
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
      newpwdview,
      uslgnState,
      newPassword,
      textboxValid,
      iconValid,
      passwordVision,
      pwdValid,
      userInput,
      //functions
      onFocus,
      focusout,
      changeServiceState,
      validateState,
      validatenewPassword,
    };
  },
};
</script>
