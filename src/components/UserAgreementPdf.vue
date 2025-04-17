<script setup>
import { ref, onMounted } from 'vue';
import VuePdfEmbed from 'vue-pdf-embed';

import 'vue-pdf-embed/dist/styles/annotationLayer.css';
import 'vue-pdf-embed/dist/styles/textLayer.css';

const error = ref(null);

const pdfSource = ref("/docs/user-agreement.pdf");

onMounted(() => {
  fetch(pdfSource.value)
    .catch(() => {
      error.value = 'Файл не найден';
    });
});
</script>

<template>
  <div class="pdf-container">
    <h1>Пользовательское соглашение</h1>
    <div v-if="error">{{ error }}</div>
  <div v-if="$route.path === '/user-agreement'" class="pdf-container__file" :style="{ width: '1028px', height: '700px' }">
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
