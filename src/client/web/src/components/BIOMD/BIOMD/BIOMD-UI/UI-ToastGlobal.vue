<template>
  <section
    class="col-lg-6 col-md-12 col-sm-12 col-12 border-1 toastBackground rounded-3 border border-warning"
    :class="props.class"
    :style="'--color:' + props.backgroundColor"
  >
    <div class="row align-items-center my-2">
      <div
        class="col-sm-2 d-flex justify-content-md-center justify-content-center"
      >
        <font-awesome-icon
          class="iconColor text-warning text-sm-start text-center"
          :icon="icon"
          size="2x"
        />
      </div>
      <div
        class="col-sm-7 col d-flex flex-column justify-content-sm-start justify-content-center my-4 text-center text-sm-start text-secondary"
      >
        <span class="fs-6">{{ props.message }}</span>
        <span class="fsXs fw-light">{{ props.message2 }}</span>
      </div>
      <div
        class="col-sm-3 d-flex justify-content-center justify-content-lg-center"
      >
        <slot />
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  message: {
    type: String,
    default: "message here",
  },
  message2: {
    type: String,
    default: "message here",
  },
  class: {
    type: String,
    default: "",
  },
  backgroundColor: {
    type: String,
    default: "#586974",
  },

  icon: null,
});

let icon = props.icon;
</script>

<style lang="scss" scoped>
@import "../Style/font-style.scss";

.toastBackground {
  background-color: var(--color);
}
.iconColor {
  color: "#D48713";
}
</style>
