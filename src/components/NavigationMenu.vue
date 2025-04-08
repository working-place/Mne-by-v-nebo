<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import NavLinks from './NavLinks.vue';

const isOpen = ref(false);
const route = useRoute()

const closeMenu = () => {
  isOpen.value = false
}

const isActive = (path) => {
  return route.path === path
}
</script>

<template>
  <header class="menu">
    <div class="menu__box" :class="{ 'menu-open': isOpen }">
      <RouterLink to="/" @click="closeMenu" :class="{ active: isActive('/') }">
        <img class="menu__logo" src="/img/logo.png" alt="Логотип">
      </RouterLink>
      <button v-if="!isOpen" @click="isOpen = true" class="menu__menu-btn"></button>
      <button v-else @click="isOpen = false" class="menu__close-btn"></button>
    </div>
    <NavLinks :is-open="isOpen" @close="closeMenu" />
  </header>
</template>

<style scoped>
.menu {
  position: relative;
  flex-direction: column;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.menu__box,
.menu__nav-box {
  width: 100%;
  max-width: var(--max-width);
  min-width: var(--min-width);
  padding: 17px;
}

.menu__box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.menu__box.menu-open {
  background-color: var(--color-background-light-blue);
}

.menu__logo {
  width: 61px;
  height: 24px;
}

.menu__menu-btn {
  width: 24px;
  height: 24px;
  background-image: url('/img/Menu.png');
}

.menu__close-btn {
  width: 16.97px;
  height: 16.97px;
  background-image: url('/img/close-btn.png');
}

.menu__menu-btn,
.menu__close-btn {
  background-size: cover;
  background-repeat: no-repeat;
  border: none;
  background-color: transparent;
}
</style>
