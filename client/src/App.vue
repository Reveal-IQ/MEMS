<script setup>
// import { RouterView } from "vue-router";
import SectionLayout from "@/components/layout/SectionLayout.Component.vue";
import NavBar from "@/components/UI/NavBar.Component.vue";
</script>

<template>
  <div class="mems">
    <NavBar />
    <div class="container">
      <div class="title">New Equipment</div>
      <p class="sub-title">Use this form to generate new equipment record</p>
      <SectionLayout title="Section Title" />
      <SectionLayout title="New Section" />
    </div>
  </div>
</template>

<style>
@import "@/assets/base.css";
</style>
