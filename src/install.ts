import type { App } from 'vue'

import PasjaFroalaGrid from './components/PasjaFroalaGrid.vue'
import PasjaFroalaAlign from './components/PasjaFroalaAlign.vue'

export default {
  install: (app: App) => {
    app.component('PasjaFroalaGrid', PasjaFroalaGrid)
    app.component('PasjaFroalaAlign', PasjaFroalaAlign)
  }
}
