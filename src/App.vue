<template>
  <div class="height-full width-full d-flex flex-column">
    <Header />
    <Main />
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, toRefs, onMounted } from 'vue'
import { useStore } from 'vuex'
import searchString from 'search-string';
import Header from './components/Header.vue';
import Main from './components/Main.vue';
import Footer from './components/Footer.vue';
import { Icon } from './types'
import { loadMaterialIcons } from './api/index'

export default defineComponent({
  name: 'App',
  components: {
    Header,
    Main,
    Footer,
  },
  setup() {
    const store = useStore()

    onMounted(async () => {
      const results = await loadMaterialIcons()
      store.commit("setIcons", results)
    })
    const onChange = (value: string) => {
      const parsedQuery = searchString.parse(value)
      const { conditionArray } = parsedQuery
      const grouped = conditionArray.reduce((acc: any, { keyword, value, negated }: any) => {
        if (!acc[keyword]) {
          acc[keyword] = []
        }
        acc[keyword].push(value)
        return acc
      }, {})
      store.commit("setText", parsedQuery.getAllText())
      store.commit("setTags", grouped?.['tag'] || [])
      store.commit("setCategories", grouped?.['category'] || [])
    }

    return {
      searchText: computed(() => store.state.searchText),
      tags: computed(() => store.state.tags),
      categories: computed(() => store.state.categories),
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
