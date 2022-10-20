<!-- 
************************************
*  Created By : Reveal IQ          *
*  Author     : Jyoti              *
*  Date       : 4/12/2022          *
*  Version    : 0.13.0             *
************************************
-->
<template>
  <div class="row">
    <!-- DashBoard Pages -->
    <div
      class="col-sm-12 d-flex justify-content-center mainPage"
      v-if="currentPage == 'dashBoard'"
    >
      <dashBoard :tabid="tabid" ref="dashBoard" @changePage="changePage" />
    </div>
    <!-- User Accounts Pages -->
    <div
      class="col-sm-12 d-flex justify-content-center mainPage"
      v-if="currentPage == 'userAccounts'"
    >
      <UserAccounts
        :tabid="tabid"
        ref="userAccounts"
        @connectDashboard="changePage"
        v-if="true"
      />
    </div>
    <!-- Site Information Pages -->
    <div class="col mainPage" v-if="currentPage == 'siteInformation'">
    </div>
    <!-- DataBase Pages -->
    <div class="col mainPage" v-if="currentPage == 'dataBase'">
    </div>
    <!-- UserInfo Page -->
    <div class="col mainPage" v-if="currentPage == 'userInfo'">
      <dashBoard ref="userInfo" @changePage="changePage" :tabid="tabid" />
    </div>
  </div>
</template>
<script>
import { ref, toRefs, provide,computed} from "vue";
import { useStore } from "vuex";
import dashBoard from "./ADPNL-dashBoard";
import UserAccounts from "./ADPNL-userAccounts";
import userInfo from "./ADPNL-userInfo.vue";
import AddUser from "./ADPNL-addUser.vue";
export default {
  components: {
    dashBoard,
    UserAccounts,
    userInfo,
    AddUser,
  },
  props: {
    tabid: {
      type: String,
    },
  },
  setup(props, context) {
    // store variables
		const store = useStore();
    const { tabid } = toRefs(props);
    const currentPage = ref("userInfo");
    const adminpanelState = computed(
			() => store.state.globalStore.appState.ADPNL[`${tabid.value}`]
		);
		const changeServiceState = (serviceState) =>
			store.dispatch("changeServiceState", serviceState);
		const sendSocketReq = (request) => {
			store.dispatch("sendSocketReq", request);
		};
		changeServiceState({
			service: "ADPNL",
			tabcode: tabid.value,
			status: "dashBoard",
		});
    function changePage(val) {
      currentPage.value = val;
    }
    return {
      currentPage,
      changePage,
      tabid,
      adminpanelState
    };
  },
};
</script>
<style lang="scss" scoped>
@import "./Style/ADPNL.scss";
@import "../../GLOBAL/Styles/font-style.scss";
</style>
