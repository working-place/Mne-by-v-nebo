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
      <div class="project-grid">
        <h3 class="project-title_tablet">
          {{ project.title }}
        </h3>

        <div class="project-image_mobile" :class="`project-${project.id}-image_mobile`">
          <h3 class="project-title_mobile" :class="`project-${project.id}-title_mobile`">
            {{ project.title }}
          </h3>
          <img :src="`/img/${project.imgURL}`" :alt="project.imgAlt">
        </div>

        <div class="project-content">
          <div class="project-image_tablet">
            <img :src="`/img/${project.imgURL}`" :alt="project.imgAlt">
          </div>

          <div class="project-cards">
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
        </div>
      </div>
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

.project-grid {
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 12px;
}

.project-title {
  grid-row: 1;
  width: 100%;
  font-weight: 600;
  font-size: 18px;
  line-height: 1.5;
}

.project-mne-by-v-nebo-title_mobile {
  color: var(--color-text-light);
  padding-left: 33px;
  padding-bottom: 33px;
}

.project-ovz-title_mobile {
  text-align: center;
  color: var(--color-text-light);
  padding-top: 40px;
  max-width: 90%;
}

.project-ou-title_mobile {
  text-align: center;
  padding-top: 40px;
  max-width: 90%;
}

.project-title_tablet {
  display: none;
}

.project-content {
  display: grid;
  grid-template-columns: 100%;
  gap: 10%;
  align-items: start;
}

.project-image_tablet {
  display: none;

  @media (max-width: 768px) {
    grid-row: 1;
    width: 100px;
    grid-column: 1;
  }
}

.project-image_mobile {
  width: 100%;
  min-height: 209px;
  border-radius: 12px;
}

.project-mne-by-v-nebo-image_mobile {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  background-color: var(--color-background-red);
}

.project-ovz-image_mobile {
  display: flex;
  background-color: var(--color-background-purple);
  flex-direction: column;
  align-items: center;
}

.project-ou-image_mobile {
  display: flex;
  background-color: var(--color-background-yellow);
  flex-direction: column;
  align-items: center;
}

.project-mne-by-v-nebo-image_mobile img {
  width: 50%;
}

.project-ovz-image_mobile img {
  width: 80%;
  padding-left: 20px;
}

.project-ou-image_mobile img {
  width: 80%;
}

.project-image_mobile img {
  border-bottom-right-radius: 12px;
}

.project-cards {
  display: grid;
  gap: 12px;
}

.similar-topics {
  @include block-mobile;
  padding: 20px 0 0 0;

  &__title-box {
    @include block-mobile;
    padding: 0;
  }

  &__title-box h2 {
    font-size: 20px;
  }

  &__img {
    width: 150px;
    height: 150px
  }
}
</style>
