<template>
<!-- 
***********************************
*  Created By : Reveal IQ         *
*  Author     : Bharathi          *
*  Date       : 28 OCT 2020       *
*  Version    : 0.1.0.01.14-1020  *
***********************************
-->
  <section>
    <!-- ****** Registartion Camera ******-->
    <div class="IconFont"  v-if="openVideo==null"
      :class="camok===0 && picok==0 ? 'cameraNormal':'camerasub'">
      <font-awesome-icon icon="camera-retro" @click="startCamera()"
       class="cameraIcon" />
    </div>
    <!--**** Image Capture ****-->
    <div class="row"  v-if="openVideo==null"
      :class="camok===1 && picok==1?'cameraNormal':'camerasub'">
      <div class="col-3">
        <!--***** Captured Image ****-->
        <img
          v-bind:src="captures[captures.length-1]"
          :class="captures.length!==0 ? 'regImage': 'regImgDump'"/>
        <!-- ****** Retake Button ******-->
   
        <button id="retake" @click="startCamera()" class="retakeImgBtn">
          Retake
       </button>
      </div>
    </div>
 <!-- ****** Video  Container ********-->
    <div v-if="openVideo=='camera'" class="cameraContainer">
      <div>
        <video ref="localVideo"  id="video"   autoplay
          :class="captures.length===0?'cameravideo':'camerasub'"
        ></video>
        <canvas  ref="canvas"    id="canvas"   width="600"  height="350"
         :class="captures.length!==0 ? 'cameravideo':'camerasub'"
        ></canvas>
      </div>
      <div class="row smallText" v-if="cap===0">
        <div class="col-12 cameraBtnSpace" align="center">
          <button id="snap" v-on:click="capture()" class="captureBtn">Capture</button>
          <button class="captureBtn" @click="cancel()">Cancel</button>
        </div>
      </div>
      <div class="row smallText" v-else :class="cap===1?'cameraNormal':'camerasub'">
        <div class="col-12 cameraBtnSpace" align="center">
          <button id="retake" @click="retakeCamera()" class="retakeBtn">
            <font-awesome-icon icon="camera-retro" class="retakeIcon" />
            <span class="retakeModalBtn">Retake</span>
          </button>
          <button class="captureBtn" @click="handleOk()">Attach</button>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapState } from "vuex";
import { comBus } from "../../main";
export default {
  data() {
    return {
      openVideo: null,
      canvas: {},
      captures: [],
      context: {},
      cap: 0,
      picok: 0,
      show: false
    };
  },
  props: {
    rcontent: {},
    puuid: null,
    pid: null,
    pdata: null
  },
  methods: {
    //Clear picture
    clearpic() {
      this.picok = 1;
    },
    capture() {
      this.cap = 1;
      this.canvas = this.$refs.canvas;
      this.context = this.canvas
        .getContext("2d")
        .drawImage(this.$refs.localVideo, 0, 0);
      this.captures.push(this.$refs.canvas.toDataURL("image/png"));
      let stream = this.$refs.localVideo.srcObject;
      let tracks = stream.getTracks();
      tracks.forEach(function(track) {
        track.stop();
      });
    },
    //Camera to start
    async startCamera() {
      this.captures = [];
      this.cap = 0;
      let stream = null;
      this.openVideo = "camera";
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        this.$refs.localVideo.srcObject = stream;
        this.$refs.localVideo.play();
      } catch (err) {
        this.$parent.cameraErr = true;
      }
    },
    retakeCamera() {
      this.captures = [];
      this.cap = 0;
      navigator.mediaDevices.getUserMedia({ video: true }).then(mediaStream => {
        this.$refs.localVideo.srcObject = mediaStream;
        this.$refs.localVideo.play();
      });
    },
    //To save  image to attach
    handleOk() {
      let pic = this.captures[this.captures.length - 1];
      this.$parent.pic = pic;
      this.$store.commit("setcam", 1);
      this.picok = 1;
      this.$parent.regitValidation();
      this.$parent.imageStatus = true;
      this.openVideo = null;
    },
    cancel() {
      this.openVideo = null;
      this.picok = 0;
      let stream = this.$refs.localVideo.srcObject;
      let tracks = stream.getTracks();
      tracks.forEach(function(track) {
        track.stop();
      });
      this.camok = 0;
    }
  },
  created() {
    this.comBus.on("setEdit", data => {
      this.show = data;
    });
    if (this.pdata != null) {
      this.captures.push(this.pdata);
      this.$store.commit("setcam", 1);
      this.picok = 1;
    }
  },
  computed: mapState(["camok", "ActiveApp"]),
  watch: {
    pdata(newValue, oldValue) {
      this.value = newValue;
      this.pdata = this.value;
      if (this.pdata != null) {
        this.captures.push(this.pdata);
        this.$store.commit("setcam", 1);
        this.picok = 1;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./Styles/font-style.scss";
@import "./Styles/camera.scss";
</style>