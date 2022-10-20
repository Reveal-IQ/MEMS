<!-- 
************************************
*  Created By : Reveal IQ          *
*  Author     : Bharath Kumar      *
*  Date       : 20 MAY 2021        *
*  Version    : 0.5.4.00.04-0222   *
************************************
-->
<template>
	<div
		class="col-sm-12 d-flex align-self-start fw-bold NAVIG-section-text"
		style="min-height: 17px; max-height: 17px;"
	>
		Active Apps
	</div>

	<!-- All the Active Apps Block -->
	<div
		class="col-sm-4 mx-3"
		v-if="searchingNow == false"
		v-for="app in tablist"
		:key="app.key"
		@click="openApp(app)"
		style="
			min-height: 30px;
			min-width: 107px;
			max-height: 30px;
			max-width: 107px;
		"
	>
		<div class="row gx-0">
			<div class="col-sm-2 d-flex align-items-center">
				<font-awesome-icon
					:icon="app.App_Icon"
					size="lg"
					style="height: 20px; width: 20px;"
				/>
			</div>
			<div
				class="col-sm-9 NAVIG-app-text"
				style="text-align: left; padding-left: 12px;"
			>
				{{ app.App_Name }}
				<span class="fw-light NAVIG-app-text2" style="opacity: 0.5;"
					>Tab ID: {{ app.TabCode }}</span
				>
			</div>
			<div class="col-sm-1 d-flex align-items-center" @click.stop>
				<font-awesome-icon
					icon="times"
					@click="closeApp(app)"
					style="height: 16px; width: 16px; opacity: 0.8;"
					data-toggle="tooltip"
					data-placement="top"
					:title="'Close the ' + `${app.App_Name}`"
				/>
			</div>
		</div>
	</div>

	<!-- Filtered Active Apps Block -->
	<div
		class="col-sm-4 mx-3"
		v-if="searchingNow == true && tablist.length != 0"
		v-for="app in filtered_ActiveApps"
		:key="app.key"
		@click="open_filtered_active_app(app)"
		style="
			min-height: 30px;
			min-width: 107px;
			max-height: 30px;
			max-width: 107px;
		"
	>
		<div class="row gx-0">
			<div class="col-sm-2 d-flex align-items-center">
				<font-awesome-icon
					:icon="app.App_Icon"
					size="lg"
					style="height: 20px; width: 20px;"
				/>
			</div>
			<div
				class="col-sm-9 NAVIG-app-text"
				style="text-align: left; padding-left: 12px;"
			>
				{{ app.App_Name }}
				<span class="fw-light NAVIG-app-text2" style="opacity: 0.5;"
					>Tab ID: {{ app.TabCode }}</span
				>
			</div>
			<div class="col-sm-1 d-flex align-items-center" @click.stop>
				<font-awesome-icon
					icon="times"
					@click="close_filtered_active_app(app)"
					style="height: 16px; width: 16px; opacity: 0.8;"
					data-toggle="tooltip"
					data-placement="top"
					:title="'Close the ' + `${app.App_Name}`"
				/>
			</div>
		</div>
	</div>

</template>
<script>
import { useStore } from "vuex";
import { ref, computed, toRefs, watch } from "vue";
export default {
	props: {
		searchTerm: {
			type: String,
		},
	},
	setup(props) {
		// global variables
		const store = useStore();
		const { searchTerm } = toRefs(props);
		const ActiveApp = computed(() => store.state.globalStore.ActiveApp);
		const tablist = computed(() => store.state.globalStore.tablist);
		const filtered_ActiveApps = ref(null);
		const searchingNow = ref(false);
		// global action
		const updateActiveTab = (payload) =>
			store.dispatch("updateActiveTab", payload);
		const closeTab = (payload) => store.dispatch("closeTab", payload);

		// function to open the Active Apps
		function openApp(app) {
			updateActiveTab(app);
		}
		//  Function to close the Active Apps
		function closeApp(app) {
			closeTab(app);
		}

		//  Function to open the Filtered Active Apps
		function open_filtered_active_app(app) {
			var tar = tablist.value.find((element) => element.TabCode == app.TabCode);
			updateActiveTab(app);
			searchActiveApps();
		}
		//  Function to close the Filtered Active Apps
		function close_filtered_active_app(app) {
			var tar = tablist.value.find((element) => element.TabCode == app.TabCode);
			closeTab(tar);
			searchActiveApps();
		}

		// to Filter the Active Apps according to the Text entered in the Search Box
		function searchActiveApps() {
			searchingNow.value = false;
			if (searchTerm.value != "" && searchTerm.value != null) {
				searchingNow.value = true;
				var txt = [];
				for (let i = 0; i < tablist.value.length; i++) {
					txt.push(tablist.value[i]);
					filtered_ActiveApps.value = txt.filter(function (txt) {
						return (
							txt.App_Name.toString()
								.toLowerCase()
								.indexOf(searchTerm.value.toLowerCase()) >= 0
						);
					});
				}
			}
		}

		watch(searchTerm, () => {
			if (searchTerm.value.length == 0 || searchTerm.value == "") {
				searchingNow.value = false;
			} else {
				searchActiveApps();
			}
		});

		watch(tablist, () => {
			searchActiveApps();
		});

		return {
			// global variable
			ActiveApp,
			tablist,
			// functions
			closeApp,
			openApp,
			searchActiveApps,
			searchingNow,
			filtered_ActiveApps,
			close_filtered_active_app,
			open_filtered_active_app,
		};
	},
};
</script>
<style scoped>
.iconSize {
	font-size: 0.61rem;
}
.normalTab {
	background: #44464e;
}
.selectedTab {
	background: #27ae60;
}
.row > * {
	max-width: 250%;
}
.scroller {
	max-height: 40vh;
	overflow-y: auto;
}
.fixed-top {
	margin-top: 19.5em;
	max-width: 150px;
	z-index: 1002;
}
hr {
	width: 75%;
}

.NAVIG-header-text {
	font-size: 20px;
}
.NAVIG-section-text {
	font-size: 14px;
}
.NAVIG-app-text {
	font-size: 10px;
}
.NAVIG-app-text2 {
	font-size: 8px;
}
.NAVIG-app-text3 {
	font-size: 9px;
}
.NAVIG-app-text4 {
	font-size: 12px;
}
</style>
