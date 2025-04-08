<script setup>
defineProps({
  isOpen: Boolean
});
const emit = defineEmits(['close']);
</script>

<template>
  <nav v-show="isOpen" class="menu__nav-box">
    <ul class="menu__link-box">
      <li class="menu__link">
        <RouterLink to="/sot" @click="emit('close')" class="menu__link" :class="{ active: $route.path === ('/sot') }">СОТ
        </RouterLink>
      </li>
      <li class="menu__link">
        <RouterLink to="/grants" @click="emit('close')" class="menu__link" :class="{ active: $route.path === ('/grants') }">Гранты
        </RouterLink>
      </li>
      <li class="menu__link">
        <RouterLink to="/usefull" @click="emit('close')" class="menu__link" :class="{ active: $route.path === ('/usefull') }">
          Полезные материалы
        </RouterLink>
      </li>
      <li class="menu__link">
        <RouterLink to="/news" @click="emit('close')" class="menu__link" :class="{ active: $route.path === ('/news') }">Новости
        </RouterLink>
      </li>
      <li class="menu__link">
        <RouterLink to="/gallery" @click="emit('close')" class="menu__link" :class="{ active: $route.path === ('/gallery') }">
          Галерея</RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>

.active {
  font-weight: bold;
}

.menu__nav-box {
  display: flex;
  justify-content: center;
  position: absolute;
  top: 58px;
  background-color: var(--color-background-light-blue);
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}

.menu__link-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: 12px;
  width: fit-content;
  white-space: nowrap;
}

.menu__link {
  line-height: 1.5;
  margin: 0;
  text-decoration: none;
  color: var(--color-text-dark);
}
</style>
