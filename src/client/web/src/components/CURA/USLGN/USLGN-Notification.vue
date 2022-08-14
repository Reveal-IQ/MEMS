<!-- 
************************************
*  Created By : Reveal IQ          *
*  Author     : Bharathi           *
*  Date       : 24 FEB 2021        *
*  Version    : 0.6.8.00.04-0621   *
************************************
-->
<template>
  <section>
    <div class="d-flex bd-highlight text-light" :style="style">
      <div class="p-2 bd-highlight iconFont align-self-center bodyText">
        <font-awesome-icon :icon="icon" size="1x" />
      </div>
      <div class="mr-auto p-2 bd-highlight align-self-center">
        <div>{{ notifyMsg }}</div>
      </div>
      <div class="p-2 bd-highlight smallText align-self-center">
        {{ accessID }}
      </div>
    </div>
    <div class="retrivingInfo"></div>
  </section>
</template>
<script>
import { computed } from "vue";
// import { library } from "@fortawesome/fontawesome-svg-core";
// import { faCheck } from "@fortawesome/free-solid-svg-icons";
// library.add(faCheck);
export default {
  props: {
    icon: null,
    notifyMsg: null,
    accessID: null,
    style: {
      default: {
        color: "#FFFFFF",
        margin: "20px 0 0 0",
        height: "auto",
        width: "100%",
      },
    },
  },
  setup(props) {
    //local variables
    const icon = props.icon;
    const notifyMsg = props.notifyMsg;
    const accessID = props.accessID;
    const style = props.style;
    computed(function notificationStyle() {
      return {
        ...this.style,
        color: "#FFFFFF",
        height: "auto",
        width: "100%",
        "font-weight": "500",
      };
    });
    return {
      icon,
      notifyMsg,
      accessID,
      style,
    };
  },
};
</script>
<style lang="scss">
</style>