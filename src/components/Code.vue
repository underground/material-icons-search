<template>
  <div class="copy-button p2 position-absolute tooltipped-nw"
    :class="{
      'v-visible': showCopyButton,
      'tooltipped': copied,
    }"
    :aria-label="copied ? 'Copied' : 'Copy to clipboard'"
    @click="copyTo">
    <button class="btn-octicon" type="button" aria-label="copy">
      <template v-if="copied">
        <svg class="success" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path></svg>
      </template>
      <template v-else>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"></path><path fill-rule="evenodd" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"></path></svg>
      </template>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed } from 'vue'

interface State {
  copied: boolean;
}

export default defineComponent({
  name: 'Code',
  props: {
    code: {
      type: String,
      required: true
    },
  },
  computed: {
    showCopyButton() {
      return navigator?.clipboard
    }
  },
  setup(props) {
    const state = reactive<State>({
      copied: false,
    })
    const copyTo = () => {
      navigator.clipboard.writeText(props.code)
      state.copied = true
      setTimeout(() => state.copied = false, 1000)
    }
    return {
      ...toRefs(state),
      copyTo,
    }
  },
})

</script>

<style lang="scss" scoped>
@import '@primer/css/buttons/index.scss';

.copy-button {
  padding: 2px;
  top: 0px;
  right: 0px;

  svg {
    > path {
      fill: var(--color-fg-muted);
    }
    &.success {
      > path {
        fill: var(--color-btn-primary-bg);
      }
    }
  }
}
</style>
