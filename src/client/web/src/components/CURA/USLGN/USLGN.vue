<!-- 
************************************
*  Created By : Reveal IQ          *
*  Author     : Jyoti              *
*  Date       : 18 JAN 2022        *
*  Version    : 0.8.0.00.02-0122   *
************************************
-->
<template>
	
	<div class="row uslgnStyle d-flex justify-content-center">
		<div class="col-sm-8 col-md-6 col-lg-6 d-flex align-items-center justify-content-center">
			<section
				class="d-flex justify-content-center"
				
			>
				<!-- siteLogo & siteHeading -->
				<div class="row gx-0">
					<div class="col-sm-12">
						<div class="row d-flex justify-content-center">
							<div class="col-sm-12 d-flex align-items-center justify-content-center site_logo">
								SITE LOGO
							</div>
							<div class="col-sm-12 d-flex justify-content-center mt-3">
								<div
									class="row d-flex justify-content-center align-items-center"
								>
									<div class="col-sm-12  d-flex justify-content-center" style="font-size: 30px;">
										Digital Health 
										
									</div>
									<div class="col-sm-12 mt-1 d-flex justify-content-center"><span class="bodyText fw-bold" style="font-size:20px">{{ institute }}</span></div>
								</div>
							</div>
							<div class="col-sm-12" style="margin-top: 80px;">
								<!-- Not a New user will navigate to Login and main component -->
								<Login
									v-if="isitNewUser == false"
									@passwordResetRequired="assignReceivedRspVar"
								/>
								<!-- New User navigate to change password -->
								<ChangePassword
									v-if="isitNewUser == true"
									:username="username"
									:status="status"
								/>
							</div>
						</div>
					</div>
					<div class="col-sm-12 mt-3 d-flex justify-content-center" >
						<div class="row gx-0">
							<div class="col-sm-10 d-flex justify-content-center">
								<img
									src="./../../../assets/media/Reveal_Grey_Logo.svg"
									alt=""
								/>
							</div>
							<div class="col-sm-10 d-flex justify-content-end versionSub">
								Version {{ version }}
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	</div>
	
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const crypto = require("crypto");
import Login from "./USLGN-Login.vue";
import ChangePassword from "./USLGN-ChangePassword.vue";

export default {
	components: {
		Login,
		ChangePassword,
	},
	setup() {
		// local variables
		const institute = ref(null);
		const version = ref(null);
		const isitNewUser = ref(false);
		const username = ref(null);
		const status = ref(null);
		//store variables
		const store = useStore();
		const sendHTTPReq = (reqPacket) => store.dispatch("sendHTTPReq", reqPacket);
		const changeServiceState = (serviceState) =>
			store.dispatch("changeServiceState", serviceState);
		const UpdateUserInfo = (Payload) =>
			store.dispatch("UpdateUserInfo", Payload);
		// Router
		const router = useRouter();

		// Check State of the RCU to redirect to STPWZ
		const checkStatus = async () => {
			var instinit = {
				Expiry: 20000,
				Type: "REQUEST",
				Request: {
					Module: "RCU",
					ServiceCode: "Status",
					API: "Get_Status",
				},
			};
			let res = await store.dispatch("sendHTTPReq", instinit);
			if (res.Type === "RESPONSE") {
				if (res.Response.State === "Init") {
					router.push({ name: "STPWZ" });
				} else {
					initUSLGN();
				}
			} else {
				// Unable to receive the Response of Institute Information
			}
		};

		onMounted(() => {
			checkStatus();
		});

		// Get Institute, Version, InstituteCode Information
		const initUSLGN = async () => {
			var instinit = {
				Expiry: 20000,
				Type: "REQUEST",
				Request: {
					Module: "CURA",
					ServiceCode: "USLGN",
					API: "Init_USLGN",
				},
			};
			let res = await store.dispatch("sendHTTPReq", instinit);
			if (res.Type === "RESPONSE") {
				institute.value = res.Response.Institute_Name;
				version.value = res.Response.App_Version;
				document.title = "Reveal-" + res.Response.Institute_Code;
				store.dispatch("UpdateUserInfo", {
					Institute_Info: {
						Code: res.Response.Institute_Code,
					},
				});
			} else {
				// Unable to receive the Response of Institute Information
			}
		};

		// we are receiving the Event 'PasswordResetRequired' during that event it carrying
		// two values from Login Comp "Username" "type of user : status"
		// these will be assigned to the varibles of this Base component to transfer them
		// as Props to the ChangePassword Component
		function assignReceivedRspVar(rsp_username, rsp_status) {
			isitNewUser.value = true;
			username.value = rsp_username;
			status.value = rsp_status;
		}

		return {
			// store var
			institute,
			version,
			// local var
			isitNewUser,
			username,
			status,
			// local function
			assignReceivedRspVar,
		};
	},
};
</script>

<style lang="scss" scoped>
@import "../../GLOBAL/Styles/font-style.scss";

.site_logo {
	margin-top: 100px;
	width: 400px;
	height: 150px;
	color: #000;
	font-size: 24px;
	font-family: Montserrat;
	font-style: normal;
	font-weight: 400;
	background: rgba(196, 196, 196, 0.1);
}

::-webkit-scrollbar{ 
    display: none;
}

@media (min-width: 992px) { 
	.uslgnStyle{	
	  height: 98vh;
	  width: 100vw;
	  overflow-y: scroll;
	}
 }
</style>
