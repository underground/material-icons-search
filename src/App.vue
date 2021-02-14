<template>
  <div>
    <Header />
    <Main />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from './components/Header.vue';
import Main from './components/Main.vue';

export default defineComponent({
  name: 'App',
  components: {
    Header,
    Main,
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
