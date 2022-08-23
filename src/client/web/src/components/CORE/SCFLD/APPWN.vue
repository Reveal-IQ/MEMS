<!-- 
************************************
*  Created By : Reveal IQ          *
*  Author     : Bharath Kumar      *
*  Date       : 08 JUN 2021        *
*  Version    : 0.6.8.00.04-0821   *
************************************
-->
<template>
  <section>
    <div v-for="app in tablist" :key="app.TabCode">
      <div class="">
        <keep-alive>
          <component
            :is="`${app.App_Code}${app.TabCode}`"
            v-if="app.App_Code == AppCode && app.TabCode == TabCode"
            :key="app.id"
            :tabid="`${app.TabCode}`"
          />
        </keep-alive>
      </div>
    </div>
  </section>
</template>
<script>
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  components: {},
  setup() {
    // store variables
    const store = useStore();
    const tabname = computed(() => store.state.globalStore.ActiveApp.App_Code);
    const tablist = computed(() => store.state.globalStore.tablist);
    const AppCode = computed(() => store.state.globalStore.ActiveApp.App_Code);
    const TabCode = computed(() => store.state.globalStore.ActiveApp.TabCode);

    return {
      // store variables
      store,
      tabname,
      tablist,
      AppCode,
      TabCode,
    };
  },
};
</script>
<style lang="scss" scoped>
.APPWN-scroller {
  height: auto;
  max-height: 100vh;
  overflow-y: auto;
}
</style>
