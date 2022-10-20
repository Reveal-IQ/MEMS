<!-- 
************************************
*  Created By : Reveal IQ          *
*  Author     : Bharath Kumar      *
*  Date       : 20 MAY 2021        *
*  Version    : 0.5.4.00.07-0222   *
************************************
-->
<template>
	<div
		class="col-sm-12 d-flex align-self-start fw-bold NAVIG-section-text"
		style="min-height: 17px; max-height: 17px;"
	>
		All Apps
	</div>

	<!-- Error Block to show thew Error if there are No user services available -->
	<div
		class="col-sm-12 fw-light d-flex align-items-center justify-content-center"
		v-if="UserInfo.User_Services.length == 0"
	>
		<div class="row" style="width: 237px; height: 68px; color: #abebeb;">
			<div class="col-sm-12 d-flex justify-content-start NAVIG-app-text1">
				Application Not Found.
			</div>
			<div
				class="col-sm-12 d-flex justify-content-center NAVIG-app-text1 text-start my-1"
			>
				Check with your administrator for access or retry with a new criteria
			</div>
			<div
				class="col-sm-12 d-flex justify-content-end NAVIG-app-text3 fw-light ms-4"
			>
				NAVIG-UI-001
			</div>
		</div>
	</div>

	<!-- All Apps without Searching  -->
	<div
		class="col-sm-4 mx-3"
		v-if="menus"
		v-for="app in UserInfo.User_Services"
		:key="app.index"
		style="
			min-height: 30px;
			min-width: 107px;
			max-height: 30px;
			max-width: 107px;
		"
	>
		<div class="row gx-0">
			<div
				class="col-sm-2 d-flex align-items-center"
				@click="createTabReq(app)"
			>
				<div v-if="app.App_Icon != null" class="appIcon">
					<font-awesome-icon
						:icon="app.App_Icon"
						size="lg"
						style="height: 20px; width: 20px;"
					/>
				</div>
				<div v-else class="appIcon">
					<font-awesome-icon icon="exclamation-circle" size="lg" />
				</div>
			</div>
			<!-- Add "text-truncate" class incase of text overflow -->
			<div
				class="col-sm-9 NAVIG-app-text d-flex align-items-center"
				@click="createTabReq(app)"
				style="text-align: left; padding-left: 12px;"
			>
				{{ app.App_Name }}
			</div>
			<div class="col-sm-1 d-flex align-items-center"></div>
		</div>
	</div>

	<!-- All Apps with Searching  -->
	<div
		class="col-sm-4 mx-3"
		v-if="!menus && menuLists != 0"
		v-for="app in menuLists"
		:key="app.index"
		style="
			min-height: 30px;
			min-width: 107px;
			max-height: 30px;
			max-width: 107px;
		"
	>
		<div class="row gx-0">
			<div
				class="col-sm-2 d-flex align-items-center"
				@click="createTabReq(app)"
			>
				<div v-if="app.App_Icon != null" class="appIcon">
					<font-awesome-icon
						:icon="app.App_Icon"
						size="lg"
						style="height: 20px; width: 20px;"
					/>
				</div>
				<div v-else class="appIcon">
					<font-awesome-icon icon="exclamation-circle" size="lg" />
				</div>
			</div>
			<!-- Add "text-truncate" class incase of text overflow -->
			<div
				class="col-sm-9 NAVIG-app-text d-flex align-items-center"
				@click="createTabReq(app)"
				style="text-align: left; padding-left: 12px;"
			>
				{{ app.App_Name }}
			</div>
			<div class="col-sm-1 d-flex align-items-center"></div>
		</div>
	</div>
</template>
<script>
import { useStore } from "vuex";
import app from "../../../../main";
import { ref, computed, defineAsyncComponent, toRefs, watch } from "vue";
export default {
	props: {
		searchTerm: {
			type: String,
		},
	},
	emits: ["updateActiveApps"],
	setup(props, { emit }) {
		// store variables
		const store = useStore();
		const ActiveApp = computed(() => store.state.globalStore.ActiveApp);
		const UserInfo = computed(() => store.state.globalStore.UserInfo);
		const tablist = computed(() => store.state.globalStore.tablist);
		const tabidlist = computed(() => store.state.globalStore.tabidList);
		const addTabid = (tabid) => store.dispatch("addTabid", tabid);
		const createTab = (tabid) => store.dispatch("createTab", tabid);
		// local variables
		const menus = ref(true);
		const { searchTerm } = toRefs(props);
		const menuLists = ref("");

		// filtering the User Services
		function searchMenus() {
			menus.value = false;
			if (searchTerm.value != "") {
				var txt = [];
				for (let i = 0; i < UserInfo.value.User_Services.length; i++) {
					txt.push(UserInfo.value.User_Services[i]);
					menuLists.value = txt.filter(function (txt) {
						return (
							txt.App_Name.toString()
								.toLowerCase()
								.indexOf(searchTerm.value.toLowerCase()) >= 0
						);
					});
				}
			}
			if (searchTerm.value == "") {
				menus.value = true;
			}
		}

		// fetching the User services from the Server
		function createTabReq(tabval) {
			var tabid = "";
			var characters = "ABCDEF0123456789";
			var charactersLength = characters.length;
			for (var i = 0; i < 3; i++) {
				tabid += characters.charAt(
					Math.floor(Math.random() * charactersLength)
				);
			}
			var solution = tabidlist.value.find((ids) => ids == tabid);
			if (solution == undefined) {
				addTabid(tabid);
				let tab = {
					App_Name: tabval.App_Name,
					App_Code: tabval.Service_Code,
					App_Icon: tabval.App_Icon,
					TabCode: tabid,
				};
				createTab(tab);
				var service = tabval.App_Module;
				const AsyncComp = defineAsyncComponent({
					loader: () =>
						import(
							"./../../../../components/" +
								tabval.App_Module +
								"/" +
								tabval.Service_Code +
								"/" +
								tabval.Service_Code +
								".vue"
						),
				});
				app.component(`${tab.App_Code}${tab.TabCode}`, AsyncComp);
				emit("updateActiveApps");
			} else {
				createTabReq(tabval);
			}
		}

		// wachting the search Box Test to filter the All Apps according to that Text
		watch(searchTerm, () => {
			searchMenus();
		});

		return {
			// variables
			menus,
			searchTerm,
			menuLists,
			ActiveApp,
			UserInfo,
			tablist,
			// functions
			createTabReq,
		};
	},
};
</script>
<style lang="scss" scoped>
.NAVIG-section-text {
	font-size: 14px;
}
.NAVIG-app-text {
	font-size: 10px;
}
.NAVIG-app-text1 {
	font-size: 12px;
}
.NAVIG-app-text3 {
	font-size: 9px;
}
</style>
