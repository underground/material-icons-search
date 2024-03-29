<template>
  <transition name="modal" appear>
    <div class="modal modal-overlay" @click="$emit('close')">
      <div class="modal-window" @click.stop="">
        <details-dialog class="Box Box--overlay d-flex flex-column anim-fade-in fast">
          <div class="Box-header">
            <button class="Box-btn-octicon btn-octicon float-right" type="button" aria-label="Close dialog" data-close-dialog
              @click="$emit('close')">
              <svg class="octicon octicon-x" viewBox="0 0 12 16" version="1.1" width="12" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48L7.48 8z"></path></svg>
            </button>
            <div class="Box-title">{{ name }}</div>
          </div>
          <div class="overflow-auto">
            <div class="icon-viewer">
              <div class="d-flex flex-justify-center">
                <span class="material-icons py-3">{{ name }}</span>
              </div>
            </div>
            <div class="Box-body overflow-auto">
              <dl>
                <dd class="position-relative">
                  <a class="btn btn-sm" :href="svgAssetUrl" role="button"
                    aria-label="Download asset in SVG format for this icon"
                    @click.prevent="download(svgAssetUrl)">
                    <svg class="octicon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M7.47 10.78a.75.75 0 001.06 0l3.75-3.75a.75.75 0 00-1.06-1.06L8.75 8.44V1.75a.75.75 0 00-1.5 0v6.69L4.78 5.97a.75.75 0 00-1.06 1.06l3.75 3.75zM3.75 13a.75.75 0 000 1.5h8.5a.75.75 0 000-1.5h-8.5z"></path></svg>
                    <span>SVG</span>
                  </a>
                  <a class="btn btn-sm ml-2" :href="pngAssetUrl" role="button"
                    aria-label="Download asset in PNG format for this icon"
                    download>
                    <svg class="octicon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M7.47 10.78a.75.75 0 001.06 0l3.75-3.75a.75.75 0 00-1.06-1.06L8.75 8.44V1.75a.75.75 0 00-1.5 0v6.69L4.78 5.97a.75.75 0 00-1.06 1.06l3.75 3.75zM3.75 13a.75.75 0 000 1.5h8.5a.75.75 0 000-1.5h-8.5z"></path></svg>
                    <span>PNG</span>
                  </a>
                </dd>
              </dl>
              <dl>
                <dt class="f6 text-bold text-uppercase text-gray">Html:</dt>
                <dd class="position-relative">
                  <pre><code>{{ htmlCode() }}</code></pre>
                  <Code :code="htmlCode()" />
                </dd>
              </dl>
              <dl>
                <dt class="f6 text-bold text-uppercase text-gray">React:</dt>
                <dd class="position-relative">
                  <pre><code>{{ reactCode() }}</code></pre>
                  <Code :code="reactCode()" />
                </dd>
              </dl>
              <dl>
                <dt class="f6 text-bold text-uppercase text-gray">CSS:</dt>
                <dd class="position-relative">
                  <pre><code>{{ cssCode("before") }}</code></pre>
                  <Code :code="cssCode('before')" />
                </dd>
                <dd class="position-relative mt-2">
                  <pre><code>{{ cssCode("after") }}</code></pre>
                  <Code :code="cssCode('after')" />
                </dd>
              </dl>
              <dl>
                <dt class="f6 text-bold text-uppercase text-gray">Codepoint:</dt>
                <dd class="position-relative">
                  <pre><code>{{ codepoint }}</code></pre>
                  <Code :code="codepoint" />
                </dd>
              </dl>
              <dl v-if="categories.length">
                <dt class="f6 text-bold text-uppercase text-gray">Categories:</dt>
                <div class="d-flex flex-wrap">
                  <dd v-for="category in categories" :key="category"
                    class="d-inline-flex">
                    <span class="Label ml-1 mt-1">{{ category }}</span>
                  </dd>
                </div>
              </dl>
              <dl v-if="tags.length">
                <dt class="f6 text-bold text-uppercase text-gray">Tags:</dt>
                <div class="d-flex flex-wrap">
                  <dd v-for="tag in tags" :key="tag"
                    class="d-inline-flex">
                    <span class="Label ml-1 mt-1">{{ tag }}</span>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </details-dialog>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Code from './Code.vue';

export default defineComponent({
  name: 'Details',
  components: {
    Code,
  },
  props: {
    font: {
      type: String,
      required: true
    },
    version: {
      type: Number,
    },
    name: {
      type: String,
      required: true
    },
    codepoint: {
      type: String,
    },
    categories: {
      type: Array as PropType<string[]>,
    },
    tags: {
      type: Array as PropType<string[]>,
    },
    popularity: {
      type: Number,
      default: 0,
    },
    sizes_px: {
      type: Array as PropType<number[]>,
    },
    svgAssetUrl: {
      type: String,
    },
    pngAssetUrl: {
      type: String,
    },
  },
  setup(props) {
    const htmlCode = () => `<span class="material-icons">
  ${props.name}
</span>`
    const reactCode = () => `<span className="material-icons">
  ${props.name}
</span>`
    const cssCode = (selector: string) => `&::${selector} {
  font-family: 'Material Icons';
  content: "\\${props.codepoint}";
}`
    const download = async (url: string) => {
      try {
        const response = await fetch(url)
        const blob = await response.blob()
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = `${props.name}-${new URL(url).pathname.split('/').pop() || ''}`
        link.click()
        URL.revokeObjectURL(link.href)
      } catch (err) {
        console.error(err)
      }
    }
    return {
      download,
      htmlCode,
      reactCode,
      cssCode,
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@primer/css/box/index.scss';
@import '@primer/css/breadcrumb/index.scss';
@import '@primer/css/labels/index.scss';
@import '@primer/css/utilities/index.scss';

.modal {
  &.modal-overlay {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }

  &-window {
    overflow: hidden;
  }
  dl {
    dd {
      margin: 2px 0;
    }
  }
  pre {
    padding: .5rem;
    border: solid 1px var(--color-border-default);
    border-radius: 3px;
    background: var(--color-canvas-subtle);
    white-space: pre-wrap;
  }
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.4s;

  .modal-window {
    transition: opacity 0.4s, transform 0.4s;
  }
}

.modal-leave-active {
  transition: opacity 0.6s ease 0.4s;
}

.modal-enter,
.modal-leave-to {
  opacity: 0;

  .modal-window {
    opacity: 0;
  }
}
.icon-viewer {
  background-size: 20px 20px;
  background-color: var(--color-bg-default);
  background-position: 0 0,10px 10px;
  border-bottom: solid 1px var(--color-border-subtle);
  overflow: hidden;
  width: 100%;

  > div {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .material-icons {
    overflow: hidden;
    user-select: none;
    font-size: 5rem;
  }
}
dl:first-of-type {
  margin-top: 0;
}
</style>
