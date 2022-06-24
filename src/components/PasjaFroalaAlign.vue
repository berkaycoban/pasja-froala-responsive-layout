<script lang="ts">
import { defineComponent } from 'vue'

import AlignHorizontalCenter from './icons/align_horizontal_center.vue'
import AlignHorizontalLeft from './icons/align_horizontal_left.vue'
import AlignHorizontalRight from './icons/align_horizontal_right.vue'
import AlignVerticalBottom from './icons/align_vertical_bottom.vue'
import AlignVerticalCenter from './icons/align_vertical_center.vue'
import AlignVerticalTop from './icons/align_vertical_top.vue'

export default defineComponent({
  name: 'PasjaFroalaAlign',
  components: { AlignHorizontalCenter, AlignHorizontalLeft, AlignHorizontalRight, AlignVerticalBottom, AlignVerticalCenter, AlignVerticalTop },
  data() {
    return {
      isOpen: true as boolean,

      listener: null as any,
      element: null as any,

      top: '' as string,
      left: '' as string
    }
  },
  mounted() {
    document.addEventListener('pasja-froala-align', this.pasjaFroalaAlignListener)
  },
  unmounted() {
    document.removeEventListener('pasja-froala-align', this.pasjaFroalaAlignListener)
  },
  methods: {
    pasjaFroalaAlignListener(e: any) {
      if (!e.detail.element) return this.close()

      this.isOpen = true
      this.element = e.detail.element

      const { x, y, width, height } = e.detail.element.getBoundingClientRect()

      this.left = x + width / 2 + 'px'
      this.top = y + height + 8 + 'px'
    },

    close() {
      this.element = null
      this.isOpen = false
    },

    setClass(val: string) {
      const parentNode = this.element.parentNode
      const classPrefix = val.split('-')[0]

      const isHasClassName = parentNode.className.indexOf(classPrefix) !== -1

      if (isHasClassName) {
        const parentClassList = parentNode.className.split(' ')

        // fix duplicate class name
        parentNode.className = parentClassList
          .filter((e: any) => e.indexOf(classPrefix) === -1)
          .join(' ')
          .trim()
      }

      parentNode.classList.toggle(val)

      this.isOpen = false
    }
  }
})
</script>

<template lang="pug">
.pasja.pasja--align(v-if="isOpen && element" :style="{ top: top, left: left }")
  .pasja__actions
    .pasja__button(@click="setClass('justify-start')") 
      AlignHorizontalLeft
    .pasja__button(@click="setClass('justify-center')")
      AlignHorizontalCenter
    .pasja__button(@click="setClass('justify-end')")
      AlignHorizontalRight
    .pasja__button(@click="setClass('items-start')")
      AlignVerticalTop
    .pasja__button(@click="setClass('items-center')")
      AlignVerticalCenter
    .pasja__button(@click="setClass('items-end')")
      AlignVerticalBottom
</template>

<style lang="scss">
@import '@/assets/base.scss';

.pasja--align {
  .pasja {
    &__actions {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 4px;
    }

    &__button {
      padding: 4px 8px;

      &:hover {
        &::before {
          z-index: 0;
          opacity: 0.3;
        }
      }

      svg {
        width: 18px;
        height: 18px;
        fill: #fff;
      }
    }
  }
}
</style>
