<template>
  <section class="section p-4 rounded mt-4">
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
      <div class="col">
        <button class="btn btn-primary rounded-pill btn-small">
          Add Personnel
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path
              d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup></script>

<style lang="scss" scoped></style>
