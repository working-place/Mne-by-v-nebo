<script setup>
import ReusableNumberdDescriptionCard from './ui/ReusableNumberdDescriptionCard.vue';
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
        <img src="/img/main-screen-photo-boy.png" alt="Изображение мальчика" class="main-screen__img">
      </template>
    </ReusableScreen>

    <div class="description">
      <h2>Основное направление деятельности</h2>
      <ReusableNumberdDescriptionCard padding-bottom="75px">
        <template v-slot:number>1</template>
        <template v-slot:description>
          Содействие развитию просветительской деятельности детей, их семей и молодёжи в области образования, культуры и
          физической культуры
        </template>
        <template v-slot:img>
          <img src="/img/book.png" alt="Книга" class="description-card__img description-card__img_size-1">
        </template>
      </ReusableNumberdDescriptionCard>

      <ReusableNumberdDescriptionCard>
        <template v-slot:number>2</template>
        <template v-slot:description>
          Социальная адаптация детей-инвалидов, людей с ограниченными возможностями здоровья
        </template>
        <template v-slot:img>
          <img src="/img/heart.png" alt="Книга" class="description-card__img description-card__img_size-2">
        </template>
      </ReusableNumberdDescriptionCard>

      <ReusableNumberdDescriptionCard padding-bottom="75px">
        <template v-slot:number>3</template>
        <template v-slot:description>
          Проведение групповых и индивидуальных консультаций, тренингов и семинаров для населения по вопросам реализации социально значимых и общественных инициатив, участия в проектах
        </template>
        <template v-slot:img>
          <img src="/img/star.png" alt="Книга" class="description-card__img description-card__img_size-3">
        </template>
      </ReusableNumberdDescriptionCard>
    </div>

  </main>
</template>

<style scoped lang="scss">
@use '@/assets/scss/mixins.scss' as *;

h2 {
  @include h2-mobile-uppercase;
  text-align: center;
}

.main-screen {
  background-color: var(--color-background-purple);
}

.description {
  @include block-mobile;
}

.description-card {
  &__img {
    border-bottom-right-radius: 12px;
  }

  &__img_size-1 {
    width: 100%;
    height: 100%;
  }

  &__img_size-2 {
    width: 90%;
    height: 85%;
  }

  &__img_size-3 {
    width: 85%;
    height: 100%;
  }
}
</style>
