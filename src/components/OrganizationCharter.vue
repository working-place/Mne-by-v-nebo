<script setup>
import { VuePDF, usePDF } from '@tato30/vue-pdf'

const { pdf, pages } = usePDF('/charter.pdf', {
  scale: 1.2
})

</script>

<template>
  <div class="pdf-container">
    <h1>Устав организации</h1>
    <template v-if="pdf">
      <div v-for="page in pages" :key="page" class="pdf-page">
        <VuePDF :pdf="pdf" :page="page" />
      </div>
    </template>
    <div v-else class="pdf-loading">
      Загрузка документа...
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/mixins.scss' as *;
@use "@/assets/scss/pdf-styles.scss" as *;
</style>
