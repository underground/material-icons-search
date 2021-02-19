import { createApp } from 'vue'
import { ObserveVisibility } from 'vue-observe-visibility'
import VueGtag from 'vue-gtag-next'
import App from './App.vue'

const app = createApp(App)
// https://github.com/Akryum/vue-observe-visibility/issues/219#issuecomment-688586495
app.directive("observe-visibility", {
  beforeMount: (el, binding, vnode) => {
    (vnode as any).context = binding.instance
    ObserveVisibility.bind(el, binding, vnode)
  },
  updated: ObserveVisibility.update,
  unmounted: ObserveVisibility.unbind,
})
if (process.env.VUE_APP_GA_TRACKING_ID) {
  app.use(VueGtag, {
    property: {
      id: process.env.VUE_APP_GA_TRACKING_ID
    }
  })
}
app.mount('#app')
