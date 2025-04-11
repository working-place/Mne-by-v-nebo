<script setup>
import ReusableScreen from './ui/ReusableScreen.vue';

</script>

<template>
  <main>
    <ReusableScreen>
      <template v-slot:title>
        AHO<br>«Воспитание<br>для всех»
      </template>
      <template v-slot:description>
        Содействие развитию просветительской деятельности детей, их семей и молодёжи в области образования, культуры и
        физической культуры
      </template>
      <template v-slot:img>
        <img src="/img/main-screen-photo-boy.png" alt="" class="main-screen__img">
      </template>
    </ReusableScreen>
  </main>
</template>

<style scoped>
.main-screen {
  background-color: var(--color-background-purple);
}
</style>
