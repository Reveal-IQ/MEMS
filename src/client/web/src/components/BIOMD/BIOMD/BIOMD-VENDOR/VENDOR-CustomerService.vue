<template>
  <Section sectionTitle="Customer Service Contact">
    <!-- Representative Name -->
    <div class="col-lg-6">
      <Input
        label="Representative Name"
        type="text"
        id="contactName"
        placeholder="Enter Representative Name"
        v-model="contactInfo.name"
      />
    </div>
    <!-- Contact Number -->
    <div class="col-lg-6">
      <Input
        label="Contact Number"
        type="number"
        id="contactNumber"
        placeholder="Enter Contact Number"
        v-model="contactInfo.number"
      />
    </div>
    <!-- Email  -->
    <div class="col-lg-6">
      <Input
        label="Email"
        type="email"
        id="email"
        placeholder="Enter email"
        v-model="contactInfo.email"
      />
    </div>
    <!-- Type of Personnel -->
    <div class="col-lg-6">
      <label for="type" class="form-label">Type of Personnel</label>
      <div class="input-group">
        <input
          class="form-control"
          list="contactTypeOptions"
          id="type"
          placeholder="Select Contact Type"
          autocomplete="off"
          v-model="contactInfo.type"
        />
      </div>
      <datalist id="contactTypeOptions">
        <option />
        Select Contact Type
      </datalist>
    </div>

    <div class="col-lg-6 mt-4">
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
import { inject } from "vue";
import Btn2 from "../BIOMD-UI/UI-Btn2.vue";
import Input from "../BIOMD-UI/UI-Input.vue";
import Section from "../BIOMD-UI/UI-Section.vue";

const contactInfo = inject("contactInfo");
</script>

<style lang="scss" scoped>
@import "../Style/BIOMD.scss";
</style>
