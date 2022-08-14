<!-- 
************************************
*  Created By : Reveal IQ          *
*  Author     : Bharath Kumar      *
*  Date       : 20 MAY 2021        *
*  Version    : 0.5.4.00.04-0222   *
************************************
-->
<template>
	<section>
		<div class="dropdown">
			<div
				class="flex-row text-end text-capitalize NAVIG-main-text"
				type="button"
				id="profileLauncher"
				data-bs-toggle="dropdown"
				aria-expanded="false"
				style="background: none;"
				data-bs-offset="-100,20"
			>
				{{ UserInfo.User_Name_First }}
				{{ UserInfo.User_Name_Last }}
			</div>
			<ul
				class="dropdown-menu text-light userProfileOverlay"
				aria-labelledby="profileLauncher"
			>
				<div class="text-light mt-2 NAVIG-heading-text">
					<div
						class="flex-row text-center text-capitalize"
						style="background: none;"
					>
						<span v-if="UserInfo.User_Group == 'DRX'">Dr.</span>
						{{ UserInfo.User_Name_First }}
						{{ UserInfo.User_Name_Last }}
					</div>
					<div
						class="flex-row text-center NAVIG-sub-heading-text"
						style="background: none; opacity: 0.5;"
					>
						{{ UserInfo.User_Department }}
					</div>
					<hr class="mx-3" />
					<div class="flex-row m-0 py-2">
						<div class="flex-col py-1 hoverEffect px-3">Change Password</div>
						<div class="flex-col py-1 hoverEffect px-3">Profile</div>
						<div class="flex-col py-1 hoverEffect px-3">Support Me</div>
						<div class="flex-col py-1 hoverEffect px-3" @click="logout">
							Log Out
						</div>
					</div>
				</div>
			</ul>
		</div>
	</section>
</template>
<script>
import { useStore } from "vuex";
import { computed, onMounted, ref } from "vue";
export default {
	setup() {
		// store variables
		const store = useStore();
		const UserInfo = computed(() => store.state.globalStore.UserInfo);

		// To logout User - reloading Page
		function logout() {
			location.reload();
		}

		return {
			// store variables
			store,
			UserInfo,
			// functions
			logout,
		};
	},
};
</script>
<style lang="scss" scoped>
// @import "./style/NAVIG.scss";

.userProfileOverlay {
	position: fixed;
	height: 200px !important;
	width: 220px !important;
	max-height: 200px !important;
	min-height: 220px !important;
	background-color: #54626f !important;
	border: 3px solid #37a3ea !important;
	z-index: 1001;
	cursor: default;
	border-radius: 20px !important;
}
.hr {
	width: 100%;
	height: 0.2px !important;
	align-self: center;
	background-color: white;
	opacity: 20% !important;
	border-top: none;
}
.NAVIG-main-text {
	font-size: 14px;
}
.NAVIG-heading-text {
	font-size: 12px;
}
.NAVIG-sub-heading-text {
	font-size: 10px;
}
</style>
