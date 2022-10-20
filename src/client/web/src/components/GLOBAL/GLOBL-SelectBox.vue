<!-- 
***********************************
*  Created By : Reveal IQ         *
*  Author     : Bharath           *
*  Date       : 30 SEP 2021       *
*  Version    : 0.12.0.00.3-0322  *
***********************************
-->
<template>
	<div>
		<div class="row align-items-center mx-2 p-0 rowHeight my-auto GBSLT-bodyText">
			<div class="col-sm-12 col-xs-12 p-0">
				<!-- options List without search box  -- it is Select Box -->
				<div v-if="searchOption == false">
					<div class="form-floating">
						<select
							:id="`${IDRef}`"
							v-model="validOption"
							class="form-select p-0 GBSLT-bodyText px-2 pt-2"
							:disabled="disable == true"
							@blur="isitNull"
						>
							<option
								v-for="option in optionsList"
								:key="option.index"
								:value="option.listName"
							>
								{{ option.listName }}
							</option>
						</select>
						<label for="floatingSelect GBSLT-bodyText">{{ labelName }}</label>
					</div>
				</div>

				<!-- options List with search box functionality -- it is datalist -->
				<div v-if="searchOption == true">
					<div class="form-floating">
						<input
							v-model="validOption"
							class="form-control GBSLT-bodyText"
							:list="`${IDRef}`"
							placeholder="Type to search..."
							:disabled="disable == true"
							@blur="isitNull"
							@keyup="isitNotFound"
							@input="getOptionsFromServer"
						/>
						<label for="DataList" class="GBSLT-bodyText">{{ labelName }}</label>
					</div>
					<datalist :id="`${IDRef}`" class="p-2">
						<option
							v-for="option in optionsList"
							:key="option.index"
							:value="option.listName"
						>
							{{ option.listName }}
						</option>
					</datalist>
				</div>
			</div>
		</div>

		<!-- Error Showing Block -->
		<div class="row align-items-center mx-2 GBSLT-bodyText">
			<div class="col-sm-12 col-xs-12 px-1 showError fw-bold">
				<div
					v-if="showNotFoundError == true && notFoundError == true"
					class="fw-normal"
				>
				 <span class="GBSLT-smallText">{{ notFoundErrorMessage }} - </span><span class="GBSLT-versionLittle">{{ notFoundErrorCode }}</span>	
				</div>
				<div
					v-else-if="showNullError == true && nullError == true"
					class="fw-normal"
				>
				<span class="GBSLT-smallText">{{ nullErrorMessage }} - </span><span class="GBSLT-versionLittle">{{ nullErrorCode }}</span>	
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { ref, toRefs } from "vue";
import { v4 as uuidv4 } from 'uuid';
export default {
	props: {
		optionsList: {
			type: Object,
			default: null,
		},
		labelName: {
			type: String,
		},
		searchOption: {
			type: Boolean,
			default: false,
		},
		disable: {
			type: Boolean,
			default: false,
		},
		minCharLimit: {
			type: Number,
			default: null,
		},
		notFoundError: {
			type: Boolean,
		},
		notFoundErrorMessage: {
			type: String,
		},
		notFoundErrorCode: {
			type: String,
		},
		nullError: {
			type: Boolean,
		},
		nullErrorMessage: {
			type: String,
		},
		nullErrorCode: {
			type: String,
		},
	},
	// need to define the events we are going to emit in setup block
	emits: ["receiveData", "fetchOptions"],
	setup(props, { emit }) {
		const { optionsList, minCharLimit } = toRefs(props);
		const validOption = ref(null);
		const selectedOption = ref(null);
		const showNullError = ref(false);
		const showNotFoundError = ref(null);
		// to create Unique value each Time for select Box ID
		const IDRef = ref(uuidv4());

		// this function is show - Fill / Null Error
		function isitNull() {
			var checkOption = optionsList.value.find(
				(option) => option.listName == validOption.value
			);
			if (validOption.value == null || validOption.value == "") {
				showNotFoundError.value = false;
				showNullError.value = true;
				selectedOption.value = null;
			} else if (typeof checkOption === "undefined") {
				showNotFoundError.value = false;
				showNullError.value = true;
				selectedOption.value = null;
			} else {
				showNullError.value = false;
				selectedOption.value = checkOption;

				// emmiting the event only after valid data assigned to selectedOption Var
				emit("receiveData", selectedOption.value);
			}
		}

		// this function is to show - Not found Error
		function isitNotFound() {
			if (optionsList.value.length == 0 && minCharLimit.value == null) {
				showNullError.value = false;
				showNotFoundError.value = true;
			} else if (
				optionsList.value.length == 0 &&
				minCharLimit.value != null &&
				validOption.value.length >= minCharLimit.value
			) {
				showNullError.value = false;
				showNotFoundError.value = true;
			} else {
				showNotFoundError.value = false;
			}
		}

        // emitting Function to send user Input data to parent component to send request for Server
		function getOptionsFromServer() {
			if (validOption.value.length >= minCharLimit.value) {
				emit("fetchOptions", validOption.value);
			}
		}

		return {
			// ? local variable
			validOption,
			showNullError,
			showNotFoundError,
			selectedOption,
			IDRef,
			// ? local functions
			isitNull,
			isitNotFound,
			getOptionsFromServer,
		};
	},
};
</script>

<style lang="scss" scoped>
@import "../../scss/selectBox.scss";
// @import "../../components/GLOBAL/Styles/font-style.scss";
@import "./Styles/colors.scss";
input,
select {
	font-size: 12px;
	align-self: flex-start;
	background: #f5f5f5 !important;
	border: #f5f5f5 !important;
	appearance: menulist !important;
	min-height: 50px !important;
	max-height: 50px !important;
}
input::-webkit-calendar-picker-indicator {
	display: none !important;
}
select,
datalist,
input {
	-webkit-appearance: none;
	-moz-appearance: none;
	-webkit-appearance: none !important;
	-moz-appearance: none !important;
	appearance: none !important;
	background-image: url("./../../assets/media/downArrowIcon.svg") !important;
	background-repeat: no-repeat !important;
	background-position-x: 88% !important;
	background-position-y: 19px !important;
}

input[type="text"]:focus,
select[type="text"]:focus,
input:focus,
select:focus,
.uneditable-input:focus {
	outline: none !important;
	box-shadow: none !important;
	text-align: start;
	background: #ffffff !important;
}
.rowHeight {
	background: #f5f5f5 !important;
	min-height: 50px;
	max-height: 50px;
	max-width: 225px;
}

option {
	padding-left: 0rem;
}
.menulist {
	color: #f5f5f5;
}
.showError {
	min-height: 30px;
	color: $globalErrorColor !important;
}
.row {
	background: #ffffff !important;
}
.GBSLT-versionLittle{
	font-size: 5px;
}
.GBSLT-smallText{
	font-size: 10px;
}
.GBSLT-bodyText{
	font-size: 12px;
}
</style>
