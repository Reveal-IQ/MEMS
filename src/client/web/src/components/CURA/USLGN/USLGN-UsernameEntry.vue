<!-- 
************************************
*  Created By : Reveal IQ          *
*  Author     : Bharathi           *
*  Date       : 24 FEB 2021        *
*  Version    : 0.6.8.00.11-0721   *
************************************
-->
<template>
  <section>
    <div v-if="!loader">
      <!-- ***** Login Title *******-->
      <section class="loginTitleSpace">
        <div class="headerText loginTitle">Login</div>
        <div class="bodyText loginsubTitle">
          Experience next generation health data management
        </div>
      </section>
      <!-- ***** Username Entry /Icon *****-->
      <div class="LoginNewSpace bodyText">
        <label class="iconFont">
          <font-awesome-icon
            icon="user"
            :class="
              iconValid == true && username != null
                ? 'userWarnicon'
                : iconValid == false && username != null
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
          placeholder="Enter your username"
          v-model="username"
          :class="
            textboxValid == true && username != null
              ? 'userErrTextBox'
              : textboxValid == false && username != null
              ? 'userSucTextBox'
              : 'userTextBox'
          "
          @input="validateUsername"
          @focus="onFocus"
          @focusout="focusout"
          @keyup.enter="userAuthentication"
        />
      </div>

      <!-- ******* Next Button *******-->
      <div class="next">
        <div
          class="nextBtn bodyText"
          align="right"
          v-if="textboxValid == false"
          @click="userAuthentication"
        >
          NEXT
        </div>
        <!-- ******* Error Message *******-->
        <Alert
          v-if="textboxValid && username.length >= 4"
          :icon="'exclamation-triangle'"
          :alertMsg="'We were unable to find you!'"
          :alertsubMsg="'Please recheck your username.'"
          :accessID="'USLGN-UI-001'"
          :style="{ background: '#F39C12' }"
        />
      </div>
    </div>
    <Loader v-else />
  </section>
</template>
<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import Alert from "./USLGN-Alert";
import Loader from "./USLGN-Loader";
// import { library } from "@fortawesome/fontawesome-svg-core";
// import { faUser } from "@fortawesome/free-solid-svg-icons";
// library.add(faUser);
export default {
  components: {
    Alert,
    Loader,
  },
  setup() {
    //local variables
    const username = ref(null);
    const textboxValid = ref(null);
    const iconValid = ref(null);
    const loader = ref(null);
    //store variables
    const store = useStore();
    const changeServiceState = (serviceState) =>
      store.dispatch("changeServiceState", serviceState);
    const UpdateUserInfo = (Payload)=> store.dispatch("UpdateUserInfo",Payload);
      const UserInfo = computed(() => store.state.globalStore.UserInfo);
    const sendHTTPReq = (reqPacket) => store.dispatch("sendHTTPReq", reqPacket);
    // Username Validation
    function validateUsername() {
      if (username.value.length >= 4) {
        textboxValid.value = false;
        iconValid.value = false;
      } else if (username.value == null || username.value == "" ||username.value.length < 4) {
        iconValid.value = false;
        textboxValid.value = null;
      }
    }
    function onFocus(event) {
      if (username.value == null || username.value == "")
        iconValid.value = false;
    }
    function focusout(event) {
      if (username.value == null || username.value == "")
        iconValid.value = null;
    }
    const userAuthentication = async () => {
      if (textboxValid.value == false) {
        loader.value = true;
        var response_is_Expired = false;
        var userAuth = {
          Expiry: 20000,
          Type: "REQUEST",
          Request: {
            Module: "CURA",
            ServiceCode: "USLGN",
            API: "Authenticate_Username",
            User_Name: username.value,
          },
        };
        // to make response packet to expire
        setTimeout(() => {
          response_is_Expired = true;
        }, userAuth.Expiry);

        let res = await sendHTTPReq(userAuth);
        loader.value = false;

        // checking response packet expired or not
        if (response_is_Expired == false) {
          if (res.Type === "RESPONSE") {
            let userInfo = {
              ID_User: res.Response.ID_User,
              User_Name_First: res.Response.User_Name_First,
              User_Name_Last: res.Response.User_Name_Last,
              User_Group: res.Response.User_Group,
              User_Sex: res.Response.User_Sex,
              ...(res.Response.hasOwnProperty("Hash_Salt") && {
                Hash_Salt: res.Response.Hash_Salt,
              }),
              Institute_Info : UserInfo.value.Institute_Info,
            };
            console.log("This is USerinfo before commit :",UserInfo.value);
            console.log("This is response before commit :",res);
            UpdateUserInfo(userInfo);
            if (!res.Response.Flag_New_User) {
              if (res.Response.isExpired) {
                changeServiceState({
                  service: "USLGN",
                  status: "changePassword",
                });
              } else {
                changeServiceState({
                  service: "USLGN",
                  status: "password",
                });
              }
            } else {
              changeServiceState({
                service: "USLGN",
                status: "newPassword",
              });
            }
          } else {
            if (
              res.Type == "ERROR" &&
              res.Response.Error_Code === "API-USLGN-E002"
            ) {
              textboxValid.value = true;
              iconValid.value = true;
              console.log("Username Invalid");
            } else {
              console.log(
                "Global Eroor Occured Reponsible for Username Invalid"
              );
            }
          }
        } else {
          console.log("Response Packet is Expired - Please Request Again");
          res_is_Expired = true;
        }
      }
    };
    return {
      //variables
      username,
      textboxValid,
      iconValid,
      loader,
      //functions
      onFocus,
      focusout,
      userAuthentication,
      validateUsername,
    };
  },
};
</script>
