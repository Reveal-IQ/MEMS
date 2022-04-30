<script setup>
import { defineProps } from "vue";

defineProps({
  label: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: "",
  },
  modelValue: {
    type: [String, Number],
    default: "",
  },
});
</script>

<template>
  <div>
    <label for="Input">{{ label }}</label>
    <input
      class="form-control"
      v-bind="$attrs"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', $equipment.target.value)"
      aria-label="label"
    />
  </div>
</template>

<style scoped></style>
