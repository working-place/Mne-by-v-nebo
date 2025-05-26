<script setup>
import { ref } from 'vue';

defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageWidth: {
    type: String,
    default: '140px'
  }
});

const root = ref(null);
defineExpose({ root });
</script>

<template>
  <div class="card" ref="root">
    <div class="card__content-text">
      <h3 class="card__title">{{ title }}</h3>
      <p class="card__description">{{ description }}</p>
    </div>
    <div class="card__img-box">
      <slot name="image"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/mixins.scss' as *;

.card {
  @include display-flex-column-center;
  position: relative;
  width: 100%;
  min-height: 220px;
  padding: 20px;
  gap: 12px;
  background-color: var(--color-background-light-blue);
  border-radius: var(--cards-border-radius);
  box-sizing: border-box;
  overflow: hidden;

  &__content-text {
    width: 100%;
  }

  &__title {
    margin-bottom: 8px;
    font-size: 16px;
    font-weight: 600;
    color: var(--color-text-dark);
  }

  &__description {
    font-size: 16px;
    font-weight: 400;
    line-height: 1.4;
    color: var(--color-text-dark);
  }

  &__img-box {
    position: absolute;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: flex-end;
    overflow: hidden;
    border-radius: 0 0 12px 0;

    :slotted(img) {
      width: v-bind(imageWidth);
      height: auto;
    }
  }

  @media only screen and (min-width: 768px) {
    min-height: 270px;
    border-radius: 16px;

    &__img-box :slotted(img) {
      width: calc(v-bind(imageWidth) * 1.2);
    }
  }

  @media only screen and (min-width: 1280px) {
    min-height: 299px;
    border-radius: 24px;

    &__title {
      font-size: 20px;
      font-weight: 400;
    }
  }
}
</style>
