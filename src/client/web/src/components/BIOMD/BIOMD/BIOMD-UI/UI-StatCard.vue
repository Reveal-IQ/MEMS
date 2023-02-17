<template>
  <div class="col mb-3">
    <div class="card">
      <div class="card-content">
        <div class="card-body">
          <div class="justify-content-between d-flex">
            <div class="align-self-center">
              <font-awesome-icon
                :icon="icon"
                size="2x"
                class="primary float-start"
              />
            </div>
            <div class="text-end">
              <h3>{{ stats }}</h3>
              <span>{{ statName }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["onUserClick"]);

const props = defineProps({
  stats: {
    type: String,
    default: "",
  },
  statName: {
    type: String,
    default: "",
  },
  icon: null,
});

function emitClickEvent() {
  emit("onUserClick");
}
</script>

<style lang="scss" scoped></style>
