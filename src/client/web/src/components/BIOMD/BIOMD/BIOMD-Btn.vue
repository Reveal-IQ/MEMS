<template>
  <!-- reusable Button Block -->
  <div
    class="row d-flex align-items-center justify-content-center button fw-bold buttonBackground"
    :style="'--color:' + backgroundColor"
    @click="emitClickEvent()"
  >
    <div
      class="col-sm-10 bodyText d-flex justify-content-center align-center mt-3"
    >
      <p class="pe-2">{{ BtnName }}</p>
      <div class="iconFont text-light">
        <font-awesome-icon :icon="icon" size="1x" />
      </div>
    </div>
    <div class="col-sm-2 mx-auto" v-if="showLoader">
      <img src="../../../assets/media/btn_loader.gif" alt="" class="gifImage" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  BtnName: {
    type: String,
    default: "Button",
  },
  showLoader: {
    type: Boolean,
    default: false,
  },
  backgroundColor: {
    type: String,
    default: "#586974",
  },
  icon: null,
});

let icon = props.icon;

const emit = defineEmits(["onUserClick"]);

function emitClickEvent() {
  emit("onUserClick");
}
</script>

<style lang="scss" scoped>
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
  border-radius: 5px;
  font-size: 14px !important;
  font-style: normal;
  color: #ffffff;
  cursor: pointer;
}

.buttonBackground {
  background-color: var(--color);
}
</style>
