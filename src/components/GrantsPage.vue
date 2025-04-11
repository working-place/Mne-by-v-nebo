<script setup>
import ReusableScreen from './ui/ReusableScreen.vue';

</script>

<template>
  <main>
    <ReusableScreen>
      <template v-slot:title>
        Участие<br>в грантах
      </template>
      <template v-slot:description>
        Гранты позволяют внедрять новые образовательные технологии, программы и подходы, улучшая эффективность обучения
        и
        повышая вовлеченность детей
      </template>
      <template v-slot:img>
        <img src="/img/grants-photo-boy.png" alt="" class="main-screen__img">
      </template>
    </ReusableScreen>
    
  </main>
</template>

<style scoped>
.main-screen {
  background-color: var(--color-background-purple);
}
</style>
