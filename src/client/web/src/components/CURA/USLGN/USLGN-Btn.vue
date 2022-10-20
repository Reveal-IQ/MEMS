<!-- 
************************************
*  Created By : Reveal IQ          *
*  Author     : Jyoti              *
*  Date       : 18 JAN 2022        *
*  Version    : 0.8.0.00.02-0222   *
************************************
-->
<template>
	<!-- reusable Button Block -->
	<div
		class="row d-flex align-items-center justify-content-center button fw-bold buttonBackground"
		:style="'--color:' + backgroundColor"
		@click="emitClickEvent()"
	>
		<div class="col-sm-10 bodyText d-flex justify-content-center">
			{{ BtnName }}
		</div>
		<div class="col-sm-2 mx-auto" v-if="showLoader">
			<img src="../../../assets/media/btn_loader.gif" alt="" class="gifImage" />
		</div>
	</div>
</template>

<script>
export default {
	props: {
		BtnName: {
			type: String,
			default: "Button",
		},
		showLoader: {
			type: Boolean,
			default: false,
		},
		// it contains the default color #586974
		backgroundColor: {
			type: String,
			default: "#586974", 
		},
	},
	setup(props, { emit }) {
		function emitClickEvent() {
			emit("onUserClick");
		}
		return {
			emitClickEvent,
		};
	},
};
</script>

<style lang="scss" scoped>
@import "../../GLOBAL/Styles/font-style.scss";

.gifImage {
	height: 20px;
	width: 20px;
}

.button {
	max-width: 300px !important;
	min-width: 300px !important;
	max-height: 50px !important;
	min-height: 50px !important;
	border: none;
	font-size: 14px !important;
	font-style: normal;
	color: #ffffff;
}
.buttonBackground {
	background-color: var(--color);
}
</style>