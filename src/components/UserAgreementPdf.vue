<script setup>
import VuePdfEmbed from 'vue-pdf-embed';

import userAgreementPdf from '/docs/Пользовательское соглашение.pdf';
</script>

<template>
  <div class="pdf-container">
    <h1>Пользовательское соглашение</h1>
  <div v-if="$route.path === '/user-agreement'" class="pdf-container__file">
    <VuePdfEmbed :source="userAgreementPdf" />
  </div>

  </div>

</template>

<style scoped lang="scss">
@use '@/assets/scss/mixins.scss' as *;

h1 {
  @include h1-pdf-container;
}

.pdf-container {
  @include display-flex-column-center;
  @include minmax-width-mobile;
  padding-left: 17px;
  padding-right: 17px;

  &__file {
    @include pdf-container;
    @include minmax-width-mobile;
  }
}
</style>
