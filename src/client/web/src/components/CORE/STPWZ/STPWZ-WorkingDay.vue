<!-- 
************************************
*  Created By : Reveal IQ          *
*  Author     : Sudheer            *
*  Date       : 01 SEP 2021        *
*  Version    : 0.1.0.01.17-0921   *
************************************
-->
<template>
    <div class="d-flex flex-row">
        <div class="col form-floating m-1" style="max-width: 300px">
            <select class="form-select" id="dayInput" @change="selectDay" >
                <option hidden>Choose day</option>
                <option v-for="(day, index) in days" :key="index" :value="day" :selected="workingDay.Day == day">{{ day }}</option>
            </select>
            <label for="dayInput">Day</label>
        </div>
        <div class="col form-floating m-1" style="max-width: 300px">
            <input type="time" class="form-control" id="openTimeInput" v-model="workingDay.Hour_Open" onkeydown="return false">
            <label for="openTimeInput">Opening Time</label>
        </div>
        <div class="col form-floating m-1" style="max-width: 300px">
            <input type="time" class="form-control" id="closeTimeInput" v-model="workingDay.Hour_Close" onkeydown="return false" >
            <label for="closeTimeInput">Closing Time</label>
        </div>
        <font-awesome-icon
            class="m-1"
            v-if="numOfDays > 1"
            icon="minus-circle"
            size="1x"
            @click="removeDay"
            style="color: red;"
        />
    </div>
</template>

<script>

import { ref, toRefs } from "vue";

export default {
    props: [ 'number', 'workingDay', 'days', 'numOfDays' ],
    events: [ 'removeWorkingDay' ],
    setup(props, { emit }){

        // Props
        const { number, workingDay, days, numOfDays } = toRefs(props);

        const selectDay = async (event) => {
            workingDay.value.Day = event.target.value;
        }

        const removeDay = async () => {
            emit('removeWorkingDay', number.value)
        }

        return{
            number,
            workingDay,
            days,
            numOfDays,
            removeDay,
            selectDay
        }
    }
}
</script>

<style>

</style>