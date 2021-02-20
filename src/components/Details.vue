<template>
  <transition name="modal" appear>
    <div class="modal modal-overlay" @click="onClose">
      <div class="modal-window" @click.stop="">
        <details-dialog class="Box Box--overlay d-flex flex-column anim-fade-in fast">
          <div class="Box-header">
            <button class="Box-btn-octicon btn-octicon float-right" type="button" aria-label="Close dialog" data-close-dialog
              @click="onClose">
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
                <dd class="position-relative">
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
              <dl v-if="category">
                <dt class="f6 text-bold text-uppercase text-gray">Category:</dt>
                <dd><span class="Label ml-1 mt-1">{{ category }}</span></dd>
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
    name: {
      type: String,
      required: true
    },
    codepoint: {
      type: String,
    },
    category: {
      type: String,
    },
    tags: {
      type: Array as PropType<string[]>,
    },
    popularity: {
      type: Number,
      default: 0,
    },
    onClose: {
      type: Function,
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
    return {
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

.modal {
  &.modal-overlay {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 30;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }

  &-window {
    overflow: hidden;
  }
  pre {
    margin: .5rem 0;
    padding: .5rem;
    border-radius: 3px;
    background: $gray-100;
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
  background-image: linear-gradient(0deg, rgba($gray-200, 0), rgba($gray-200, 0) 5px, $gray-200, rgba($gray-200, 0) 6px), linear-gradient(90deg, rgba($gray-200, 0), rgba($gray-200, 0) 5px, $gray-200, rgba($gray-200, 0) 6px);
  background-size: 10px 10px;
  background-position: center center;
  border-bottom: solid 1px $gray-200;
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
