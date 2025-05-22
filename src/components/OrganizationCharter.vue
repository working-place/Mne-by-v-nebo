<script setup>
import { VuePDF, usePDF } from '@tato30/vue-pdf'
import { ref, onMounted, onBeforeUnmount } from 'vue'

const { pdf, pages } = usePDF('/charter.pdf')
const scale = ref(1.0)

const calculateScale = () => {
  const containerWidth = document.querySelector('.pdf-container')?.clientWidth || window.innerWidth
  const targetWidth = containerWidth - 34
  scale.value = Math.min(targetWidth / 800, 1.3)
}

const handleResize = () => {
  calculateScale()
}

onMounted(() => {
  calculateScale()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <div class="pdf-container">
    <h1>Устав организации</h1>
    <template v-if="pdf">
      <div v-for="page in pages" :key="page" class="pdf-page">
        <VuePDF :pdf="pdf" :page="page" :scale="scale" />
      </div>
    </template>
    <div v-else class="pdf-loading">
      Загрузка документа...
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
