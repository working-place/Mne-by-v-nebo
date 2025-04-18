<script setup>
import { computed, ref, onMounted } from 'vue';
import ReusableScreen from './ui/ReusableScreen.vue';
import NewsCard from './ui/NewsCard.vue';
import LinkCard from './ui/LinkCard.vue';

defineProps ({
  bgColor: {
    type: String,
    default: 'var(--color-hover-red)',
  }
})

const newsData = ref([]);
const projectMneByVNebo = ref([]);
const projectOVZ = ref([]);
const projectOU = ref([]);

const loadData = async () => {
  try {
    const response = await import('@/data/db.json');
    newsData.value = response.news;
    projectMneByVNebo.value = response.projectMneByVNebo;
    projectOVZ.value = response.projectOVZ;
    projectOU.value = response.projectOU;
  } catch (error) {
    console.error('Ошибка загрузки новостей:', error)
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

    <div class="project">
      <h2>Наши проекты</h2>
      <div class="project__box" :style="{ backgroundColor: bgColor }">
        <div class="project__title">
          <span>Мне бы в небо</span>
        </div>
        <img class="project__img" src="/img/mne-by-v-nebo.png" alt="Мальчик с самолетом в руке">
      </div>

      <LinkCard v-for="(item, index) in projectMneByVNebo" :key="index" :title="item.title"
        :description="item.description" :linkUrl="item.linkUrl" :linkText="item.linkText" :paddingBottom="'46px'"
        image-width="30%" title-size="20px">
        <template #image>
          <img :src="item.image" :alt="item.title" width="90px">
        </template>
      </LinkCard>
    </div>

    <div class="project">
      <div class="project__box" :style="{ backgroundColor: 'var(--color-background-purple)'}">
        <div class="project__title">
          <span>Апробирование современных технологий обучения учащихся с ОВ3 через практическую деятельность</span>
        </div>
        <img class="project__img" src="/img/mne-by-v-nebo.png" alt="Мальчик с самолетом в руке">
      </div>

      <LinkCard v-for="(item, index) in projectOVZ" :key="index" :title="item.title"
        :description="item.description" :linkUrl="item.linkUrl" :linkText="item.linkText" :paddingBottom="'46px'"
        image-width="30%" title-size="20px">
        <template #image>
          <img :src="item.image" :alt="item.title" width="90px">
        </template>
      </LinkCard>
    </div>

    <div class="project">
      <div class="project__box" :style="{ backgroundColor: 'var(--color-background-yellow)'}">
        <div class="project__title">
          <span>Апробирование современных технологий обучения учащихся с ОВ3 через практическую деятельность</span>
        </div>
        <img class="project__img" src="/img/mne-by-v-nebo.png" alt="Мальчик с самолетом в руке">
      </div>

      <LinkCard v-for="(item, index) in projectOU" :key="index" :title="item.title"
        :description="item.description" :linkUrl="item.linkUrl" :linkText="item.linkText" :paddingBottom="'46px'"
        image-width="30%" title-size="20px">
        <template #image>
          <img :src="item.image" :alt="item.title" width="90px">
        </template>
      </LinkCard>
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

.project {
  @include block-mobile;

  padding: 0;


  &__box {
    @include block-mobile;
    flex-direction: row;
    justify-content: flex-end;
    align-items: flex-end;
    width: 100%;
    height: 209px;
    padding: 0;
    gap: 0;
    border-radius: var(--cards-border-radius);
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
    border-bottom-right-radius: 12px;
  }
}

.similar-topics {
  @include block-mobile;
  padding: 0;

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
