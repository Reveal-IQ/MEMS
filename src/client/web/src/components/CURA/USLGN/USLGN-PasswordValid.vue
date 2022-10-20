 <!-- 
************************************
*  Created By : Reveal IQ          *
*  Author     : Bharathi           *
*  Date       : 24 FEB 2021        *
*  Version    : 0.6.8.00.08-0621   *
************************************
-->
<template>
  <section class="bodyText">
    <!-- ******* Password Requirements alert ********-->
    <div v-if="errorMsg == false">
      <InfoCard
        :icon="'exclamation-circle'"
        :alertMsg="'Ensure your password meets the following secuirty requirements.'"
        :style="{ background: '#24455A' }"
      />
      <div class="pt-2">
        <font-awesome-icon
          icon="check"
          :class="lowercase ? 'checkSucicon' : 'checkicon'"
        />
        <span :class="lowercase ? 'passwordSucValid' : 'passwordValid'">
          Atleast one lower case
        </span>
      </div>
      <div class="pt-3">
        <font-awesome-icon
          icon="check"
          :class="uppercase ? 'checkSucicon' : 'checkicon'"
        />
        <span :class="uppercase ? 'passwordSucValid' : 'passwordValid'">
          Aleast one upper case
        </span>
      </div>
      <div class="pt-3">
        <font-awesome-icon
          icon="check"
          :class="number ? 'checkSucicon' : 'checkicon'"
        />
        <span :class="number ? 'passwordSucValid' : 'passwordValid'">
          Atleast one number
        </span>
      </div>
      <div class="pt-3">
        <font-awesome-icon
          icon="check"
          :class="specialChar ? 'checkSucicon' : 'checkicon'"
        />
        <span :class="specialChar ? 'passwordSucValid' : 'passwordValid'">
          Aleast one special character (! @ # $ % ^ & *)
        </span>
      </div>
      <div class="pt-3">
        <font-awesome-icon
          icon="check"
          :class="character ? 'checkSucicon' : 'checkicon'"
        />
        <span :class="character ? 'passwordSucValid' : 'passwordValid'">
          Minimum of 6 characters
        </span>
      </div>
    </div>
    <div v-else>
      <errorCard
        :icon="'exclamation-triangle'"
        :style="{ background: '#F39C12' }"
        :alertMsg="'Restricted character has been entered.'"
        :alertsubMsg="errorinput"
        :accessID="'USGLN-UI-001'"
      />
    </div>
  </section>
</template>
<script>
import { ref } from "vue";
import InfoCard from "./USLGN-Alert";
import errorCard from "./USLGN-Alert";
export default {
  components: {
    InfoCard,
    errorCard,
  },
  setup() {
    //local variables
    const lowercase = ref(false);
    const uppercase = ref(false);
    const specialChar = ref(false);
    const character = ref(false);
    const number = ref(false);
    const errorMsg = ref(false);
    const errorinput = ref(null);
    function validateText(password) {
      if (/\d/.test(password.value)) number.value = true;
      if (!/\d/.test(password.value)) number.value = false;
      if (!/.{6,}/.test(password.value)) character.value = false;
      if (/.{6,}/.test(password.value)) character.value = true;
      if (/[a-z]/.test(password.value)) lowercase.value = true;
      if (!/[a-z]/.test(password.value)) lowercase.value = false;
      if (/[A-Z]/.test(password.value)) uppercase.value = true;
      if (!/[A-Z]/.test(password.value)) uppercase.value = false;
      if (/[!@#\$%\^&\*]/.test(password.value)) specialChar.value = true;
      if (!/[!@#\$%\^&\*]/.test(password.value)) specialChar.value = false;
      if (/[~\+=`|{}:;!,.?\\/'"()\[\]-]/.test(password.value))
        errorMsg.value = true;
      if (!/[~\+=`|{}:;!,.?\\/'"()\[\]-]/.test(password.value))
        errorMsg.value = false;
    }
    return {
      //variables
      lowercase,
      uppercase,
      specialChar,
      character,
      number,
      errorMsg,
      errorinput,
      //functions
      validateText,
    };
  },
};
</script>
