<template>
  <div class="height-full width-full d-flex flex-column">
    <Header
      :iconNums="icons.length"
      :searchText="searchText"
      @update:searchText="onChange"
      />
    <Main
      :searchText="searchText"
      :icons="icons"
      />
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, toRefs, onMounted } from 'vue'
import Header from './components/Header.vue';
import Main from './components/Main.vue';
import Footer from './components/Footer.vue';
import { Icon } from './types'
import { loadMaterialIcons } from './api/index'

interface State {
  icons: Icon[];
  searchText: string;
}

export default defineComponent({
  name: 'App',
  components: {
    Header,
    Main,
    Footer,
  },
  setup() {
    const state = reactive<State>({
      icons: [],
      searchText: "",
    })
    onMounted(async () => {
      const results = await loadMaterialIcons()
      results.flat().forEach(data => {
        state.icons.push(data)
      })
    })
    const onChange = (value: string) => {
      state.searchText = value
    }
    return {
      ...toRefs(state),
      onChange,
    }
  }
});
</script>

<style lang="scss">
@import '@primer/css/core/index.scss';

html, body {
  height: 100%;
  font-family: 'Product Sans', sans-serif;
}
body {
  margin: 0;
  padding: 0;
}
#app {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
