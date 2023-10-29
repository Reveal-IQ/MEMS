<template>
  <div>
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
  </div>
</template>

<script setup>
const propos = defineProps({
  message: {
    type: String,
  },
});
</script>

<style lang="scss" scoped></style>
