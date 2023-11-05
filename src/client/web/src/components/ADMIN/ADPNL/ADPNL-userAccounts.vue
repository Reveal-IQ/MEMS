<!-- 
************************************
*  Created By : Reveal IQ          *
*  Author     : Jyoti              *
*  Date       : 10 Feb 2022        *
*  Version    : 0.13.0.01.02-0422  *
************************************
-->
<template>
  <section>
    <!--  User Accounts Page -->
    <div class="userAccountsPage">
      <div
        v-if="currentPage == 'userAccounts'"
        class="row first_row d-flex align-self-end justify-content-center"
      >
        <div class="col-sm-12 col-md-11">
          <div class="row">
            <div
              class="col-sm-6 col-md-6 col-lg-8 d-flex flex-column align-self-center justify-content-center"
            >
              <div class="ADPNL-headerText userAccountsTitleText">
                User Accounts
              </div>
              <div class="bodyText addUserText">
                Manage user accounts and access previlages
              </div>
            </div>
            <!-- Add User Option -->
            <div
              class="col-sm-2 col-md-3 col-lg-2 d-flex flex-row align-self-center justify-content-end"
            >
              <font-awesome-icon
                icon="user-circle"
                class="userIcon IconFont"
                size="1x"
                @click="addUserPage = true"
              />
              <div
                class="addUserOption bodyText"
                ref="AddUser"
                @click="navigateAddUser('AddUser')"
              >
                Add User
              </div>
            </div>

            <!-- Dashboard -->
            <div class="col-sm-3 col-md-3 col-lg-2 d-flex align-self-center justify-content-end">
              <div
                class="row dashboardButton d-flex align-items-center justify-content-center text-light"
                style="max-height: 25px"
              >
                <div class="col-sm-2">
                  <font-awesome-icon
                    icon="align-left"
                    class="align-self-center"
                    style="width: 15px; height: 15px"
                  />
                </div>
                <div
                  class="col-sm-10 ADPNL-subtitleText"
                  @click="navigDashoard('dashBoard')"
                  ref="dashboard"
                >
                  Dashboard
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Search Filtere-->
        <div class="col-sm-12 col-md-11">
          <div
            class="row mx-0 second_row d-flex align-self-center justify-content-start"
          >
            <div
              class="col-sm-6 d-flex align-self-center justify-content-start userActFilters"
            >
              <!-- Input for Username -->
              <div class="row schUser">
                <div
                  class="col-sm-1 d-flex align-self-center justify-content-center"
                >
                  <font-awesome-icon
                    icon="search"
                    class="searchIcon IconFont"
                    size="1x"
                  />
                </div>
                <div
                  class="col-sm-11 d-flex align-self-center justify-content-start"
                >
                  <input
                    type="text"
                    class="largeText schUserInput"
                    ref="search"
                    v-model="searchVal"
                    @input="setdata('search')"
                    autocomplete="off"
                    placeholder="Search username"
                  />
                </div>
              </div>
            </div>
            <div class="col-sm-5 bg-danger d-flex align-self-center"></div>
          </div>
        </div>

        <!-- User List Display Table -->
        <div class="col-sm-12 col-md-11">
          <div class="row">
            <div
              class="row third_row d-flex align-self-center justify-content-center"
            >
              <div class="d-flex flex-column bg-warnig userListBox bodyText">
                <table class="table table-borderless table-hover">
                  <thead class="userListTableHead">
                    <tr>
                      <th scope="col-2" class="userHeading">Name</th>
                      <th scope="col-2" class="userHeading">Username</th>
                      <th scope="col-2" class="userHeading">Phone Number</th>                    
                      <th scope="col-2" class="userHeading">Sex</th>                        
                      <th scope="col-2" class="userHeading">Status</th>
                    </tr>
                  </thead>
                  <tbody v-if="userlists" class="userListtbody">
                    <tr v-for="(user, index) in userlists" :key="index" @click="navigUserList(user)">
                     
                      <td                        
                        class="align-middle text-capitalize userDetail"
                      >
                        {{ user.User_First_Name.toLowerCase() }}
                        {{ user.User_Last_Name.toLowerCase() }}
                      </td>
                      <td
                        class="align-middle userDetail"
                      >
                        {{ user.User_Name }}
                      </td>
                      <td class="align-middle userDetail">
                       {{ user.Contact_Phone_Number}}
                      </td>
                      <td class="align-middle userDetail">
                       {{ user.User_Sex}}
                      </td>
                      
                      <td class="align-middle">
                        <span
                          :class="
                            user.User_Status.toUpperCase() == 'ACTIVE'
                              ? 'activeUA'
                              : 'inactiveUA'
                          "
                          >{{ user.User_Status.toUpperCase() }}</span>
                      </td>
                    </tr>
                  </tbody>
                  <tbody v-else class="userListtbody">
                    <!-- <tr @click="editUser(user)" v-for="(user,index) in userlists" :key="user.index">
                    <tr v-for="user in [1, 2, 3, 4, 5, 6]" :key="user.key">
                      <th
                        scope="row"
                        class="d-flex justify-content-center userDetailLoading"
                      ></th>
                    </tr> -->
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Add user page -->
      <div v-if="currentPage == 'AddUser'">
        <AddUser
          :tabid="tabid"
          @changePage="currentPage"
          @connectDashboard="navigDashoard"
        />
      </div>

      <!-- Dash Board user page -->
      <div v-if="currentPage == 'dashBoard'">
        <dashBoard
          :tabid="tabid"
          @changePage="navigDashoard"
          @connectDashboard="navigDashoard"
        />
      </div>

       <!-- User List page   -->
      <div >
        <UserList v-if="currentPage == 'userList'"
          :tabid="tabid"
          :ID_User="ID_User"
          @navigateUserAccount="toggleUserAccount"
          @connectDashboard="navigDashoard"
        />
      </div>
    </div>
  </section>
</template>
<script>
// import { mapState } from "vuex";
import { useStore } from "vuex";
// import selectList from "../../GLOBAL/SelectList";
import dashBoard from "./ADPNL-dashBoard.vue";
import AddUser from "./ADPNL-addUser.vue";
import GBTBL from "../../GLOBAL/GLOBL-Table.vue";
import UserList from "./ADPNL-userList.vue"
import { ref, toRefs, computed } from "@vue/reactivity";
export default {
  name: "userAccount",
  components: {
    dashBoard,
    // selectList,
    AddUser,
    GBTBL,
    UserList,
  },
  props: {
    tabid: {
      type: String,
    },
  },
  emit: ["connectDashboard"],
  setup(props, { emit }) {
    // props from parent
    const { tabid } = toRefs(props);
    const store = useStore();
    const changeServiceState = (serviceState) =>
      store.dispatch("changeServiceState", serviceState);
    const adminpanelState = computed(
      () => store.state.globalStore.appState.ADPNL[`${tabid.value}`]
    );
    const sendSocketReq = (request) => {
      store.dispatch("sendSocketReq", request);
    };
 
    const deleteUser = ref(null);
    const userlists = ref([]);
    const userSearch = ref("");
    const serviceLists = ref([]);
    const usersetData = ref(null);
    const USRID = ref(null);
    const Style = ref({
      color: "#2980B9",
      background: "0",
      border: "0",
      "font-weight": 700,
      "text-align": "left",
    });
    const statusList = ref([
      { listName: "ALL" },
      { listName: "ACTIVE" },
      { listName: "INACTIVE" },
    ]);

    const departmentList = ref([
      { listName: "ALL" },
      { listName: "CARDIOLOGY" },
      { listName: "NURSING" },
      { listName: "RADIOLOGY" },
    ]);

    const currentPage = ref("userAccounts");
    // const currentPage = ref("userList");
    const searchVal = ref(null);
    const searchInfo = ref([]);
    const status = ref("Active");
    const department = ref("All");
    const ID_User = ref('');
    // Global Table Variables
    const Cdata = ref();
    const Tdata = ref();
    const tableData = ref(null);

    function navigateAddUser(payload) {
      currentPage.value = payload;
      changeServiceState({
        service: "ADPNL",
        tabcode: tabid.value,
        status: "UserInfo",
      });
    }

    function navigDashoard(val) {
      currentPage.value = val;
    }
    
    function navigUserList(payload){   
      let temp = [];
      temp.value=payload;    
      ID_User.value = temp.value.ID_User; 
      currentPage.value = 'userList';      
    }

    function toggleUserAccount(){
      currentPage.value = 'userAccounts'
    }

    // On click on User in Table take to Edit User Page
    function editUser(user) {
      // currentPage.value = "editUser";
      // setTimeout(() => {
      //   $refs.edit.value.getUserInfo(user.ID_User);
      // }, 10);
    }


    // Intitaite Search
    function searchTimeOut() {
     searchInfo.value=[];
     setTimeout(() => {
      getuserList();
      }, 500);
    }

    // To filter and add search data
    function setdata(refName) {
      let temp = {};
      let fieldName = null;
      if (refName == "search") {
        temp = { Search: searchVal.value };
        fieldName = "Search";
      } else if (refName == "sta") {
        status.value = $refs[refName].value.field;
        temp = { Status: status.value };
        fieldName = "Status";
      } 
      if (Array.isArray(searchInfo.value) && searchInfo.value.length) {
        searchInfo.value = searchInfo.value.filter(
          (ele) => Object.keys(ele) != fieldName
        );
        searchInfo.value.push(temp);
        searchTimeOut();
      } else {
        searchInfo.value.push(temp);
        searchTimeOut();
      }
    }

    function getuserList() {
      
      // Latest code
       sendSocketReq({
        data: {
          Expiry: 20000,
          Type: "REQUEST",
          Request: {
            ServiceCode: "ADPNL",
            API: "User_Search",
            User_List: "TRUE",
            Max_List: 20, 
            Page: "1",
          },
        },
        callback: (res) => {
          if (res.Type === "RESPONSE") {
            userlists.value=res.Response.User_List;
          } else if (res.Type === "ERROR") {
            	// Error response received during fetching
          }
        },
      });


    }
     getuserList();

    function defaultSearch() {
      getuserList();
    }

    created: {
      setTimeout(() => {
        defaultSearch();
      }, 500);
    }

    return {
      // Local Variables
      tabid,
      ID_User,
      deleteUser,
      userlists,
      userSearch,
      serviceLists,
      usersetData,
      USRID,
      statusList,
      departmentList,
      currentPage,
      searchVal,
      searchInfo,
      status,
      department,
      // Globa Table
      Cdata,
      Tdata,
      // Local Functions
      editUser,
      searchTimeOut,
      getuserList,
      setdata,
      defaultSearch,
      navigateAddUser,
      navigDashoard,
      navigUserList,
      toggleUserAccount
    };
  },
};
</script>
<style lang="scss" scoped>
// @import "./Style/ADPNL.scss";
@import "../../GLOBAL/Styles/font-style.scss";
.ADPNL-headerText {
  font-size: 24px;
}
.userAccountsPage {
  color: black;
  min-height: 100vh !important;
  max-height: 100vh !important;
}
.first_row {
  margin-top: 60px !important;
}
.dashboardButton {
  background: #54626f;
  border-radius: 20px;
}
.userAccountsTitleText {
  color: rgba(0, 0, 0, 1);
  font-weight: bold;
  opacity: 0.6;
}
button:focus {
  outline: none;
}
.dropDown {
  display: inline-block;
}
.addUserOption {
  color: #2980b9;
  padding: 0 20px 0 10px;
  cursor: pointer;
}
.second_row {
  margin-top: 92px;
}
.schUser {
  width: 500px;
  height: 50px;
  background: #ffffff;
  border: 2px solid #54626f;
  border-radius: 25px;
}
.schUserInput {
  outline: none;
  border: 1pt solid #ffffff;
  width: 350px;
}
.searchIcon {
  font-size: 25px;
  color: #54626f;
}
.userIcon {
  color: #10607b;
  cursor: pointer;
}
input.mediumFont::-webkit-input-placeholder {
  color: #bdc3c7;
}
.third_row {
  margin-top: 59px !important;
}
.userListPic {
  width: 50px;
  height: 50px;
}
.userListHead {
  color: #90a4ae;
  border-bottom: 1px solid #90a4ae;
}
.userListHeading {
  width: fit-content;
  //margin: 20px 0 10px 0;
}
.userListTableHead {
  color: #90a4ae;
  // padding: 20px 0 25px 0;
  border-bottom: 1px solid #90a4ae;
}

.userDetail {
  min-width: fit-content;
}
.resetBtnUA {
  color: #ffffff;
  background: #607d8b;
  border-radius: 20px;
  padding: 5px 20px 5px 20px;
  cursor: pointer;
}
.activeUA {
  color: #ffffff;
  background: #27ae60;
  border-radius: 20px;
  padding: 5px 20px 5px 20px;
}
.inactiveUA {
  color: #ffffff;
  background: #90a4ae;
  border-radius: 20px;
  padding: 5px 20px 5px 20px;
}
th{
  margin-bottom: 33px!important;
}
tr{
  margin-top: 55px !important;
  overflow:scroll;
}

.userDetailLoading {
  width: 100%;
  height: 50px;
  margin: 10px 0 10px 0;
  color: rgba(112, 112, 112, 0);
  background-color: rgba(112, 112, 112, 1);
  animation: opacity 1s infinite;
  @keyframes opacity {
    0%,
    100% {
      opacity: 0.15;
    }
    50% {
      opacity: 0.3;
    }
  }
}
</style>
