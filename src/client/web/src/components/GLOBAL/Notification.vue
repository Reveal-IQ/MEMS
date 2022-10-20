 <!-- 
************************************
*  Created By : Reveal IQ          *
*  Author     : Bharath Kumar      *
*  Date       : 21 JUL 2021        *
*  Version    : 0.0.0.00.03-1021   *
************************************
-->
<template>
  <section>
    <div v-for="notification in globalNotifications" :key="notification.id">
      <div
        class="row notification-container d-flex justify-content-center mx-2"
      >
        <div
          class="col-sm-12 my-4 text-break text-light"
          :class="{
            successBgColor: notification.messageType == 'success',
            alertBgColor: notification.messageType == 'alert',
            errorBgColor: notification.messageType == 'error',
          }"
        >
          <div class="row align-items-center">
            <div class="col-sm-1 d-flex justify-content-center bodyText">
              <font-awesome-icon
                icon="check"
                size="lg"
                v-if="notification.messageType == 'success'"
              />
              <font-awesome-icon
                icon="exclamation-triangle"
                size="lg"
                v-if="notification.messageType == 'alert'"
              />
              <font-awesome-icon
                icon="exclamation-circle"
                size="lg"
                v-if="notification.messageType == 'error'"
              />
            </div>
            <div class="col-sm-8 d-flex justify-content-start my-2 bodyText">
              {{ notification.message }}
            </div>
            <div class="col-sm-3 my-auto d-flex justify-content-end versionSub">
              {{ notification.messageCode }}
            </div>
            <div class="animationBar" :style="'--time:'+ notification.messageExpiry"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const globalNotifications = computed(
      () => store.state.globalStore.globalNotifications
    );
    return {
      globalNotifications
    };
  },
};
</script>

<style lang='scss' scoped>
@import "../../components/GLOBAL/Styles/font-style.scss";
@import "../../components/GLOBAL/Styles/colors.scss";
.notification-container {
  z-index: 1004;
  right: 0px;
  left: 0px;
}
.successBgColor {
  background-color: $notifyColorDefault;
}
.alertBgColor {
  background-color: $error;
}
.errorBgColor {
  background-color: $AlertRed;
}
.animationBar {
  animation: pulse var(--time) infinite;
  @keyframes pulse {
    0% {
      color: $default;
      width: 20%;
      border-bottom: 2px solid $default;
    }
    25% {
      color: $default;
      width: 40%;
      border-bottom: 2px solid $default;
    }
    50% {
      color: $default;
      width: 60%;
      border-bottom: 2px solid $default;
    }
    75% {
      color: $default;
      width: 80%;
      border-bottom: 2px solid $default;
    }
    100% {
      color: $default;
      width: 100%;
      border-bottom: 2px solid $default;
    }
  }
}
</style>
