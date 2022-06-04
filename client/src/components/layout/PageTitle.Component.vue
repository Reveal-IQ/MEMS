<script setup>
defineProps({
  title: {
    type: String,
    default: "Page Title",
  },
  subTitle: {
    type: String,
    default: "General Infomation about this Page!",
  },
});
</script>
<template>
  <div>
    <div class="title mt-4 mb-2">{{ title }}</div>
    <p class="sub-title mb-3">{{ subTitle }}</p>
  </div>
</template>

<style lang="scss" scoped></style>
