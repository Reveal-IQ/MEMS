<!-- 
************************************
*  Created By : Reveal IQ          *
*  Author     : Jyoti              *
*  Date       : 18 JAN 2022        *
*  Version    : 0.8.0.00.01-0122   *
************************************
-->
<template>
	<div class="col-sm-12">
		<div class="row button d-flex align-items-center errorButton">
			<div class="col-sm-2 d-flex justify-content-center align-items-center">
				<font-awesome-icon icon="exclamation-triangle" class="errorIcon" />
			</div>
			<div class="col-sm-10">
				<div class="row">
					<div
						class="col-sm-12 d-flex justify-content-start align-items-center smallText"
						style="height: 39px !important;"
					>
						{{ errorMessage }}
					</div>
					<div class="col-sm-12 d-flex justify-content-end versionLittle">
						{{ errorCode }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		errorMessage: {
			type: String,
			default: "Error Message",
		},
		errorCode: {
			type: String,
			default: "USLGN-UI-E00",
		},
	},
	setup() {
		return {};
	},
};
</script>

<style lang="scss" scoped>
@import "../../GLOBAL/Styles/font-style.scss";
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
.errorIcon {
	color: #ffffff;
	height: 28px;
	width: 28px;
}
.errorButton {
	background: #f39c12;
}
</style>