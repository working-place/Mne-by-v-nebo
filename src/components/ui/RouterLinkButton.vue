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
  fontSizeMobile: {
    type: String,
    default: '11px',
  },
  fontSizeTablet: {
    type: String,
    default: '14px',
  },
  fontSizeDesktop: {
    type: String,
    default: '20px',
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
    '--button_font-size-mobile': fontSizeMobile,
    '--button_font-size-tablet': fontSizeTablet || fontSizeMobile,
    '--button_font-size-desktop': fontSizeDesktop || fontSizeTablet || fontSizeMobile,
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
  background-color: var(--button_bg-color);
  color: var(--button_text-color);
  width: 100%;
  min-height: var(--button_height-mobile);
  max-height: var(--button_height-mobile);
  height: fit-content;
  padding: 10px;
  outline: none;
  border: none;
  border-radius: 60px;
  text-decoration: none;
  font-size: var(--button_font-size-mobile);

  @media (min-width: 768px) {
    min-height: var(--button_height-tablet);
    max-height: var(--button_height-tablet);
    width: var(--button_width-tablet);
    font-size: 14px;
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
    text-transform: uppercase;
    font-weight: 600;

    @media (min-width: 768px) {
      font-size: var(--button_font-size-tablet);
    }

    @media (min-width: 1280px) {
      font-size: var(--button_font-size-desktop);
    }
  }
}
</style>
