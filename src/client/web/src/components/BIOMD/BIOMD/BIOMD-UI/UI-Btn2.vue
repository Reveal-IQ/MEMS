<template>
  <button
    type="button"
    class="btn buttonBackground d-inline-flex align-items-center fs-6 rounded-pill"
    :class="class"
    :style="'--color:' + backgroundColor"
    @click="emitClickEvent()"
  >
    <font-awesome-icon :icon="icon" size="1x" class="me-2" />
    <span>{{ BtnName }}</span>

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

const emit = defineEmits(["onUserClick"]);

function emitClickEvent() {
  emit("onUserClick");
}
</script>

<style lang="scss" scoped>
.buttonBackground {
  background-color: var(--color);
  color: #ffffff;
}
</style>
