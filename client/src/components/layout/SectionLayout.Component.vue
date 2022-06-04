<script setup>
defineProps({
  title: {
    type: String,
    default: "Section Title",
  },
});
</script>

<template>
  <section class="section p-3 mb-3">
    <div class="section-title">{{ title }}</div>
  </section>
</template>

<style></style>
