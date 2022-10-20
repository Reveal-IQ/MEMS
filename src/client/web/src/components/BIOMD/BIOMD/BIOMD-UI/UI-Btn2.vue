<template>
  <button
    type="button"
    class="btn buttonBackground"
    :style="'--color:' + backgroundColor"
    @click="emitClickEvent()"
  >
    {{ BtnName }}

    <font-awesome-icon :icon="icon" size="1x" class="text-light" />

    <slot />
  </button>
</template>

<script setup>
const props = defineProps({
  BtnName: {
    type: String,
    default: "Button Name",
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
