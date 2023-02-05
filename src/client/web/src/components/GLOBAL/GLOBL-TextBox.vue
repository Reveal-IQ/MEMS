<!--
***********************************
*  Created By : Reveal IQ         *
*  Author     : Bharath           *
*  Date       : 15 SEP 2021       *
*  Version    : 0.12.0.03.13-0322 *
***********************************
-->
<template>
<div>
  <!--
*********************************************************************************************************
*    Please refer to style block to understand styles names better                                      *
*-------------------------------------------------------------------------------------------------------*
*  textBoxFocus        => useful in changing the Border color of textBox during error                   *
*  showValidationError => useful in showing the validation Error related styles during validation Error *
*  showNullError       => useful in showing the Null Error related styles during null Error             *
*********************************************************************************************************
-->
  <div
    class="row align-items-center mx-2 pb-3 my-0 border-0"
    :class="{
      WOEtextFocus: textBoxFocus,
      WEtextFocus:
        textBoxFocus &&
        (showValidationError || showNullError || showFormatError),
      WOEtextBlur: showValidationError || showNullError || showFormatError,
      WEtextBlur:
        (showValidationError || showNullError || showFormatError) &&
        !textBoxFocus,
      rowBlur: !showValidationError || !showNullError || !showFormatError,
      rowFocus: textBoxFocus,
      rowErrorBlur:
        (showValidationError || showNullError || showFormatError) &&
        !textBoxFocus,
      rowErrorFocus:
        textBoxFocus &&
        (showValidationError || showNullError || showFormatError),
    }"
  >
    <div class="col-sm-10 col-xs-10 px-0">
      <div class="form-floating">
        <input
          v-if="true"
          :id="`${labelName}`"
          v-model="userInput"
          class="form-control rounded-0 border-0 GBTXT-bodyText"
          :placeholder="`${labelName}`"
          :maxlength="maxLength"
          :disabled="disable == true"
          @focus="textBoxFocus = true"
          @blur="verifyData()"
          @input="restrictInvalidInput()"
        >
        <label class="GBTXT-bodyText">
          {{ labelName }}
        </label>
      </div>
    </div>
    <div
      class="col-sm-2 col-xs-2 p-0 d-flex justify-content-center"
      :class="textBoxFocus ? 'ErrorIconFocus' : 'ErrorIcon'"
    >
      <font-awesome-icon
        v-if="showValidationError || showNullError || showFormatError"
        icon="exclamation-triangle"
        size="1x"
        class="align-self-end mt-4"
      />
    </div>
  </div>

  <!-- Block to show any Error -->
  <div class="row align-items-center">
    <div class="col-sm-12 col-xs-12 mx-2 showError">
      <div
        v-if="showValidationError"
        class="fw-normal"
      >
      <span class="GBTXT-smallText">{{ validationErrorMessage }} - </span><span class="GBTXT-versionLittle">{{ validationErrorCode }}</span> 
      </div>
      <div
        v-if="showNullError"
        class="fw-normal"
      >
      <span class="GBTXT-smallText">{{ nullErrorMessage }} - </span>  <span class="GBTXT-versionLittle">{{ nullErrorCode }}</span>
      </div>
      <div
        v-if="showFormatError"
        class="fw-normal"
      >
	  <span class="GBTXT-smallText">{{ formatErrorMessage }} - </span>
        <span class="GBTXT-versionLittle">{{ formatErrorCode }}</span>
      </div>
    </div>
  </div>
</div>

</template>

<script>
import { ref, toRefs } from "vue";

export default {
	props: {
		labelName: {
			type: String,
		},
		maxLength: {
			type: Number,
			default: 500,
		},
		validationType: {
			type: String,
			default: null,
		},
		customValidation: {
			type: String,
			default: null,
		},
		validationErrorMessage: {
			type: String,
		},
		validationErrorCode: {
			type: String,
		},
		formatType: {
			type: String,
			default: null,
		},
		customFormat: {
			type: String,
			default: null,
		},
		formatErrorMessage: {
			type: String,
		},
		formatErrorCode: {
			type: String,
		},
		nullError: {
			type: Boolean,
			default: false,
		},
		nullErrorMessage: {
			type: String,
		},
		nullErrorCode: {
			type: String,
		},
		disable: {
			type: Boolean,
			default: false,
		},
	},
	emits: ["receiveData"],
	setup(props, { emit }) {
		// ? props received from parent Component
		const {
			validationType,
			customValidation,
			formatType,
			customFormat,
			nullError,
		} = toRefs(props);

		// ? Local Variables
		const textBoxFocus = ref(false);
		const userInput = ref(null);
		const showValidationError = ref(null);
		const showNullError = ref(null);
		const showFormatError = ref(null);

		const preDefinedValidationType = {
			alpha: "^[a-zA-Z_ ]*$",
			numeric: "^[0-9]+$",
			alphanumeric: "^[a-zA-Z0-9 ]+$",
			textual: "^[#.0-9a-zA-Z\\s,\\-\\/$!%&'*+\\/=?^_`{|}~@:()\\\\]+$",
			password:
				"^(?=.*\\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\\w\\d\\s:])([^\\s]){8,16}$",
			email: "^[#.0-9a-zA-Z\\s,\\-\\/$!%&'*+\\/=?^_`{|}~@:()\\\\]+$",
			custom: customValidation.value,
		};

		const preDefinedFormatType = {
			mobilenumber: "^[6789]\\d{9}$",
			email:
				"^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$",
			phonenumber: "^(\\d{9}|\\d{14})$",
			age: "^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$",
			custom: customFormat.value,
		};

		// ? Function will check the data before user enters data
		function restrictInvalidInput() {
			if (validationType.value != null) {
				if (
					!RegExp(preDefinedValidationType[validationType.value]).test(
						userInput.value
					)
				) {
					userInput.value = userInput.value.slice(0, -1);
				} else {
					emit("receiveData", userInput.value);
				}
			}
		}

		// ? Function will check the data after user focus Out textbox data. will be evaluated with validation / format / Null / Fill Errors mentioned in Props.
		function verifyData() {
			textBoxFocus.value = false;

			// ? Hiding all the errors
			showNullError.value = false;
			showValidationError.value = false;
			showFormatError.value = false;

			// ? This block is to show Null Error
			if (
				(userInput.value == null || userInput.value == "") &&
				nullError.value == true
			) {
				showNullError.value = true;
				emit("receiveData", null);
			}

			// ? This block is to show validation Error
			else if (
				validationType.value != null &&
				!RegExp(preDefinedValidationType[validationType.value]).test(
					userInput.value
				)
			) {
				showValidationError.value = true;
				emit("receiveData", null);
			}

			// ? This block is to show the format Error
			else if (
				formatType.value != null &&
				!RegExp(preDefinedFormatType[formatType.value]).test(userInput.value)
			) {
				showFormatError.value = true;
				emit("receiveData", null);
			}

			// ? This block is to send user input to parent component
			else {
				showNullError.value = false;
				showValidationError.value = false;
				showFormatError.value = false;
				emit("receiveData", userInput.value);
			}
		}

		return {
			// ? local Vars
			textBoxFocus,
			userInput,
			showValidationError,
			showNullError,
			showFormatError,
			// ? local function
			restrictInvalidInput,
			verifyData,
		};
	},
};
</script>

<style lang="scss" scoped>
@import "../../scss/custom.scss";
// @import "./Styles/font-style.scss";
@import "./Styles/colors.scss";

input {
	font-size: 12px;
	align-self: flex-start;
	background: #f5f5f5 !important;
	min-height: 40px !important;
	max-height: 40px !important;
	border-radius: 5px;
}
input[type="text"]:focus,
input:focus,
.uneditable-input:focus {
	outline: none !important;
	box-shadow: none !important;
	text-align: start;
	background: #ffffff !important;
}
// TextBox classes Defined as below according to the scenarios
/*  
WOE ---> With out Error
WE  ---> With Error

    WOE : TextFocus --> white background
	WE  : TextFocus --> white background
	WOE : TextBlur  --> grey background
	WE  : TextBlur  --> grey background
*/
.WOEtextFocus {
	border-bottom: solid 3px !important;
	border-color: transparent transparent $globalButtonColor transparent !important;
	border-radius: 0 !important;
	background: #ffffff !important;
}
.WEtextFocus {
	border-bottom: solid 3px !important;
	border-color: transparent transparent $globalErrorColor transparent !important;
	border-radius: 0 !important;
	background: #ffffff !important;
}
.WOEtextBlur {
	background: #f5f5f5 !important;
}
.WEtextBlur {
	border-bottom: solid 3px !important;
	border-color: transparent transparent $globalErrorColor transparent !important;
	border-radius: 0 !important;
	background: #f5f5f5 !important;
}
.ErrorIcon {
	background: #f5f5f5;
	color: $globalErrorColor !important;
}
.ErrorIconFocus {
	background: #ffffff;
	color: $globalErrorColor !important;
}
// Row having both textbox and Error Icon classes Defined as below
/*  
    rowFocus      --> during focus on textbox
	rowBlur       --> during focus out from textbox
	rowErrorBlur  --> during error if we focus out textBox
	rowErrorFocus --> during error if we focus on textBox
*/
.rowBlur {
	background: #f5f5f5 !important;
	min-height: 50px;
	max-height: 50px;
	border-radius: 5px;
}
.rowFocus {
	background: #ffffff !important;
	min-height: 50px;
	max-height: 50px;
	border-radius: 5px;
}
.rowErrorFocus {
	background: #ffffff !important;
	min-height: 50px;
	max-height: 50px;
	border-radius: 5px;
}
.rowErrorBlur {
	background: #f5f5f5 !important;
	min-height: 50px;
	max-height: 50px;
	border-radius: 5px;
}
// show Error class will be applied during the All Null error and Validation Error and Format Error
.showError {
	min-height: 30px;
	color: $globalErrorColor !important;
}

.GBTXT-versionLittle{
	font-size: 5px;
}
.GBTXT-smallText{
	font-size: 10px;
}
.GBTXT-bodyText{
	font-size: 12px;
}
</style>
