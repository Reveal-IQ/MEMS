<!-- 
************************************
*  Created By : Reveal IQ          *
*  Author     : Bharath Kumar      *
*  Date       : 20 MAY 2021        *
*  Version    : 0.5.4.00.08-0222   *
************************************
-->
<template>
  <div
    class="row d-flex NAVIG-backgroundColor px-2 d-flex align-items-center justify-content-center gx-0 nav-container"
    style="height: 63.41px"
  >
    <!-- REVEAL Logo and the Version Block -->
    <div
      class="col"
      style="max-height: 30px; max-width: 100px; margin-right: 51px"
    >
      <div class="row gy-2">
        <div class="col-sm-12 bodyText" style="height: 10.5px; width: 98px">
          <img src="../../../../assets/media/Reveal-Logo-White.svg" />
        </div>
        <div class="col-sm-12 versionLittle Typography-03">{{ version }}</div>
      </div>
    </div>
    <!-- Search Box Block -->
    <div
      class="col d-flex align-items-center justify-content-center"
      style="margin-right: 40px"
    >
      <div
        class="row"
        :class="searchBoxFocus ? 'searchBoxBorderBlue' : 'searchBoxBorderWhite'"
        style="
          max-height: 30px;
          max-width: 300px;
          min-height: 30px;
          min-width: 300px;
        "
      >
        <div class="col-sm-1 d-flex align-items-center justify-content-center">
          <font-awesome-icon
            icon="search"
            size="1x"
            class="ms-1"
            style="height: 15px; width: 15px"
          />
        </div>
        <div class="col-sm-10">
          <div class="dropdown">
            <input
              type="text"
              class="my-1 dropdown-toggle"
              placeholder="Search Patient Service"
              id="AppLauncher"
              ref="AppLauncher"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              @focus="searchBoxFocus = true"
              @blur="searchBoxFocus = false"
              v-model="searchingTerm"
              data-bs-offset="-40,30"
            />
            <ul
              class="dropdown-menu text-light appLauncherOverlay"
              aria-labelledby="AppLauncher"
              @click.stop
            >
              <div class="text-center text-light px-3">
                <div class="row m-3" style="min-width: 460px; max-width: 460px">
                  <div class="col-sm-12 p-0">
                    <div class="row" style="max-height: 105px">
                      <div
                        class="col-sm-12 mx-2 d-flex align-self-start NAVIG-header-text"
                      >
                        Patient Services
                      </div>
                      <div class="col-sm-12">
                        <img
                          src="./../../../../assets/media/NAVIG-ActiveApp.svg"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    class="col-sm-12 mt-5"
                    v-if="tablist.length != 0"
                    style="
                      max-height: 130px;
                      min-height: 130px;
                      overflow: hidden;
                    "
                    @vnode-mounted=""
                  >
                    <div class="row gy-4 gx-0">
                      <ActiveApp
                        :searchTerm="searchingTerm"
                        ref="activeAppsCompRef"
                      />
                    </div>
                  </div>
                  <div
                    class="col-sm-12 mt-5"
                    v-if="UserInfo.User_Services.length > 0"
                    style="
                      max-height: 130px;
                      min-height: 130px;
                      overflow: hidden;
                    "
                  >
                    <div class="row gy-4 gx-0">
                      <AllApps
                        :searchTerm="searchingTerm"
                        @updateActiveApps="updateActiveAppSection"
                      />
                    </div>
                  </div>
                  <div
                    class="col-sm-12 mt-5"
                    v-if="UserInfo.User_Services.length == 0"
                    style="
                      max-height: 130px;
                      min-height: 130px;
                      overflow: hidden;
                    "
                  >
                    <div class="row gy-4 gx-0">
                      <div
                        class="col-sm-12 fw-light d-flex align-items-center justify-content-center"
                      >
                        <div
                          class="row"
                          style="width: 290px; height: 68px; color: #ffffff"
                        >
                          <div
                            class="col-sm-12 d-flex justify-content-start NAVIG-section-text"
                          >
                            Application Not Found.
                          </div>
                          <div
                            class="col-sm-12 d-flex justify-content-center NAVIG-section-text text-start mt-3"
                          >
                            Check with your administrator for access or retry
                            with a new criteria
                          </div>
                          <div
                            class="col-sm-12 d-flex justify-content-end NAVIG-app-text3 fw-light my-1"
                          >
                            NAVIG-UI-001
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- Active Service Name Block 1 -->
    <div
      class="col d-flex align-items-center justify-content-start Typography-01 fw-bold d-md-none d-lg-block"
      style="max-width: 244px; min-width: 244px; margin-right: 20px"
      v-if="tablist.length != 0"
    >
      {{ ActiveApp.App_Name }}
    </div>
    <!-- Active Service Name Block 2 "to preserve the UI" -->
    <div
      class="col d-flex align-items-center justify-content-start Typography-01 fw-bold d-md-none d-lg-block"
      style="max-width: 244px; min-width: 244px; margin-right: 20px"
      v-else
    ></div>
    <!-- Find Patient and the Bell Icon -->
    <div
      class="col d-flex align-items-center justify-content-center"
      style="margin-right: 20px"
    >
      <div class="row gx-0">
        <div
          class="col-sm-9 fw-light Typography-02"
          style="height: 18px; width: 74px; margin-right: 20px"
        >
          Find Patient
        </div>
        <div class="col-sm-1">
          <font-awesome-icon
            icon="bell"
            size="1x"
            class=""
            style="height: 18px; width: 20px"
          />
        </div>
      </div>
    </div>
    <!-- User Profile Dropdown -->
    <div
      class="col d-flex align-items-center justify-content-center Typography-01 m-2"
      style="max-height: 42px; max-width: 65px"
    >
      <UserProfile />
    </div>
  </div>
</template>
<script>
import { useStore } from "vuex";
import * as bootstrap from "bootstrap";
import { computed, ref } from "vue";
import UserProfile from "./NAVIG-UserProfile.vue";
import ActiveApp from "./NAVIG-ActiveApp.vue";
import AllApps from "./NAVIG-AllApps.vue";

export default {
  components: {
    UserProfile,
    ActiveApp,
    AllApps,
  },
  setup() {
    // local variables
    const dropdownList = ref(null);

    // useful if the user focused on search Box
    const searchBoxFocus = ref(false);

    // It represents the user entered search term in the Search box
    const searchingTerm = ref("");

    const activeAppsCompRef = ref(null);

    const version = ref(null);

    // store variables
    const store = useStore();
    const ActiveApp = computed(() => store.state.globalStore.ActiveApp);
    const UserInfo = computed(() => store.state.globalStore.UserInfo);
    const tablist = computed(() => store.state.globalStore.tablist);

    // Get Version
    const initUSLGN = async () => {
      var instinit = {
        Expiry: 20000,
        Type: "REQUEST",
        Request: {
          Module: "CURA",
          ServiceCode: "USLGN",
          API: "Init_USLGN",
        },
      };
      let res = await store.dispatch("sendHTTPReq", instinit);
      if (res.Type === "RESPONSE") {
        version.value = res.Response.App_Version;
      } else {
        console.log("Unable to receive the version");
      }
    };
    initUSLGN();

    // If the User Opened New App in the 'APPWN' we need to update the Active Apps section
    function updateActiveAppSection() {
      if (tablist.value.length == 0) {
        activeAppsCompRef.value.searchActiveApps();
      }
    }

    return {
      // Store variables
      ActiveApp,
      UserInfo,
      tablist,
      //local variables
      dropdownList,
      searchBoxFocus,
      searchingTerm,
      activeAppsCompRef,
      version,
      // localFunctions
      updateActiveAppSection,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "./../../../../scss/NAVIG.scss";
// @import "./style/NAVIG.scss";
.appLauncherOverlay {
  position: fixed;
  height: 460px;
  max-width: 500px !important;
  min-width: 500px !important;
  background-color: #54626f !important;
  border: 3px solid #37a3ea !important;
  z-index: 1001;
  cursor: default;
  border-radius: 15px !important;
  max-height: 460px !important;
  min-height: 460px !important;
}

.nav-container {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  z-index: 1000;
}

div {
  cursor: default;
}
input {
  background-color: #54626f;
  color: #ffffff;
  border: none !important;
  font-size: 12px;
  align-self: flex-start;
}
input[type="text"]:focus,
.uneditable-input:focus {
  outline: none !important;
  box-shadow: none !important;
  text-align: start;
}
input::-webkit-input-placeholder {
  color: white;
}

input:-moz-placeholder {
  color: white;
}
.searchBoxBorderWhite {
  border: 1.5px solid #ffffff !important;
  border-radius: 15px !important;
}
.searchBoxBorderBlue {
  border: 1.5px solid #37a3ea !important;
  border-radius: 15px !important;
}
.NAVIG-backgroundColor {
  background: #54626f;
  color: #ffffff;
}
.Typography-01 {
  font-size: 14px;
}
.Typography-02 {
  font-size: 12px;
}
.Typography-03 {
  font-size: 8px;
}
</style>
