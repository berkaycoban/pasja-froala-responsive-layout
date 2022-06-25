<script setup lang="ts">
import { nextTick, ref } from 'vue'

// @ts-ignore
import FroalaEditor from 'froala-editor/js/froala_editor.pkgd.min.js'
import 'froala-editor/css/froala_editor.pkgd.min.css'
import 'froala-editor/css/froala_style.min.css'

const froalaConfig = {
  toolbarButtons: [
    'bold',
    'italic',
    'fontSize',
    'textColor',
    'backgroundColor',
    'inlineClass',
    'inlineStyle',
    'clearFormatting',
    'pasjaFroalaLayout'
  ],
  quickInsertTags: [''],
  events: {
    click: function (e: any) {
      const clickedElement = e.target
      const isHasColumnClass = clickedElement.className.indexOf('col') !== -1

      if (isHasColumnClass) {
        const froalaLayoutEvent = new CustomEvent('pasja-froala-align', { detail: { element: clickedElement } })
        document.dispatchEvent(froalaLayoutEvent)
      } else {
        const froalaLayoutEvent = new CustomEvent('pasja-froala-align', { detail: { element: null } })
        document.dispatchEvent(froalaLayoutEvent)
      }
    }
  }
}

FroalaEditor.RegisterCommand('pasjaFroalaLayout', {
  title: 'Pasja Responsive Grid',
  icon: '-P-',
  refreshAfterCallback: true,
  callback() {
    this.selection.save() // save caret position

    const froalaLayoutEvent = new CustomEvent('pasja-froala-grid', { detail: { froalaInstance: this } })
    document.dispatchEvent(froalaLayoutEvent)

    this.froalaLayoutPluginActive = true
  },
  refresh() {
    if (this.froalaLayoutPluginActive) {
      const froalaLayoutEvent = new CustomEvent('pasja-froala-grid', { detail: { froalaInstance: null } })
      document.dispatchEvent(froalaLayoutEvent)
    }
  }
})

const froalaInstance = ref(null)

nextTick(() => {
  const el = document.getElementById('froala-demo') as Element
  if (!froalaInstance.value) froalaInstance.value = new FroalaEditor(el, froalaConfig)
  else froalaInstance.value = null
})
</script>

<template lang="pug">
#froala-demo
</template>

<style lang="scss">
@import '@/assets/base.scss';
@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap-grid.min.css');
</style>
