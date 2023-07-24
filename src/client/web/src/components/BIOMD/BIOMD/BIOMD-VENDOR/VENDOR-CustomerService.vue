<template>
  <Section sectionTitle="Customer Service Contact">
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
          label="Contact Name"
          type="text"
          id="contactName"
          placeholder="Enter Contact Name"
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
    <div class="col">
      <Btn2
        BtnName="Add"
        :icon="'plus'"
        backgroundColor="none"
        @click="add"
        class="text-primary btn-sm"
      />
    </div>
  </Section>
</template>

<script setup>
import Btn2 from "../BIOMD-UI/UI-Btn2.vue";
import Input from "../BIOMD-UI/UI-Input.vue";
import Section from "../BIOMD-UI/UI-Section.vue";
</script>

<style lang="scss" scoped>
@import "../Style/BIOMD.scss";
</style>
