<script setup>
import { ref, onMounted } from 'vue';
import VuePdfEmbed from 'vue-pdf-embed';

import 'vue-pdf-embed/dist/styles/annotationLayer.css';
import 'vue-pdf-embed/dist/styles/textLayer.css';

const error = ref(null);

const pdfSource = ref('/docs/charter.pdf');

onMounted(() => {
  fetch(pdfSource.value)
    .catch(() => {
      error.value = 'Файл не найден';
    });
});
</script>

<template>
  <div class="pdf-container">
    <h1>Устав организации</h1>
    <div v-if="error">{{ error }}</div>
  <div v-if="$route.path === '/charter'" class="pdf-container__file">
    <VuePdfEmbed :source="pdfSource" />
  </div>

  </div>

</template>

<style scoped lang="scss">
@use '@/assets/scss/mixins.scss' as *;
@import 'vue-pdf-embed/dist/styles/annotationLayer.css';
@import 'vue-pdf-embed/dist/styles/textLayer.css';

h1 {
  @include h1-pdf-container;
  width: 100%;
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
