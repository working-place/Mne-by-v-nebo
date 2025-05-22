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
const currentProjectIndex = ref(0);

const scrollToProject = (projectId) => {
  const element = document.getElementById(`project-${projectId}`);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
};

const nextProject = () => {
  currentProjectIndex.value = (currentProjectIndex.value + 1) % projects.value.length;
};

const prevProject = () => {
  currentProjectIndex.value = (currentProjectIndex.value - 1 + projects.value.length) % projects.value.length;
};

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
        <h2 class="main-screen__subtitle_upper-case">Наши проекты</h2>
      </template>
      <template v-slot:img>
        <img src="/img/boy-thumb.png" alt="Изображение мальчика"
          class="main-screen__img main-screen__img_mobile-tablet">
        <img src="/img/girl-on-swing.png" alt="Изображение мальчика" class="main-screen__img-desctop">
      </template>
      <template v-slot:gallery>

        <div class="main-screen__projects-gallery">

          <div class="main-screen__project-info-box">

            <div class="main-screen__project-slide" v-for="(project, index) in projects" :key="project.id"
              v-show="currentProjectIndex === index">
              <div class="main-screen__project-info">
                <h3 class="main-screen__project-title">{{ project.title }}</h3>
              </div>
            </div>

            <div class="main-screen__slider-controls">
              <button @click="prevProject" class="main-screen__slider-button prev-button">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
              </button>
              <button @click="nextProject" class="main-screen__slider-button next-button">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 6L15 12L9 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
              </button>
              <button @click="scrollToProject(projects[currentProjectIndex]?.id)" class="main-screen__project-link">
                Подробнее
              </button>
            </div>

          </div>

          <div class="main-screen__gallery-card-box" v-for="(project, index) in projects" :key="project.id"
            v-show="currentProjectIndex === index">
            <div class="main-screen__project-image">
              <img v-if="project.sections.find(s => s.type === 'gallery')?.images?.length"
                :src="project.sections.find(s => s.type === 'gallery').images[0].url" :alt="project.imgAlt">
            </div>
          </div>

        </div>

      </template>
    </ReusableScreen>

    <div class="title_mobile">
      <h2 class="title-page">Наши проекты</h2>
    </div>

    <div v-for="(project) in projects" :key="project.id" class="project" :class="`project-${project.id}`"
      :id="`project-${project.id}`">
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
            <GallerySection v-else-if="section.type === 'gallery' && section.images"
              :photos="section.images.map(img => ({ image: img.url }))" :show-title="false" heightTablet="211px"
              minWidthTablet="0" topPositionTablet="0" wrapperHeightTablet="100%" sliderHeightTablet="100%"
              slideImageHeightTablet="100%" slideContentHeightTablet="100%" slideContentHeightDesctop="360px"
              sliderWrapperBorderRadiusTablet="16px" navigationPositionTablet="absolute"
              navigationPositionBottomTablet="0" navigationPositionRightTablet="0" showPaginationTablet="none" />
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
    font-size: 20px;
    line-height: 1.5;
    margin: 0;

    max-width: 344px;

    @media (min-width: 1280px) {
      max-width: 332px;
      margin-left: 38px;
      line-height: 1.2;
    }
  }

  &__subtitle_lower-case {
    font-family: var(--font-family-nunito);
    font-weight: 400px;
    font-size: 16px;
    line-height: 1.4;
    max-width: 344px;

    @media (min-width: 1280px) {
      max-width: 312px;
      margin-left: 38px;
    }
  }

  &__subtitle_upper-case {

    @media (max-width: 1279px) {
      display: none;
    }

    @media (min-width: 1280px) {
      font-size: 36px;
      font-weight: 600;
      line-height: 1;
      position: absolute;
      top: 148px;
      right: 250px;
    }
  }

  &__img-box {
    justify-content: center;
  }

  &__img {
    min-width: 247px;
    max-width: 300px;
    width: 80%;
  }

  &__img_mobile-tablet {
    @media (min-width: 1280px) {
      display: none;
    }
  }

  &__img-desctop {
    @media (max-width: 1279px) {
      display: none;
    }

    @media (min-width: 1280px) {
      min-width: 320px;
      height: 382px;
      position: absolute;
      top: 0;
      left: 295px;
      z-index: 1000;
    }
  }

  &__projects-gallery {
    @media (max-width: 1279px) {
      display: none;
    }

    @media (min-width: 1280px) {
      display: flex;
      position: absolute;
      bottom: 0;
      right: 0;
      height: 196px;
      width: 590px;
      background-color: white;
      padding-top: 40px;
      padding-left: 40px;
      gap: 32px;
      border-top-left-radius: 40px;
      border-bottom-right-radius: 40px;
    }
  }

  &__project-info-box {
    display: flex;
    flex-direction: column;
    width: 372px;
    height: 100%;
    justify-content: space-between;
    transition: transform 0.3s ease;
    will-change: transform;
  }

  &__project-title {
    font-size: 18px;
    font-weight: 600;
    line-height: 1.2;
  }

  &__slider-controls {
    display: flex;
    gap: 15px;
  }

  &__slider-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 62px;
    height: 62px;
    border: none;
    border-radius: 50%;
    background: #CABBFF;
    cursor: pointer;

    @media (hover: hover) {
      &:hover {
        background-color: #977AF9;
      }
    }

    &:disabled {
      cursor: not-allowed;
      background-color: #E3E3E3;
      color: #525252;
    }

    & svg {
      width: 35px;
      height: 35px;
    }
  }

  &__project-link {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background-color: var(--color-background-yellow);
    padding: 16px;
    font-size: 16px;
    font-weight: 600;
    color: var(--color-text-dark);
    text-transform: uppercase;
    line-height: 1;
    text-decoration: none;
    min-width: 205px;
    gap: 10px;
    border-radius: 60px;
  }

  &__gallery-card-box,
  &__project-image {
    width: 146px;
    height: 156px;
  }

  &__project-image img {
    height: 156px;
    width: 100%;
    object-fit: cover;
    border-radius: 20px;
  }
}

.title_mobile {
  margin-bottom: -20px;

  @media (min-width: 768px) {
    display: none;
  }
}

.title-page {
  font-size: 20px;
  font-weight: 600;
  line-height: 1.5;
}

.project-grid {
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto;
  gap: 12px;
  position: relative;

  @media (min-width: 768px) {
    justify-items: center;
    gap: 16px;
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

    &> :nth-child(2) {
      & img {
        width: 25%;
      }
    }

    @media (min-width: 768px) {
      width: 100%;
      grid-template-rows: 212px 212px 212px;
      grid-template-columns: 33% calc(33% - 24px) 33%;
      gap: 16px;
      align-items: end;

      &> :nth-child(2) {
        grid-row: 1;
        grid-column: 2/4;
        height: 100%;

        & img {
          width: 20%;
        }
      }

      &> :nth-child(3) {
        grid-row: 2;
        grid-column: 1/3;
        height: 100%;

        & img {
          width: 20%;
        }
      }

      &> :nth-child(4) {
        grid-row: 3;
        grid-column: 1/4;

        & img {
          display: none;
        }
      }

      &> :nth-child(5) {
        grid-row: 2;
        grid-column: 3/4;
        min-height: 100%;
      }
    }

    @media (min-width: 1280px) {
      max-width: 1190px;
      grid-template-rows: 45px auto 125px;
      grid-template-columns: 26% calc(24% - 10px) calc(24% - 10px) 26%;
      gap: 10px;
      align-items: center;

      &> :first-child {
        grid-row: 1/3;
        grid-column: 1;
        display: flex;
        min-height: 100%;
        max-height: 360px;
        align-items: flex-end;
      }

      &> :nth-child(2) {
        grid-row: 2;
        grid-column: 2;
        min-height: 100%;
        height: fit-content;
        max-width: 290px;
      }

      &> :nth-child(2) img {
        width: 27%;
      }

      &> :nth-child(3) {
        grid-row: 2;
        grid-column: 3;
        min-height: 100%;
        height: fit-content;
        max-width: 290px;
      }

      &> :nth-child(3) img {
        width: 35%;
      }

      &> :nth-child(4) {
        grid-row: 3;
        grid-column: 1/5;
        min-height: 0;
        height: 125px;
      }

      &> :nth-child(4) img {
        display: none;
      }

      &> :nth-child(5) {
        display: flex;
        align-items: flex-end;
        grid-row: 1/3;
        grid-column: 4;
        min-width: 309px;
        min-height: 100%;
        height: fit-content;
        max-width: calc(100% - 10px);
      }
    }
  }

  &-title {
    width: 100%;
    font-weight: 600;
    font-size: 18px;
    line-height: 1.5;
  }

  &-title_tablet {
    display: none;

    @media (min-width: 768px) {
      display: flex;
      justify-content: center;
      font-weight: 600;
      font-size: 24px;
      line-height: 1;
      max-width: 650px;
      padding: 10px;
      text-align: center;
    }

    @media (min-width: 1280px) {
      align-items: flex-end;
      max-width: 591px;
      position: absolute;
      font-size: 24px;
      height: 60px;
      padding: 0;
      padding-bottom: 30px;
    }
  }

  &-title_desctop {
    @media (max-width: 1279px) {}
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
        @include cover-center-no-repeat-img;
        background-position: left;
        height: 90%;
      }
    }

    @media (min-width: 1280px) {
      border-radius: 24px;
    }
  }
}

.similar-topics {
  @include block-mobile;
  padding: 20px 0 0 0;

  @media (min-width: 1280px) {
    max-width: 1190px;
    flex-direction: row;
    gap: 53px;
  }

  &__title-box {
    @include block-mobile;
    padding: 0;

    & h2 {
      font-size: 20px;
    }

    @media (min-width: 1280px) {
      flex-direction: row;
      gap: 24px;

      & h2 {
        font-size: 32px;
        line-height: 1.2;
        font-weight: 600;
      }
    }
  }

  &__img {
    width: 150px;
    height: 150px;

    @media (min-width: 1280px) {
      width: 273px;
      height: 273px;
    }
  }
}

.news-card-wrapper {

  @media (min-width: 768px) {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }

  @media (min-width: 1280px) {
    min-width: 0;
    width: 100%;
  }
}
</style>
