<template>
  <div class="container-fluid">
    <nav class="d-flex gap-3 p-2">
      <small
        class="text-secondary"
        style="cursor: pointer"
        @click="changePage('reportsPage')"
        >Change Facility</small
      >
    </nav>

    <div class="d-flex flex-column p-2 mt-4">
      <span class="title text-dark fw-normal fs-1"
        >Reports for {{ props.facilityName }}</span
      >
      <span class="sub-title fs-6 fw-normal"
        >Review and export data metrics to pdf and csv files</span
      >
    </div>

    <div class="row p-2 mb-5">
      <div class="col-sm-12 col-lg-9 col-12">
        <div class="mt-3">
          <span class="card-title fw-normal fs-5">Pre-Generated Reports</span>
          <!-- <p class="card-text">
            <small class="text-muted">Profile of Manufacturer and Models</small>
          </p> -->
        </div>

        <div class="d-flex flex-column">
          <UIReportList
            title="Global Inventory Summary by Medical Device Description"
            @click="
              changePage('reportsSummary1', {
                facilityName: props.facilityName,
              })
            "
          />
          <UIReportList
            title="Global Inventory Summary by Department"
            @click="
              changePage('reportsSummary2', {
                facilityName: props.facilityName,
              })
            "
          />
          <UIReportList
            title="Functionality Index"
            @click="
              changePage('functionalityIndex', {
                facilityName: props.facilityName,
              })
            "
          />
          <UIReportList
            title="Annual Medical Device Inflow"
            @click="
              changePage('annualInflow', {
                facilityName: props.facilityName,
              })
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import UIReportList from "../BIOMD-UI/UI-ReportList.vue";
const emit = defineEmits(["updatePage"]);

// Navigate to selected page to edit
const changePage = async (page, props) => {
  emit("updatePage", page, props);
};
const props = defineProps(["facilityName", "facilityID"]);
</script>

<style lang="scss" scoped></style>
