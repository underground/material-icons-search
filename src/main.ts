import { createApp } from 'vue'
import { ObserveVisibility } from 'vue-observe-visibility'
import App from './App.vue'

createApp(App)
  // https://github.com/Akryum/vue-observe-visibility/issues/219#issuecomment-688586495
  .directive("observe-visibility", {
    beforeMount: (el, binding, vnode) => {
      (vnode as any).context = binding.instance
      ObserveVisibility.bind(el, binding, vnode)
    },
    updated: ObserveVisibility.update,
    unmounted: ObserveVisibility.unbind,
  })
  .mount('#app')
