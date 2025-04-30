<script setup>
defineProps({
  isOpen: {
    type: Boolean,
    default: true
  },
  align: {
    type: String,
    default: 'center',
    validator: value => ['center', 'start'].includes(value)
  },
  decorationClass: {
    type: String,
    default: ''
  }
});
const emit = defineEmits(['close']);
</script>

<template>
  <nav v-show="isOpen" class="menu__nav-box" :class="{ 'mobile-hidden': !isOpen }">
    <ul class="menu__link-box" :style="{ alignItems: align === 'center' ? 'center' : 'flex-start' }">
      <li class="menu__link">
        <RouterLink to="/sot" @click="emit('close')" class="menu__link" :class="{ active: $route.path === ('/sot') }">
          СОТ
        </RouterLink>
      </li>
      <li class="menu__link">
        <RouterLink to="/grants" @click="emit('close')" class="menu__link"
          :class="{ active: $route.path === ('/grants') }">Гранты
        </RouterLink>
      </li>
      <li class="menu__link">
        <RouterLink to="/usefull" @click="emit('close')" class="menu__link"
          :class="{ active: $route.path === ('/usefull') }">
          Полезные материалы
        </RouterLink>
      </li>
      <li class="menu__link">
        <RouterLink to="/news" @click="emit('close')" class="menu__link" :class="{ active: $route.path === ('/news') }">
          Новости
        </RouterLink>
      </li>
      <li class="menu__link">
        <RouterLink to="/gallery" @click="emit('close')" class="menu__link"
          :class="{ active: $route.path === ('/gallery') }">
          Галерея</RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
@use '@/assets/scss/mixins.scss' as *;

.active {
  font-weight: bold;
}

.menu {

  &__nav-box {
    display: none;
    @include display-flex-justify-content-center;
    @include border-bottom-radius-8;
    position: absolute;
    top: 58px;
    background-color: var(--color-background-light-blue);
    z-index: 1000;
  }

  &__link-box {
    @include display-flex-column-center;
    @include list-decoration;
  }

  &__link {
    line-height: 1.5;
    margin: 0;
    text-decoration: none;
    color: var(--color-text-dark);
  }

}
</style>
