<template>
  <Section sectionTitle="Customer Service Contact">
    <!-- Representative Name -->
    <div class="col-lg-6">
      <Input
        label="Representative Name"
        type="text"
        id="contactName"
        placeholder="Enter Representative Name"
        v-model="contactInfo.representativeName"
      />
    </div>
    <!-- Contact Number -->
    <div class="col-lg-6">
      <Input
        label="Contact Number"
        type="number"
        id="contactNumber"
        placeholder="Enter Contact Number"
        v-model="contactInfo.contactNumber"
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
      <Input
        label="Contact Type"
        type="text"
        id="contactType"
        placeholder="Enter Contact Type"
        v-model="contactInfo.contactType"
      />
    </div>

    <div class="col-lg-6">
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
