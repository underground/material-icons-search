<template>
  <div class="grid mt-2 mb-2 mr-4 ml-4">
    <div class="grid-form">
      <input class="form-control" type="search" placeholder="Search name..." aria-label="Icon search"
        v-model="searchText"
        />
    </div>
    <div class="grid-item border rounded-1 p-2" v-for="(icon, index) in filteredIcons" :key="index">
      <div>
        <span class="material-icons"
          @click="selectIcon(icon.name)">{{ icon.name }}</span>
      </div>
      <span style="max-width: 110px;">
        {{icon.name}}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, toRefs, onMounted } from 'vue'
import { loadMaterialIcons } from '../api/index'

interface Icon {
  font: string;
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
    const search = (e: Event) => {
      if (e.target instanceof HTMLInputElement) {
        state.searchText = e.target.value
      }
    }
    const filteredIcons = computed(() => state.icons.filter((icon: any) => !state.searchText || icon.name.indexOf(state.searchText) >= 0))
    return {
      ...toRefs(state),
      selectIcon,
      filteredIcons,
      search,
    }
  },
});
</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, 120px);
  grid-auto-rows: 1fr;
  grid-gap: 10px;
  align-items: center;
  align-content: center;
	justify-content: center;

  .grid-form {
    grid-column: 1/-1;
  }
}
</style>
