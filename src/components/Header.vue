<template>
  <div class="Header" @click="$emit('close')" v-observe-visibility="visibilityChanged">
    <div class="Header-item">
      <Logo classname="mr-2" />
      <span class="title">MATERIAL ICONS SEARCH</span>
    </div>
    <div class="Header-item Header-item--full">
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
import { defineComponent } from 'vue';
import Logo from './Logo.vue';

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
    const visibilityChanged = (isVisible: boolean) => {
      if (!isVisible) {
        emit('close')
      }
    }
    return {
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
.Header-link {
  cursor: pointer;
  .Popover {
    font-weight: 300;
    cursor: default;
  }
}

</style>
