<script setup>
import { RouterView } from "vue-router";
import NavigationHeader from "./views/Navigation/navigation-header.vue";
import NavigationFooter from "./views/Navigation/navigation-footer.vue";
</script>

<template>
  <main>
    <div class="header">
      <NavigationHeader />
    </div>
    <div>
      <RouterView />
    </div>
    <div class="footer">
      <NavigationFooter />
    </div>
  </main>
</template>

<style>
@import "@/assets/base.css";

#app {
  height: 100%;
}
</style>
