 <!-- 
************************************
*  Created By : Reveal IQ          *
*  Author     : Bharath Kumar      *
*  Date       : 25 MAY 2021        *
*  Version    : 0.6.8.00.02-0621   *
************************************
-->
<template>
  <section>
    {{ greeting }}
  </section>
</template>
<script>
import { ref } from "vue";
export default {
  name: "GreetingMessage",
  setup() {
    const greeting = ref(null);
    var date = new Date();
    if (date.getHours() < 12) {
      greeting.value = "Good Morning";
    }
    if (date.getHours() >= 12 && date.getHours() < 16) {
      greeting.value = "Good Afternoon";
    }
    if (date.getHours() >= 16 && date.getHours() < 19) {
      greeting.value = "Good Evening ";
    }
    if (date.getHours() >= 19 && date.getHours() < 24) {
      greeting.value = "Good Night";
    }
    return {
      //local variable
      greeting,
    };
  },
};
</script>
