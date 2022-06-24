import type { App } from 'vue'
import PasjaFroalaGrid from './components/PasjaFroalaGrid.vue'
import './assets/base.css'

export default {
  install: (app: App) => {
    app.component('PasjaFroalaGrid', PasjaFroalaGrid)
  }
}
