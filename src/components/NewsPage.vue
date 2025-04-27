<script setup>
import { ref, onMounted, computed } from 'vue';
import NewsCard from './ui/NewsCard.vue';
import ReusableScreen from './ui/ReusableScreen.vue';

defineProps({
  disabled: {
    type: Boolean,
    default: false
  }
})

const newsData = ref([]);
const activeTag = ref('все');
const searchQuery = ref('');
const searchInput = ref(null);
const isDisabled = ref(false);

const filteringButtons = [
  {
    id: 1,
    title: "все",
    class: "all",
  },
  {
    id: 2,
    title: "тренинги",
    class: "trainings",
  },
  {
    id: 3,
    title: "гранты",
    class: "grants",
  },
  {
    id: 4,
    title: "мастер-классы",
    class: "masterclasses",
  },
];

const loadNews = async () => {
  try {
    const response = await import('@/data/db.json');
    newsData.value = JSON.parse(response.default).news;
  } catch (error) {
    console.error('Ошибка загрузки новостей:', error);
  }
};

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

const handleSearchInput = (event) => {
  searchQuery.value = event.target.value;
};

const handleTagFilter = (title) => {
  if (isDisabled.value) return;

  activeTag.value = title;
  searchQuery.value = "";
  if (searchInput.value) {
    searchInput.value.value = "";
  }
};

const filteredNews = computed(() => {
  const filtered = newsData.value.filter(news => {

    const tagMatch = activeTag.value === "все" || news.tag === activeTag.value;

    const searchMatch = news.text.toLowerCase().includes(searchQuery.value.toLowerCase()) || news.tag.toLowerCase().includes(searchQuery.value.toLowerCase());
    return tagMatch && searchMatch
  });
  if (filtered.length === 0 && (searchQuery.value || activeTag.value !== "all")) {
    return null
  }
  return filtered;
});

onMounted(loadNews);

</script>

<template>
  <main>

    <ReusableScreen bgColor="var(--color-background-lavender)" textColor="var(--color-text-dark)" blockHeight="470px"
      :use-flex="false">
      <template v-slot:title>
        новости
      </template>
      <template v-slot:description>
        <input type="text" class="main-screen__search-input" :value="searchQuery" @input="handleSearchInput"
          placeholder="хештег">
      </template>
      <template v-slot:img>
        <img src="/img/main-screen-photo-boy.png" alt="Изображение мальчика" class="main-screen__img">
      </template>
    </ReusableScreen>

    <div class="news">

      <div class="news__filtering-box">
        <button v-for="button in filteringButtons" :key="button.id" class="news__filtering-btn" :class="[`news__filtering-btn_${button.class}`,
        { 'news__filtering-btn_active': activeTag === button.title },
        { 'news__filtering-btn_disabled': isDisabled }
        ]" :aria-disabled="disabled" :disabled="isDisabled" @click="handleTagFilter(button.title)">
          <span>{{ button.title }}</span>
        </button>
      </div>

      <template v-if="filteredNews && filteredNews.length > 0">
        <router-link v-for="info in filteredNews" :key="info.id" :to="{ name: 'article', params: { id: info.id } }"
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
      </template>

      <div v-else-if="filteredNews === null" class="not-found">
        <span>По вашему запросу ничего не найдено...</span>
      </div>

    </div>
  </main>

</template>

<style scoped lang="scss">
@use '@/assets/scss/mixins.scss' as *;

.main-screen {
  margin: 0;

  &__search-input {
    background-image: url('/img/search-input.png');
    background-size: 13px, 13px;
    background-repeat: no-repeat;
    background-position: 10px center;
    min-width: 100%;
    height: 33px;
    padding: 10px 10px 10px 30px;
    border: none;
    outline: none;
    border-radius: 60px;
  }

  &__search-input::placeholder {
    color: var(--color-text-gray);
    opacity: 0.3;
  }
}

.trainings {
  background-color: red;
}

.news {
  @include block-mobile;
  @include minmax-width-mobile-block;
  padding: 0;

  &__filtering-box {
    @include block-mobile;
    @include minmax-width-mobile;
    min-width: 286px;
    // max-width: 343px;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 0;
    width: 100%;
    gap: 10px;
  }

  &__filtering-btn {
    @include display-flex-center-center;
    @include button-text;
    @include button-basic-style;
    flex-wrap: nowrap;
    height: 32px;

    &_disabled,
    &:disabled {
      @include btn-disable;
    }
  }

  &__filtering-btn_all {
    background-color: var(--color-background-purple);
    color: var(--color-text-light);
  }

  &__filtering-btn_trainings {
    background-color: var(--color-background-lavender);
  }

  &__filtering-btn_grants {
    background-color: var(--color-background-red);
  }

  &__filtering-btn_masterclasses {
    background-color: var(--color-background-yellow);
  }

  &__filtering-btn_all:active {
    background-color: var(--color-pressed-purple);
  }

  &__filtering-btn_trainings:active {
    background-color: var(--color-pressed-lavender);
  }

  &__filtering-btn_grants:active {
    background-color: var(--color-pressed-red);
  }

  &__filtering-btn_masterclasses:active {
    background-color: var(--color-pressed-yellow);
  }

  @media (hover :hover) {

    &__filtering-btn_all:hover {
      background-color: var(--color-hover-purple);
    }

    &__filtering-btn_trainings:hover {
      background-color: var(--color-hover-lavender);
    }

    &__filtering-btn_grants:hover {
      background-color: var(--color-hover-red);
    }

    &__filtering-btn_masterclasses:hover {
      background-color: var(--color-hover-yellow);
    }
  }
}

.news-card-link {
  display: block;
  text-decoration: none;
  color: inherit;
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

.not-found {
  @include block-mobile;
  @include minmax-width-mobile-block;
  justify-content: center;
  padding: 0;

  span {
    text-align: center;
  }
}

@media (min-width: 340px) {
  .news {
    &__filtering-box {
      padding: 10px;
    }
  }
}

</style>
