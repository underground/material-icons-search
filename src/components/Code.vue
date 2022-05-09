<template>
  <div class="copy-button p2 position-absolute tooltipped-nw"
    :class="{
      'v-visible': navigator?.clipboard,
      'tooltipped': copied,
    }"
    :aria-label="copied ? 'Copied' : 'Copy to clipboard'"
    @click="copyTo">
    <button class="btn-octicon" type="button" aria-label="copy">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M5.75 1a.75.75 0 00-.75.75v3c0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75v-3a.75.75 0 00-.75-.75h-4.5zm.75 3V2.5h3V4h-3zm-2.874-.467a.75.75 0 00-.752-1.298A1.75 1.75 0 002 3.75v9.5c0 .966.784 1.75 1.75 1.75h8.5A1.75 1.75 0 0014 13.25v-9.5a1.75 1.75 0 00-.874-1.515.75.75 0 10-.752 1.298.25.25 0 01.126.217v9.5a.25.25 0 01-.25.25h-8.5a.25.25 0 01-.25-.25v-9.5a.25.25 0 01.126-.217z"></path></svg>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

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
      fill: var(--color-scale-gray-6);
    }
  }
}
</style>
