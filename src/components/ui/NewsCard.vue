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
      <h3 class="tag-card__text">
        <slot name="text"></slot>
      </h3>
      <span class="tag-card__date">
        <slot name="date"></slot>
      </span>
    </div>
  </div>
</template>

<style lang="scss">
@use '@/assets/scss/mixins.scss' as *;

.tag-card {
  display: flex;
  flex-direction: column;
  min-width: 302px;
  justify-content: space-between;
  width: 100%;
  position: relative;
  background-color: var(--color-background-light-blue);
  border-radius: var(--cards-border-radius);
  padding: 10px 10px 20px 10px;
  aspect-ratio: 1.2/1;
  height: auto;

  @media only screen and (min-width: 768px) {
    border-radius: 24px;
    gap: 20px;
  }

  @media only screen and (min-width: 1280px) {
    height: auto;
    min-width: 100%;
  }

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
    display: flex;
    align-items: center;
    justify-content: center;
    align-items: stretch;
    width: 100%;
    height: 60%;
    overflow: hidden;
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;

    @media only screen and (min-width: 768px) {
      border-top-right-radius: 20px;
      border-top-left-radius: 20px;
    }
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__text-box {
    @include display-flex-column;
    justify-content: space-around;
    height: 35%;
    // margin-top: 22px;
    gap: 8px;
  }

  &__text {
    @include h3-mobile-card;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    max-height: calc(2 * 1.4em);
    word-break: break-word;

    @media only screen and (min-width: 768px) {
      line-height: 1.2;
    }
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
