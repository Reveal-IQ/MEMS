<template>
  <Section sectionTitle="Multiple Equipment Entry">
    <div
      v-for="equipment in multipleEquipment"
      :key="equipment.index"
      class="mb-3"
    >
      <div class="card-body">
        <div>
          <button
            type="button"
            class="btn-close"
            aria-label="Close"
            @click="removeEquipment"
          ></button>
        </div>

        <!-- Equipment Number -->
        <div class="col-lg-6 mb-3">
          <Input
            label="Equipment Number"
            type="text"
            id="equipmentNumber"
            placeholder="Enter Equipment Number"
          />
        </div>

        <!-- Serial Number -->
        <div class="col-lg-6 mb-3">
          <Input
            label="Serial Number"
            type="text"
            id="serialNumber"
            placeholder="Enter Serial Number"
          />
        </div>
        <!-- Department -->
        <div class="col-lg-6 mb-3">
          <label for="departmentList" class="form-label">Department</label>
          <select
            id="departmentList"
            class="form-select"
            aria-label="Default select example"
          >
            <option selected>Select Department</option>
          </select>
        </div>
        <!-- Location -->
        <div class="col-lg-6 mb-3">
          <Input
            label="Location"
            type="text"
            id="locationTag"
            placeholder="Add Location Tag"
          />
        </div>
      </div>
    </div>

    <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 g-3">
      <div class="col position-relative">
        <Btn2
          BtnName="Add New Equipment"
          backgroundColor="#1266F1"
          :icon="'plus'"
          @click="addEquipment"
          class="position-relative rounded-pill"
        >
          <span
            class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
          >
            {{ equipmentCount }}
            <span class="visually-hidden">unread messages</span>
          </span>
        </Btn2>
      </div>
    </div>
  </Section>
</template>

<script setup>
import { ref, inject } from "vue";

import Btn from "../BIOMD-UI/UI-Btn.vue";
import Btn2 from "../BIOMD-UI/UI-Btn2.vue";
import Input from "../BIOMD-UI/UI-Input.vue";
import Section from "../BIOMD-UI/UI-Section.vue";

// Multiple Equipment Entry
const multipleEquipment = ref([]);
const equipmentCount = ref(0);

const addEquipment = () => {
  multipleEquipment.value.push([
    {
      Serial_Number: "",
      Department: "",
      Location: "",
      Comments: "",
    },
  ]);
  equipmentCount.value++;
};

const removeEquipment = (index) => {
  multipleEquipment.value.splice(index, 1);
  equipmentCount.value--;
};
</script>

<style lang="scss" scoped>
@import "../../BIOMD/Style/BIOMD.scss";

.btn-close {
  position: relative;
  float: right;
  color: white;
  top: -10px;
  right: -10px;
}
</style>
