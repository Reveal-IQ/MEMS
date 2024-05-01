<template>
  <div
    class="g-3 mb-2 mt-2 rounded container py-2 align-middle"
    style="background-color: #f5f6f6"
  >
    <div class="" style="cursor: pointer">
      <div class="row">
        <td class="">
          <small class="text-secondary fsXs text-black">{{
            props.title
          }}</small>
        </td>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: "Enter title",
  },
});
</script>

<style lang="scss" scoped></style>
