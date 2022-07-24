<script>
// import the components we need
import VendorInformation from "@/components/Vendor/VendorInformation.vue";

export default {
  // name of the component, so we can export and import it in other files
  name: "VendorScreen",
  components: {
    // make sure to add the component name here
    VendorInformation,
  },
};
</script>
<template>
  <div class="container py-5">
    <h1 class="title">New Vendor</h1>
    <p class="sub-title">Page Subheading and instructions</p>
    <div>
      <VendorInformation />
    </div>
  </div>
</template>

<style></style>
