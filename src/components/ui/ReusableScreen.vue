<script setup>
defineProps({
  bgColor: {
    type: String,
    default: 'var(--color-background-purple)',
  },
  textColor: {
    type: String,
    default: 'var(--color-text-light)',
  },
  blockHeight: {
    type: String,
    default: '600px',
  },
  useFlex: {
    type: Boolean,
    default: true,
  }
})
</script>

<template>
  <div class="main-screen" :style="{
    '--main-screen_bg-color' : bgColor,
    '--main-screen_text-color' : textColor,
    '--main-screen_block-height' : blockHeight,
  }">
    <div class="main-screen__title-box">
      <h1 class="main-screen__title">
        <slot name="title"></slot>
      </h1>
    </div>
    <div class="main-screen__description-box"
    :class="{'flex-layout': useFlex}">
      <span class="main-screen__description">
        <slot name="description"></slot>
      </span>
    </div>
    <div class="main-screen__img-box">
      <slot name="img"></slot>
    </div>
  </div>
</template>

<style lang="scss">
@use '@/assets/scss/mixins.scss' as *;

.main-screen {
  @include display-flex-column-center;
  @include minmax-width-mobile;

  background-color: var(--main-screen_bg-color);

  justify-content: flex-end;
  min-width: var(--min-width);
  width: calc(100% + 34px);
  min-height: var(--main-screen_block-height);
  height: fit-content;
  top: 62px;
  padding-top: 40px;
  padding-right: 20px;
  padding-left: 20px;
  gap: 24px;
  border-radius: 12px;
  margin-left: -17px;
  margin-right: -17px;

  &__title-box,
  &__description-box {
    justify-content: center;
  align-items: center;
    width: 100%;
    color: var(--main-screen_text-color);
  }

  &__title {
    @include h1-mobile;
  }

  &__description {
    display: flex;
    width: 100%;
    text-align: center;
  }

  &__img-box {
    display: flex;
  }

  &__img {
    @include cover-center-no-repeat-img;
    width: 286px;
    height: 325px;
  }
}

.flex-layout {
  display: flex;
}
</style>
