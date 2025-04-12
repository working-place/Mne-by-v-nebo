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
          Проведение групповых и индивидуальных консультаций, тренингов и семинаров для населения по вопросам реализации
          социально значимых и общественных инициатив, участия в проектах
        </template>
        <template v-slot:img>
          <img src="/img/star.png" alt="Книга" class="description-card__img description-card__img_size-3">
        </template>
      </ReusableNumberdDescriptionCard>
    </div>

    <!-- вставить ссылку на Устав -->
    <div class="organization-charter">
      <div class="organization-charter__img-block">
        <img src="" alt="" class="organization-charter__img">
      </div>
      <div class="organization-charter__text-block">
        <span class="organization-charter__text">
          Вы можете озакомиться с уставом организации<br>
          <a href="/" class="organization-charter__link">перейдя по этой ссылке</a>
        </span>
      </div>
    </div>

    <div class="director">
      <div class="director__img-box">
        <div class="director__img"></div>
      </div>

      <div class="director__text-box">
        <h2>Директор</h2>
        <h3>Мушастая Наталья Викторовна</h3>
        <span class="director__text">Кандидат психлолгических наук, доцент, детский нейропсихолог, дефектолог и психолог
          высшей категории. Директор АНО «Инновационный центр развития детей и молодёжи „Воспитание для всех“», лауреат
          «Педагог-психолог Кубани» 2023, «Лучший педагог Новороссийска» 2024. Автор научных и методических работ,
          руководитель федеральных инновационных проектов.</span>
      </div>
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
  padding: 0;
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

.organization-charter {
  @include block-mobile;

  &__img-block,
  &__text-block {
    @include block-mobile;
    @include minmax-width-mobile;
  }

  &__img {
    @include cover-center-no-repeat-img;
    min-width: 151px;
    min-height: 151px;
    background-image: url(/img/mascot-boy.png);
  }

  &__text {
    text-align: center;
  }

  &__link {
    text-decoration: none;
    color: var(--color-background-purple);
  }

}

.director {
  @include block-mobile;
  @include minmax-width-mobile-block;
  padding-top: 20px;
  padding-bottom: 20px;
  gap: 12px;
  color: var(--color-text-light);
  border-radius: var(--cards-border-radius);
  background-color: var(--color-background-red);

  h2 {
    @include h2-mobile-uppercase;
  }

  h3 {
    width: 100%;
    text-align: center;
  }

  &__img-box,
  &__text-box {
    @include display-flex-column;
    gap: 14px
  }

  &__img {
    @include cover-center-no-repeat-img;
    background-image: url(/img/photo-director.png);
    min-width: 150px;
    min-height: 150px;
  }
}
</style>
