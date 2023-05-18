<template>
  <div class="RevealContainer">
    <div class="container p-4 m-4">
      <div class="row">
        <div class="card text-center p-3">
          <div class="card-body mb-3">
            <font-awesome-icon
              icon="check"
              size="5x"
              class="me-2 text-success"
            />
            <div class="d-flex flex-column ml-2">
              <span class="text-success">Success</span
              ><span class="text-black-50"
                >A new record has been successfully added</span
              >
            </div>
          </div>

          <div class="d-lg-flex d-md-flex d-block justify-content-center">
            <Btn2
              BtnName="Dashboard"
              :icon="'arrow-left'"
              backgroundColor="none"
              @click="goBack('landing')"
              class="text-secondary btn-sm"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Btn2 from "../BIOMD-UI/UI-Btn2.vue";

const emit = defineEmits(["updatePage"]);

const goBack = (page) => {
  emit("updatePage", page);
};
</script>

<style lang="scss" scoped>
.RevealContainer {
  min-height: 100vh;
  max-height: 100vh;
  overflow: scroll;
}

.RevealContainer::-webkit-scrollbar {
  display: none;
}
</style>
