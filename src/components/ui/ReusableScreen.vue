<script setup>
</script>

<template>
  <div class="main-screen">
    <div class="main-screen__title-box">
      <h1 class="main-screen__title">
        <slot name="title"></slot>
      </h1>
    </div>
    <div class="main-screen__description-box">
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

  justify-content: flex-end;
  min-width: var(--min-width);
  width: calc(100% + 34px);
  min-height: 600px;
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
    @include display-flex-center-center;
    width: 100%;
    color: var(--color-text-light);
  }

  &__title {
    @include h1-mobile;
  }

  &__description {
    text-align: center;
  }

  &__img-box,
  &__img {
    @include cover-center-no-repeat-img;
    width: 286px;
    height: 325px;
  }
}
</style>
