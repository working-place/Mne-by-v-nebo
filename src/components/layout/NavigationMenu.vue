<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import NavLinksMobile from './NavLinksMobile.vue';
import NavLinks from './NavLinks.vue';

const isOpen = ref(false);
const route = useRoute();
const menuRef = ref(null);
const isDesctop = ref(false);

const isActive = (path) => {
  return route.path === path
}

const closeMenu = () => {
  isOpen.value = false
}

const handleClickOutside = (event) => {
  if (isOpen.value && menuRef.value && !menuRef.value.contains(event.target))
    closeMenu();
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
})

const checkScreenSize = () => {
  isDesctop.value = window.innerWidth >= 768;
};

onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
  document.addEventListener('click', handleClickOutside);
})

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize);
  document.removeEventListener('click', handleClickOutside);
})

</script>

<template>
  <header class="menu" ref="menuRef">
    <div class="menu__box" :class="{ 'menu-open': isOpen }">
      <RouterLink to="/" @click="closeMenu" :class="{ active: isActive('/') }">
        <img class="menu__logo" src="/img/logo.png" alt="Логотип">
      </RouterLink>
      <template v-if="!isDesctop">
        <button v-if="!isOpen" @click.stop="isOpen = true" class="menu__menu-btn" :title="`Open menu button`"></button>
        <button v-else @click="isOpen = false" class="menu__close-btn" :title="`Close menu button`"></button>
      </template>
      <NavLinks v-if="isDesctop" :is-open="!isOpen" align="center" />
    </div>
    <NavLinksMobile v-if="!isDesctop" :is-open="isOpen" @close="closeMenu" align="center" />
  </header>
</template>

<style scoped lang="scss">
@use '@/assets/scss/mixins.scss' as *;

.menu {
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1001;
  width: 100%;
  margin: 0 auto;
  background-color: white;

  @media only screen and (min-width: 768px) {
    padding: 0 59px;
  }

  @media only screen and (min-width: 1280px) {
    padding: 0;
    position: static;
    padding-left: 124px;
    padding-right: 124px;
  }

  &__box,
  &__nav-box {
    @include minmax-width-mobile;
    width: 100%;
    padding: 17px;
  }

  &__box {
    @include display-flex-justify-content-center;
    justify-content: space-between;
    align-items: center;

    @media only screen and (min-width: 768px) {
      justify-content: center;
      padding-right: 0;
      padding-left: 0;
      max-width: 1090px;
      gap: 40px;
    }

    @media only screen and (min-width: 1280px) {
      justify-content: flex-start;
      gap: 60px;
      max-width: 1130px;
      width: 100%
    }
  }

  &__box.menu-open {
    background-color: var(--color-background-light-blue);

    @media only screen and (min-width: 768px) {
      background-color: transparent;
    }
  }

  &__logo {
    width: 61px;
    height: 24px;
    outline: none;
    border: 0;
    outline: none;
    background-color: transparent;
    -webkit-user-select: none;
    user-select: none;
    -webkit-tap-highlight-color: transparent;

    @media only screen and (min-width: 768px) {
      width: 76px;
      height: 30px;
    }

    @media only screen and (min-width: 1280px) {
      width: 101px;
      height: 40px;
    }
  }

  &__menu-btn {
    width: 24px;
    height: 24px;
    background-image: url('/img/Menu.png');
  }

  &__close-btn {
    width: 16.97px;
    height: 16.97px;
    background-image: url('/img/close-btn.png');
  }

  &__menu-btn,
  &__close-btn {
    @include cover-center-no-repeat-img;
  }
}
</style>
