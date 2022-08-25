<template>
  <h1 class="title headerText">{{ title }}</h1>
  <p class="sub-title bodyText">
    {{ subTitle }}
  </p>
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
@import "../BIOMD/Style/BIOMD.scss";
</style>
