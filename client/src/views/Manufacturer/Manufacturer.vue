<script>
// import the components we need
import ManufacturerInformation from "@/components/Manufacturer/ManufacturerInformation.vue";

export default {
  // name of the component, so we can export and import it in other files
  name: "ManufacturerScreen",
  components: {
    // make sure to add the component name here
    ManufacturerInformation,
  },
};
</script>
<template>
  <div class="container py-5">
    <h1>New Manufacturer</h1>
    <p>Page Subheading and instructions</p>
    <div>
      <ManufacturerInformation />
    </div>
  </div>
</template>

<style></style>
