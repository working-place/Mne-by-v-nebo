<script>
import NavigationMenu from './components/layout/NavigationMenu.vue';
import FooterBlock from './components/layout/FooterBlock.vue';

export default {
  components: {
    NavigationMenu,
    FooterBlock
  },
  data() {
    return {}
  }
}
</script>

<template>
  <div>
    <NavigationMenu />
    <RouterView />
    <FooterBlock />
  </div>
</template>

<style>
</style>
