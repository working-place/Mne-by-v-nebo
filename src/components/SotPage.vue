<script setup>
import { computed, ref, onMounted } from 'vue';
import ReusableScreen from './ui/ReusableScreen.vue';
import NewsCard from './ui/NewsCard.vue';

const newsData = ref([]);
// const mainDirection = ref([]);

const loadData = async () => {
  try {
    const response = await import('@/data/db.json');
    newsData.value = response.news;
    // mainDirection.value = response.cards;
  } catch (error) {
    console.error('Ошибка загрузки новостей:', error)
  };
}

onMounted(loadData);

const firstTwoNews = computed(() => newsData.value.slice(0, 2));
</script>

<template>
  <main>
    <ReusableScreen bgColor="var(--color-background-yellow)" textColor="var(--color-text-dark)"
      :use-flex="false">
      <template v-slot:title>
        <h3 class="main-screen__title_lower-case">АНО «Воспитание для всех» – победитель Всероссийского конкурса грантов СОТ.</h3>
      </template>
      <template v-slot:description>
        АНО «Воспитание для всех», основанная на базе МАОУ СОШ № 33, активно развивает образование и социализацию молодёжи. В 2021, 2022 и 2024 годах организация стала победителем СОТ для работников образования.
      </template>
      <template v-slot:img>
        <img src="/img/boy-thumb.png" alt="Изображение мальчика" class="main-screen__img">
      </template>
    </ReusableScreen>

    <div class="similar-topics">
      <h2>Статьи на похожую тему:</h2>
      <NewsCard v-for="info in firstTwoNews" :key="info.id" :tag-class="info.class">
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

.main-screen {

  &__title_lower-case {
    font-weight: 600;
  font-size: 20px;
  line-height: 1.5;
  }

  &__img {
    width: 247px;
    height: 282px;
  }
}

.similar-topics {
  @include block-mobile;
  padding: 0;
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
