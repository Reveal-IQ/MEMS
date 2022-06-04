<script setup>
import LayoutDefault from "./Layout/LayoutDefault.vue";
</script>

<template>
  <layout-default>
    <div class="about">
      <h1>This is an about page</h1>
    </div>
  </layout-default>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
