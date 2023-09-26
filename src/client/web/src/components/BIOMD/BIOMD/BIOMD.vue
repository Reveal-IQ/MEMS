<!-- 
************************************
Created By : Reveal Foundation  
Author     : Edward Opoku-Agyemang          
Date       : < DD-MON-YYYY >    
Version    : < #.#.# >   
Description: < Describe the application >          
************************************
-->

<template>
  <div v-if="compState === 'landing'" class="RevealContainer_dash">
    <div class="container">
      <!-- Welcome Variable Rendering with Mustatsh syntax. Variable is databinded -->
      <div class="row">
        <Landing v-if="compState === 'landing'" @update-page="updatePage" />
      </div>
    </div>
  </div>

  <div v-else class="RevealContainer">
    <div class="container">
      <div class="row">
        <div class="row">
          <div>
            <ASSET v-if="compState === 'assetInfo'" @update-page="updatePage" />
            <FACILITY
              v-else-if="compState === 'facilityInfo'"
              @update-page="updatePage"
            />
            <MODEL
              v-else-if="compState === 'departmentInfo'"
              @update-page="updatePage"
            />
            <VENDOR
              v-else-if="compState === 'vendorInfo'"
              @update-page="updatePage"
            />
            <MANUFACTURER
              v-else-if="compState === 'manufacturerInfo'"
              @update-page="updatePage"
            />
            <SuccessPage
              v-else="compState === 'success'"
              @update-page="updatePage"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { useStore } from "vuex"; // Access Vuew Store Variables and Methods
import { ref } from "vue"; // Based on the requirement import keywords

import ASSET from "../BIOMD/BIOMD-ASSET/ASSET.vue";
import FACILITY from "../BIOMD/BIOMD-FACILITY/FACILITY.vue";
import VENDOR from "../BIOMD/BIOMD-VENDOR/VENDOR.vue";
import MODEL from "../BIOMD/BIOMD-MODEL/MODEL.vue";
import MANUFACTURER from "../BIOMD/BIOMD-MANUFACTURER/MANUFACTURER.vue";
import Landing from "../BIOMD/BIOMD-UI/UI-Landing.vue";
import SuccessPage from "../BIOMD/BIOMD-UI/UI-SuccessPage.vue";

export default {
  components: {
    ASSET,
    FACILITY,
    VENDOR,
    MODEL,
    MANUFACTURER,
    Landing,
    SuccessPage,
  },
  name: "BIOMD",
  // Define Props here
  props: {},
  // Emit value can pass within this array
  emits: [],
  setup(props, { emit }) {
    const compState = ref("landing"); //asset, facility, model, manufacturer, vendor

    const updatePage = (page) => {
      compState.value = page;
    };

    return {
      // Return variables/Display Variables in HTML DOM
      compState,
      updatePage,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../GLOBAL/Styles/colors.scss";
@import "./Style/BIOMD.scss";
.RevealContainer {
  min-height: 100vh;
  max-height: 100vh;
  background-color: $InvisibleSilver;
  overflow: scroll;
}
.RevealContainer_dash {
  min-height: 100vh;
  max-height: 100vh;
  background-color: $White;
  overflow: scroll;
}
.RevealContainer::-webkit-scrollbar {
  display: none;
}
.RevealContainer_dash::-webkit-scrollbar {
  display: none;
}
</style>
