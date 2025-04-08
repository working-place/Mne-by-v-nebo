<script>
import NavigationMenu from './components/NavigationMenu.vue';
import FooterBlock from './components/FooterBlock.vue';

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
