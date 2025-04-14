<script setup>
import { computed, ref } from 'vue';
import RouterLinkButton from './ui/RouterLinkButton.vue';
import NumberedCard from './ui/NumberedCard.vue';
import ReusableScreen from './ui/ReusableScreen.vue';
import NewsCard from './ui/NewsCard.vue';

const cards = [
  {
    number: 1,
    description: 'Содействие развитию просветительской деятельности детей, их семей и молодёжи в области образования, культуры и физической культуры',
    img: {
      src: '/img/book.png',
      alt: 'Книга'
    },
    paddingBottom: '75px',
  },
  {
    number: 2,
    description: 'Социальная адаптация детей-инвалидов, людей с ограниченными возможностями здоровья',
    img: {
      src: '/img/heart.png',
      alt: 'Сердце'
    },
    paddingBottom: null,
  },
  {
    number: 3,
    description: 'Проведение групповых и индивидуальных консультаций, тренингов и семинаров для населения по вопросам реализации социально значимых и общественных инициатив, участия в проектах',
    img: {
      src: '/img/star.png',
      alt: 'Звезда'
    },
    paddingBottom: null,
  },
];

const news = ref([
  {
    id: 1,
    tag: 'хештег',
    img: {
      src: '/img/charity.jpeg',
      alt: 'Благотоварительность'
    },
    text: 'Благотворительный фонд «Олимпия»',
    date: '05.02.25',
  },
  {
    id: 2,
    tag: 'хештег',
    img: {
      src: '/img/proforientacia.jpeg',
      alt: 'Профориентация'
    },
    text: 'Профориентация и БАС',
    date: '05.02.25',
  },
  {
    id: 3,
    tag: 'хештег',
    img: {
      src: '/img/otkritie-granta.jpeg',
      alt: 'Открытие гранта'
    },
    text: 'Открытие гранта «Мне бы в небо»',
    date: '11.09.24',
  },
  {
    id: 4,
    tag: 'хештег',
    img: {
      src: '/img/proekt.jpeg',
      alt: 'Завершение проекта'
    },
    text: 'В Новороссийске завершается проект «Школа для родителей особенного ребенка»',
    date: '26.12.24',
  },
]);

const firstTwoNews = computed(() => news.value.slice(0, 2));

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
      <NumberedCard v-for="card in cards" :key="card.number" :padding-bottom="card.paddingBottom">
        <template v-slot:number>{{ card.number }}</template>
        <template v-slot:description>{{ card.description }}
        </template>
        <template v-slot:img>
          <img :src="card.img.src" :alt="card.img.alt"
            :class="`description-card__img description-card__img_size-${card.number}`">
        </template>
      </NumberedCard>
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

    <!-- сделать блок грамоты -->

    <div class="news">
      <h2>Новости</h2>
      <NewsCard v-for="info in firstTwoNews" :key="info.id">
        <template v-slot:img>
          <img :src="info.img.src" :alt="info.img.alt" class="tag-card__img">
        </template>
        <template v-slot:tag>{{ info.tag }}</template>
        <template v-slot:text>{{ info.text }}</template>
        <template v-slot:date>{{ info.date }}</template>
      </NewsCard>


      <RouterLinkButton :to="{ name: 'news' }" :disabled="false">
        <template v-slot:text>ко всем новостям</template>
      </RouterLinkButton>

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

.tag-card {
  &__img {
    @include cover-center-no-repeat-img;
    width: 100%;
    height: 168px;
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
  }
}

.news {
  @include block-mobile;
  padding: 0;
}

</style>
