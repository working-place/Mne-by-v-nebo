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
</script>

<template>
  <main>


  <ReusableScreen bgColor="var(--color-background-lavender)" textColor="var(--color-text-dark)" blockHeight="470px">
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

  <!-- блок сортировки по хештегам -->

  <div class="news">
      <h2>Новости</h2>
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
    padding: 10px;
    border: none;
    outline: none;
    border-radius: 60px;
  }
}

.news {
  @include block-mobile;
  @include minmax-width-mobile-block;
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
