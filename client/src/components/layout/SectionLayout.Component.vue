<template>
  <section class="section mb-3">
    <div class="section-title mb-3">Basic Information</div>
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
          v-model="equipment.serial"
          label="Equipment Serial"
          type="text"
          placeholder="Enter Equipment Serial"
        />
      </div>
    </form>
  </section>
</template>

<script setup>
import BaseInput from "@/components/UI/BaseInput.Component.vue";
import { ref } from "vue";

const equipment = ref({ number: 0 }, { name: "" }, { serial: "" });
</script>

<style></style>
