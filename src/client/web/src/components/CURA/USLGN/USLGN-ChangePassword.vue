<!-- 
************************************
*  Created By : Reveal IQ          *
*  Author     : Jyoti              *
*  Date       : 18 JAN 2022        *
*  Version    : 0.8.0.00.03-0222   *
************************************
-->
<template>
	<div class="row d-flex justify-content-center">
		<div
			class="col-sm-12 d-flex justify-content-center headerText mb-3 p-0"
			style="width: 300px;"
			v-if="true"
		>
			{{ username }}, your account needs a new password
		</div>
		<div
			class="col-sm-12 d-flex justify-content-center headerText mb-3 p-0"
			style="width: 300px; margin-bottom: 273px !important;"
			v-if="component_state == 'successfulLogin'"
		>
			Welcome {{ username }}
		</div>
		<div
			class="col-sm-12 d-flex justify-content-center"
			v-if="component_state != 'successfulLogin'"
		>
			<div
				class="row password gx-0 gy-0"
				:class="{
					passwordVerified: showSuccessIcon1,
					password: !showSuccessIcon1,
				}"
			>
				<div class="col-sm-2 d-flex align-items-center justify-content-center">
					<font-awesome-icon
						icon="lock"
						:class="{
							lockIcon: !showSuccessIcon1,
							checkIcon: showSuccessIcon1,
						}"
					/>
				</div>
				<div class="col-sm-8 d-flex align-items-center justify-content-center">
					<input
						type="password"
						class="input border border-0"
						v-model="password"
						placeholder="Password"
						style="-webkit-text-security: square;"
						@input="validatePrimaryPassword()"
					/>
				</div>
				<div class="col-sm-2 d-flex align-items-center justify-content-center">
					<font-awesome-icon
						icon="check"
						class="checkIcon"
						v-if="showSuccessIcon2"
					/>
				</div>
			</div>
		</div>
		<!-- Password Validating Check Marks -->
		<div
			class="col-sm-12 d-flex justify-content-center smallText validationText"
			v-if="!showSuccessIcon1"
		>
			<div class="row mt-4">
				<div class="row my-2">
					<div class="col-sm-1">
						<font-awesome-icon
							icon="check"
							class="checkIcon"
							v-if="validation_lowercase"
						/>
					</div>
					<div class="col-sm-10" :class="{ validText: validation_lowercase }">
						Atleast one lowercase
					</div>
				</div>
				<div class="row my-2">
					<div class="col-sm-1">
						<font-awesome-icon
							icon="check"
							class="checkIcon"
							v-if="validation_uppercase"
						/>
					</div>
					<div class="col-sm-10" :class="{ validText: validation_uppercase }">
						Atleast one uppercase
					</div>
				</div>
				<div class="row my-2">
					<div class="col-sm-1">
						<font-awesome-icon
							icon="check"
							class="checkIcon"
							v-if="validation_character"
						/>
					</div>
					<div class="col-sm-10" :class="{ validText: validation_character }">
						Minimum of 8 charecters
					</div>
				</div>
				<div class="row my-2">
					<div class="col-sm-1">
						<font-awesome-icon
							icon="check"
							class="checkIcon"
							v-if="validation_number"
						/>
					</div>
					<div class="col-sm-10" :class="{ validText: validation_number }">
						Atleast one number
					</div>
				</div>
				<div class="row my-2">
					<div class="col-sm-1">
						<font-awesome-icon
							icon="check"
							class="checkIcon"
							v-if="validation_specialChar"
						/>
					</div>
					<div class="col-sm-10" :class="{ validText: validation_specialChar }">
						Atleast one special character (! @ # $ % ^ & *)
					</div>
				</div>
			</div>
		</div>
		<!-- Password TextBox 2 for re-entering Password -->
		<div
			class="col-sm-12 d-flex justify-content-center"
			v-if="showSuccessIcon1 && component_state != 'successfulLogin'"
		>
			<div
				class="row password gx-0 gy-0"
				:class="{
					passwordVerified: showSuccessIcon2,
					password: !showSuccessIcon2,
				}"
			>
				<div class="col-sm-2 d-flex align-items-center justify-content-center">
					<font-awesome-icon
						icon="lock"
						:class="{
							lockIcon: !showSuccessIcon2,
							checkIcon: showSuccessIcon2,
						}"
					/>
				</div>
				<div class="col-sm-8 d-flex align-items-center justify-content-center">
					<input
						type="password"
						v-model="rePassword"
						@input="validateSecondaryPassword()"
						class="input border border-0"
						placeholder="Re-enter Password"
					/>
				</div>
				<div class="col-sm-2 d-flex align-items-center justify-content-center">
					<font-awesome-icon
						icon="check"
						class="checkIcon"
						v-if="showSuccessIcon2"
					/>
				</div>
			</div>
		</div>
		<!-- Block for the Buttons and Error Messages -->
		<div class="col-sm-12 d-flex justify-content-center mt-5" v-if="true">
			<div class="row d-flex align-items-end">
				<!-- Button Component -->
				<Btn
					BtnName="SET PASSWORD"
					backgroundColor="#2980b9"
					v-if="
						component_state == 'setPassword' &&
						status == 'resetOldPassword' &&
						showSuccessIcon2 == true
					"
					@onUserClick="confirmPassword()"
				/>
				<!-- Button Component -->
				<Btn
					BtnName="SET PASSWORD"
					backgroundColor="#2980b9"
					v-if="
						component_state == 'setPassword' &&
						status == 'resetNewPassword' &&
						showSuccessIcon2 == true
					"
					@onUserClick="setPassword()"
				/>
				<!-- Button Component -->
				<Btn
					v-if="component_state == 'validating'"
					BtnName="VALIDATING CREDENTIALS"
					backgroundColor="#586974"
					:showLoader="true"
				/>
				<!-- Error Message component -->
				<Err
					errorMessage="Unable to set the password. Please try again."
					errorCode="USLGN-UI-002"
					class="my-2"
					v-if="component_state == 'errorOccured'"
				/>
				<!-- Button Component -->
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
import { ref, computed, onMounted, toRefs, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const crypto = require("crypto");
// components Imported
import Btn from "./USLGN-Btn.vue";
import Err from "./USLGN-Err.vue";

export default {
	components: {
		Btn,
		Err,
	},
	props: {
		username: {
			type: String,
		},
		status: {
			type: String,
		},
	},
	setup(props) {
		// Props
		const { username, status } = toRefs(props);
		//local variables
		const password = ref(null);
		const rePassword = ref(null);
		const validation_lowercase = ref(false);
		const validation_uppercase = ref(false);
		const validation_specialChar = ref(false);
		const validation_character = ref(false);
		const validation_number = ref(false);
		const showSuccessIcon1 = ref(false);
		const showSuccessIcon2 = ref(false);
		const component_state = ref(null);
		//store variables
		const store = useStore();
		const UserInfo = computed(() => store.state.globalStore.UserInfo);
		const sendHTTPReq = (reqPacket) => store.dispatch("sendHTTPReq", reqPacket);
		const changeServiceState = (serviceState) =>
			store.dispatch("changeServiceState", serviceState);
		const publishNotification = (value) =>
			store.dispatch("publishNotification", value);
		const UpdateUserInfo = (Payload) =>
			store.dispatch("UpdateUserInfo", Payload);
		const Hash_Salt = computed(
			() => store.state.globalStore.UserInfo.Hash_Salt
		);
		// Router variable
		const router = useRouter();

		function validatePrimaryPassword() {
			// if password consists of atleast one Numerical charecter it becomes true
			if (/\d/.test(password.value)) {
				validation_number.value = true;
			} else {
				validation_number.value = false;
			}
			// if password consists of atleast 8 charecters
			if (/.{8,}/.test(password.value)) {
				validation_character.value = true;
			} else {
				validation_character.value = false;
			}
			// if password consists of atleast one lowercase charecter
			if (/[a-z]/.test(password.value)) {
				validation_lowercase.value = true;
			} else {
				validation_lowercase.value = false;
			}
			// if password consists of atleast one uppercase charecter
			if (/[A-Z]/.test(password.value)) {
				validation_uppercase.value = true;
			} else {
				validation_uppercase.value = false;
			}
			// if password consists of atleast one special charecter
			if (/[!@#\$%\^&\*]/.test(password.value)) {
				validation_specialChar.value = true;
			} else {
				validation_specialChar.value = false;
			}
			// if password satisfy all the above we are showing the green ticks
			if (
				validation_character.value &&
				validation_number.value &&
				validation_lowercase.value &&
				validation_uppercase.value &&
				validation_specialChar.value
			) {
				showSuccessIcon1.value = true;
			} else {
				showSuccessIcon1.value = false;
				showSuccessIcon2.value = false;
			}
		}

		function validateSecondaryPassword() {
			if (password.value == rePassword.value) {
				showSuccessIcon2.value = true;
				component_state.value = "setPassword";
			} else {
				showSuccessIcon2.value = false;
				component_state.value = "False";
			}
		}

		// New Password Set Validation
		const setPassword = async () => {
			component_state.value = "validating";
			//Generating Salt
			var salt = crypto.randomBytes(8).toString("hex").toString();
			//Generating Hash
			var hash = crypto
				.pbkdf2Sync(password.value, salt, 1000, 64, `sha512`)
				.toString(`hex`);
			var newPwdauth = {
				Expiry: 20000,
				Type: "REQUEST",
				Request: {
					Module: "CURA",
					ServiceCode: "USLGN",
					API: "Set_Password",
					Password_Hash: hash,
					Hash_Salt: salt,
					Password_Expiry_Duration: 365,
				},
			};

			let response = await sendHTTPReq(newPwdauth);
			if (response.Response.isPasswordSet && response.Type === "RESPONSE") {
				publishNotification({
					message: "Successfully updated your account",
					messageCode: "USLGN-UI-001",
					messageType: "success",
					messageExpiry: 60000,
					messageIcon: "check",
				});
				// After setting Password successfully Authenticating User
				userAuthentication();
			} else {
				//error
				component_state.value = "errorOccured";
				setTimeout(() => {
					component_state.value = "setPassword";
				}, 5000);
			}
		};

		// old Password Confirmation it checks only the Old Password is Correct or not
		async function confirmPassword() {
			var hash = crypto
				.pbkdf2Sync(password.value, Hash_Salt.value, 1000, 64, `sha512`)
				.toString("hex");
			var currentPwdAuth = {
				Expiry: 20000,
				Type: "REQUEST",
				Request: {
					Module: "CURA",
					ServiceCode: "USLGN",
					API: "Authenticate_Password",
					Password_Hash: hash,
				},
			};
			let res = await sendHTTPReq(currentPwdAuth);
			if (res.Type == "RESPONSE" && res.Response.isAuthenticated == true) {
				changeServiceState({
					service: "USLGN",
					status: "changePasswordVerify",
				});
				resetPassword();
			} else {
				// Error - Global Err
			}
		}

		// This Function is used to set the Old Expired Passeword to New User Entered Password
		async function resetPassword() {
			component_state.value = "validating";
			//Generating Salt
			var salt = crypto.randomBytes(8).toString("hex").toString();
			//Generating Hash
			var hash = crypto
				.pbkdf2Sync(rePassword.value, salt, 1000, 64, `sha512`)
				.toString(`hex`);
			var newPwdauth = {
				Expiry: 20000,
				Type: "REQUEST",
				Request: {
					Module: "CURA",
					ServiceCode: "USLGN",
					API: "Set_Password",
					Password_Hash: hash,
					Hash_Salt: salt,
					Password_Expiry_Duration: 365,
				},
			};
			let response = await sendHTTPReq(newPwdauth);
			if (response.Response.isPasswordSet && response.Type === "RESPONSE") {
				publishNotification({
					message: "Successfully updated your account",
					messageCode: "USLGN-UI-001",
					messageType: "success",
					messageExpiry: 60000,
					messageIcon: "check",
				});
				// after receiving the Hash from the server we will be authenticating username and Password in order to make him login
				userAuthentication();
			} else {
				//error
				component_state.value = "errorOccured";
				setTimeout(() => {
					component_state.value = "setPassword";
				}, 5000);
			}
			// Using the Password that entered and Sending for new Token
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
			if (
				res.Type === "RESPONSE" &&
				component_state.value == "successfulLogin"
			) {
				localStorage.setItem("Token", res.Response.Refresh_Token);
				localStorage.setItem(
					"IssuedAt",
					JSON.stringify(res.Response.Issued_At)
				);
				localStorage.setItem(
					"ExpiresIn",
					JSON.stringify(res.Response.Expires_In)
				);
				changeServiceState({
					service: "USLGN",
					status: "passwordVerified",
				});
				setTimeout(() => {
					// Changing route to SCFLD
					router.push({ name: "SCFLD" });
				}, 3000);
			}
		}
		
		// user Authentication
		const userAuthentication = async () => {
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

			// checking 'username' and the 'password' are correct or Not
			if (res.Type === "RESPONSE") {
				let userInfo = {
					ID_User: res.Response.ID_User,
					User_Name_First: res.Response.User_Name_First,
					User_Name_Last: res.Response.User_Name_Last,
					User_Group: res.Response.User_Group,
					User_Sex: res.Response.User_Sex,
					...(res.Response.hasOwnProperty("Hash_Salt") && {
						Hash_Salt: res.Response.Hash_Salt,
					}),
					Institute_Info: UserInfo.value.Institute_Info,
				};
				// to store the data of the user in the global store variable
				UpdateUserInfo(userInfo);
				// checking Password valid or Not
				passwordAuthentication();
			} else {
				if (
					res.Type == "ERROR" &&
					res.Response.Error_Code === "API-USLGN-E002"
				) {
					component_state.value = "invalidUsername";
				} else {
					// Error Occured
				}
			}
		};

		// Password Authentication
		const passwordAuthentication = async () => {
			var hash = crypto
				.pbkdf2Sync(rePassword.value, Hash_Salt.value, 1000, 64, `sha512`)
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
					//  Changing route to SCFLD
					router.push({ name: "SCFLD" });
				}, 3000);
			} else {
				// Password is Wrong
				component_state.value = "invalidPassword";
			}
		};

		return {
			// local var
			password,
			rePassword,
			validation_lowercase,
			validation_uppercase,
			validation_specialChar,
			validation_character,
			validation_number,
			showSuccessIcon1,
			showSuccessIcon2,
			component_state,
			// local  function
			validatePrimaryPassword,
			validateSecondaryPassword,
			setPassword,
			confirmPassword,
		};
	},
};
</script>

<style lang="scss" scoped>
@import "../../GLOBAL/Styles/font-style.scss";

.password {
	margin-top: 30px !important;
	max-width: 300px !important;
	min-width: 300px !important;
	max-height: 50px !important;
	min-height: 50px !important;
	border: 1.25px solid #586974;
	border-radius: 5px;
}

input[type="password"] {
	outline: none;
	letter-spacing: 0.1em;
}

.validationText {
	margin-top: 10px;
	margin-bottom: 50px;
	color: #586974;
	max-width: 300px !important;
	min-width: 300px !important;
	max-height: 18px !important;
	min-height: 18px !important;
}

.checkIcon {
	color: #27ae60;
}

.headerText {
	color: #586974;
}
</style>
