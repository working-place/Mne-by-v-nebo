<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

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
      <RouterLink
      to="/"
      @click="closeMenu"
      :class="{ active: isActive('/') }"
      >
        <img class="menu__logo" src="/img/logo.png" alt="Логотип">
      </RouterLink>
      <button v-if="!isOpen" @click="isOpen = true" class="menu__menu-btn"></button>
      <button v-else @click="isOpen = false" class="menu__close-btn"></button>
    </div>

    <nav v-show="isOpen" class="menu__nav-box">
      <ul class="menu__link-box">
        <li class="menu__link">
          <RouterLink to="/sot" @click="closeMenu" class="menu__link" :class="{ active: isActive('/sot') }">СОТ</RouterLink>
        </li>
        <li class="menu__link">
          <RouterLink to="/grants" @click="closeMenu" class="menu__link" :class="{ active: isActive('/grants') }">Гранты</RouterLink>
        </li>
        <li class="menu__link">
          <RouterLink to="/usefull" @click="closeMenu" class="menu__link" :class="{ active: isActive('/usefull') }">Полезные материалы
          </RouterLink>
        </li>
        <li class="menu__link">
          <RouterLink to="/news" @click="closeMenu" class="menu__link" :class="{ active: isActive('/news') }">Новости</RouterLink>
        </li>
        <li class="menu__link">
          <RouterLink to="/gallery" @click="closeMenu" class="menu__link" :class="{ active: isActive('/gallery') }">Галерея</RouterLink>
        </li>
      </ul>
    </nav>

  </header>
</template>

<style scoped>
.active {
  font-weight: bold;
}

.menu {
  position: relative;
  flex-direction: column;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.menu__box,
.menu__nav-box {
  width: 100%;
  max-width: 362px;
  min-width: 320px;
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

.menu__nav-box {
  display: flex;
  justify-content: center;
  position: absolute;
  top: 58px;
  background-color: var(--color-background-light-blue);
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}

.menu__link {
  line-height: 1.5;
  margin: 0;
  text-decoration: none;
  color: var(--color-text-dark);
}
</style>
