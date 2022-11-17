<template>
  <div class="col">
    <div style="cursor: pointer" @click="emitClickEvent()">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">{{ CardTitle }}</h5>
          <p class="card-text">
            {{ CardText }}
          </p>
        </div>
        <div class="card-footer">
          <small class="text-muted">Total Equipment: 40</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["onUserClick"]);

const props = defineProps({
  CardTitle: {
    type: String,
    default: "",
  },
  CardText: {
    type: String,
    default: "",
  },
});

function emitClickEvent() {
  emit("onUserClick");
}
</script>

<style lang="scss" scoped></style>
