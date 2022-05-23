<template>
  <main class="details-reset details-overlay details-overlay-dark mb-4"
   @click="$emit('close')">
    <div class="position-sticky top-0 d-flex flex-items-center flex-wrap border-bottom py-1 color-bg-default">
      <select class="form-select ml-3 mr-2" aria-label="Icon type"
        v-model="font">
        <option
          v-for="font in codePoints" :key="font.font" :value="font.font">
          {{ font.label }}
        </option>
      </select>
      <input class="form-control mr-3" type="search" placeholder="Search icons..." aria-label="Icon search"
        v-model="searchText"
        />
      <div class="form-checkbox">
        <button class="btn" type="button"
          aria-label="toggle show codepoint"
          @click="toggleShowCodepoint">
          <template v-if="showCodepoint">
            <svg xmlns="http://www.w3.org/2000/svg" style="vertical-align: text-bottom;" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M1.679 7.932c.412-.621 1.242-1.75 2.366-2.717C5.175 4.242 6.527 3.5 8 3.5c1.473 0 2.824.742 3.955 1.715 1.124.967 1.954 2.096 2.366 2.717a.119.119 0 010 .136c-.412.621-1.242 1.75-2.366 2.717C10.825 11.758 9.473 12.5 8 12.5c-1.473 0-2.824-.742-3.955-1.715C2.92 9.818 2.09 8.69 1.679 8.068a.119.119 0 010-.136zM8 2c-1.981 0-3.67.992-4.933 2.078C1.797 5.169.88 6.423.43 7.1a1.619 1.619 0 000 1.798c.45.678 1.367 1.932 2.637 3.024C4.329 13.008 6.019 14 8 14c1.981 0 3.67-.992 4.933-2.078 1.27-1.091 2.187-2.345 2.637-3.023a1.619 1.619 0 000-1.798c-.45-.678-1.367-1.932-2.637-3.023C11.671 2.992 9.981 2 8 2zm0 8a2 2 0 100-4 2 2 0 000 4z"></path></svg>
          </template>
          <template v-else>
            <svg xmlns="http://www.w3.org/2000/svg" style="vertical-align: text-bottom;" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M.143 2.31a.75.75 0 011.047-.167l14.5 10.5a.75.75 0 11-.88 1.214l-2.248-1.628C11.346 13.19 9.792 14 8 14c-1.981 0-3.67-.992-4.933-2.078C1.797 10.832.88 9.577.43 8.9a1.618 1.618 0 010-1.797c.353-.533.995-1.42 1.868-2.305L.31 3.357A.75.75 0 01.143 2.31zm3.386 3.378a14.21 14.21 0 00-1.85 2.244.12.12 0 00-.022.068c0 .021.006.045.022.068.412.621 1.242 1.75 2.366 2.717C5.175 11.758 6.527 12.5 8 12.5c1.195 0 2.31-.488 3.29-1.191L9.063 9.695A2 2 0 016.058 7.52l-2.53-1.832zM8 3.5c-.516 0-1.017.09-1.499.251a.75.75 0 11-.473-1.423A6.23 6.23 0 018 2c1.981 0 3.67.992 4.933 2.078 1.27 1.091 2.187 2.345 2.637 3.023a1.619 1.619 0 010 1.798c-.11.166-.248.365-.41.587a.75.75 0 11-1.21-.887c.148-.201.272-.382.371-.53a.119.119 0 000-.137c-.412-.621-1.242-1.75-2.366-2.717C10.825 4.242 9.473 3.5 8 3.5z"></path></svg>
          </template>
        </button>
      </div>
      <select class="form-select ml-3 mr-2" aria-label="Sort"
        v-model="sort">
        <option value="popularity">Popularity</option>
        <option value="category">Category</option>
      </select>
    </div>
    <div v-if="loading">
      <div class="mx-3 my-2">
        <span>Loading</span><span class="AnimatedEllipsis"></span>
      </div>
    </div>
    <div v-else-if="categories.length">
      <div v-if="sort === 'popularity'">
        <div class="grid mx-3 my-3">
          <div class="grid-item"
            v-for="(icon, index) in popularityIcons" :key="index"
            v-bind:class="{ active: icon.name === selectedName }"
            @click="select(icon.name)">
            <div class="d-flex flex-column">
              <div class="grid-item-icon d-flex flex-justify-center">
                <span class="material-icons">{{ icon.name }}</span>
              </div>
              <div class="grid-item-title d-flex flex-justify-center">
                <span class="text-small css-truncate css-truncate-overflow pl-1 pr-1" @click.stop="">
                  {{ icon.name }}
                </span>
              </div>
              <div class="grid-item-description d-flex flex-justify-center">
                <span class="text-small css-truncate css-truncate-overflow pl-1 pr-1"
                  v-show="showCodepoint" @click.stop="">
                  {{ icon.codepoint }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div v-for="category in categories" :key="category">
          <div class="Subhead Subhead--spacious mx-3 my-2">
            <div class="Subhead-heading f3"
              :style="{ textTransform: 'capitalize' }">
              {{ category === "undefined" ? "none" : category }}
            </div>
            <div class="Subhead-actions">
              <span class="Counter mr-1">{{ groupedIcons[category].length }}</span>
            </div>
          </div>
          <div class="grid mx-3">
            <div class="grid-item"
              v-for="(icon, index) in groupedIcons[category]" :key="index"
              v-bind:class="{ active: icon.name === selectedName }"
              @click="select(icon.name)">
              <div class="d-flex flex-column">
                <div class="grid-item-icon d-flex flex-justify-center">
                  <span class="material-icons">{{ icon.name }}</span>
                </div>
                <div class="grid-item-title d-flex flex-justify-center">
                  <span class="text-small css-truncate css-truncate-overflow pl-1 pr-1" @click.stop="">
                    {{ icon.name }}
                  </span>
                </div>
                <div class="grid-item-description d-flex flex-justify-center">
                  <span class="text-small css-truncate css-truncate-overflow pl-1 pr-1"
                    v-show="showCodepoint" @click.stop="">
                    {{ icon.codepoint }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="blankslate blankslate-spacious">
        <h3 class="mb-2">Can’t find any icons.</h3>
        <p><button class="btn-link" type="button" @click="clear">Clear your filters and try again.</button></p>
      </div>
    </div>
    <Details v-if="!!selectedName" v-bind="selectedIcon" />
  </main>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, toRefs, onMounted } from 'vue'
import groupBy from 'lodash.groupby'
import sortBy from 'lodash.sortby'
import orderBy from 'lodash.orderby'
import { loadMaterialIcons } from '../api/index'
import Details from './Details.vue';
import { FontType, Icon } from '../types'
import codePoints from '../data/codePoints.json'

interface State {
  loading: boolean;
  icons: Icon[];
  font: FontType;
  sort: string;
  showCodepoint: boolean;
  searchText: string;
  selectedName: string;
}

export default defineComponent({
  name: 'Main',
  components: {
    Details,
  },
  setup() {
    const state = reactive<State>({
      loading: true,
      icons: [],
      font: 'filled',
      sort: 'popularity',
      showCodepoint: false,
      searchText: "",
      selectedName: "",
    })
    onMounted(async () => {
      const results = await loadMaterialIcons()
      results.flat().forEach(data => {
        state.icons.push(data)
      })
      state.loading = false
    })
    const select = (name: string|undefined = "") => {
      state.selectedName = state.selectedName === name ? "" : name;
    }
    const toggleShowCodepoint = () => state.showCodepoint = !state.showCodepoint;
    const filter = () => state.icons.filter((icon: Icon) => {
      if (icon.font !== state.font) {
        return false
      }
      return !state.searchText || icon.name.indexOf(state.searchText) >= 0
    })
    const clear = () => state.searchText = ""
    const group = () => groupBy(filter(), 'category')
    const categories = computed(() => sortBy(Object.keys(group())))
    const groupedIcons = computed(() => group())
    const popularityIcons = computed(() => orderBy(filter(), ['popularity'], ['desc']))
    const selectedIcon = computed(() => {
      return {
        ...state.icons.find((icon: Icon) => icon.name === state.selectedName),
        onClose: () => select(),
      }
    })
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Escape') {
        select()
      }
    }
    document.addEventListener('keyup', onKeyDown)
    return {
      ...toRefs(state),
      codePoints,
      select,
      clear,
      toggleShowCodepoint,
      categories,
      groupedIcons,
      popularityIcons,
      selectedIcon,
    }
  },
});
</script>

<style lang="scss" scoped>
@import '@primer/css/utilities/index.scss';
@import '@primer/css/subhead/index.scss';
@import '@primer/css/labels/index.scss';
@import '@primer/css/blankslate/index.scss';
@import '@primer/css/loaders/index.scss';

#main {
  min-height: 100vh;
}

.position-sticky {
  z-index: 10;
}
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
    border: solid 1px transparent;
    border-radius: 3px;
    cursor: pointer;
    color: var(--color-fg-muted);

    &:hover {
      border-color: var(--color-border-default);
      transition: border-color .12s ease-out;
    }

    > * {
      width: 100%;
    }

    &.active {
      background: var(--color-action-list-item-default-active-bg);
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
      color: var(--color-fg-subtle);
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
