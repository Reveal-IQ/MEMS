<script setup>
import LayoutDefault from "./Layout/LayoutDefault.vue";
import SectionLayoutComponent from "../components/layout/SectionLayout.Component.vue";
import PageTitleComponent from "../components/layout/PageTitle.Component.vue";
</script>

<template>
  <layout-default>
    <div class="container">
      <PageTitleComponent />
      <SectionLayoutComponent title="Section Title" />
    </div>
  </layout-default>
</template>
