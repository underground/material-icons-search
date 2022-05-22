<template>
  <div class="Header" @click="$emit('close')" v-observe-visibility="visibilityChanged">
    <div class="Header-item flex-items-start">
      <Logo classname="mr-2" />
      <span class="title">MATERIAL ICONS SEARCH</span>
    </div>
    <div class="Header-item Header-item--full">
    </div>
    <div class="Header-item theme-icon"
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
    <div class="Header-link position-relative mr-3" @click.stop="$emit(showAbout ? 'close' : 'open')">
      About
      <div class="Popover right-0 mt-2 position-absolute text-gray-dark text-normal ws-normal"
        :class="{'v-hidden': !showAbout}">
        <div class="Popover-message Popover-message--top-right text-left p-3 Box box-shadow-large wb-break-all">
          <div class="d-flex flex-justify-center mb-2">
            <Logo />
          </div>
          <p class="f5">A site to help web developers find <a href="https://material.io/resources/icons/" target="_blank" rel="noopener noreferrer">Google Material Icons</a> quickly and easily.</p>
          <hr class="my-2">
          <a class="f6" href="https://github.com/underground/material-icons-search/issues/new" target="_blank">Look forward to hearing about your ideas and suggestions.</a>
        </div>
      </div>
    </div>
    <a href="https://material.io/develop/web/getting-started" target="_blank" rel="noopener noreferrer" class="Header-link mr-3">
      Get Started
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, toRefs, onMounted, watch } from 'vue'
import Logo from './Logo.vue';

type ColorMode = 'auto' | 'light' | 'dark';
interface State {
  colorMode: ColorMode;
}

export default defineComponent({
  name: 'Header',
  props: {
    showAbout: {
      type: Boolean,
      required: true
    },
  },
  components: {
    Logo,
  },
  setup(props, { emit }) {
    const state = reactive<State>({
      colorMode: 'auto',
    })
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
        emit('close')
      }
    }
    const changeColorMode = (color: ColorMode) => {
      state.colorMode = color
    }
    return {
      ...toRefs(state),
      changeColorMode,
      visibilityChanged,
    }
  },
});
</script>

<style lang="scss" scoped>
@import "@primer/css/header/index.scss";
@import "@primer/css/popover/index.scss";

.title {
  font-weight: 300;
  font-size: 1.1em;
  letter-spacing: .2rem;
  color: white;
}

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


.Header-link {
  cursor: pointer;
  .Popover {
    font-weight: 300;
    cursor: default;
  }
}

</style>
