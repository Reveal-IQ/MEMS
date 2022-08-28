<template>
  <label :for="id" class="form-label" v-if="label">{{ label }}</label>
  <div class="input-group mb-3">
    <input
      v-bind="$attrs"
      :placeholder="placeholder"
      :id="id"
      :type="type"
      class="form-control"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    default: "label",
  },
  placeholder: {
    type: String,
    default: "",
  },
  id: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  modelValue: {
    type: [String, Number],
    default: "",
  },
});

// const emit = defineEmits(["update"])
</script>

<style lang="scss" scoped></style>
