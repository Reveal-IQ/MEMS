<!-- 
************************************
*  Created By : Reveal IQ          *
*  Author     : Bharathi           *
*  Date       : 24 FEB 2021        *
*  Version    : 0.6.8.00.03-0621   *
************************************
-->
<template>
  <!-- ********** Alert Messages **********-->
  <div class="d-flex smallText bd-highlight mb-3" :style="style">
    <div class="pt-2 pb-2 pl-3 pr-3 p-3 iconFont align-self-center text-light">
      <font-awesome-icon :icon="icon" size="1x" />
    </div>
    <div class="align-self-center text-light">
      <div>{{ alertMsg }}</div>
      <div>{{ alertsubMsg }}</div>
    </div>
    <div class="ms-auto mx-3 align-self-center text-light float-md-end">
      {{ accessID }}
    </div>
  </div>
</template>
<script>
// import { library } from "@fortawesome/fontawesome-svg-core";
// import {
//   faExclamationCircle,
//   faExclamationTriangle,
// } from "@fortawesome/free-solid-svg-icons";
// library.add(faExclamationCircle, faExclamationTriangle);
export default {
  props: {
    icon: null,
    alertMsg: null,
    alertsubMsg: null,
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
    let icon = props.icon;
    let alertMsg = props.alertMsg;
    let alertsubMsg = props.alertsubMsg;
    let accessID = props.accessID;
    let style = props.style;
    return {
      //props
      icon,
      alertMsg,
      alertsubMsg,
      accessID,
      style,
    };
  },
};
</script>
<style lang="scss" scoped>
.errmsgIcon {
  color: #ffffff;
}
.errMessage {
  color: #ffffff;
  font-weight: 450;
  vertical-align: middle;
  padding: 3px 0 0 15px;
}
.accessID {
  color: #ffffff;
  font-weight: 450;
  vertical-align: middle;
  padding: 3px 0 0 0px;
}
</style>