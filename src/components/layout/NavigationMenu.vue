<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import NavLinks from './NavLinks.vue';


const isOpen = ref(false);
const route = useRoute();
const menuRef = ref(null);

const isActive = (path) => {
  return route.path === path
}

const closeMenu = () => {
  isOpen.value = false
}

const handleClickOutside = (event) => {
  if(isOpen.value && menuRef.value && !menuRef.value.contains(event.target))
  closeMenu();
}

onMounted (() => {
  document.addEventListener('click', handleClickOutside);
})

onUnmounted (() => {
  document.removeEventListener('click', handleClickOutside);
})

</script>

<template>
  <header class="menu" ref="menuRef">
    <div class="menu__box" :class="{ 'menu-open': isOpen }">
      <RouterLink to="/" @click="closeMenu" :class="{ active: isActive('/') }">
        <img class="menu__logo" src="/img/logo.png" alt="Логотип">
      </RouterLink>
      <button v-if="!isOpen" @click.stop="isOpen = true" class="menu__menu-btn"></button>
      <button v-else @click="isOpen = false" class="menu__close-btn"></button>
    </div>
    <NavLinks :is-open="isOpen" @close="closeMenu" align="center" />
  </header>
</template>

<style scoped lang="scss">
@use '@/assets/scss/mixins.scss' as *;

.menu {
  position: relative;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;

  &__box,
  &__nav-box {
    @include minmax-width-mobile;
    width: 100%;
    padding: 17px;
  }

  &__box {
    @include display-flex-justify-content-center;
    justify-content: space-between;
  }

  &__box.menu-open {
    background-color: var(--color-background-light-blue);
  }

  &__logo {
    width: 61px;
    height: 24px;
    outline: none;
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

//   @media only screen and (min-width: 361px) and (max-width: 650px) {
//   body {

//   }
// }

}
</style>
