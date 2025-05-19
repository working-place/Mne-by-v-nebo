<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue';
import ReusableScreen from './ui/ReusableScreen.vue';
import FeatureCard from './ui/FeatureCard.vue';
import InfoCard from './ui/InfoCard.vue';
import Slider from './ui/SliderWrapper.vue';
import NewsCard from './ui/NewsCard.vue';
import RouterLinkButton from './ui/RouterLinkButton.vue';

const bookSlidesSpecialist = [
  {
    title: 'Бегущая с волками – Эстесс К.П.',
    description: 'Сказки и архетипы женской души. Психоанализ, интуиция, инициация и внутренние ресурсы женщины.',
    image: '/img/star.png'
  },

  {
    title: 'Воспоминания, сновидения – Карл Густав Юнг',
    description: 'Автобиография Юнга: путь к психоанализу, внутренний мир, размышления о жизни и бессознательном.',
    image: '/img/book.png'
  },

  {
    title: 'Дар психотерапии – Ирвин Ялом',
    description: '85 мини-глав о том, каким должен быть терапевт. Опыт Ялома о чувствах, скуке и связи с пациентом.',
    image: '/img/medal.png'
  },

  {
    title: 'Дневник шизофренички – Маргарит Сешей',
    description: 'Мир глазами пациентки с шизофренией. Инсайты о психике, реальности и восприятии.',
    image: '/img/heart.png'
  },
  {
    title: 'Драма одарённого ребёнка – Элис Миллер',
    description: 'Как детство влияет на взрослую личность. Влияние родительских ожиданий и подавленных чувств.',
    image: '/img/star.png'
  },

  {
    title: 'Невротическая личность – Карен Хорни',
    description: 'О причинах тревожности, созависимости и способов их преодоления. Глубокий и понятный анализ.',
    image: '/img/book.png'
  },

  {
    title: 'Сказать жизни ДА – Виктор Франкл',
    description: 'Франкл о выживании в концлагере и смысле жизни в самых тяжёлых условиях.',
    image: '/img/medal.png'
  },

  {
    title: 'Человек для себя – Эрих Фромм',
    description: 'О сохранении себя в обществе, балансе между личным смыслом и общественной пользой.',
    image: '/img/heart.png'
  },
];

const bookSlidesParent = [
  {
    title: 'Кризисы детского возраста – Ярославцева Е.Ю.',
    description: 'Как справляться с капризами и истериками ребёнка без наказаний и запретов. Полезно родителям, воспитателям и учителям.',
    image: '/img/book.png'
  },
  {
    title: 'Свободные родители, свободные дети – Мазлиш, Фабер',
    description: 'Как понять ребёнка, справиться с эмоциями, повысить самооценку и научиться уважать чувства в семье.',
    image: '/img/star.png'
  },
  {
    title: 'Детская психология в вопросах – Волков Б.С., Волкова Н.В.',
    description: 'О тревожных звоночках в развитии ребёнка и как их вовремя заметить. Рекомендации родителям и специалистам.',
    image: '/img/medal.png'
  },
  {
    title: 'Книга для неидеальных родителей – Млодик И.',
    description: 'Как вырастить счастливого ребёнка без насилия и запретов. Наблюдения и советы от опытного психолога.',
    image: '/img/heart.png'
  },
  {
    title: 'Твое тело говорит: люби себя! – Лиз Бурбо',
    description: 'Болезни как отражение душевных проблем. Психосоматика и метафизика недугов в доступном изложении.',
    image: '/img/book.png'
  },
  {
    title: 'Нестандартные родители – Стив Биддалф',
    description: 'Как быть уверенными, спокойными родителями, понимать ребёнка и строить доверительные отношения в семье.',
    image: '/img/star.png'
  },
  {
    title: 'Экзамен для родителей – Мурашова Е.',
    description: 'Тест-книга по воспитанию детей от 2 до 16 лет. Безопасная тренировка родительских навыков.',
    image: '/img/medal.png'
  },
  {
    title: 'Как строить мосты, а не стены – Млодик И.',
    description: 'О понимании между родителями и детьми. Книга для обсуждений, примирения и принятия друг друга.',
    image: '/img/heart.png'
  },
];

const newsData = ref([]);
const loadData = async () => {
  try {
    const response = await import('@/data/db.json');
    newsData.value = response.news;
  } catch (error) {
    console.error('Ошибка загрузки новостей:', error)
  };
}


const windowWidth = ref(window.innerWidth);

const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth;
};

onMounted(() => {
  loadData();
  window.addEventListener('resize', updateWindowWidth);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateWindowWidth);
});

const visibleNews = computed(() => {
  if (windowWidth.value >= 1280) {
    return newsData.value.slice(0, 4);
  } else if (windowWidth.value >= 768) {
    return newsData.value.slice(0, 2);
  }
  return newsData.value.slice(0, 4);
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
    <ReusableScreen textColor="var(--color-text-dark)" bgColor="var(--color-background-yellow)" imgPaddingTop="0">
      <template v-slot:title>
        <span class="main-screen__title">Полезные материалы</span>
      </template>
      <template v-slot:description>
        <span class="description-text">
          Вы найдете здесь интересные истории, познавательные материалы и развивающие пособия, которые сделают обучение
          не только полезным, но и увлекательным
        </span>
      </template>
      <template v-slot:img>
        <img src="/img/usefull-material-photo-boy.png" alt="Изображение мальчика" class="main-screen__img">
      </template>
    </ReusableScreen>

    <InfoCard imageUrl="/img/usefull-page-boy.png" title="Литература для специалистов"
      description="Представляем подборку книг и методических материалов для специалистов в области детского образования. Здесь вы найдете актуальные исследования, практические руководства и вдохновляющие примеры."
      class="content-card" />

    <div class="slider-container">
      <Slider :items="bookSlidesSpecialist" :visible-slides="4">
        <template #default="{ item }">
          <FeatureCard :title="item.title" :description="item.description" :paddingBottom="'46px'" image-width="30%">
            <template #image>
              <img :src="item.image" :alt="item.title" width="90px">
            </template>
          </FeatureCard>
        </template>
      </Slider>
    </div>

    <div class="info-card info-card--right">
      <div class="info-card__image-container">
        <img src="/img/usefull-material-content-boy.png" alt="title" class="info-card__image" />
      </div>
      <div class="info-card__text-content">
        <h2 class="info-card__title">Литература для родителей</h2>
        <p class="info-card__description">Помогите своему ребенку раскрыть свой потенциал с помощью наших специально
          подобранных книг! Они помогут ему лучше учиться, расширят его кругозор и обогатят его воображение.</p>
      </div>
    </div>

    <div class="slider-container">
      <Slider :items="bookSlidesParent" :visible-slides="4">
        <template #default="{ item }">
          <FeatureCard :title="item.title" :description="item.description" :paddingBottom="'46px'" image-width="30%">
            <template #image>
              <img :src="item.image" :alt="item.title" width="90px">
            </template>
          </FeatureCard>
        </template>
      </Slider>
    </div>

    <div class="similar-topics news">
      <h2>Это интересно</h2>
      <div class="news-container news__wrap">
        <router-link v-for="info in visibleNews" :key="info.id" :to="{ name: 'article', params: { id: info.id } }"
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

      <RouterLinkButton :to="{ name: 'news' }" :disabled="false" class="router-link-button" max-height-btn="63px"
        min-height-btn="63px" font-size-btn="20px">
        <template v-slot:text>Перейти ко всем новостям</template>
      </RouterLinkButton>
    </div>

  </main>
</template>

<style scoped lang="scss">
@use '@/assets/scss/mixins.scss' as *;

.info-card {
  @include display-flex-column-center;
  position: relative;
  width: 100%;
  gap: 10px;
  padding: 20px;
  background-color: var(--color-background-light-blue);
  border-radius: var(--cards-border-radius);

  &__image-container {
    width: 150px;
    height: 150px;
    order: 1;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }

  &__text-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 10px;
    order: 2;
  }

  &__title {
    color: #000000;
    font-size: 20px;
    line-height: 1.5;
    text-align: center;
    width: 100%;
  }

  &__description {
    color: #000000;
    line-height: 1.5;
    font-size: 18px;
    font-weight: 300;
    text-align: center;
    max-width: 100%;
    word-break: break-word;
  }

  @media only screen and (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    gap: 30px;
    padding: 30px;
    min-width: 650px;

    &__image-container {
      width: 200px;
      height: 200px;
      flex-shrink: 0;
      order: 2;
    }

    &__text-content {
      align-items: flex-start;
      order: 1;

      .info-card__title {
        text-align: left;
      }

      .info-card__description {
        text-align: left;
      }
    }
  }

  @media only screen and (min-width: 1280px) {
    max-width: 1190px;
    height: 228px;
    padding: 40px 200px 40px 40px;
    gap: 50px;
    margin-top: 50px;
    border-radius: var(--cards-border-radius) 100px 100px var(--cards-border-radius);

    &--right &__image-container {
      position: absolute;
      width: 228px;
      height: 228px;
      right: -10px;
      top: 50%;
      transform: translateY(-50%);
    }

    &__text-content {
      gap: 20px;
      padding-right: 80px;
    }

    &__title {
      font-size: 32px;
      font-weight: 600;
      line-height: 1.2;
    }

    &__description {
      font-size: 20px;
    }
  }
}

.content-card {
  margin-top: 60px;
}

.slider-container {
  position: relative;
  width: 100%;
  margin-top: -20px;
  margin-bottom: 30px;

  @media only screen and (min-width: 1280px) {
    margin-top: 10px;
  }
}

h2 {
  @include h2-mobile-uppercase;
  text-align: center;

  @media only screen and (min-width: 1280px) {
    font-size: 32px;
    font-weight: 600;
    line-height: 1.2;
  }
}

.news-card-link {
  display: flex;
  text-decoration: none;
  color: inherit;
}

.router-link-button {
  max-width: 1190px;
  text-align: center;
}
</style>
