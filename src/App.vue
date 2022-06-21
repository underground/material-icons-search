<template>
  <div class="height-full width-full d-flex flex-column">
    <Main
      :icons="filter(icons, searchText, categories, tags)"
      :searchText="searchText"
      @update:searchText="onChange"
      />
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
import difference from 'lodash.difference'
import searchString from 'search-string';
import Main from './components/Main.vue';
import Footer from './components/Footer.vue';
import { Icon } from './types'
import { loadMaterialIcons } from './api/index'

interface State {
  icons: Icon[];
  searchText: string;
  tags: string[];
  categories: string[];
}

const filter = (icons: Icon[], searchText: string, categories: string[], tags: string[]) => {
  return icons.filter((icon: Icon) => {
    if (searchText && icon.name.indexOf(searchText) === -1 ||
        tags.length > 0 && difference(tags, icon.tags).length > 0 ||
        categories.length > 0 && difference(categories, icon.categories).length > 0) {
      return false
    }
    return true
  })
}

export default defineComponent({
  name: 'App',
  components: {
    Main,
    Footer,
  },
  setup() {
    const state = reactive<State>({
      icons: [],
      searchText: "",
      tags: [],
      categories: [],
    })
    onMounted(async () => {
      const results = await loadMaterialIcons()
      results.flat().forEach(data => {
        state.icons.push(data)
      })
    })
    const onChange = (value: string) => {
      const parsedQuery = searchString.parse(value)
      const { conditionArray } = parsedQuery
      const grouped = conditionArray.reduce((acc: any, { keyword, value }: any) => {
        if (!acc[keyword]) {
          acc[keyword] = []
        }
        acc[keyword].push(value)
        return acc
      }, {})

      state.searchText = parsedQuery.getAllText()
      state.tags = grouped?.['tag'] || []
      state.categories = grouped?.['category'] || []
    }

    return {
      ...toRefs(state),
      filter,
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
