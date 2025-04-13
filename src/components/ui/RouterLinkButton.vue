<script setup>
defineProps({
  to: {
    type: [String, Object],
    required: true,
  }
})
</script>

<template>
  <RouterLink class="button" :to="to">
    <h2>
      <slot name="text"></slot>
    </h2>
  </RouterLink>

</template>

<style scoped lang="scss">
@use '@/assets/scss/mixins.scss' as *;

h2 {
  @include h2-mobile-uppercase;
}

.button {
  @include display-flex-center-center;
  @include btn-purple-default;
  width: 100%;
  height: fit-content;
  padding: 10px;
  outline: none;
  border: none;
  border-radius: 60px;
  text-decoration: none;
}
</style>
