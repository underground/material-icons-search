<template>
  <div>
    <ul>
      <input v-on:change="search" placeholder="Search for..." />
      <li v-for="(icon, index) in filter()" :key="index">
        <span class="material-icons" @click="selectIcon(icon.name)">{{ icon.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
import { loadMaterialIcons } from '../api/index'

interface Icon {
  type: string;
  name: string;
  hex: string;
}

interface State {
  icons: Icon[];
  searchText: string;
  selectedIcon: string;
}

export default defineComponent({
  name: 'IconList',
  setup() {
    const state = reactive<State>({
      icons: [],
      searchText: "",
      selectedIcon: "",
    })
    onMounted(async () => {
      const results = await loadMaterialIcons()
      results.flat().forEach(data => {
        state.icons.push(data)
      })
    })
    const selectIcon = (name: string) => state.selectedIcon = name;
    const filter = () => state.icons.filter(icon => !state.searchText || icon.name.indexOf(state.searchText) >= 0);
    const search = (e: Event) => {
      if (e.target instanceof HTMLInputElement) {
        state.searchText = e.target.value
      }
    }
    return {
      ...toRefs(state),
      selectIcon,
      filter,
      search,
    }
  },
});
</script>

<style ang="scss" scoped>
</style>
