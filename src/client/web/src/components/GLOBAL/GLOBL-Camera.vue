<!-- 
***********************************
*  Created By : Reveal IQ         *
*  Author     : Bharath           *
*  Date       : 21 OCT 2021       *
*  Version    : 0.1.0.01.03-0122  *
***********************************
-->
<template>
<div>
  <div
    v-if="isCameraOpen"
    class="bg-light border border-rounded p-2 border-2 container smallText"
  >
    <div class="row bg-secondary m-2">
      <div class="col-sm-12">
        <div
          v-if="isCameraOpen"
          v-show="!isLoading"
          class="camera-box"
        >
          <video
            v-show="!isPhotoTaken"
            ref="camera"
            width="400"
            height="400"
            autoplay
          />

          <canvas
            v-show="isPhotoTaken"
            id="photoTaken"
            ref="canvas"
            width="100"
            height="100"
            class="p-5 m-4 rounded border-2 border border-light"
          />
        </div>
      </div>

      <div class="col-sm-12">
        <div class="row bg-light p-4">
          <div
            class="col-sm-6"
            :class="{ 'col-sm-12': !isPhotoTaken }"
          >
            <div v-if="isCameraOpen && !isLoading">
              <div
                class="btn button-color text-light"
                @click="takePhoto()"
              >
                <div v-if="isPhotoTaken && isCameraOpen">
                  <font-awesome-icon
                    icon="camera-retro"
                    class="mx-2"
                    size="1x"
                  />Retake
                </div>
                <div v-else>
                  <font-awesome-icon
                    icon="camera-retro"
                    class="mx-2"
                    size="1x"
                  />Capture
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-6">
            <div v-if="isPhotoTaken && isCameraOpen">
              <button
                class="btn button-color text-light"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
                @click="saveImage()"
              >
                <font-awesome-icon
                  icon="paperclip"
                  class="mx-2"
                  size="1x"
                />Attach
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- This block will be useful in order to insert the Loader for camera -->
      <!-- <div v-show="isCameraOpen && isLoading" class="">
      </div> -->
    </div>
  </div>
  <div
    v-if="anyErrorOccured"
    class="showError fw-bold"
  >
    {{ errorMessage }} - [{{ errorCode }}]
  </div>
</div>
</template>

<script>
import { ref } from "vue";
export default {
	props: {
		errorMessage: {
			type: String,
			default: "Media capture failed ! unable to access the camera",
		},
		errorCode: {
			type: String,
			default: "GBCAM-E001",
		},
	},
	emits: ["showPreview"],
	setup(props, { emit }) {
		const isCameraOpen = ref(false);
		const isPhotoTaken = ref(false);
		const isShotPhoto = ref(false);
		const isLoading = ref(false);
		const canvas = ref(null);
		const croppedImage = ref(null);
		const camera = ref(null);
		const anyErrorOccured = ref(false);

		// to switch ON / OFF camera
		function toggleCamera() {
			if (isCameraOpen.value) {
				isCameraOpen.value = false;
				isPhotoTaken.value = false;
				isShotPhoto.value = false;
				stopCameraStream();
			} else {
				isCameraOpen.value = true;
				createCameraElement();
			}
		}

		// to switch ON Camera
		function createCameraElement() {
			isLoading.value = true;
			const constraints = (window.constraints = {
				audio: false,
				video: true,
			});
			navigator.mediaDevices
				.getUserMedia(constraints)
				.then((stream) => {
					isLoading.value = false;
					anyErrorOccured.value = false;
					camera.value.srcObject = stream;
				})
				.catch(() => {
					isLoading.value = false;
					anyErrorOccured.value = true;
					dangerClose();
				});
		}

		// to switch OFF camera
		function stopCameraStream() {
			if (anyErrorOccured.value == false) {
				let tracks = camera.value.srcObject.getTracks();
				tracks.forEach((track) => {
					track.stop();
				});
			}
		}

		function takePhoto() {
			isPhotoTaken.value = !isPhotoTaken.value;
			croppedImage.value = canvas.value.getContext("2d");
			croppedImage.value.drawImage(
				camera.value,
				200,
				90,
				500,
				500,
				0,
				0,
				160,
				160
			);
		}

		function dangerClose() {
			toggleCamera();
		}

		function saveImage() {
			croppedImage.value = canvas.value.getContext("2d");
			croppedImage.value.drawImage(
				camera.value,
				200,
				90,
				500,
				500,
				0,
				0,
				160,
				160
			);
			croppedImage.value = canvas.value.toDataURL("image/png");
			emit("showPreview"); // emitting event to update the preview image in parent component
			toggleCamera(); //to close the camera window after capturing
		}

		return {
			isCameraOpen,
			isPhotoTaken,
			isShotPhoto,
			isLoading,
			anyErrorOccured,
			//local ref
			canvas,
			camera,
			//functions
			toggleCamera,
			createCameraElement,
			stopCameraStream,
			takePhoto,
			saveImage,
			croppedImage,
		};
	},
};
</script>

<style lang="scss" scoped>
@import "./Styles/font-style.scss";
@import "./Styles/colors.scss";
.button-color {
	background-color: $globalButtonColor;
	opacity: 1 !important;
}
.button-color:hover {
	opacity: 0.8 !important;
}
.showError {
	min-height: 30px;
	color: $globalErrorColor !important;
}
</style>
