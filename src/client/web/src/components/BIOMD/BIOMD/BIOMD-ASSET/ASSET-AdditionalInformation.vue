<template>
  <Section sectionTitle="Additional Information">
    <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 g-3">
      <!-- Comments -->
      <div class="col-lg-12 col-md-12 mb-3">
        <label for="commentSection" class="form-label">Comments</label>
        <div class="input-group">
          <textarea
            type="text"
            class="form-control"
            id="commentSection"
            aria-describedby="basic-addon3"
            placeholder="Enter Comments"
            v-model="comment"
          ></textarea>
        </div>
      </div>
    </div>
  </Section>
</template>

<script setup>
import { inject } from "vue";
import Section from "../BIOMD-UI/UI-Section.vue";

const comment = inject("comment");
</script>

<style lang="scss" scoped>
@import "../../BIOMD/Style/BIOMD.scss";
</style>
