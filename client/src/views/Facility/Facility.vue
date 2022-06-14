<script>
import FacilityInformation from "@/components/Facility/FacilityInformation.vue";
export default {
  name: "FacilityScreen",
  components: { FacilityInformation },
};
</script>

<template>
  <div class="container py-5">
    <h1>New Facility</h1>
    <p>
      Enter all relevant information associated with this medical equipment.
    </p>
    <div>
      <FacilityInformation />
    </div>
  </div>
</template>

<style></style>
