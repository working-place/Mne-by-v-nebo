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
  max-width: 320px;
  min-height: 206px;
  height: fit-content;
  padding: 36px 30px;
  gap: 10px;
  background-color: var(--color-background-light-blue);
  border-radius: var(--cards-border-radius);

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
    width: 176px;
    height: 120px;
  }
}
</style>
