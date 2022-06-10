<template>
  <div class="container py-5">
    <h1>Equipment Model</h1>
    <p>
      Enter all relevant information associated with this medical equipment.
    </p>
    <div>
      <ModelInformation />
    </div>
  </div>
</template>
<script>
import ModelInformation from "../../components/Model/ModelInformation.vue";
export default {
  name: "ModelScreen",
  components: { ModelInformation },
};
</script>
<style></style>
