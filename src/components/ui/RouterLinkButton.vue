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
  fontSizeBtn: {
    type: String,
    default: '11px',
  },
  maxHeightBtn: {
    type: String,
    default: '36px',
  },
  minHeightBtn: {
    type: String,
    default: '36px',
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
    '--button_font-size': fontSizeBtn,
    '--button_max-height': maxHeightBtn,
    '--button_min-height': minHeightBtn
  }" @click.prevent="disabled ? null : $emit('click')">
    <h2>
      <slot name="text">{{ textButton }}</slot>
    </h2>
  </RouterLink>

</template>

<style scoped lang="scss">
@use '@/assets/scss/mixins.scss' as *;

h2 {
  // @include h2-mobile-button;
  font-size: var(--button_font-size, 11px);
}

.button {
  @include display-flex-center-center;
  background-color: var(--button_bg-color);
  color: var(--button_text-color);
  width: 100%;
  min-height: var(--button_min-height, 36px);
  max-height: var(--button_max-height, 36px);
  height: fit-content;
  padding: 10px;
  outline: none;
  border: none;
  border-radius: 60px;
  text-decoration: none;

  @media (hover :hover) {
    &:hover {
      background-color: var(--button_hover-color);
    }
  }

  &_disabled {
    @include btn-disable;
  }
}
</style>
