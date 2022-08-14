<!-- 
************************************
*  Created By : Reveal IQ          *
*  Author     : Sudheer            *
*  Date       : 01 SEP 2021        *
*  Version    : 0.1.0.01.17-0921   *
************************************
-->
<template>
  <div class="position-absolute top-50 start-50 translate-middle">
    <div class="d-flex flex-column align-items-center">
      <!-- Reveal Logo Image -->
      <div class="pb-5">
        <img src="../../../assets/media/DeepBlueLogo.svg"/>
      </div>
      <div class="p-3 headerText">
        Initialising your new Digital Health Instance
      </div>
      <div class="progress" style="height: 5px;  width: 450px; background-color: rgba(#C4C4C4, .25);">
        <div
          class="progress-bar"
          role="progressbar"
          :style="'width: ' + percent+'%;'"
          :aria-valuenow="percent"
          aria-valuemin="0"
          aria-valuemax="100">
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { ref, onMounted } from "vue";

export default {
  setup(){

    const percent = ref(0);

    onMounted(() => {
      setInterval(function() {
        if (percent.value < 100) {
            percent.value++;
         }
      }, 10);
    })

    return {
      percent
    }

  }
}
</script>

<style lang="scss" scoped>

</style>