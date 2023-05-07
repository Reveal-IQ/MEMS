<template>
  <div class="row">
    <div class="card text-center w-75 mx-auto">
      <!-- <div class="card-header">Message</div> -->
      <div class="card-body">
        <font-awesome-icon icon="check" size="3x" class="me-2 text-success" />
        <h5 class="card-title text-success">Success</h5>
        <p class="card-text">A new record was created.</p>

        <div class="">
          <Btn2
            BtnName="Dashboard"
            :icon="'arrow-left'"
            backgroundColor="none"
            @click="goBack"
            class="text-secondary btn-sm"
          />
          <Btn2
            BtnName="Create Another Record"
            :icon="'plus-circle'"
            backgroundColor="none"
            class="text-secondary btn-sm"
            @click="newRecord"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Btn2 from "../BIOMD-UI/UI-Btn2.vue";

const emit = defineEmits(["updatePage", "newRecord"]);

const newRecord = () => {
  emit("newRecord", "assetInfo");
};

const goBack = () => {
  emit("updatePage", "landing");
};

const compState = ref("");

const updatePage = (page) => {
  compState.value = page;
};
</script>

<style lang="scss" scoped></style>
