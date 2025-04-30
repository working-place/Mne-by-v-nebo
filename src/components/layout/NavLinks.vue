<script setup>
import { useRoute } from 'vue-router';

defineProps({
  align: {
    type: String,
    default: 'center',
    validator: value => ['center', 'start'].includes(value)
  }
});

const route = useRoute();
const isActive = (path) => route.path === path;
</script>

<template>
  <nav class="tablet-menu">
    <ul class="tablet-menu__list" :style="{ alignItems: align === 'center' ? 'center' : 'flex-start' }">
      <li class="tablet-menu__item">
        <RouterLink to="/sot" class="tablet-menu__link" :class="{ active: isActive('/sot') }">
          СОТ
        </RouterLink>
      </li>
      <li class="tablet-menu__item">
        <RouterLink to="/grants" class="tablet-menu__link" :class="{ active: isActive('/grants') }">
          Гранты
        </RouterLink>
      </li>
      <li class="tablet-menu__item">
        <RouterLink to="/usefull" class="tablet-menu__link" :class="{ active: isActive('/usefull') }">
          Полезные материалы
        </RouterLink>
      </li>
      <li class="tablet-menu__item">
        <RouterLink to="/news" class="tablet-menu__link" :class="{ active: isActive('/news') }">
          Новости
        </RouterLink>
      </li>
      <li class="tablet-menu__item">
        <RouterLink to="/gallery" class="tablet-menu__link" :class="{ active: isActive('/gallery') }">
          Галерея
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
@use '@/assets/scss/mixins.scss' as *;

.tablet-menu {
  display: flex;

  &__list {
    @include list-decoration;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  &__item {
    list-style: none;
  }

  &__link {
    display: block;
    line-height: 1.5;
    text-decoration: none;
    color: var(--color-text-dark);
    font-size: 14px;
    white-space: nowrap;

    &.active {
      font-weight: bold;
    }
  }
}
</style>
