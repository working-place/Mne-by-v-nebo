<script setup>
import { ref, onMounted } from 'vue';
import NewsCard from './ui/NewsCard.vue';
import ReusableScreen from './ui/ReusableScreen.vue';

fetch('/path/to/db.json')
  .then(response => response.json())
  .then(data => {
    const news = data.news;
    console.log(news);
  });

const newsData = ref([]);

const loadNews = async () => {
  try {
    const response = await import('@/data/db.json');
    newsData.value = response.news;
  } catch (error) {
    console.error('Ошибка загрузки новостей:', error)
  };
}

onMounted(loadNews);

const filteringButtons = [
  {
    id: 1,
    title: "все",
    class: "all",
  },
  {
    id: 1,
    title: "статьи",
    class: "articles",
  },
  {
    id: 1,
    title: "видео",
    class: "video",
  },
]

</script>

<template>
  <main>
    <ReusableScreen bgColor="var(--color-background-lavender)" textColor="var(--color-text-dark)" blockHeight="470px"
      :use-flex="false">
      <template v-slot:title>
        новости
      </template>
      <template v-slot:description>
        <input type="text" class="main-screen__search-input">
      </template>
      <template v-slot:img>
        <img src="/img/main-screen-photo-boy.png" alt="Изображение мальчика" class="main-screen__img">
      </template>
    </ReusableScreen>

    <div class="news">
      <div class="news__filtering-box">
        <button v-for="button in filteringButtons" :key="button.id" class="news__filtering-btn"
          :class="[`news__filtering-btn_${button.class}`]">
          <span>{{ button.title }}</span>
        </button>
      </div>
      <NewsCard v-for="info in newsData" :key="info.id">
        <template v-slot:img>
          <img :src="info.img.src" :alt="info.img.alt" class="tag-card__img">
        </template>
        <template v-slot:tag>{{ info.tag }}</template>
        <template v-slot:text>{{ info.text }}</template>
        <template v-slot:date>{{ info.date }}</template>
      </NewsCard>
    </div>
  </main>

</template>

<style scoped lang="scss">
@use '@/assets/scss/mixins.scss' as *;

.main-screen {
  margin: 0;

  &__search-input {
    min-width: 100%;
    padding: 10px;
    border: none;
    outline: none;
    border-radius: 60px;
  }
}

.news {
  @include block-mobile;
  @include minmax-width-mobile-block;
  padding: 0;

  &__filtering-box {
    @include display-flex-justify-content-center;
    width: 100%;
    gap: 10px;
  }

  &__filtering-btn {
    @include display-flex-center-center;
    @include button-text;
    @include button-basic-style;
    min-width: 90px;
    height: 32px;
  }

  &__filtering-btn_all {
    background-color: var(--color-background-yellow);
  }

  &__filtering-btn_articles {
    background-color: var(--color-background-lavender);
  }

  &__filtering-btn_video {
    background-color: var(--color-background-red);
  }

  &__filtering-btn_all:active {
      background-color: var(--color-pressed-yellow);
    }

    &__filtering-btn_articles:active {
      background-color: red;
    }

    &__filtering-btn_video:active {
      background-color: red;
    }

  @media (hover :hover) {
    &__filtering-btn_all:hover {
      background-color: var(--color-hover-yellow);
    }

    &__filtering-btn_articles:hover {
      background-color: red;
    }

    &__filtering-btn_video:hover {
      background-color: red;
    }
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
</style>
