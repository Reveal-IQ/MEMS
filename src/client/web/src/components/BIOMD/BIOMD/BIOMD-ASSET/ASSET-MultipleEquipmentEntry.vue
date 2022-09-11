<template>
  <Section sectionTitle="Multiple Equipment Entry">
    <!-- <span class="badge rounded-pill bg-danger mb-2">
      <span>equipment fleet</span>
      {{ equipmentCount }}
    </span> -->
    <div
      v-for="equipment in multipleEquipment"
      :key="equipment.index"
      class="card mb-3"
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
        <div
          class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 g-3"
        >
          <!-- Serial Number -->
          <div class="col-lg-4 mb-3">
            <Input
              label="Serial Number"
              type="text"
              id="serialNumber"
              placeholder="Enter Serial Number"
              v-model="assetInfo.Serial_Number"
            />
          </div>
          <!-- Department -->
          <div class="col-lg-4 mb-3">
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
          <div class="col-lg-4">
            <Input
              label="Location"
              type="text"
              id="locationTag"
              placeholder="Add Location Tag"
              v-model="assetInfo.Location"
            />
          </div>
          <!-- Comments -->
          <div class="col-lg-12 col-md-12 mb-3">
            <label for="commentSection" class="form-label">Comments</label>
            <div class="input-group">
              <textarea
                type="text"
                class="form-control"
                id="commentSection"
                aria-describedby="basic-addon3"
                placeholder="Enter Comments"
                v-model="assetInfo.Comments"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 g-3">
      <div class="col position-relative">
        <!-- <Btn
          BtnName="Add Asset Fleet"
          backgroundColor="#1266F1"
          :icon="'plus'"
          @click="addEquipment"
          class="position-relative"
        />

        <span
          class="position-absolute top-0 start-100 badge rounded-pill bg-danger mb-2"
        >
          {{ equipmentCount }}
        </span> -->

        <!-- <button
          type="button"
          class="btn btn-primary position-relative"
          @click="addEquipment"
        >
          Add New Equipment
          <span
            class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
          >
            {{ equipmentCount }}
            <span class="visually-hidden">unread messages</span>
          </span>
        </button> -->
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

const assetInfo = inject("assetInfo");

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
