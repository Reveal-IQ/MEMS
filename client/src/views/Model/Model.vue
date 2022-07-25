<script>
import ModelDescription from "@/components/Model/ModelDescription.vue";
import VendorSupport from "@/components/Model/VendorSupport.vue";
export default {
  name: "ModelScreen",
  components: { ModelDescription, VendorSupport },
};
</script>

<template>
  <div class="container py-5">
    <h1 class="title">Equipment Model</h1>
    <p class="sub-title">
      Enter all relevant information associated with this medical equipment.
    </p>
    <main>
      <ModelDescription />
      <VendorSupport />
      <div class="d-flex row justify-content-center py-3">
        <!-- btn-green and a-link are custom css for MEMS check base.css -->
        <button class="btn btn-green">Create New Facility</button>
        <a class="text-center py-2 a-link">Clear Content</a>
      </div>
    </main>
  </div>
</template>

<style></style>
