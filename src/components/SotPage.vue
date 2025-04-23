<script setup>
import { computed, ref, onMounted } from 'vue';
import ReusableScreen from './ui/ReusableScreen.vue';
import NewsCard from './ui/NewsCard.vue';
import LinkCard from './ui/LinkCard.vue';
import GallerySection from './ui/GallerySection.vue';

defineProps({
  textColor: {
    type: String,
    default: 'var(--color-text-dark)',
  }
})

const newsData = ref([]);
const projects = ref([]);

const loadData = async () => {
  try {
    const response = await import('@/data/db.json');
    newsData.value = response.news;
    projects.value = response.projects;
  } catch (error) {
    console.error('Ошибка загрузки проектов:', error)
  };
}

onMounted(loadData);

const firstTwoNews = computed(() => newsData.value.slice(0, 2));

</script>

<template>
  <main>
    <ReusableScreen bgColor="var(--color-background-yellow)" textColor="var(--color-text-dark)" :use-flex="false">
      <template v-slot:title>
        <h3 class="main-screen__title_lower-case">АНО «Воспитание для всех» – победитель Всероссийского конкурса грантов
          СОТ.</h3>
      </template>
      <template v-slot:description>
        АНО «Воспитание для всех», основанная на базе МАОУ СОШ № 33, активно развивает образование и социализацию
        молодёжи. В 2021, 2022 и 2024 годах организация стала победителем СОТ для работников образования.
      </template>
      <template v-slot:img>
        <img src="/img/boy-thumb.png" alt="Изображение мальчика" class="main-screen__img">
      </template>
    </ReusableScreen>

    <slot name="title">
      <h2 class="title-page">Наши проекты</h2>
    </slot>

    <div v-for="(project) in projects" :key="project.id" class="project" :class="`project-${project.id}`">

      <div :class="`project-${project.id}__box`">
        <div :class="`project-${project.id}__title project-${project.id}__title_color`">
          <span>{{ project.title }}</span>
        </div>
        <img :class="`project-${project.id}__img project-${project.id}__img_size`" :src="`/img/${project.imgURL}`"
          :alt="project.imgAlt">
      </div>

      <template v-for="section in project.sections" :key="section.title">
        <LinkCard v-if="['description', 'goals', 'results'].includes(section.type)" :title="section.title"
          :description="section.text" :paddingBottom="'46px'" image-width="30%" title-size="20px">
          <template #image>
            <img :src="section.icon" :alt="section.title" width="90px">
          </template>
        </LinkCard>

        <GallerySection v-else-if="section.type === 'gallery' && section.images"
          :photos="section.images.map(img => ({ image: img.url }))" :show-title="false" />
      </template>
    </div>

    <div class="similar-topics">
      <div class="similar-topics__title-box">
        <img class="similar-topics__img" src="/img/happy-boy.png" alt="">
        <h2>Статьи на похожую тему:</h2>
      </div>

      <NewsCard v-for="info in firstTwoNews" :key="info.id" :tag-class="info.class">
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

h2 {
  @include h2-mobile-uppercase;
}

.title-page {
  margin-top: 25px;
  margin-bottom: -30px;
}

.project-mne-by-v-nebo {
  @include block-mobile;
  padding: 20px 0 0 0;

  &__box {
    @include block-mobile;
    flex-direction: row;
    justify-content: flex-end;
    align-items: flex-end;
    width: 100%;
    min-height: 209px;
    height: fit-content;
    padding: 0;
    padding-top: 25px;
    gap: 0;
    border-radius: var(--cards-border-radius);
    background-color: var(--color-background-red);
  }

  &__title {
    display: flex;
    justify-content: right;
    width: fit-content;
    white-space: nowrap;
    padding-bottom: 33px;
    font-size: 18px;
    color: var(--color-text-light);
  }

  &__img {
    @include cover-center-no-repeat-img;
    max-width: 165px;
    max-height: 187px;
    width: 50%;
    border-bottom-right-radius: var(--cards-border-radius);
  }
}

.project-ovz {
  @include block-mobile;
  padding: 20px 0 0 0;

  &__box {
    @include block-mobile;
    justify-content: center;
    justify-content: space-between;
    width: 100%;
    min-height: 340px;
    height: fit-content;
    padding: 0;
    padding-top: 40px;
    gap: 0;
    border-radius: var(--cards-border-radius);
    background-color: var(--color-background-purple);
  }

  &__img {
    width: 265px;
    height: 193px
  }

  &__img_size {
    margin-left: 20px;
    height: 174px;
    border-bottom-left-radius: var(--cards-border-radius);
    border-bottom-right-radius: var(--cards-border-radius);
  }

  &__title {
    display: flex;
    text-align: center;
    font-size: 18px;
    font-weight: 600;
    padding-left: 4px;
    padding-right: 4px;
  }

  &__title_color {
    color: var(--color-text-light);
  }
}

.project-ou {
  @include block-mobile;
  padding: 20px 0 0 0;

  &__box {
    @include block-mobile;
    justify-content: center;
    justify-content: space-between;
    width: 100%;
    min-height: 340px;
    height: fit-content;
    padding: 0;
    padding-top: 40px;
    gap: 0;
    border-radius: var(--cards-border-radius);
    background-color: var(--color-background-yellow);
  }

  &__img {
    width: 265px;
    height: 193px
  }

  &__img_size {
    width: 100%;
    height: 174px;
    border-bottom-left-radius: var(--cards-border-radius);
    border-bottom-right-radius: var(--cards-border-radius);
  }

  &__title {
    display: flex;
    text-align: center;
    font-size: 18px;
    font-weight: 600;
    padding-left: 4px;
    padding-right: 4px;
  }
}

.similar-topics {
  @include block-mobile;
  padding: 20px 0 0 0;

  &__title-box {
    @include block-mobile;
    padding: 0;
  }

  &__img {
    width: 150px;
    height: 150px
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
