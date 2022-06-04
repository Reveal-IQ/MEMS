<script setup>
import NavBar from "../../components/UI/NavBar.Component.vue";
</script>
<template>
  <div class="d-flex flex-column min-vh-100">
    <NavBar />
    <main class="container">
      <slot />
    </main>
    <footer class="mt-auto">&copy; MEMS alpha version 0.0.1</footer>
  </div>
</template>

<style lang="scss" scoped></style>
