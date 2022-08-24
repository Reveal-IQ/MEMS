<template>
  <div class="mems">
    <div class="container">
      <div class="row">
        <div>
          <asset-info
            v-if="compState === 'assetInfo'"
            @update-page="updatePage"
          />
          <facility-info
            v-else-if="compState === 'facilityInfo'"
            @update-page="updatePage"
          />
          <model-info
            v-else-if="compState === 'modelInfo'"
            @update-page="updatePage"
          />
          <vendor-info
            v-else-if="compState === 'vendorInfo'"
            @update-page="updatePage"
          />
          <manufacturer-info
            v-else-if="compState === 'manufacturerInfo'"
            @update-page="updatePage"
          />
          <landing-page
            v-else="compState === 'landingPage'"
            @update-page="updatePage"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import assetInfo from "../BIOMD/BIOMD-ASSET/ASSET.vue";
import facilityInfo from "../BIOMD/BIOMD-FACILITY/FACILITY.vue";
import vendorInfo from "../BIOMD/BIOMD-VENDOR/VENDOR.vue";
import modelInfo from "../BIOMD/BIOMD-MODEL/MODEL.vue";
import manufacturerInfo from "../BIOMD/BIOMD-MANUFACTURER/MANUFACTURER.vue";
import landingPage from "../BIOMD/BIOMD-Landing.vue";
import { ref } from "vue";

const compState = ref("landingPage"); //asset, facility, model, manufacturer, vendor

const updatePage = (page) => {
  compState.value = page;
};
</script>

<style lang="scss" scoped>
@import "../../GLOBAL/Styles/font-style.scss";
/* @import "./Style/BIOMD.scss"; */
.mems {
  background-color: hsl(0, 0%, 96%);
}
</style>
