<script setup>
import ReusableScreen from './ui/ReusableScreen.vue';
import LinkCard from './ui/LinkCard.vue';
import InfoCard from './ui/InfoCard.vue';
import Slider from './ui/Slider.vue';

const bookSlides = [
  {
    title: 'Взросление с умом:  Путеводитель по детскому развитию',
    description: 'Узнайте, как создать гармоничные отношения с вашим ребенком и помочь ему раскрыть свой потенциал',
    linkUrl: '#',
    linkText: 'Источник',
    image: '/img/star.png'
  },

  {
    title: 'Взросление без слёз',
    description: 'Пошаговое руководство по воспитанию счастливых и самостоятельных детей, основанное на современных исследованиях детской психологии',
    linkUrl: '#',
    linkText: 'Источник',
    image: '/img/book.png'
  },

  {
    title: 'Тайный язык детей: научитесь понимать своего ребёнка',
    description: 'Раскройте секреты детской коммуникации и научитесь понимать потребности и эмоции вашего ребёнка без слов',
    linkUrl: '#',
    linkText: 'Источник',
    image: '/img/medal.png'
  },

  {
    title: 'Воспитание с любовью',
    description: 'Практические советы и упражнения для построения крепких и доверительных отношений с детьми, основанных на взаимном уважении и любви',
    linkUrl: '#',
    linkText: 'Источник',
    image: '/img/heart.png'
  },
];
</script>

<template>
  <main>
    <ReusableScreen>
      <template v-slot:title>
        <span class="title-text">Полезные материалы</span>
      </template>
      <template v-slot:description>
        <span class="description-text">
          Вы найдете здесь интересные истории, познавательные материалы и развивающие пособия, которые сделают обучение
          не только полезным, но и увлекательным
        </span>
      </template>
      <template v-slot:img>
        <img src="/img/usefull-material-photo-boy.png" alt="Изображение мальчика" class="main-screen__img">
      </template>
    </ReusableScreen>

    <InfoCard imageUrl="public\img\usefull-material-photo-boy2.png" title="Литература для специалистов"
      description="Представляем подборку книг и методических материалов для специалистов в области детского образования.  Здесь вы найдете актуальные исследования, практические руководства и вдохновляющие примеры." />

    <div class="slider-container">
      <Slider :items="bookSlides">
        <template #default="{ items }">
          <LinkCard v-for="(slide, index) in items" :key="index" :title="slide.title" :description="slide.description"
            :linkUrl="slide.linkUrl" :linkText="slide.linkText" :paddingBottom="'120px'">
            <template #image>
              <img :src="slide.image" :alt="slide.title" width="176">
            </template>
          </LinkCard>
        </template>
      </Slider>
    </div>
  </main>
</template>

<style scoped lang="scss">
@use '@/assets/scss/mixins.scss' as *;

.main-screen {
  background-color: var(--color-background-yellow);
}

.title-text {
  @include h1-mobile
}

.title-text, .description-text {
  color: #000000;
}

.main-screen__img {
  object-fit: cover;
}

.slider-container {
  position: relative;
  max-width: 100%;
  overflow: hidden;
  padding: 20px 0;
}
</style>
