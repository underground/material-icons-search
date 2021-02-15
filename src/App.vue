<template>
  <div>
    <Header v-bind:showAbout="state.showAbout" @close="toggleAbout(false)" @open="toggleAbout(true)" />
    <Main @close="toggleAbout(false)" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import Header from './components/Header.vue';
import Main from './components/Main.vue';

interface State {
  showAbout: boolean;
}

export default defineComponent({
  name: 'App',
  components: {
    Header,
    Main,
  },
  setup() {
    const state = reactive<State>({
      showAbout: false,
    })
    const toggleAbout = (show: boolean|undefined) => {
      if (typeof show === undefined) {
        state.showAbout = !state.showAbout
      } else {
        state.showAbout = !!show
      }
    }
    return {
      state,
      toggleAbout,
    }
  }
});
</script>

<style lang="scss">
@import '@primer/css/core/index.scss';

html, body {
  height: 100%;
}
body {
  margin: 0;
  padding: 0;
}
#app {
}
</style>
