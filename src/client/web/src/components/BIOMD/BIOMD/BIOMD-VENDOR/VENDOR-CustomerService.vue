<template>
  <section class="section p-4 rounded mt-4">
    <h5 class="pb-5">Customer Service Contact</h5>
    <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 g-3">
      <!-- Contact Number -->
      <div class="col">
        <Input
          label="Contact Number"
          type="number"
          id="contactNumber"
          placeholder="Enter Contact Number"
        />
      </div>
      <!-- Representative Name -->
      <div class="col">
        <Input
          label="Representative Name"
          type="text"
          id="repName"
          placeholder="Enter Representative Name"
        />
      </div>
      <!-- Email  -->
      <div class="col">
        <Input
          label="Email"
          type="email"
          id="email"
          placeholder="Enter email"
        />
      </div>
      <!-- Type of Personnel -->
      <div class="col">
        <Input
          label="Personnel Type"
          type="text"
          id="personnelType"
          placeholder="Enter Personnel Type"
        />
      </div>
    </div>
    <div class="col pt-2 pb-2 pl-3 pr-3 p-3">
      <Btn
        BtnName="Add New Contact"
        backgroundColor="#1266F1"
        :icon="'plus'"
        class=""
      />
    </div>
  </section>
</template>

<script setup>
import Btn from "../BIOMD-Btn.vue";
import Input from "../BIOMD-Input.vue";
</script>

<style lang="scss" scoped>
@import "../Style/BIOMD.scss";
</style>
