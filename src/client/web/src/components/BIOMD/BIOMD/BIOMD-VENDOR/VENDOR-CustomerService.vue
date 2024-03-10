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
    <div class="col-lg-6 mb-3">
      <label for="typeList" class="form-label">Type of Personnel</label>
      <select
        id="typeList"
        class="form-select"
        aria-label="Default select example"
        v-model="contactInfo.type"
        placeholder="Enter Contact Number"
      >
        <option
          v-for="list in typeList"
          :key="list.value"
          :value="list.value"
          :selected="list.selected"
        >
          {{ list.name }}
        </option>
      </select>
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
import { ref, inject } from "vue";
import Btn2 from "../BIOMD-UI/UI-Btn2.vue";
import Input from "../BIOMD-UI/UI-Input.vue";
import Section from "../BIOMD-UI/UI-Section.vue";

const typeList = ref([
  { name: "Biomedical Service", value: "Biomedical Service", selected: true },
  { name: "Clinical Specialist", value: "Clinical Specialist" },
  { name: "Service Call", value: "Service Call" },
  { name: "General Contact", value: "General Contact" },
]);

const contactInfo = inject("contactInfo");
</script>

<style lang="scss" scoped>
@import "../Style/BIOMD.scss";
</style>
