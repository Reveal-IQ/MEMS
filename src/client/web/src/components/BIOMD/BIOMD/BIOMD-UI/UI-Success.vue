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
  <div class="RevealContainer">
    <div class="container">
      <!-- Welcome Variable Rendering with Mustatsh syntax. Variable is databinded -->
      <div class="row">
          <div class="Success">
            <div class="Title">
              Success!
            </div>
            <div class="SubTitle">
              We were able to successfully store the record in the database.
            </div>
            <div>
              <button type="button" class="btn btn-light col-sm-2">Dashboard</button>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { useStore } from "vuex"; // Access Vuew Store Variables and Methods
import { ref } from "vue"; // Based on the requirement import keywords

export default {
  components: {
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
@import "../../../GLOBAL/Styles/colors.scss";

.RevealContainer {
  min-height: 100vh;
  max-height: 100vh;
  overflow-y: scroll;
  background-color: $InvisibleSilver;
}

.Success {

  text-align: center;
  margin: 10px;
}

.Success .Title {

  color: #2F9946;
  font-size: 80px;

}

.Success .SubTitle {

  color: #000000;
  font-size: 14px;
  margin: 10px;
}
</style>
