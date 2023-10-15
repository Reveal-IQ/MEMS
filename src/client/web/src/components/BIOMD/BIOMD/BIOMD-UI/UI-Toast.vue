<template>
  <div>
    {{ message }}
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
