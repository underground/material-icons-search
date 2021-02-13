<template>
  <div>
    <div class="position-sticky top-0 d-flex flex-items-center border-bottom bg-gray-light py-1">
      <select class="form-select ml-3 mr-2" aria-label="Icon type"
        v-model="font">
        <option value="filled">Filled</option>
        <option value="outlined">Outlined</option>
        <option value="rounded">Rounded</option>
        <option value="twoTone">Two-Tone</option>
        <option value="sharp">Sharp</option>
      </select>
      <input class="form-control mr-3" type="search" placeholder="Search name..." aria-label="Icon search"
        v-model="searchText"
        />
      <div class="form-checkbox mr-2">
        <label class="text-normal">
          <input type="checkbox" v-model="showCodepoint" aria-describedby="show-codepoint-for-checkbox"
            @change="toggleShowCodepoint(showCodepoint)">
          Show codepoint
        </label>
      </div>
    </div>
    <div v-for="category in categories" :key="category">
      <div class="Subhead Subhead--spacious mx-3 my-2">
        <div class="Subhead-heading">{{ category === "undefined" ? "other" : category }}</div>
        <div class="Subhead-actions">
          <span class="Counter mr-1">{{ groupedIcons[category].length }}</span>
        </div>
      </div>
      <div class="grid mx-3">
        <div class="grid-item"
          v-for="(icon, index) in groupedIcons[category]" :key="index">
          <div class="d-flex flex-column">
            <div class="grid-item-icon d-flex flex-justify-center">
              <span class="material-icons"
                @click="selectIcon(icon.name)">{{ icon.name }}</span>
            </div>
            <div class="grid-item-title d-flex flex-justify-center">
              <span class="text-small css-truncate css-truncate-overflow pl-1 pr-1">
                {{ icon.name }}
              </span>
            </div>
            <div class="grid-item-description d-flex flex-justify-center">
              <span class="text-small css-truncate css-truncate-overflow pl-1 pr-1"
                v-show="showCodepoint">
                {{ icon.codepoint }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, toRefs, onMounted } from 'vue'
import groupBy from 'lodash.groupby'
import sortBy from 'lodash.sortby'
import { loadMaterialIcons } from '../api/index'

interface Icon {
  font: string;
  name: string;
  codepoint: string;
}

interface State {
  icons: Icon[];
  font: string;
  showCodepoint: boolean;
  searchText: string;
  selectedIcon: string;
}

export default defineComponent({
  name: 'IconList',
  setup() {
    const state = reactive<State>({
      icons: [],
      font: "filled",
      showCodepoint: false,
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
    const toggleShowCodepoint = (value: boolean) => state.showCodepoint = value;
    const filter = () => state.icons.filter((icon: any) => {
      if (icon.font !== state.font) {
        return false
      }
      return !state.searchText || icon.name.indexOf(state.searchText) >= 0
    })
    const group = () => groupBy(filter(), 'category')
    const categories = computed(() => sortBy(Object.keys(group())))
    const groupedIcons = computed(() => group())
    return {
      ...toRefs(state),
      selectIcon,
      toggleShowCodepoint,
      categories,
      groupedIcons,
    }
  },
});
</script>

<style lang="scss" scoped>
@import '@primer/css/utilities/index.scss';
@import '@primer/css/subhead/index.scss';
@import '@primer/css/labels/index.scss';

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, 120px);
  grid-auto-rows: 1fr;
  grid-row-gap: 0;
  grid-column-gap: 0;
  align-items: center;
  align-content: center;

  .grid-item {
    height: 120px;
    width: 120px;
    display: inline-grid;
    justify-items: center;
    border: solid 2px transparent;
    border-radius: 3px;
    cursor: pointer;
    color: $gray-900;

    > * {
      width: 100%;
    }

    &:hover {
      background-color: $gray-000;
      border-color: $gray-200;
      color: $gray-700;
    }
    .grid-item-icon {
      flex-basis: 60%;
      flex-shrink: 0;
      align-items: flex-end;

      .material-icons {
        font-size: 3rem;
      }
    }
    .grid-item-title {
      margin-top: 0.4em;
    }
    .grid-item-description {
      margin-top: 0.1em;
    }
    .grid-item-title,
    .grid-item-description {
      line-height: 1.1em;
      align-items: center;
      padding: 0 4px;
      max-width: 120px;
      color: $gray-500;

      > span {
        cursor: text;
        &:hover {
          color: $gray-800;
        }
      }
    }
  }
  .grid-form {
    grid-column: 1/-1;
    > * {
      display: inline-flex;
    }
  }
}
</style>
