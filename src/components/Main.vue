<template>
  <header class="Header" @click="$emit('close')" v-observe-visibility="visibilityChanged">
    <div class="Header-item flex-items-center">
      <Logo classname="ml-1" />
    </div>
    <div class="Header-item width-full">
      <input class="form-control input-sm header-search width-full"
        type="search"
        spellcheck="false"
        aria-label="Icon search"
        ref="searchRef"
        :placeholder="placeholder"
        :value="searchText"
        @input="$emit('update:searchText', $event.target.value)"
        />
    </div>
    <div class="Header-item Header-item--full">
    </div>
    <div class="Header-item flex-items-center theme-icon"
      @click="changeColorMode(colorMode === 'light' ? 'dark' : 'light')">
       <template v-if="colorMode === 'light'">
        <svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Activate dark mode" viewBox="0 0 16 16" width="16" height="16">
          <path fill-rule="evenodd" d="M9.598 1.591a.75.75 0 01.785-.175 7 7 0 11-8.967 8.967.75.75 0 01.961-.96 5.5 5.5 0 007.046-7.046.75.75 0 01.175-.786zm1.616 1.945a7 7 0 01-7.678 7.678 5.5 5.5 0 107.678-7.678z"></path>
        </svg>
      </template>
      <template v-else>
        <svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Activate light mode" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M8 10.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM8 12a4 4 0 100-8 4 4 0 000 8zM8 0a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0V.75A.75.75 0 018 0zm0 13a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 018 13zM2.343 2.343a.75.75 0 011.061 0l1.06 1.061a.75.75 0 01-1.06 1.06l-1.06-1.06a.75.75 0 010-1.06zm9.193 9.193a.75.75 0 011.06 0l1.061 1.06a.75.75 0 01-1.06 1.061l-1.061-1.06a.75.75 0 010-1.061zM16 8a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 0116 8zM3 8a.75.75 0 01-.75.75H.75a.75.75 0 010-1.5h1.5A.75.75 0 013 8zm10.657-5.657a.75.75 0 010 1.061l-1.061 1.06a.75.75 0 11-1.06-1.06l1.06-1.06a.75.75 0 011.06 0zm-9.193 9.193a.75.75 0 010 1.06l-1.06 1.061a.75.75 0 11-1.061-1.06l1.06-1.061a.75.75 0 011.061 0z"></path></svg>
      </template>
    </div>
    <div class="Header-item flex-items-center">
      <a href="https://material.io/develop/web/getting-started" target="_blank" rel="noopener noreferrer" class="Header-link mr-3">
        Get Started
      </a>
    </div>
  </header>
  <main class="details-reset details-overlay details-overlay-dark mb-4 width-full"
   @click="$emit('close')">
    <div class="position-sticky top-0 d-flex flex-items-center flex-nowrap border-bottom py-2 color-bg-default">
      <div class="BtnGroup" aria-label="Icon type">
        <button v-for="item in codePoints"
          :key="item.font"
          :aria-selected="item.font == font ? 'true': 'false'"
          @click="onChangeFont(item.font)"
          class="BtnGroup-item btn"
          type="button">
          <template v-if="item.font === 'round'">
            <svg class="octicon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><title>Ellipse</title><path d="M256 464c-114.69 0-208-93.31-208-208S141.31 48 256 48s208 93.31 208 208-93.31 208-208 208z"/></svg>
          </template>
          <template v-else-if="item.font === 'sharp'">
            <svg class="octicon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><title>Triangle</title><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M48 448L256 64l208 384H48z"/></svg>
          </template>
          <template v-else>
            <svg class="octicon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><title>Square</title><path d="M416 448H96a32.09 32.09 0 01-32-32V96a32.09 32.09 0 0132-32h320a32.09 32.09 0 0132 32v320a32.09 32.09 0 01-32 32z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/></svg>
          </template>
          <span class="hide-sm">{{ item.label }}</span>
        </button>
      </div>
      <div>
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
      <select class="form-select" aria-label="Sort"
        v-model="sort">
        <option value="popularity">Popularity</option>
        <option value="name">Name</option>
      </select>
    </div>
    <div v-if="icons.length === 0">
      <div class="mx-3 my-2">
        <span>Loading</span><span class="AnimatedEllipsis"></span>
      </div>
    </div>
    <div v-else-if="filteredIcons.length">
      <div class="grid my-3">
        <div class="grid-item"
          v-for="(icon, index) in filteredIcons" :key="index"
          v-bind:class="{ active: icon.name === selectedName }"
          @click="select(icon.name)">
          <div class="d-flex flex-column">
            <div class="grid-item-icon d-flex flex-justify-center">
              <span :class="[`icon ${font === 'filled' ? 'material-icons' : `material-icons-${font}`}`]">{{ icon.name }}</span>
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
      <div class="blankslate blankslate-spacious">
        <h3 class="mb-2">Can’t find any icons.</h3>
        <p>Clear your filters and try again.</p>
      </div>
    </div>
    <Details v-if="!!selectedName" v-bind="selectedIcon" />
  </main>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, toRefs, PropType, ref, onMounted, watch } from 'vue'
import orderBy from 'lodash.orderby'
import template from 'lodash.template'
import templatesettings from 'lodash.templatesettings'
import Logo from './Logo.vue';
import Details from './Details.vue';
import { FontType, Icon } from '../types'
import codePoints from '../data/codePoints.json'
import { host, asset_url_pattern } from '../data/metadata.json'

templatesettings.interpolate = /{([\s\S]+?)}/g
const compiled_asset_url = template('https://' + host + asset_url_pattern)

type ColorMode = 'auto' | 'light' | 'dark';
interface State {
  font: FontType;
  sort: string;
  showCodepoint: boolean;
  colorMode: ColorMode;
  selectedName: string;
}

export default defineComponent({
  name: 'Main',
  components: {
    Logo,
    Details,
  },
  props: {
    icons: {
      type: Array as PropType<Icon[]>,
      required: true
    },
    searchText: {
      type: String,
      required: true
    },
  },
  setup(props) {
    const state = reactive<State>({
      font: 'filled',
      sort: 'popularity',
      colorMode: 'auto',
      showCodepoint: false,
      selectedName: "",
    })
    const searchRef = ref<HTMLInputElement>()
    onMounted(() => {
      state.colorMode = window.matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'light'
    })
    watch(
      () => ({...state}),
      (next, prev) => {
        if (next.colorMode !== prev.colorMode) {
          document.documentElement.setAttribute('data-color-mode', next.colorMode)
        }
      },
    )
    const visibilityChanged = (isVisible: boolean) => {
      if (!isVisible) {
        state.selectedName = ""
      }
    }
    const changeColorMode = (color: ColorMode) => {
      state.colorMode = color
    }
    const placeholder = computed(() => `Search ${props.icons.length > 0 ? props.icons.length.toLocaleString() : ''} icons (Press "/" to focus)`)

    const select = (name: string|undefined = "") => {
      if (state.selectedName === name) {
        state.selectedName = ""
      } else {
        state.selectedName = name
      }
    }
    const toggleShowCodepoint = () => state.showCodepoint = !state.showCodepoint;
    const filter = () => props.icons.filter((icon: Icon) => {
      if (icon.font !== state.font) {
        return false
      }
      return true
    })
    const filteredIcons = computed(() => orderBy(filter(), [state.sort], [state.sort === 'popularity' ? 'desc' : 'asc']))
    const selectedIcon = computed(() => {
      const icon = props.icons.find((icon: Icon) => icon.name === state.selectedName)
      const family = codePoints.find(code => code.font === state.font)?.['family'] || ''
      let svgAssetUrl = null
      let pngAssetUrl = null
      if (icon && !icon?.unsupported_families?.includes(family)) {
        const size = icon.sizes_px?.[icon.sizes_px?.length - 1]
        const color = 'black'
        svgAssetUrl = compiled_asset_url({
          family: family.replaceAll(' ', '').toLowerCase(),
          icon: icon.name,
          version: icon.version,
          asset: `${size}px.svg`,
        })
        pngAssetUrl = compiled_asset_url({
          family: family.replaceAll(' ', '').toLowerCase(),
          icon: icon.name,
          version: icon.version,
          asset: `${color}-${size}dp.zip`,
        })
      }
      return {
        ...icon,
        svgAssetUrl,
        pngAssetUrl,
        onClose: () => select(),
      }
    })
    const onChangeFont = (value: FontType) => state.font = value
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Slash') {
        if (searchRef.value) {
          searchRef.value.focus()
        }
      } else if (event.code === 'Escape' && state.selectedName) {
        select()
      }
    }
    document.addEventListener('keyup', onKeyDown)
    return {
      ...toRefs(state),
      codePoints,
      select,
      toggleShowCodepoint,
      filteredIcons,
      selectedIcon,
      onChangeFont,
      placeholder,
      searchRef,
      changeColorMode,
      visibilityChanged,
    }
  },
});
</script>

<style lang="scss" scoped>
@import "@primer/css/header/index.scss";
@import "@primer/css/popover/index.scss";
@import '@primer/css/utilities/index.scss';
@import '@primer/css/subhead/index.scss';
@import '@primer/css/labels/index.scss';
@import '@primer/css/blankslate/index.scss';
@import '@primer/css/loaders/index.scss';

svg {
  path {
    fill: var(--color-header-logo);
  }
}

.Header-item {
  &.theme-icon {
    margin-right: 0px !important;
    @include breakpoint(md) {
      margin-right: $spacer-3 !important;
    }
  }
}

@include breakpoint(md) {
  .header-search {
    max-width: 272px;
  }
}

.header-search {
  box-shadow: none;
  color: var(--color-scale-white);
  background-color: var(--color-header-search-bg);
  border: 1px solid var(--color-header-search-border);
  box-shadow: none;
  transition: .2s ease-in-out;
  transition-property: max-width;

  &:focus,
  &:focus-visible {
    border-color: var(--color-header-search-border);
  }
}

.Header-link {
  cursor: pointer;
  .Popover {
    font-weight: 300;
    cursor: default;
  }

  display: none;
  @include breakpoint(md) {
    display: block;
  }
}

.position-sticky {
  z-index: 10;
  > * {
    &:first-child {
      margin-left: $spacer-3;
    }
    &:not(:first-child) {
      margin-left: $spacer-2;
    }
  }
}
.category {
  .Subhead {
    @include breakpoint(md) {
      width: $container-md;
    }
    @include breakpoint(lg) {
      width: $container-lg;
    }
    @include breakpoint(xl) {
      width: $container-xl;
    }
  }
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, 120px);
  grid-auto-rows: 1fr;
  grid-row-gap: 0;
  grid-column-gap: 0;
  align-items: center;
  align-content: center;
  justify-content: center;

  @include breakpoint(md) {
    width: $container-md;
    justify-content: initial;
  }
  @include breakpoint(lg) {
    width: $container-lg;
  }
  @include breakpoint(xl) {
    width: $container-xl;
  }

  .grid-item {
    height: 120px;
    width: 120px;
    display: inline-grid;
    justify-items: center;
    border: solid 2px transparent;
    border-radius: 3px;
    cursor: pointer;
    color: var(--color-fg-default);

    &:hover {
      border-color: var(--color-accent-fg);
      transition: border-color .12s ease-out;
    }

    > * {
      width: 100%;
    }

    &.active {
      border-color: var(--color-accent-fg);
    }

    .grid-item-icon {
      flex-basis: 60%;
      flex-shrink: 0;
      align-items: flex-end;

      .icon {
        font-size: 3rem;
        user-select: none;
      }
    }
    .grid-item-title {
      margin-top: 0.4em;
      cursor: initial;
    }
    .grid-item-description {
      margin-top: 0.1em;
      cursor: initial;
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
.btn {
  display: flex;
  align-items: center;
  svg {
    width: $body-font-size;
    height: $body-font-size;
    path {
      fill: var(--color-fg-muted);
    }
  }
}
</style>
