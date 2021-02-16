<template>
  <div class="Header" @click="$emit('close')" v-observe-visibility="visibilityChanged">
    <div class="Header-item">
      <span class="logo mr-2">{{ logo }}</span>
      <span class="title">MATERIAL ICONS SEARCH</span>
    </div>
    <div class="Header-item Header-item--full">
    </div>
    <div class="Header-link position-relative mr-3" @click.stop="$emit(showAbout ? 'close' : 'open')">
      About
      <div class="Popover right-0 mt-2 position-absolute text-gray-dark text-normal ws-normal"
        :class="{'v-hidden': !showAbout}">
        <div class="Popover-message Popover-message--top-right text-left p-3 Box box-shadow-large wb-break-all">
          <p class="f4">A site to help web developers find <a href="https://material.io/resources/icons/" target="_blank" rel="noopener noreferrer">Google Material Icons</a> quickly and easily.</p>
          <a class="f5" href="https://github.com/underground/material-icons/issues/new" target="_blank">Look forward to hearing your ideas. </a>
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

export default defineComponent({
  name: 'Header',
  props: {
    showAbout: {
      type: Boolean,
      required: true
    },
  },
  setup(props, { emit }) {
    const logo = "</>"
    const visibilityChanged = (isVisible: boolean) => {
      if (!isVisible) {
        emit('close')
      }
    }
    return {
      logo,
      visibilityChanged,
    }
  },
});
</script>

<style lang="scss" scoped>
@import "@primer/css/header/index.scss";
@import "@primer/css/popover/index.scss";
@import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@500&display=swap');

.logo {
  font-family: 'Work Sans', sans-serif;
  font-size: 1.1em;
  color: white;
}
.title {
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 300;
  font-size: 1.1em;
  letter-spacing: .3rem;
  color: white;
}
.Header-link {
  cursor: pointer;
}

</style>
