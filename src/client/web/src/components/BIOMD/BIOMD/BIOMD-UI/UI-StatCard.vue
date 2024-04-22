<template>
  <div class="col-xl-2 col-lg-4 col-md-4 col-sm-6 col-6">
    <div class="">
      <div class="p-1">
        <div class="mb-3">
          <small class="mb-0">{{ props.cardTitle }}</small>
        </div>
        <div class="row align-items-center d-flex">
          <div class="col-8">
            <h2 class="d-flex align-items-center mb-0" :class="class">
              {{ props.statisticsValue }}
            </h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  cardTitle: {
    type: String,
    default: "Card Title",
  },
  statisticsValue: {
    type: String,
    default: "15,000",
  },
  class: String,
});
</script>

<style lang="scss" scoped></style>
