<template>
  <section class="bg-white p-4 rounded mt-4">
    <h5 class="pb-5">Vendor Support</h5>

    <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 g-3">
      <!-- Vendor Site ID -->
      <div class="col-lg-4">
        <label for="vendorSite" class="form-label">Vendor Site ID</label>
        <select
          class="form-select mb-3"
          aria-label="Default select example"
          id="vendorSite"
        >
          <option selected>Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
    </div>
    <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 g-3">
      <!-- Personnel Assigned -->
      <div class="col-lg-6">
        <label for="personnel" class="form-label">Personnel Assigned</label>
        <select
          class="form-select mb-3"
          aria-label="Default select example"
          id="personnel"
        >
          <option selected>Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </div>
    </div>

    <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 g-3">
      <ButtonComponent>Add Personnel</ButtonComponent>
    </div>
  </section>
</template>

<script setup>
import ButtonComponent from "@/components/Ui/ButtonComponent.vue";
</script>

<style lang="scss" scoped></style>
