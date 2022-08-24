<template>
  <section class="section p-4 rounded mt-4">
    <h5 class="pb-5">Additional Information</h5>

    <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 g-3">
      <!-- Comments -->
      <div class="col-lg-12 col-md-12 mb-3">
        <label for="comment" class="form-label">Comments</label>
        <div class="input-group">
          <input
            type="text"
            class="form-control"
            id="comment"
            aria-describedby="basic-addon3"
            placeholder="Enter Comments"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup></script>

<style lang="scss" scoped>
@import "../../BIOMD/Style/BIOMD.scss";
</style>
