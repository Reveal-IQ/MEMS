<template>
  <section class="section p-4 rounded shadow-sm">
    <h5 class="pb-3 fsXl section-title">{{ sectionTitle }}</h5>
    <slot />
  </section>
</template>

<script setup>
const props = defineProps({
  sectionTitle: {
    type: String,
    default: "Section Title",
  },
});
</script>

<style lang="scss" scoped>
@import "../Style/BIOMD.scss";
</style>
