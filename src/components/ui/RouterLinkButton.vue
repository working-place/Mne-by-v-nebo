<script setup>
defineProps({
  to: {
    type: [String, Object],
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false
  },
  bgColor: {
    type: String,
    default: 'var(--color-background-purple)',
  },
  textColor: {
    type: String,
    default: 'var(--color-text-light)',
  },
  hoverColor: {
    type: String,
    default: 'var(--color-hover-purple)',
  },
  heightMobile: {
    type: String,
    default: '36px',
  },
  heightTablet: {
    type: String,
    default: '40px',
  },
  heightDesktop: {
    type: String,
    default: '63px',
  },
  widthTablet: {
    type: String,
    default: '',
  },
  textButton: {
    type: String,
    default: 'Перейти ко всем новостям',
  },
})
</script>

<template>
  <RouterLink class="button" :to="to" :class="{ 'button_disabled': disabled }" :aria-disabled="disabled" :style="{
    '--button_bg-color': bgColor,
    '--button_text-color': textColor,
    '--button_hover-color': hoverColor,
    '--button_height-mobile': heightMobile,
    '--button_height-tablet': heightTablet || heightMobile,
    '--button_height-desktop': heightDesktop || heightTablet || heightMobile,
    '--button_width-tablet': widthTablet
  }" @click.prevent="disabled ? null : $emit('click')">
    <span class="button__text">
      <slot name="text">{{ textButton }}</slot>
    </span>
  </RouterLink>
</template>

<style scoped lang="scss">
@use '@/assets/scss/mixins.scss' as *;

.button {
  @include display-flex-center-center;
  text-decoration: none;
  min-height: var(--button_height-mobile);
  max-height: var(--button_height-mobile);
  width: 100%;
  height: fit-content;
  padding: 10px;
  outline: none;
  background-color: var(--button_bg-color);
  border: none;
  border-radius: 60px;

  @media (min-width: 768px) {
    min-height: var(--button_height-tablet);
    max-height: var(--button_height-tablet);
    width: var(--button_width-tablet);
  }

  @media (min-width: 1280px) {
    min-height: var(--button_height-desktop);
    max-height: var(--button_height-desktop);
  }

  @media (hover :hover) {
    &:hover {
      background-color: var(--button_hover-color);
    }
  }

  &_disabled {
    @include btn-disable;
  }

  &__text {
    font-family: var(--font-family-next-art);
    font-size: 11px;
    font-weight: 600;
    color: var(--button_text-color);

    @media (min-width: 768px) {
      font-size: 14px;
    }

    @media (min-width: 1280px) {
      font-size: 20px;
    }
  }
}
</style>
