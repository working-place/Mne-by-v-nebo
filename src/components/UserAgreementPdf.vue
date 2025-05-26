<script setup>
import { VuePDF, usePDF } from '@tato30/vue-pdf'
import { ref, onMounted, onBeforeUnmount } from 'vue'

const { pdf, pages } = usePDF('/user-agreement.pdf')
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
    <h1>Пользовательское соглашение</h1>
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

<style lang="scss">
@use '@/assets/scss/mixins.scss' as *;

.pdf-container {
  width: 100%;
  padding: 17px;
  box-sizing: border-box;
  margin: 60px auto 0;

  h1 {
    display: flex;
    text-align: center;
    margin: 0;
    margin-bottom: 20px;
    font-size: 16px;
    max-width: 50%;
  }
}

.pdf-page {
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  border-radius: 4px;

  :deep(.page) {
    max-width: 100%;
    height: auto !important;
    margin: 0 auto;
    display: block;
  }
}

.pdf-loading {
  text-align: center;
  padding: 40px;
  color: #666;
}

@media (max-width: 768px) {
  .pdf-container {
    padding: 10px;
  }

  .pdf-page {
    margin-bottom: 10px;
  }
}
</style>
