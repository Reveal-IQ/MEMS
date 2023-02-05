<template>
  <Section sectionTitle="Model Information">
    <div
      class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 g-3 mb-3"
    >
      <!-- Manufacturer Information -->
      <div class="col">
        <label for="modelList" class="form-label">Model</label>
        <input
          class="form-control"
          list="modelOptions"
          id="modelList"
          placeholder="Search and Select Model..."
          autocomplete="off"
        />
        <datalist id="modelOptions">
          <option value="General Electric" />
        </datalist>
      </div>
    </div>
    <div class="col">
      <slot />
    </div>
  </Section>
</template>

<script setup>
import Input from "../BIOMD-UI/UI-Input.vue";
import Section from "../BIOMD-UI/UI-Section.vue";
</script>

<style lang="scss" scoped>
@import "../Style/BIOMD.scss";
</style>
