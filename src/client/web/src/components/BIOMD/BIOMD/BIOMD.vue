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
  <div v-if="compState === 'dashboard'" class="RevealContainer_dash">
    <div class="container">
      <!-- Welcome Variable Rendering with Mustatsh syntax. Variable is databinded -->
      <div class="row">
        <DASHBOARD @update-page="updatePage" />
      </div>
    </div>
  </div>

  <div v-if="compState === 'dashboardModel'" class="RevealContainer_dash">
    <div class="container">
      <!-- Welcome Variable Rendering with Mustatsh syntax. Variable is databinded -->
      <div class="row">
        <DASHBOARDModel
          @update-page="updatePage"
          :modelName="pageProps.modelName"
          :manufacturerID="pageProps.manufacturerID"
          :commonName="pageProps.commonName"
          :modelID="pageProps.modelID"
          :manufacturerName="pageProps.manufacturerName"
        />
      </div>
    </div>
  </div>

  <div v-if="compState === 'dashboardAssetDetail'" class="RevealContainer_dash">
    <div class="container">
      <!-- Welcome Variable Rendering with Mustatsh syntax. Variable is databinded -->
      <div class="row">
        <DASHBOARDAssetDetail
          @update-page="updatePage"
          :assetCode="pageProps.assetCode"
          :status="pageProps.status"
          :modelName="pageProps.modelName"
          :parentAssetID="pageProps.parentAssetID"
        />
      </div>
    </div>
  </div>
  <div
    v-if="compState === 'dashboardManufacturerProfile'"
    class="RevealContainer_dash"
  >
    <div class="container">
      <!-- Welcome Variable Rendering with Mustatsh syntax. Variable is databinded -->
      <div class="row">
        <DASHBOARDManufacturerProfile
          @update-page="updatePage"
          :manufacturerName="pageProps.manufacturerName"
          :manufacturer="pageProps.manufacturer"
          :manufacturerID="pageProps.manufacturerID"
          :vendorName="pageProps.vendorName"
          :vendorID="pageProps.vendorID"
        />
      </div>
    </div>
  </div>
  <div v-if="compState === 'reportsPage'" class="RevealContainer_dash">
    <div class="container">
      <!-- Welcome Variable Rendering with Mustatsh syntax. Variable is databinded -->
      <div class="row">
        <REPORTS @update-page="updatePage" />
      </div>
    </div>
  </div>
  <div v-if="compState === 'reportsList'" class="RevealContainer_dash">
    <div class="container">
      <!-- Welcome Variable Rendering with Mustatsh syntax. Variable is databinded -->
      <div class="row">
        <REPORTSList
          @update-page="updatePage"
          :facilityName="pageProps.facilityName"
          :facilityID="pageProps.facilityID"
        />
      </div>
    </div>
  </div>
  <div v-if="compState === 'reportsSummary1'" class="RevealContainer_dash">
    <div class="container">
      <!-- Welcome Variable Rendering with Mustatsh syntax. Variable is databinded -->
      <div class="row">
        <REPORTSSummary1
          @update-page="updatePage"
          :facilityName="pageProps.facilityName"
          :facilityID="pageProps.facilityID"
        />
      </div>
    </div>
  </div>
  <div v-if="compState === 'reportsSummary2'" class="RevealContainer_dash">
    <div class="container">
      <!-- Welcome Variable Rendering with Mustatsh syntax. Variable is databinded -->
      <div class="row">
        <REPORTSSummary2
          @update-page="updatePage"
          :facilityName="pageProps.facilityName"
          :facilityID="pageProps.facilityID"
        />
      </div>
    </div>
  </div>
  <div v-if="compState === 'functionalityIndex'" class="RevealContainer_dash">
    <div class="container">
      <!-- Welcome Variable Rendering with Mustatsh syntax. Variable is databinded -->
      <div class="row">
        <REPORTSFunctionality
          @update-page="updatePage"
          :facilityName="pageProps.facilityName"
          :facilityID="pageProps.facilityID"
        />
      </div>
    </div>
  </div>
  <div v-if="compState === 'annualInflow'" class="RevealContainer_dash">
    <div class="container">
      <!-- Welcome Variable Rendering with Mustatsh syntax. Variable is databinded -->
      <div class="row">
        <REPORTSAnnualInflow
          @update-page="updatePage"
          :facilityName="pageProps.facilityName"
          :facilityID="pageProps.facilityID"
        />
      </div>
    </div>
  </div>

  <div v-if="compState === 'siteDescription'" class="RevealContainer_dash">
    <div class="container">
      <!-- Welcome Variable Rendering with Mustatsh syntax. Variable is databinded -->
      <div class="row">
        <FACILITYSiteDescription @update-page="updatePage" />
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
import FACILITYSiteDescription from "../BIOMD/BIOMD-FACILITY/FACILITY-SiteDescription.vue";
import VENDOR from "../BIOMD/BIOMD-VENDOR/VENDOR.vue";
import MODEL from "../BIOMD/BIOMD-MODEL/MODEL.vue";
import MANUFACTURER from "../BIOMD/BIOMD-MANUFACTURER/MANUFACTURER.vue";
import DASHBOARD from "../BIOMD/BIOMD-DASHBOARD/DASHBOARD.vue";
import REPORTS from "../BIOMD/BIOMD-REPORTS/REPORTS.vue";
import REPORTSList from "../BIOMD/BIOMD-REPORTS/REPORTS-List.vue";
import REPORTSSummary1 from "../BIOMD/BIOMD-REPORTS/REPORTS-Summary1.vue";
import REPORTSSummary2 from "../BIOMD/BIOMD-REPORTS/REPORTS-Summary2.vue";
import REPORTSFunctionality from "../BIOMD/BIOMD-REPORTS/REPORTS-Functionality.vue";
import REPORTSAnnualInflow from "../BIOMD/BIOMD-REPORTS/REPORTS-AnnualInflow.vue";
import Landing from "../BIOMD/BIOMD-UI/UI-Landing.vue";
import SuccessPage from "../BIOMD/BIOMD-UI/UI-SuccessPage.vue";
import DASHBOARDModel from "./BIOMD-DASHBOARD/DASHBOARD-Model.vue";
import DASHBOARDAssetDetail from "./BIOMD-DASHBOARD/DASHBOARD-AssetDetail.vue";
import DASHBOARDManufacturerProfile from "./BIOMD-DASHBOARD/DASHBOARD-ManufacturerProfile.vue";

export default {
  components: {
    ASSET,
    FACILITY,
    FACILITYSiteDescription,
    VENDOR,
    MODEL,
    MANUFACTURER,
    DASHBOARD,
    REPORTS,
    REPORTSList,
    REPORTSSummary1,
    REPORTSSummary2,
    REPORTSFunctionality,
    REPORTSAnnualInflow,
    Landing,
    SuccessPage,
    DASHBOARDModel,
    DASHBOARDAssetDetail,
    DASHBOARDManufacturerProfile,
  },
  name: "BIOMD",
  // Define Props here
  props: {},
  // Emit value can pass within this array
  emits: [],
  setup(props, { emit }) {
    const compState = ref("dashboard"); //asset, facility, model, manufacturer, vendor
    const pageProps = ref("init");

    const updatePage = (page, props) => {
      compState.value = page;
      pageProps.value = props;
    };

    return {
      // Return variables/Display Variables in HTML DOM
      compState,
      updatePage,
      pageProps,
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
