<script setup>
</script>

<template>
  <div class="main-screen">
    <div class="main-screen__title-box">
      <h1 class="main-screen__title">AHO<br>«Воспитание<br>для всех»</h1>
    </div>
    <div class="main-screen__description-box">
      <span class="main-screen__description">Содействие развитию просветительской деятельности детей, их семей и
        молодёжи в области образования, культуры и физической культуры</span>
    </div>
    <div class="main-screen__img"></div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/mixins.scss' as *;

.main-screen {
  @include display-flex-column-center;
  @include minmax-width-mobile;

  justify-content: flex-end;
  min-width: var(--min-width);
  width: 100%;
  min-height: 600px;
  height: fit-content;
  background-color: var(--color-background-purple);
  top: 62px;
  padding-top: 40px;
  padding-right: 20px;
  padding-left: 20px;
  gap: 24px;
  border-radius: 12px;

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

  &__img {
    @include cover-center-no-repeat-img;
    background-image: url(/img/main-screen-photo-boy.png);
    width: 286px;
    height: 325px;
  }
}
</style>
