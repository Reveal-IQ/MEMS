<!-- 
************************************
*  Created By : Reveal IQ          *
*  Author     : Jyoti              *
*  Date       : 18 JAN 2022        *
*  Version    : 0.8.0.00.02-0122   *
************************************
-->
<template>
	<div class="row d-flex justify-content-center">
		<div
			class="col-sm-12 d-flex justify-content-center headerText mb-3 p-0"
			style="width: 300px;"
			v-if="component_state != 'successfulLogin'"
		>
			Log into your digital health dashboard
		</div>
		<div
			class="col-sm-12 d-flex justify-content-center headerText mb-3 p-0"
			style="width: 300px; margin-bottom: 273px !important;"
			v-if="component_state == 'successfulLogin'"
		>
			Welcome {{ username }}
		</div>
		<!-- Username Block -->
		<div
			class="col-sm-12 d-flex justify-content-center"
			v-if="component_state != 'successfulLogin'"
		>
			<div class="row username gx-0 gy-0">
				<div class="col-sm-2 d-flex align-items-center justify-content-center">
					<font-awesome-icon icon="user" class="userIcon" />
				</div>
				<div class="col-sm-8 d-flex align-items-center justify-content-center">
					<input
						type="text"
						class="input border border-0"
						placeholder="Username"
						v-model="username"
						@click="reEnableVerifyBtn()"
						:disabled="disable"
					/>
				</div>
				<div class="col-sm-2"></div>
			</div>
		</div>
		<!-- Password Block -->
		<div
			class="col-sm-12 d-flex justify-content-center"
			v-if="component_state != 'successfulLogin'"
		>
			<div class="row password border border-secondary rounded gx-0 gy-0">
				<div class="col-sm-2 d-flex align-items-center justify-content-center">
					<font-awesome-icon icon="lock" class="lockIcon" />
				</div>
				<div class="col-sm-8 d-flex align-items-center justify-content-center">
					<input
						type="password"
						class="input input border border-0"
						placeholder="Password"
						v-model="password"
						@click="reEnableVerifyBtn()"
						:disabled="disable"
					/>
				</div>
				<div class="col-sm-2"></div>
			</div>
		</div>
		<div
			class="col-sm-12 d-flex justify-content-end smallText forgotPassword"
			v-if="component_state != 'successfulLogin'"
		>
			Forgot Password?
		</div>
		<div class="col-sm-12 d-flex justify-content-center">
			<div class="row d-flex align-items-end">
				<!-- Verify Button -->
				<Btn
					v-if="component_state == 'verify'"
					BtnName="VERIFY"
					backgroundColor="#2980b9"
					@onUserClick="userAuthentication()"
				/>
				<!-- validating Credentials Button -->
				<Btn
					v-if="component_state == 'validating'"
					BtnName="VALIDATING CREDENTIALS"
					backgroundColor="#586974"
					:showLoader="true"
				/>
				<!-- Error Message displayed of the Username or Password is Wrong  -->
				<Err
					v-if="
						component_state == 'invalidUsername' ||
						component_state == 'invalidPassword'
					"
					errorMessage="Please recheck your credentials."
					errorCode="USLGN-UI-001"
				/>
				<!-- Successful Login Button Visible if the Username and Password is Correct -->
				<Btn
					v-if="component_state == 'successfulLogin'"
					BtnName="SUCCESSFUL LOGIN"
					backgroundColor="#27AE60"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import Btn from "./USLGN-Btn.vue";
import Err from "./USLGN-Err.vue";
const crypto = require("crypto");

export default {
	components: {
		Btn,
		Err,
	},
	emits: ["passwordResetRequired"],
	//  props is defined but not used because it helps the {emit} to work properly don't remove it
	setup(props, { emit }) {
		const username = ref(null);
		const password = ref(null);
		const component_state = ref("verify");
		const disable = ref(false);
		//store variables
		const store = useStore();
		const UserInfo = computed(() => store.state.globalStore.UserInfo);
		const sendHTTPReq = (reqPacket) => store.dispatch("sendHTTPReq", reqPacket);
		const changeServiceState = (serviceState) =>
			store.dispatch("changeServiceState", serviceState);
		const UpdateUserInfo = (Payload) =>
			store.dispatch("UpdateUserInfo", Payload);
		const Hash_Salt = computed(
			() => store.state.globalStore.UserInfo.Hash_Salt
		);
		// Router
		const router = useRouter();

		// username Authentication for all users
		const userAuthentication = async () => {
			component_state.value = "validating";
			disable.value = true;
			var userAuth = {
				Expiry: 20000,
				Type: "REQUEST",
				Request: {
					Module: "CURA",
					ServiceCode: "USLGN",
					API: "Authenticate_Username",
					User_Name: username.value,
				},
			};

			let res = await sendHTTPReq(userAuth);

			if (res.Type === "RESPONSE") {
				let userInfo = {
					ID_User: res.Response.ID_User,
					User_Name_First: res.Response.User_Name_First,
					User_Name_Last: res.Response.User_Name_Last,
					User_Group: res.Response.User_Group,
					User_Sex: res.Response.User_Sex,
					// we are checking the Response pocket having the property 'Hash_Salt' 
					//---> if it contains 'save' the Hash, otherwise move on to next line
					...(res.Response.hasOwnProperty("Hash_Salt") && {
						Hash_Salt: res.Response.Hash_Salt,
					}),
					Institute_Info: UserInfo.value.Institute_Info,
				};
				// action to save the details into the global store to variable userInfo
				UpdateUserInfo(userInfo);

				if (!res.Response.Flag_New_User) {
					if (res.Response.isExpired) {
						changeServiceState({
							service: "USLGN",
							status: "changePassword",
						});
						// Checking the entered Password if user is 'expired Password' user
						passwordConfirmation("resetOldPassword");
					} else {
						changeServiceState({
							service: "USLGN",
							status: "usernameVerified",
						});
						// Checking the entered Password if the 'user password' is not expired and the user not 'new User'
						passwordAuthentication();
					}
				} else {
					changeServiceState({
						service: "USLGN",
						status: "newPassword",
					});
					// Checking the entered Password if user is New user
					passwordConfirmation("resetNewPassword");
				}
			} else {
				if (
					res.Type == "ERROR" &&
					res.Response.Error_Code === "API-USLGN-E002"
				) {
					component_state.value = "invalidUsername";
					disable.value = false;
				} else {
					//  Global Error Occured Reponsible for Username Invalid
				}
			}
		};

		// Password Authentication for normal users
		const passwordAuthentication = async () => {
			var hash = crypto
				.pbkdf2Sync(password.value, Hash_Salt.value, 1000, 64, `sha512`)
				.toString("hex");
			var pwdAuth = {
				Expiry: 20000,
				Type: "REQUEST",
				Request: {
					Module: "CURA",
					ServiceCode: "USLGN",
					API: "Login_User",
					Password_Hash: hash,
				},
			};

			let res = await sendHTTPReq(pwdAuth);
			if (res.Type === "RESPONSE") {
				localStorage.setItem("Token", res.Response.Refresh_Token);
				localStorage.setItem(
					"IssuedAt",
					JSON.stringify(res.Response.Issued_At)
				);
				localStorage.setItem(
					"ExpiresIn",
					JSON.stringify(res.Response.Expires_In)
				);
				component_state.value = "successfulLogin";
				changeServiceState({
					service: "USLGN",
					status: "passwordVerified",
				});
				setTimeout(() => {
					// Changing route to SCFLD
					router.push({ name: "SCFLD" });
				}, 3000);
			} else {
				component_state.value = "invalidPassword";
				disable.value = false;
			}
		};

		// Password Authentication for Psw Expired users and the New Password Setting Users
		const passwordConfirmation = async (payload) => {
			var hash = crypto
				.pbkdf2Sync(password.value, Hash_Salt.value, 1000, 64, `sha512`)
				.toString("hex");
			var pwdAuth = {
				Expiry: 20000,
				Type: "REQUEST",
				Request: {
					Module: "CURA",
					ServiceCode: "USLGN",
					API: "Login_User",
					Password_Hash: hash,
				},
			};

			let res = await sendHTTPReq(pwdAuth);
			if (res.Type === "RESPONSE" && payload == "resetOldPassword") {
				changeServiceState({
					service: "USLGN",
					status: "passwordVerified",
				});
				emit("passwordResetRequired", username.value, "resetOldPassword");
			} else if (res.Type === "RESPONSE" && payload == "resetNewPassword") {
				changeServiceState({
					service: "USLGN",
					status: "passwordVerified",
				});
				emit("passwordResetRequired", username.value, "resetNewPassword");
			} else {
				component_state.value = "invalidPassword";
				disable.value = false;
			}
		};

		// to Enable the VERIFY button after the user starts editing the Username/Password
		function reEnableVerifyBtn() {
			component_state.value = "verify";
		}

		return {
			// local var
			username,
			password,
			component_state,
			disable,
			// local function
			userAuthentication,
			reEnableVerifyBtn,
		};
	},
};
</script>

<style lang="scss" scoped>
@import "../../GLOBAL/Styles/font-style.scss";

.username {
	margin-top: 50px !important;
	max-width: 300px !important;
	min-width: 300px !important;
	max-height: 50px !important;
	min-height: 50px !important;
	border: 1.25px solid #586974;
	border-radius: 5px;
}

.password {
	margin-top: 30px !important;
	max-width: 300px !important;
	min-width: 300px !important;
	max-height: 50px !important;
	min-height: 50px !important;
	border: 1.25px solid #586974;
	border-radius: 5px;
}

input[type="text"],
input[type="password"] {
	outline: none;
}

.forgotPassword {
	margin-top: 10px;
	margin-bottom: 50px;
	color: #586974;
	max-width: 300px !important;
	min-width: 300px !important;
	max-height: 18px !important;
	min-height: 18px !important;
}

.userIcon {
	color: #586974;
}

.lockIcon {
	color: #586974;
}
</style>
