<script setup>
import VuePdfEmbed from 'vue-pdf-embed';

import privacyPolicyPdf from '/docs/Политика конфиденциальности.pdf';
</script>

<template>
  <div class="pdf-container">
    <h1>Политика конфиденциальности</h1>
  <div v-if="$route.path === '/privacy-policy'" class="pdf-container__file">
    <VuePdfEmbed :source="privacyPolicyPdf" />
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
