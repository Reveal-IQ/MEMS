<template>
  <div
    class="align-items-center text-white border-0 p-3 rounded-1"
    style="background-color: #e3f6f5"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
  >
    <div class="d-flex" style="color: #298a85">
      <div class="fsXs">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  message: {
    type: String,
    required: true,
    default: "Enter your message here",
  },
});
</script>

<style lang="scss" scoped>
@import "../Style/font-style.scss";
</style>
