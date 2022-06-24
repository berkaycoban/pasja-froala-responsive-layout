import type { App } from 'vue'

import PasjaFroalaGrid from './components/PasjaFroalaGrid.vue'

export default {
  install: (app: App) => {
    app.component('PasjaFroalaGrid', PasjaFroalaGrid)
  }
}
