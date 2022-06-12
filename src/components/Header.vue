<template>
  <div class="Header" @click="$emit('close')" v-observe-visibility="visibilityChanged">
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
        @input="setSarchText($event.target.value)"
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
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref, onMounted, watch, computed } from 'vue'
import { useStore } from 'vuex'
import { State, ColorMode } from '@/types'
import Logo from './Logo.vue';

export default defineComponent({
  name: 'Header',
  components: {
    Logo,
  },
  setup(props, { emit }) {
    const store = useStore()
    const loadingRef = computed(() => store.state.loading)
    const iconNumsRef = computed(() => store.getters.iconNums)
    const searchRef = ref<HTMLInputElement>()
    onMounted(() => {
      store.commit("setColorMode", window.matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'light')
    })
    store.watch(
      (state, getters) => state.colorMode,
      (next, prev) => {
        document.documentElement.setAttribute('data-color-mode', next)
      })

    const visibilityChanged = (isVisible: boolean) => {
      if (!isVisible) {
        emit('close')
      }
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Slash') {
        if (searchRef.value) {
          searchRef.value.focus()
        }
      }
    }
    document.addEventListener('keyup', onKeyDown)
    return {
      searchText: computed(() => store.state.searchText),
      colorMode: computed(() => store.state.colorMode),
      placeholder: computed(() => `Search ${loadingRef.value ? '' : iconNumsRef.value.toLocaleString()} icons (Press "/" to focus)`),
      searchRef,
      visibilityChanged,
      changeColorMode: (color: ColorMode) => store.commit("setColorMode", color),
      setSarchText: (value: string) => store.commit('setText', value),
    }
  },
});
</script>

<style lang="scss" scoped>
@import "@primer/css/header/index.scss";
@import "@primer/css/popover/index.scss";

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

</style>
