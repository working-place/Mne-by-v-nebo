<script setup>
defineProps({
  tagClass: {
    type: String,
    default: 'all',
  }
});

</script>

<template>
  <div class="tag-card">
    <div class="tag-card__tag-box" :class="`tag-card__tag-box_${tagClass}`">
      <span class="tag-card__tag">
        <slot name="tag"></slot>
      </span>
    </div>
    <div class="tag-card__img-box">
      <slot name="img"></slot>
    </div>
    <div class="tag-card__text-box">
      <span class="tag-card__text">
        <slot name="text"></slot>
      </span>
      <span class="tag-card__date">
        <slot name="date"></slot>
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/mixins.scss' as *;

.tag-card {
  @include block-mobile;
  min-width: 320px;
  max-width: 362px;
  min-height: 206px;
  position: relative;
  background-color: var(--color-background-light-blue);
  border-radius: var(--cards-border-radius);
  padding: 10px 10px 20px 10px;

  &__tag-box {
    @include display-flex-center-center;
    position: absolute;
    top: 20px;
    left: 20px;
    min-width: 66px;
    width: fit-content;
    height: 32px;
    padding: 10px;
    font-size: 14px;
    border-radius: 60px;
  }

  &__img-box {
    @include display-flex-center-center;
    background-size: cover;
    width: 100%;
    min-height: 100px;
    max-height: 168px;
  }

  &__text-box {
    @include display-flex-column;
    width: 100%;
    gap: 8px;
  }

  &__text {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    max-height: calc(2 * 1.4em);
    word-break: break-word;
  }

  &__date {}

  &__tag {}

  &__tag-box_trainings {
    background-color: var(--color-background-lavender);
  }

  &__tag-box_grants {
    background-color: var(--color-background-red);
  }

  &__tag-box_masterclasses {
    background-color: var(--color-background-yellow);
  }

  &__tag-box_trainings:active {
    background-color: var(--color-pressed-lavender);
  }

  &__tag-box_grants:active {
    background-color: var(--color-pressed-red);
  }

  &__tag-box_masterclasses:active {
    background-color: var(--color-pressed-yellow);
  }

  @media (hover :hover) {
    &__tag-box_trainings:hover {
      background-color: var(--color-hover-lavender);
    }

    &__tag-box_grants:hover {
      background-color: var(--color-hover-red);
    }

    &__tag-box_masterclasses:hover {
      background-color: var(--color-hover-yellow);
    }
  }
}
</style>
