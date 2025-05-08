<script setup>
defineProps({
  paddingBottom: {
    type: String,
    default: '0'
  }
});
</script>

<template>
  <div class="description-card" :style="{ paddingBottom: paddingBottom }">
    <div class="description-card__number">
      <span>
        <slot name="number"></slot>
      </span>
    </div>
    <span class="description-card__text">
      <slot name="description"></slot>
    </span>
    <div class="description-card__img-box">
      <slot name="img"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/mixins.scss' as *;

.description-card {
  @include display-flex-column-center;
  position: relative;
  min-height: 206px;
  width: 100%;
  padding: 36px 30px;
  gap: 10px;
  background-color: var(--color-background-light-blue);
  border-radius: var(--cards-border-radius);

  @media only screen and (min-width: 768px) {
    min-width: 320px;
    min-height: 204px;
    width: 48%;
    flex-grow: 1;
    border-radius: var(--cards-border-radius-tablet);

    &:last-child {
      min-height: 132px;
      height: fit-content;
      width: 100%;
    }
  }

  @media only screen and (min-width: 1280px) {
    min-height: 226px;
    width: 33%;
    border-radius: var(--cards-border-radius-desctop);

    &:last-child {
    min-height: 226px;
    width: 33%;
    }
  }

  &__number {
    @include display-flex-center-center;
    position: absolute;
    top: -13.25px;
    left: -13.25px;
    width: 53px;
    height: 53px;
    background-color: var(--color-background-lavender);
    border-radius: 50%;
  }

  &__text {
    line-height: 1.4;
  }

  &__img-box {
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    position: absolute;
    bottom: 0;
    right: 0;
    width: 8em;
  }
}
</style>
