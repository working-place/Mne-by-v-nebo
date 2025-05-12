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

      <h2 :class="`project-${project.id}__title project-${project.id}__title_color-tablet`">{{ project.title }}</h2>

      <div :class="`project-${project.id}__box`">
        <div :class="`project-${project.id}__title project-${project.id}__title_color-visibility`">
          <span>{{ project.title }}</span>
        </div>
        <div class="project__img-box" :class="`project-${project.id}__img-box`">
          <img class="img" :class="`project-${project.id}__img project-${project.id}__img_size`"
            :src="`/img/${project.imgURL}`" :alt="project.imgAlt">
        </div>
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

    </div>

  </main>
</template>

<style scoped lang="scss">
@use '@/assets/scss/mixins.scss' as *;

.img {
  @include cover-center-no-repeat-img;
  width: 100%;
  border-bottom-right-radius: var(--cards-border-radius);
  border-bottom-left-radius: var(--cards-border-radius);
}

.news-card-link {
  display: flex;
  width: 100%;
  text-decoration: none;
  color: inherit;
}

.main-screen {

  &__title_lower-case {
    font-weight: 600;
    font-size: 20px;
    line-height: 1.5;
  }

  &__img {
    width: 247px;
    height: 282px;
    object-fit: contain;
  }
}

h2 {
  @include h2-mobile-uppercase;
  text-align: center;
}

.title-page {
  margin-top: 25px;
  margin-bottom: -30px;

  // @media only screen and (min-width: 768px) {
  //   display: none;
  // }
}

.project {
  object-fit: cover;
  z-index: 1;

  &__img-box {
    display: flex;
    width: 90%;
    overflow: hidden;
  }
}

.project-mne-by-v-nebo {
  @include block-mobile;
  padding: 20px 0 0 0;

  &__box {
    @include block-mobile;
    position: relative;
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
    position: absolute;
    top: 80%;
    left: 10%;
    width: fit-content;
    white-space: nowrap;
    padding-bottom: 33px;
    font-size: 18px;
    color: var(--color-text-light);

    @media only screen and (min-width: 768px) {
      // display: none;
      // position: absolute;
      // margin-top: 40px;
      // top: -40px;
      // color: black;
    }

    &_color-tablet {
      color: var(--color-text-dark);
    }

  @media only screen and (min-width: 768px) {
    &_color-visibility {
      // color: var(--color-text-dark);
      display: none;
    }
  }
  }

  &__img-box {
    justify-content: flex-end;
  }

  &__img {
    @include cover-center-no-repeat-img;
    width: 70%;
    border-bottom-right-radius: var(--cards-border-radius);
    border-bottom-left-radius: var(--cards-border-radius);
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
</style>
