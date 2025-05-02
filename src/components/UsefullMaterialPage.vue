<script setup>
import { computed, ref, onMounted } from 'vue';
import ReusableScreen from './ui/ReusableScreen.vue';
import LinkCard from './ui/LinkCard.vue';
import InfoCard from './ui/InfoCard.vue';
import Slider from './ui/SliderWrapper.vue';
import NewsCard from './ui/NewsCard.vue';
import RouterLinkButton from './ui/RouterLinkButton.vue';

const bookSlidesSpecialist = [
  {
    title: 'Взросление с умом:  Путеводитель по детскому развитию',
    description: 'Узнайте, как создать гармоничные отношения с вашим ребенком и помочь ему раскрыть свой потенциал',
    image: '/img/star.png'
  },

  {
    title: 'Взросление без слёз',
    description: 'Пошаговое руководство по воспитанию счастливых и самостоятельных детей, основанное на современных исследованиях детской психологии',
    image: '/img/book.png'
  },

  {
    title: 'Тайный язык детей: научитесь понимать своего ребёнка',
    description: 'Раскройте секреты детской коммуникации и научитесь понимать потребности и эмоции вашего ребёнка без слов',
    image: '/img/medal.png'
  },

  {
    title: 'Воспитание с любовью',
    description: 'Практические советы и упражнения для построения крепких и доверительных отношений с детьми, основанных на взаимном уважении и любви',
    image: '/img/heart.png'
  },
];

const bookSlidesParent = [
  {
    title: 'Взросление без слёз',
    description: 'Пошаговое руководство по воспитанию счастливых и самостоятельных детей, основанное на современных исследованиях детской психологии',
    image: '/img/book.png'
  },
  {
    title: 'Взросление с умом:  Путеводитель по детскому развитию',
    description: 'Узнайте, как создать гармоничные отношения с вашим ребенком и помочь ему раскрыть свой потенциал',
    image: '/img/star.png'
  },
  {
    title: 'Тайный язык детей: научитесь понимать своего ребёнка',
    description: 'Раскройте секреты детской коммуникации и научитесь понимать потребности и эмоции вашего ребёнка без слов',
    image: '/img/medal.png'
  },
  {
    title: 'Воспитание с любовью',
    description: 'Практические советы и упражнения для построения крепких и доверительных отношений с детьми, основанных на взаимном уважении и любви',
    image: '/img/heart.png'
  },
];

const newsData = ref([]);
const loadData = async () => {
  try {
    const response = await import('@/data/db.json');
    newsData.value = response.news;
  } catch (error) {
    console.error('Ошибка загрузки новостей:', error)
  };
}

onMounted(loadData);

const firstTwoNews = computed(() => newsData.value.slice(0, 4));

const getTagClass = (tag) => {
  const tagLower = tag.toLowerCase().trim();

  switch (tagLower) {
    case 'все': return 'all';
    case 'тренинги': return 'trainings';
    case 'гранты': return 'grants';
    case 'мастер-классы': return 'masterclasses';
    default: return 'all';
  }
}
</script>

<template>
  <main>
    <ReusableScreen textColor="var(--color-text-dark)" bgColor="var(--color-background-yellow)">
      <template v-slot:title>
        <span class="main-screen__title">Полезные материалы</span>
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

    <InfoCard imageUrl="/img/usefull-page-boy.png" title="Литература для специалистов"
      description="Представляем подборку книг и методических материалов для специалистов в области детского образования. Здесь вы найдете актуальные исследования, практические руководства и вдохновляющие примеры." />

    <div class="slider-container">
      <Slider :items="bookSlidesSpecialist">
        <template #default="{ item }">
          <LinkCard :title="item.title" :description="item.description" :paddingBottom="'46px'" image-width="30%">
            <template #image>
              <img :src="item.image" :alt="item.title" width="90px">
            </template>
          </LinkCard>
        </template>
      </Slider>
    </div>

    <InfoCard imageUrl="/img/usefull-material-content-boy.png" title="Литература для родителей"
      description="Помогите своему ребенку раскрыть свой потенциал с помощью наших специально подобранных книг!  Они помогут ему лучше учиться, расширят его кругозор и обогатят его воображение."
      image-position="right"/>

    <div class="slider-container">
      <Slider :items="bookSlidesParent">
        <template #default="{ item }">
          <LinkCard :title="item.title" :description="item.description" :linkUrl="item.linkUrl"
            :linkText="item.linkText" :paddingBottom="'46px'" image-width="30%">
            <template #image>
              <img :src="item.image" :alt="item.title" width="90px">
            </template>
          </LinkCard>
        </template>
      </Slider>
    </div>

    <div class="similar-topics">
      <h2>Это интересно</h2>
      <router-link v-for="info in firstTwoNews" :key="info.id" :to="{ name: 'article', params: { id: info.id } }"
        class="news-card-link">
        <NewsCard :tag-class="getTagClass(info.tag)">
          <template v-slot:img>
            <img :src="`/img/${info.img.src}`" :alt="info.img.alt" class="tag-card__img">
          </template>
          <template v-slot:tag>{{ info.tag }}</template>
          <template v-slot:text>{{ info.text }}</template>
          <template v-slot:date>{{ info.date }}</template>
        </NewsCard>
      </router-link>

      <RouterLinkButton :to="{ name: 'news' }" :disabled="false">
        <template v-slot:text>Перейти ко всем новостям</template>
      </RouterLinkButton>
    </div>
  </main>
</template>

<style scoped lang="scss">
@use '@/assets/scss/mixins.scss' as *;

.description-text {
  color: #000000;
}

.main-screen__img {
  object-fit: cover;
}

.slider-container {
  position: relative;
  width: 100%;
  margin-top: -20px;
  margin-bottom: 30px
}

.similar-topics {
  @include block-mobile;
  padding: 0;
}

h2 {
  @include h2-mobile-uppercase
}

.news-card-link {
  display: flex;
  width: 100%;
  text-decoration: none;
  color: inherit;
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
</style>
