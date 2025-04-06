<script>
import NavigationMenu from './components/NavigationMenu.vue';
import FooterBlock from './components/FooterBlock.vue';
import MainPage from './components/MainPage.vue';

export default {
  components: {
    NavigationMenu,
    FooterBlock,
    MainPage
  },
  data() {
    return {}
  }
}
</script>

<template>
  <div>
    <NavigationMenu />
    <MainPage />
    <FooterBlock />
  </div>
</template>

<style>
</style>
