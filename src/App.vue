<script setup lang="ts">
import PasjaFroalaGrid from './components/PasjaFroalaGrid.vue'
import PasjaFroalaAlign from './components/PasjaFroalaAlign.vue'
import Demo from './components/Demo.vue'
</script>

<template lang="pug">
header.header
  h1.header__title Pasja Froala Responsive Layout
main.main
  Demo
  PasjaFroalaGrid
  PasjaFroalaAlign
footer.footer
  a.footer__link(href="https://github.com/berkaycoban") Github
</template>

<style lang="scss">
@import '@/assets/base.scss';

body {
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
}

.header {
  &__title {
    font-family: 'Mulish', sans-serif;
  }
}

.main {
  margin-top: 60px;
}

.footer {
  position: fixed;
  bottom: 0;

  padding: 32px;

  &__link {
    font-family: 'Mulish', sans-serif;
  }
}
</style>
