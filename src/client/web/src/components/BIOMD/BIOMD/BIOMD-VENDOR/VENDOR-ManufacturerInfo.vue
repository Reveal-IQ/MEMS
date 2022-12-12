<template>
  <Section sectionTitle="Manufacturer Information">
    <div
      class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 g-3 mb-3"
    >
      <!-- Manufacturer Information -->
      <div class="col">
        <label for="manufacturerList" class="form-label">Manufacturer</label>
        <input
          class="form-control"
          list="manufacturerOptions"
          id="manufacturerList"
          placeholder="Search and Select Manufacturer..."
          autocomplete="off"
        />
        <datalist id="manufacturerOptions">
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
