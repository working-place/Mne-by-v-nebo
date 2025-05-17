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
  linkUrl: {
    type: String,
    default: ''
  },
  linkText: {
    type: String,
    default: ''
  },
  paddingBottomMobile: {
    type: String,
    default: '0'
  },
  imageWidth: {
    type: String,
    default: '140px'
  },
  titleSize: {
    type: String,
    default: '16px'
  },
  descriptionSize: {
    type: String,
    default: '16px'
  },
  cardMinHeight: {
    type: String,
    default: '201px'
  },
  cardMaxHeight: {
    type: String,
    default: 'fit-content'
  },
  cardMinWidth: {
    type: String,
    default: '428px'
  },
});

const root = ref(null);
defineExpose({
  root
});
</script>

<template>
  <div class="card" :style="{ '--card-padding-bottom-mobile': paddingBottomMobile,
    '--card_card-min-height': cardMinHeight,
'--card_card-max-height': cardMaxHeight,
'--card_card-max-width': cardMinWidth,
   }" ref="root">
    <div class="card__content-text">
      <h3 class="card__title" :style="{ fontSize: titleSize }">{{ title }}</h3>
      <p class="card__description" :style="{ fontSize: descriptionSize }">{{ description }}</p>
      <a :href="linkUrl" class="card__link">{{ linkText }}</a>
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

  padding: 20px;
  gap: 10px;
  background-color: var(--color-background-light-blue);
  border-radius: var(--cards-border-radius);
  box-sizing: border-box;

  @media only screen and (max-width: 767px) {
    min-height: var(--main-screen_block-height);
    padding-bottom: var(--card-padding-bottom-mobile);
  }

  @media only screen and (min-width: 768px) {
    min-width: var(--card_card-max-width);
    min-height: var(--card_card-min-height);
    max-height: var(--card_card-max-height);
border-radius: 16px;
min-height: 211px;
// padding-bottom: 30px;
  }

  &__title {
    margin-bottom: 10px;

    @media only screen and (min-width: 1280px) {
        line-height: 1.2;
      }
  }

  &__title,
  &__description {
    color: var(--color-text-dark);
  }

  &__link {
    color: var(--color-text-purple);
    text-decoration: none;
    display: inline-flex;
    align-items: center;
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

    &__img-box :slotted(img) {
      width: calc(v-bind(imageWidth));
    }
  }

  @media only screen and (min-width: 1280px) {
    min-width: auto;
    min-height: 300px;
  }
}
</style>
