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
        <h1 class="main-screen__title_lower-case">АНО «Воспитание для всех» – победитель Всероссийского конкурса грантов
          СОТ.</h1>
      </template>
      <template v-slot:description>
        <h2 class="main-screen__subtitle_lower-case">АНО «Воспитание для всех», основанная на базе МАОУ СОШ № 33,
          активно развивает образование и социализацию
          молодёжи. В 2021, 2022 и 2024 годах организация стала победителем СОТ для работников образования.</h2>
      </template>
      <template v-slot:img>
        <img src="/img/boy-thumb.png" alt="Изображение мальчика" class="main-screen__img">
      </template>
    </ReusableScreen>

    <div class="title_mobile">
      <h2 class="title-page">Наши проекты</h2>
    </div>

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
          <div class="project-image_tablet" :class="`project-${project.id}-image_tablet`">
            <img :src="`/img/${project.imgURL}`" :alt="project.imgAlt">
          </div>

          <template v-for="section in project.sections" :key="section.title">
            <LinkCard v-if="['description', 'goals', 'results'].includes(section.type)" :title="section.title"
              :description="section.text" :paddingBottomMobile="'46px'" image-width="30%" title-size="20px">
              <template #image>
                <img :src="section.icon" :alt="section.title" width="90px">
              </template>
            </LinkCard>
            <GallerySection
              v-else-if="section.type === 'gallery' && section.images"
              :photos="section.images.map(img => ({ image: img.url }))"
              :show-title="false"
              heightTablet="211px"
              minWidthTablet="0"
              topPositionTablet="0"
              wrapperHeightTablet="100%"
              sliderHeightTablet="100%"
              slideImageHeightTablet="100%"
              slideContentHeightTablet="100%"
              sliderWrapperBorderRadiusTablet="16px"
              navigationPositionTablet="absolute"
              navigationPositionBottomTablet="0"
              navigationPositionRightTablet="0"
              />
          </template>
        </div>
      </div>
    </div>

    <div class="similar-topics">
      <div class="similar-topics__title-box">
        <img class="similar-topics__img" src="/img/happy-boy.png" alt="">
        <h2>Статьи на похожую тему:</h2>
      </div>
      <div class="news-card-wrapper">



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
    </div>
  </main>
</template>

<style scoped lang="scss">
@use '@/assets/scss/mixins.scss' as *;

.main-screen {
  &__title_lower-case {
    font-family: var(--font-family-nunito);
    font-weight: 600px;
    font-size: 22px;
    line-height: 1.5;
    margin: 0;
  }

  &__subtitle_lower-case {
    font-family: var(--font-family-nunito);
    font-weight: 400px;
    font-size: 18px;
    line-height: 1.4;
  }

  &__img-box {
    justify-content: center;
  }

  &__img {
    min-width: 247px;
    max-width: 300px;
    width: 80%;
  }
}

.title_mobile {
  @media (min-width: 768px) {
    display: none;
  }
}

.project-grid {
  display: grid;
  gap: 12px;

  @media (min-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
}

.project-title {
  width: 100%;
  font-weight: 600;
  font-size: 18px;
  line-height: 1.5;

  &_tablet {
    display: none;

    @media (min-width: 768px) {
      display: flex;
      justify-content: center;
      font-weight: 600;
      font-size: 24px;
      line-height: 1;
      padding: 10px;
      text-align: center;
    }
  }
}

.project-mne-by-v-nebo {
  &-title_mobile {
    color: var(--color-text-light);
    padding-left: 33px;
    padding-bottom: 33px;
  }

  &-image_mobile {
    @extend .project-image_mobile;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    background-color: var(--color-background-red);

    img {
      width: 50%;
    }
  }

  &-image_tablet {
    @media (min-width: 768px) {
      object-fit: cover;
      background-color: var(--color-background-red);
    }

    img {
      max-width: 80%
    }
  }
}

.project-ovz {

  &-title_mobile {
    text-align: center;
    color: var(--color-text-light);
    padding-top: 40px;
    max-width: 90%;
  }

  &-image_mobile {
    @extend .project-image_mobile;
    display: flex;
    background-color: var(--color-background-purple);
    flex-direction: column;
    align-items: center;

    img {
      width: 80%;
      padding-left: 20px;
    }
  }

  &-image_tablet {
    @media (min-width: 768px) {
      background-color: var(--color-background-purple);
    }
  }
}

.project-ou {
  &-title_mobile {
    text-align: center;
    padding-top: 40px;
    max-width: 90%;
  }

  &-image_mobile {
    @extend .project-image_mobile;
    display: flex;
    background-color: var(--color-background-yellow);
    flex-direction: column;
    align-items: center;

    img {
      width: 80%;
    }
  }

  &-image_tablet {
    @media (min-width: 768px) {
      background-color: var(--color-background-yellow);
    }
  }
}

.project {
  &-content {
    display: grid;
    grid-template-columns: 100%;
    gap: 12px;
    align-items: start;

    @media (min-width: 768px) {
      width: 100%;
      grid-template-rows: 217px 223px 196px;
      grid-template-columns: 33% calc(33% - 24px) 33%;
      gap: 16px;
      align-items: center;

      &> :nth-child(2) {
        grid-row: 1;
        grid-column: 2/4;
      }

      &> :nth-child(3) {
        grid-row: 2;
        grid-column: 1/3;
      }

      &> :nth-child(4) {
        grid-row: 3;
        grid-column: 1/4;
      }

      &> :nth-child(5) {
        grid-row: 2;
        grid-column: 3/4;
      }
    }
  }

  &-image_mobile {
    width: 100%;
    min-height: 209px;
    border-radius: 12px;

    img {
      border-bottom-right-radius: 12px;
    }

    @media (min-width: 768px) {
      display: none;
    }
  }

  &-image_tablet {
    display: none;

    @media (min-width: 768px) {
      grid-column: 1;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      width: 100%;
      height: 100%;
      border-radius: 16px;
      overflow: hidden;

      img {
        height: 100%;
        object-fit: contain;
      }
    }
  }
}

.similar-topics {
  @include block-mobile;
  padding: 20px 0 0 0;

  &__title-box {
    @include block-mobile;
    padding: 0;

    h2 {
      font-size: 20px;
    }
  }

  &__img {
    width: 150px;
    height: 150px;
  }
}

.news-card-wrapper {

  @media (min-width: 768px) {
    display: flex;
    flex-direction: row;
    gap: 10px;
    }

}
</style>
