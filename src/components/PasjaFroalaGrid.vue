<script lang="ts">
import { defineComponent } from 'vue'

import Mobile from './icons/mobile.vue'
import Tablet from './icons/tablet.vue'
import Display from './icons/display.vue'

const SM_COL_PREFIX = 'col-sm-'
const MD_COL_PREFIX = 'col-md-'
const LG_COL_PREFIX = 'col-lg-'

type colValue = { value: any; isValid: boolean }
type col = { sm: colValue; md: colValue; lg: colValue }

export default defineComponent({
  name: 'PasjaFroalaGrid',
  components: { Mobile, Tablet, Display },
  data() {
    return {
      isOpen: false as boolean,
      froalaInstance: null as any,

      layout: {
        rows: [
          {
            cols: [
              { sm: { value: '', isValid: true }, md: { value: '', isValid: true }, lg: { value: '', isValid: true } },
              { sm: { value: '', isValid: true }, md: { value: '', isValid: true }, lg: { value: '', isValid: true } }
            ] as col[],

            gutter: ''
          }
        ]
      } as any,

      listener: null as any
    }
  },
  mounted() {
    document.addEventListener('pasja-froala-grid', this.pasjaFroalaGridListener)
  },
  unmounted() {
    document.removeEventListener('pasja-froala-grid', this.pasjaFroalaGridListener)
  },
  methods: {
    pasjaFroalaGridListener(e: any) {
      if (e.detail.froalaInstance) {
        this.isOpen = true
        this.froalaInstance = e.detail.froalaInstance
      }
    },

    close() {
      this.resetColumn()
      this.froalaInstance = null
      this.isOpen = false
    },

    addColumn() {
      const cols = this.layout.rows[0].cols
      if (cols.length === 12) return

      cols.push({ sm: { value: '', isValid: true }, md: { value: '', isValid: true }, lg: { value: '', isValid: true } })
    },
    resetColumn() {
      this.layout.rows[0].gutter = ''
      this.layout.rows[0].cols = [
        { sm: { value: '', isValid: true }, md: { value: '', isValid: true }, lg: { value: '', isValid: true } },
        { sm: { value: '', isValid: true }, md: { value: '', isValid: true }, lg: { value: '', isValid: true } }
      ]
    },
    confirm() {
      let html = ''

      const rows = this.layout.rows
      for (const { cols, gutter } of rows) {
        let colsHTML = ''

        cols?.map((item: col) => {
          let classes = []
          const sm = item.sm.value ? SM_COL_PREFIX + item.sm.value : null
          const md = item.md.value ? MD_COL_PREFIX + item.md.value : null
          const lg = item.lg.value ? LG_COL_PREFIX + item.lg.value : null

          if (sm) classes.push(sm)
          if (md) classes.push(md)
          if (lg) classes.push(lg)

          if (!sm && !md && !lg) classes.push('col')

          colsHTML += `<div class="${classes.join(' ')}">Content here</div>`
        })

        let gutterClass = gutter && parseInt(gutter) <= 5 ? `g-${gutter}` : null
        const rowClasses = ['row', gutterClass].join(' ').trim()
        html += `<div class="${rowClasses}">${colsHTML}</div><br />`
      }

      this.froalaInstance.selection.restore() // restore caret position
      this.froalaInstance.html.insert(html)
      this.close()
    },

    validateHandler(item: colValue) {
      if (item.value > 12) {
        item.isValid = false
        item.value = 12
        return
      }

      if (item.value < 1) {
        item.isValid = false
        item.value = 1
        return
      }
    }
  }
})
</script>

<template lang="pug">
.pasja.pasja--grid(v-if="isOpen" @click.self="close")
  .pasja__content
    .pasja__header
      .pasja__header-title Devices
      .pasja__header-actions
        button.pasja__button.pasja__button--add-column(@click="addColumn") Add Column
        button.pasja__button.pasja__button--reset(@click="resetColumn") Reset
    .pasja__navbar
      .pasja__navbar-item Mobile
        Mobile
      .pasja__navbar-item Tablet
        Tablet
      .pasja__navbar-item Desktop
        Display
    .pasja__grid
      .pasja__grid-row(v-for="row in layout.rows")
        .pasja__grid-column(v-for="col in row.cols")
          input.pasja__grid-input(type="number" v-model="col.sm.value" @change="validateHandler(col.sm)" placeholder="1-12" min="0" max="12" :disabled="!col.sm.isValid")
          input.pasja__grid-input(type="number" v-model="col.md.value" @change="validateHandler(col.md)" placeholder="1-12" min="0" max="12" :disabled="!col.md.isValid")
          input.pasja__grid-input(type="number" v-model="col.lg.value" @change="validateHandler(col.lg)" placeholder="1-12" min="0" max="12" :disabled="!col.lg.isValid")
    .pasja__footer
      input.pasja__footer-input(type="number" v-model="layout.rows[0].gutter" placeholder="column spacing 0 - 5" min="0" max="5")
      button.pasja__button.pasja__button--confirm(@click="confirm") Confirm
</template>

<style lang="scss">
@import '@/assets/base.scss';

.pasja--grid {
  .pasja {
    &__content {
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0px 4px 34px rgba(0, 0, 0, 0.25);

      color: #333;

      display: grid;
      grid-template-areas:
        'header header'
        'navbar content'
        'footer footer';
      grid-template-columns: minmax(100px, auto) 1fr;
      gap: 16px;
    }

    &__header {
      grid-area: header;

      display: flex;
      align-items: center;
      justify-content: space-between;

      padding: 16px;
      border-bottom: 1px solid #d1d1d6;

      &-actions {
        display: flex;
        align-items: center;
        gap: 8px;
      }
    }

    &__navbar {
      grid-area: navbar;

      display: flex;
      flex-direction: column;
      gap: 16px;

      padding-left: 16px;

      &-item {
        display: flex;
        align-items: center;
        justify-content: space-between;

        flex-grow: 1;
        gap: 8px;

        font-size: 12px;
        font-weight: 300;

        svg {
          width: 16px;
          height: 16px;
        }
      }
    }

    &__grid {
      grid-area: content;

      padding-right: 1rem;

      &-row {
        display: flex;
        gap: 1rem;
      }

      &-column {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        flex-grow: 1;
      }

      &-input {
        border: 1px solid #d1d1d6;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;

        min-width: 80px;

        &::placeholder {
          color: #aeaeb2;
          font-size: 12px;
        }
      }
    }
    &__footer {
      grid-area: footer;

      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 2rem;

      border-top: 1px solid #d1d1d6;
      padding: 1rem;

      &-input {
        border: 1px solid #d1d1d6;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;

        min-width: 180px;

        &::placeholder {
          color: #d1d1d6;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
