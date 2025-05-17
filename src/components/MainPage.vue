<script setup>
import { computed, ref, onMounted } from 'vue';
import RouterLinkButton from './ui/RouterLinkButton.vue';
import NumberedCard from './ui/NumberedCard.vue';
import ReusableScreen from './ui/ReusableScreen.vue';
import NewsCard from './ui/NewsCard.vue';
import GalleryCharters from './ui/GalleryCharters.vue';

const newsData = ref([]);
const mainDirection = ref([]);
const chartersGallery = ref([]);

const loadData = async () => {
  try {
    const response = await import('@/data/db.json');
    newsData.value = response.news;
    mainDirection.value = response.cards;
    chartersGallery.value = response.gallery
  } catch (error) {
    console.error('Ошибка загрузки новостей:', error)
  };
}

onMounted(loadData);

const windowWidth = ref(window.innerWidth);

onMounted(() => {
  window.addEventListener('resize', () => {
    windowWidth.value = window.innerWidth;
  });
});

const shownNews = computed(() => {
  const isDesktop = windowWidth.value >= 1280;
  return newsData.value.slice(0, isDesktop ? 4 : 2);
});

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
    <ReusableScreen>
      <template v-slot:title>
        AHO «Воспитание для всех»
      </template>
      <template v-slot:description>
        Содействие развитию просветительской деятельности детей, их семей и молодёжи в области образования, культуры и
        физической культуры
      </template>
      <template v-slot:img>
        <img src="/img/main-screen-photo-boy.png" alt="Изображение мальчика" class="main-screen__img">
      </template>
    </ReusableScreen>

    <div class="description">
      <h2 class="description__title">Основное направление деятельности</h2>
      <div class="description__news-card-box">
        <NumberedCard v-for="card in mainDirection" :key="card.number" :padding-bottom="card.paddingBottom">
          <template v-slot:number>{{ card.number }}</template>
          <template v-slot:description>{{ card.description }}
          </template>
          <template v-slot:img>
            <img :src="card.img.src" :alt="card.img.alt"
              :class="`description-card__img description-card__img_size-${card.number}`">
          </template>
        </NumberedCard>
      </div>
    </div>

    <div class="organization-charter">
      <div class="organization-charter__img-block">
        <img src="" alt="" class="organization-charter__img">
      </div>
      <div class="organization-charter__text-block">
        <span class="organization-charter__text">
          Вы можете озакомиться с уставом организации<br>
          <RouterLink to="/charter" class="organization-charter__link"
            :class="{ active: $route.path === ('/charter') }">
            перейдя по этой ссылке
          </RouterLink>
        </span>
      </div>
    </div>

    <div class="wrapper-director">
      <div class="director">
        <div class="director__img-box">
          <div class="director__img"></div>
        </div>

        <div class="director__text-box">
          <h2 class="director__title">Директор</h2>
          <h3 class="director__subtitle">Мушастая Наталья Викторовна</h3>
          <span class="director__text">Кандидат психлолгических наук, доцент, детский нейропсихолог, дефектолог и
            психолог
            высшей категории. Директор АНО «Инновационный центр развития детей и молодёжи „Воспитание для всех“»,
            лауреат
            «Педагог-психолог Кубани» 2023, «Лучший педагог Новороссийска» 2024. Автор научных и методических работ,
            руководитель федеральных инновационных проектов.</span>
        </div>
      </div>

      <GalleryCharters :photos="chartersGallery" :show-title="true" title="Заслуги"
        bg-color="var(--color-background-purple)" text-color="var(--color-text-light)">
      </GalleryCharters>
    </div>

    <div class="news">
      <h2 class="news__title">Новости</h2>
      <div class="news__wrap">
        <router-link v-for="info in shownNews" :key="info.id" :to="{ name: 'article', params: { id: info.id } }"
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
      <RouterLinkButton :to="{ name: 'news' }" :disabled="false" max-height-btn="62px" min-height-btn="62px"
        font-size-btn="20px">
        <template v-slot:text>ко всем новостям</template>
      </RouterLinkButton>

    </div>

  </main>
</template>

<style lang="scss">
@use '@/assets/scss/mixins.scss' as *;

.description {
  @include block-mobile;
  padding: 0;

  &__title {
    @include h2-mobile-uppercase;
    text-align: center;

    @media only screen and (min-width: 1280px) {
      font-size: 32px;
      font-weight: 600;
      line-height: 1.2;
    }
  }

  &__news-card-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    gap: 16px;

    @media only screen and (min-width: 768px) {
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
    }

    @media only screen and (min-width: 1280px) {
      flex-wrap: nowrap;
      justify-content: space-between;
    }
  }

  @media only screen and (min-width: 1280px) {
    max-width: 1190px;
    width: 100%;
    gap: 48px;
    margin-top: var(--margin-between-blocs-desctop);
  }
}

.description-card {

  &__img {
    border-bottom-right-radius: 12px;
  }

  &__img_size-1 {
    width: 100%;
    height: 100%;
  }

  &__img_size-2 {
    width: 90%;
    height: 85%;
  }

  &__img_size-3 {
    width: 85%;
    height: 100%;
  }
}

.organization-charter {
  @include block-mobile;

  @media only screen and (min-width: 768px) {
    flex-direction: row;
    min-height: 136px;
    height: fit-content;
    padding: 0;
    gap: 0;
  }

  @media only screen and (min-width: 1280px) {
    max-width: 1190px;
  }

  &__img-block,
  &__text-block {
    @include block-mobile;
    @include minmax-width-mobile;
  }

  &__img-block {
    @media only screen and (min-width: 768px) {
      align-items: flex-start;
      min-width: 136px;
      max-width: fit-content;
      min-height: 136px;
      padding: 0;
      border-top-left-radius: 50%;
      border-bottom-left-radius: 50%;
      background-color: var(--color-background-light-blue);
    }

    @media only screen and (min-width: 1280px) {}
  }

  &__text-block {
    @media only screen and (min-width: 768px) {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      min-height: 136px;
      height: fit-content;
      padding: 0;
      padding-left: 73px;
      border-bottom-right-radius: 16px;
      border-top-right-radius: 16px;
      background-color: var(--color-background-light-blue);
    }

    @media only screen and (min-width: 1280px) {
      min-width: 227px;
      min-height: 227px;
      border-bottom-right-radius: 30px;
      border-top-right-radius: 30px;
    }
  }

  &__img {
    @include cover-center-no-repeat-img;
    min-width: 151px;
    min-height: 151px;
    background-image: url('/img/mascot-boy.png');

    @media only screen and (min-width: 768px) {
      min-width: 136px;
      min-height: 136px;
    }

    @media only screen and (min-width: 1280px) {
      min-width: 227px;
      min-height: 227px;
    }
  }

  &__text {
    text-align: center;

    @media only screen and (min-width: 768px) {
      text-align: left;
    }
  }

  &__link {
    text-decoration: none;
    color: var(--color-background-purple);
  }
}

.wrapper-director {
  display: flex;
  flex-direction: column;
  gap: 40px;

  @media only screen and (min-width: 1280px) {
    flex-direction: row;
    max-width: 1190px;
    width: 100%;
    gap: 10px;
  }
}

.director {
  @include block-mobile;
  @include minmax-width-mobile-block;
  padding-top: 20px;
  padding-bottom: 20px;
  gap: 12px;
  color: var(--color-text-light);
  border-radius: var(--cards-border-radius);
  background-color: var(--color-background-red);

  @media only screen and (min-width: 768px) {
    flex-direction: row-reverse;
    min-height: 271px;
    gap: 16px;
    border-radius: var(--cards-border-radius-tablet);
  }

  @media only screen and (min-width: 1280px) {
    border-radius: 24px;
    width: 56%;
    min-height: 338px;
    height: fit-content;
    padding: 36px;
  }

  &__title {
    @include h2-mobile-uppercase;

    @media only screen and (min-width: 768px) {
      font-size: 26px;
      font-weight: 600;
      line-height: 1.5;
    }

    @media only screen and (min-width: 1280px) {}
  }

  &__subtitle {
    width: 100%;
    text-align: center;

    @media only screen and (min-width: 768px) {
      text-align: left;
      font-weight: 700;
      line-height: 1;
    }

    @media only screen and (min-width: 1280px) {}
  }

  &__img-box,
  &__text-box {
    @include display-flex-column;
    gap: 14px
  }

  &__text-box {
    @media only screen and (min-width: 768px) {
      align-items: flex-start;
    }

    @media only screen and (min-width: 1280px) {}
  }

  &__text {
    font-weight: lighter;
  }

  &__img {
    @include cover-center-no-repeat-img;
    background-image: url('/img/photo-director.jpg');
    min-width: 150px;
    min-height: 150px;
    border-radius: 50%;

    @media only screen and (min-width: 768px) {
      border-radius: var(--cards-border-radius);
      min-height: 196px;
    }

    @media only screen and (min-width: 1280px) {
      max-width: 164px;
      max-height: 210px;
    }
  }
}

.news-card-link {
  display: flex;
  width: 100%;
  text-decoration: none;
  color: inherit;

  @media only screen and (min-width: 1280px) {
    min-width: 290px;
    width: calc(25% - 30px);
  }
}

.news {
  display: flex;
  flex-direction: column;
  gap: 22px;

  @media only screen and (min-width: 768px) {
    gap: 36px;
  }

  @media only screen and (min-width: 1280px) {
    max-width: 1190px;
  }

  &__wrap {
    display: flex;
    gap: 16px;
    flex-direction: column;

    @media only screen and (min-width: 768px) {
      gap: 20px;
      flex-direction: row;
    }

    @media only screen and (min-width: 1280px) {
      max-width: 1190px;
      gap: 10px;
    }

  }
}
</style>
