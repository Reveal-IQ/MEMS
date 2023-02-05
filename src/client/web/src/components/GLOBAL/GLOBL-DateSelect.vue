<!-- 
***********************************
*  Created By : Reveal IQ         *
*  Author     : Bharath           *
*  Date       : 21 OCT 2021       *
*  Version    : 0.1.0.01.06-0122  *
***********************************
-->
<template>
<div>
  <!-- Block for User Input -->
  <div
    class="row align-items-center mx-2 pb-3 rowHeight my-0 border-0"
    :class="{
      rowFocus: textBoxFocus,
      rowErrorFocus: showNullError || showMaxError || showMinError,
    }"
  >
    <div class="col-sm-12 col-xs-12 px-0">
      <div class="row">
        <div class="col-sm-12">
          <div
            class="form-floating"
            @blur="isitNull"
          >
            <input
              v-model="selectedDate"
              :type="validationType"
              class="form-select border-0 smallText"
              :min="minDate"
              :max="maxDate"
              :disabled="disable"
              @blur="isitNull"
              @change="isitNull"
              @focus="onFocus"
            >
            <label class="smallText"> {{ labelName }} </label>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- ! Block to show Error -->
  <div class="row align-items-center mx-2 mx-0">
    <div class="col-sm-12 col-xs-12 mx-0 px-1 showError">
      <div
        v-if="showMaxError"
        class="mediumText smallText fw-bold"
      >
        {{ maxErrorMessage }} - {{ maxErrorCode }}
      </div>
      <div
        v-if="showMinError"
        class="mediumText smallText fw-bold"
      >
        {{ minErrorMessage }} - {{ minErrorCode }}
      </div>
      <div
        v-if="nullError && showNullError"
        class="mediumText smallText fw-bold"
      >
        {{ nullErrorMessage }} - {{ nullErrorCode }}
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
			default: "GBDTS-DateSelect",
		},
		minDate: {
			type: Date,
			default:null
		},
		maxDate: {
			type: Date,
			default:null
		},
		validationType: {
			type: String,
			default: "date",
		},
		minErrorMessage: {
			type: String,
		},
		minErrorCode: {
			type: String,
		},
		maxErrorMessage: {
			type: String,
		},
		maxErrorCode: {
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
	// ? here we are not using props in setup Block but i passed it because it will cause syntactical Error if we dont pass.
	setup(props, { emit }) {
		// local variables
		const { nullError, maxDate, minDate, validationError } = toRefs(props);
		const selectedDate = ref(null);
		const showNullError = ref(null);
		const showMinError = ref(null);
		const showMaxError = ref(null);
		const textBoxFocus = ref(null);

		// ? it will check the Dateselect is Null or Not Null after focusing Out
		function isitNull() {
			textBoxFocus.value = false;
			if (selectedDate.value == null || selectedDate.value == "") {
				if (nullError.value == true) {
					showMinError.value = false;
					showMaxError.value = false;
					showNullError.value = true;
				}
			} else {
				showNullError.value = false;
				isitValid();
				textBoxFocus.value = false;
				emit("receiveData", selectedDate.value);
			}
		}

		// ? it will show the Blue border & change the background to white if user focus on DateSelect box
		function onFocus() {
			textBoxFocus.value = true;
		}

		//  ? it will check wheather date selected by the user is between min and max range or Not
		function isitValid() {
			// ? Date selection evaluation if it is more than max range
			if (selectedDate.value > maxDate.value) {
				showMinError.value = false;
				showMaxError.value = true;
				// ? Date selection evaluation if it is less than min range
			} else if (selectedDate.value < minDate.value) {
				showMaxError.value = false;
				showMinError.value = true;
			} else {
				// ? if date selected is inside the max and min range
				showMinError.value = false;
				showMaxError.value = false;
			}
		}

		return {
			// ? local variables
			selectedDate,
			showNullError,
			showMinError,
			showMaxError,
			textBoxFocus,
			// ? local functions
			isitNull,
			isitValid,
			onFocus,
		};
	},
};
</script>

<style lang="scss" scoped>
// ? This is to customize the bootstrap default attributes of the styles
@import "../../scss/custom.scss";
@import "./Styles/font-style.scss";
@import "./Styles/colors.scss";

input[type="month"]::-webkit-calendar-picker-indicator {
	color: #adadad;
	display: block;
	background: url(./../../assets/media/calendarIcon.svg) no-repeat;
	width: 20px;
	height: 27px;
}
input[type="date"]::-webkit-calendar-picker-indicator {
	color: #adadad;
	display: block;
	background: url(./../../assets/media/calendarIcon.svg) no-repeat;
	width: 20px;
	height: 27px;
}
input {
	align-self: flex-start;
	background: #f5f5f5 !important;
	min-height: 40px !important;
	max-height: 40px !important;
}
input[type="date"]:focus,
input:focus,
.uneditable-input:focus {
	outline: none !important;
	box-shadow: none !important;
	text-align: start;
	background: #ffffff !important;
}
.rowFocus {
	border-bottom: solid 3px !important;
	border-color: transparent transparent #57aecb transparent !important;
	border-radius: 0 !important;
	background: #ffffff !important;
}
.rowErrorFocus {
	border-bottom: solid 3px !important;
	border-color: transparent transparent $globalErrorColor transparent !important;
	border-radius: 0 !important;
	background: #ffffff !important;
}
.ErrorIcon {
	background: #f5f5f5;
}
.ErrorIconFocus {
	background: #ffffff;
}
.rowHeight {
	background: #f5f5f5;
	min-height: 50px;
	max-height: 50px;
	max-width: 225px;
	border-radius: 5px;
}
.showError {
	min-height: 30px;
	color: $globalErrorColor !important;
}
</style>
