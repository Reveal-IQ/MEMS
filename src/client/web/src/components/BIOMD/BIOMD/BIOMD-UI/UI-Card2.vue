<template>
  <div class="col-sm-4">
    <div class="card">
      <div class="card-body pt-2 px-2">
        <div class="d-flex flex-row justify-content-between px-3 pb-4">
          <div class="d-flex flex-column">
            <span class="text-muted">{{ statName }}</span>
          </div>
          <div class="d-flex flex-column">
            <h5 class="mb-0">{{ stats }}</h5>
            <small class="text-muted text-right">{{ units }}</small>
          </div>
        </div>
        <hr v-if="statName1" class="mt-2 mx-3" />
        <div
          v-if="statName1"
          class="d-flex flex-row justify-content-between px-3 pb-4"
        >
          <div class="d-flex flex-column">
            <span class="text-muted">{{ statName1 }}</span>
          </div>
          <div class="d-flex flex-column">
            <h5 class="mb-0">{{ stats1 }}</h5>
            <small class="text-muted text-right">{{ units1 }}</small>
          </div>
        </div>
        <hr class="mt-2 mx-3" />
        <div class="mx-3 mt-3 mb-2">
          <slot />
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
  units: {
    type: String,
  },

  stats1: {
    type: String,
    default: "",
  },
  statName1: {
    type: String,
    default: "",
  },
  units1: {
    type: String,
  },
  icon: null,
});

function emitClickEvent() {
  emit("onUserClick");
}
</script>

<style lang="scss" scoped>
.card {
  width: 250px;
  border-radius: 10px;
}

.card-img-top {
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
}
span.text-muted {
  font-size: 12px;
}
small.text-muted {
  font-size: 8px;
}
h5.mb-0 {
  font-size: 1rem;
}
small.ghj {
  font-size: 9px;
}
.mid {
  background: #ecedf1;
}
h6.ml-1 {
  font-size: 13px;
}
small.key {
  text-decoration: underline;
  font-size: 9px;
  cursor: pointer;
}
.btn-danger {
  color: #ffcbd2;
}
.btn-danger:focus {
  box-shadow: none;
}
small.justify-content-center {
  font-size: 9px;
  cursor: pointer;
  text-decoration: underline;
}

@media screen and (max-width: 600px) {
  .col-sm-4 {
    margin-bottom: 50px;
  }
}
</style>
