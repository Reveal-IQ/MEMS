<script setup>
import ModelDescription from "./ModelDescription.vue";
import VendorSupport from "./VendorSupport.vue";
</script>

<template>
  <main>
    <form action="">
      <ModelDescription />
      <VendorSupport />
    </form>
    <!-- The final button -->
    <div class="d-flex row justify-content-center py-3">
      <!-- btn-green and a-link are custom css for MEMS check base.css -->
      <button class="btn btn-green">Create New Facility</button>
      <a class="text-center py-2 a-link">Clear Content</a>
    </div>
  </main>
</template>

<style lang="scss" scoped></style>
