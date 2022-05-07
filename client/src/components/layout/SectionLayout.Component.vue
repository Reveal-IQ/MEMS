<script setup>
import BaseInput from "@/components/UI/BaseInput.Component.vue";
import { ref, defineProps } from "vue";

const equipment = ref({ number: 0 }, { name: "" }, { date: "" });
// const title = ref("Section Title");

defineProps({
  title: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <section class="section mb-3">
    <div class="section-title mb-3">{{ title }}</div>
    <form class="row g-3">
      <div class="col">
        <BaseInput
          v-model="equipment.number"
          label="Equipment Number"
          type="number"
          placeholder=""
        />
      </div>
      <div class="col">
        <BaseInput
          v-model="equipment.name"
          label="Equipment Name"
          type="text"
          placeholder="Enter Equipment Name"
        />
      </div>
      <div class="col">
        <BaseInput
          v-model="equipment.date"
          label="Year of Manufacture"
          type="date"
        />
      </div>
    </form>
  </section>
</template>

<style></style>
