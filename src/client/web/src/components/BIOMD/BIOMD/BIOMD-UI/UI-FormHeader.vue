<template>
  <div>
    <h1 class="title fs2xl">{{ title }}</h1>
    <p class="sub-title fsSm">
      {{ subTitle }}
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: "Title",
  },
  subTitle: {
    type: String,
    default: "Sub Title Here",
  },
});
</script>

<style lang="scss" scoped>
@import "../Style/BIOMD.scss";
</style>
