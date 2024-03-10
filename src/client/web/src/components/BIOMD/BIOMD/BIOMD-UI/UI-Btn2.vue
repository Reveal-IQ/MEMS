<template>
  <button
    type="button"
    class="btn buttonBackground d-inline-flex align-items-center fs-6 rounded"
    :class="class"
    :style="'--color:' + backgroundColor"
  >
    <font-awesome-icon :icon="icon" size="1x" class="me-2" />
    <span class="fsXs">{{ BtnName }}</span>

    <slot />
  </button>
</template>

<script setup>
const props = defineProps({
  BtnName: {
    type: String,
    default: "Button Name",
  },
  class: {
    type: String,
    default: "",
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

const emit = defineEmits([""]);

function emitClickEvent() {
  emit("");
}
</script>

<style lang="scss" scoped>
@import "../Style/font-style.scss";
.buttonBackground {
  background-color: var(--color);
}

button:focus {
  outline: none;
  box-shadow: none;
}
</style>
