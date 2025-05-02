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
    '--main-screen_bg-color': bgColor,
    '--main-screen_text-color': textColor,
    '--main-screen_block-height': blockHeight,
  }">
    <div class="main-screen__wrapper">
      <div class="main-screen__title-box">
        <h1 class="main-screen__title">
          <slot name="title"></slot>
        </h1>
      </div>
      <div class="main-screen__description-box" :class="{ 'flex-layout': useFlex }">
        <span class="main-screen__description">
          <slot name="description"></slot>
        </span>
      </div>
    </div>

    <div class="main-screen__img-box">
      <slot name="img"></slot>
    </div>
  </div>
</template>

<style lang="scss">
@use '@/assets/scss/mixins.scss' as *;

.main-screen {
  @include minmax-width-mobile;
  display: flex;

  justify-content: flex-end;
  min-width: var(--min-width);
  width: calc(100% + 34px);
  height: fit-content;
  gap: 24px;
  padding-top: 40px;
  padding-left: 20px;
  padding-right: 20px;
  background-color: var(--main-screen_bg-color);
  border-radius: 12px;

  @media only screen and (max-width: 767px) {
    flex-direction: column;
    align-items: center;
    min-height: var(--main-screen_block-height);
  }

  @media only screen and (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    height: fit-content;
    gap: 10px;
    padding: 0;
    padding-top: 60px;
    padding-left: 52px;
  }

  @media only screen and (min-width: 1280px) {
    height: 420px;
    gap: 10px;
  }

  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: 20px;

    @media only screen and (min-width: 768px) {
      justify-content: flex-start;
      min-height: 244px;
      height: fit-content;
      gap: 24px;
      padding: 0;
    }

    @media only screen and (min-width: 1280px) {
      max-width: 825px;
    }
  }

  &__title-box,
  &__description-box {
    justify-content: center;
    align-items: center;
    width: 100%;
    color: var(--main-screen_text-color);

    @media only screen and (min-width: 768px) {
      height: 100%;
    }

    @media only screen and (min-width: 1280px) {
      justify-content: flex-start;
    }
  }

  &__title {
    @include h1-mobile;

    @media only screen and (min-width: 768px) {
      text-align: left;
      font-size: 36px;
      line-height: 1.25;
    }

    @media only screen and (min-width: 1280px) {
      max-width: 825px;
      font-size: 48px;
    }
  }

  &__description {
    display: flex;
    text-align: center;
    width: 100%;

    @media only screen and (min-width: 768px) {
      text-align: left;
    }
  }

  &__img-box {
    display: flex;

    @media only screen and (min-width: 768px) {
      justify-content: flex-end;
    }

    @media only screen and (min-width: 1280px) {
      width: 318px;
    }
  }

  &__img {
    @include cover-center-no-repeat-img;
    width: 256px;

    @media only screen and (min-width: 1280px) {
      width: 318px;
      border-bottom-right-radius: 12px;
    }
  }
}

.flex-layout {
  display: flex;
}
</style>
