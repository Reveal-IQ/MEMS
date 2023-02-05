<!-- 
************************************
*  Created By : Reveal IQ          *
*  Author     : Sudheer            *
*  Date       : 21 MAY 2021        *
*  Version    : 0.1.0.00.11-0222   *
************************************
-->
<template>
	<div ref="SCFLD" class="SCFLD-Container">
		<div class="container-fluid gx-0">
			<!-- Desktop Loader Page -->
			<desktoploader
				v-if="scfldState == null"
				:authErr="authErr"
				:userInit="userInit"
			/>
			<!-- Navigation Page -->
			<div v-else>
				<!-- SCFLD Lock / connection Error -->
				<div
					class="flex-row d-flex justify-content-center lockOverlay"
					v-if="
						scfldState == 'Locked' ||
						socketStatus == 'disconnected' ||
						socketStatus == 'Error: websocket error'
					"
				>
					<Lock />
				</div>

				<!-- Connection is resume or re established conection -->
				<div
					class="flex-row d-flex justify-content-end notificationOverlay"
					v-if="
						scfldState == 'Unlocked' && (offNotification || !comsEstablished)
					"
				>
					<div class="flex-col col-5 px-4 py-4">
						<Notification />
					</div>
				</div>

				<div class="" v-if="scfldState == 'Locked' || scfldState == 'Unlocked'">
					<span :class="'eventLocker' && !eventLockerKey">
						<div class="container-fluid" style="height: 100vh; width: 100vw;">
							<div class="row gx-0">
								<div
									class="col-sm-12 align-items-center justify-content-center px-3"
									style="
										background: #54626f;
										height: 63.41px;
										min-height: 63.41px;
									"
								>
									<NAVIG />
								</div>
								<div class="col-sm-12 APPWN">
									<APPWN />
								</div>
							</div>
						</div>
					</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { useStore } from "vuex";
import { ref, computed, onMounted, watch, onBeforeUnmount } from "vue";
import desktoploader from "./SCFLD-DesktopLoginLoader.vue";
import NAVIG from "./NAVIG/NAVIG.vue";
import APPWN from "./APPWN.vue";
import Lock from "./SCFLD-Lock.vue";
import Notification from "../../GLOBAL/Notification.vue";
export default {
	components: {
		desktoploader,
		NAVIG,
		APPWN,
		Lock,
		Notification,
	},
	setup() {
		// local variables
		const eventLockerKey = ref(null);
		const SCFLD = ref(null);
		const desktopLoader = ref(null);
		const authErr = ref(true);
		const userInit = ref("");
		const userInterfaceLock = ref(null);
		// store variables
		const store = useStore();
		const socketStatus = computed(() => store.state.socketLink.socketStatus);
		const UserInfo = computed(() => store.state.globalStore.UserInfo);
		const scfldState = computed(() => store.state.globalStore.appState.SCFLD);
		// actions
		const createEventEmitter = (element) =>
			store.dispatch("createEventEmitter", element);
		const changeServiceState = (serviceState) =>
			store.dispatch("changeServiceState", serviceState);
		const UpdateUserInfo = (Payload) =>
			store.dispatch("UpdateUserInfo", Payload);
		const onEvent = (event) => {
			store.dispatch("onEvent", event);
		};
		const onceEvent = (event) => {
			store.dispatch("onceEvent", event);
		};
		const createConnection = () => {
			store.dispatch("createConnection");
		};
		const sendSocketReq = (request) => {
			store.dispatch("sendSocketReq", request);
		};
		const publishNotification = (value) =>
			store.dispatch("publishNotification", value);

		// To redirect user to login page on Authorization err
		function handleAuthErr(event) {
			console.log("HANDLE AUTH ERR: ", event.detail.message);
			authErr.value = false;
		}

		function initiatizeUser() {
			// Send a request to generate Access Token first and then send the actual request
			sendSocketReq({
				data: {
					Expiry: 10000,
					Type: "REQUEST",
					Request: {
						ServiceCode: "SCFLD",
						API: "Initialize_User",
					},
				},
				callback: (res) => {
					if (res.Type === "RESPONSE") {
						let consultant =
							res.Response.FIRSTNAME + "" + res.Response.LASTNAME;
						store.commit("setConsultant", consultant);
						delete res.Response.Request_ID;
						UpdateUserInfo(res.Response);
						userInit.value = "success";
						setTimeout(() => {
							changeServiceState({
								service: "SCFLD",
								status: "Unlocked",
							});
							changeServiceState({
								service: "NAVIG",
								status: "Home",
							});
							findUserActivity();
						}, 3000);
					} else {
						userInit.value = "error";
					}
				},
			});
		}

		onMounted(() => {
			// Register event emitter on "SCFLD"
			createEventEmitter(SCFLD.value);

			// Add listener for event authErr
			onEvent({
				type: "authErr",
				listener: handleAuthErr,
			});

			onceEvent({
				type: "accessTokenRenewed",
				listener: initiatizeUser,
			});

			// Dispatches the store method to create WebSocket connection
			createConnection();
		});

		watch(socketStatus, (newValue, oldValue) => {
			if (oldValue == "Error: websocket error" && newValue == "connected") {
				// publishing notification after reconnecting to server
				publishNotification({
					message: "Successfully re-established network connection",
					messageCode: "SCFLD-UI-004",
					messageType: "success",
					messageExpiry: 60000,
					messageIcon: "check",
				});
			}
		});

		watch(scfldState, (newValue, oldValue) => {
			if (oldValue == "Locked" && newValue == "Unlocked") {
				eventLockerKey.value = true;
				// publishing notification after login
				publishNotification({
					message: "Successfully login",
					messageCode: "SCFLD-UI-004",
					messageType: "success",
					messageExpiry: 60000,
					messageIcon: "check",
				});
			}
			if (oldValue == "Unlocked" && newValue == "Locked") {
				eventLockerKey.value = false;
			}
		});

		function resetUserActivity() {
			if (scfldState.value == "Unlocked") {
				clearTimeout(userInterfaceLock.value);
				userInterfaceLock.value = setTimeout(() => {
					changeServiceState({
						service: "SCFLD",
						status: "Locked",
					});
				}, 9000000);
			}
		}

		function findUserActivity() {
			if (scfldState.value == "Unlocked") {
				SCFLD.value.addEventListener("mousemove", resetUserActivity);
				SCFLD.value.addEventListener("scroll", resetUserActivity);
				SCFLD.value.addEventListener("keydown", resetUserActivity);
				SCFLD.value.addEventListener("resize", resetUserActivity);
			} else {
				SCFLD.value.removeEventListener("mousemove", resetUserActivity);
				SCFLD.value.removeEventListener("scroll", resetUserActivity);
				SCFLD.value.removeEventListener("keydown", resetUserActivity);
				SCFLD.value.removeEventListener("resize", resetUserActivity);
			}
		}
		onBeforeUnmount(() => {
			SCFLD.value.removeEventListener("mousemove", resetUserActivity);
			SCFLD.value.removeEventListener("scroll", resetUserActivity);
			SCFLD.value.removeEventListener("keydown", resetUserActivity);
			SCFLD.value.removeEventListener("resize", resetUserActivity);
		});

		return {
			//local variables
			userInit,
			authErr,
			SCFLD,
			desktopLoader,
			eventLockerKey,
			//global variables
			socketStatus,
			scfldState,
			UserInfo,
			//functions
			handleAuthErr,
			initiatizeUser,
		};
	},
};
</script>
<style lang="scss" scoped>
@import "./../../GLOBAL/Styles/colors.scss";
@import "./../../GLOBAL/Styles/font-style.scss";
@import "../SCFLD/style/SCFLD.scss";

.container-fluid {
	overflow-y: hidden !important; /* Hide vertical scrollbar */
	overflow-x: hidden !important; /* Hide horizontal scrollbar */
}
</style>
