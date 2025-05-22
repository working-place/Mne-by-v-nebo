<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue';
import NewsCard from './ui/NewsCard.vue';
import ReusableScreen from './ui/ReusableScreen.vue';
import Paginate from "vuejs-paginate-next";

defineProps({
  disabled: {
    type: Boolean,
    default: false
  }
})

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

const newsData = ref([]);
const activeTag = ref('все');
const searchQuery = ref('');
const searchInput = ref(null);
const isDisabled = ref(false);
const currentPage = ref(1);
const windowWidth = ref(window.innerWidth);

const handleResize = () => {
  windowWidth.value = window.innerWidth;
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});

const loadNews = async () => {
  try {
    const response = await import('@/data/db.json');
    newsData.value = response.news;
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
  clearTagFilter();
};

const handleTagFilter = (title) => {
  if (isDisabled.value) return;

  activeTag.value = title;

  searchQuery.value = "";
  if (searchInput.value?.value) {
    searchInput.value.value = "";
  }
};

const clearTagFilter = () => {
  activeTag.value = "все";
}

const filteredNews = computed(() => {
  const filtered = newsData.value.filter(news => {

    const tagMatch = activeTag.value === "все" || news.tag === activeTag.value;

    const searchMatch = news.tag.toLowerCase().includes(searchQuery.value.toLowerCase().trim());
    return tagMatch && searchMatch
  });
  if (filtered.length === 0 && (searchQuery.value || activeTag.value !== "все")) {
    return null
  }
  return filtered;
});

onMounted(loadNews);

const itemsPerPage = computed(() => {
  if (windowWidth.value < 768) {
    return filteredNews.value?.length || 0;
  }
  if (windowWidth.value < 1280) {
    return 4;
  }
  return 8;
});

const paginatedNews = computed(() => {
  if (!filteredNews.value) return [];

  if (windowWidth.value < 768) return filteredNews.value;

  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;

  return filteredNews.value.slice(start, end);
});

const pageCount = computed(() => {
  if (!filteredNews.value || windowWidth.value < 768) return 0;
  return Math.ceil(filteredNews.value.length / itemsPerPage.value);
});

const changePage = (pageNum) => {
  currentPage.value = pageNum;
};

</script>

<template>
  <main>

    <ReusableScreen bgColor="var(--color-background-lavender)" textColor="var(--color-text-dark)" blockHeight="255px"
      tabletHeight="230px" desctopHeight="255px" :use-flex="false" :hideImgOnTablet="true" paddingRight="52px"
      wrapperWidthTablet="100%" textSize="19px">
      <template v-slot:title>
        новости
      </template>
      <template v-slot:description>
        <input id="search-input" type="text" class="main-screen__search-input" :value="searchQuery"
          @input="handleSearchInput" placeholder="хештег">
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
        ]" :aria-disabled="disabled" :disabled="isDisabled" @click="handleTagFilter(button.title)"
          :title="`Filter by ${button.title}`">
          <span>{{ button.title }}</span>
        </button>
      </div>

      <div class="news__wrapper">
        <template v-if="filteredNews && filteredNews.length">
          <router-link v-for="info in paginatedNews" :key="info.id" :to="{
            name: 'article',
            params: { id: info.id }
          }" class="news__card-link">
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

      <paginate v-if="windowWidth >= 768" v-model="currentPage" :page-count="pageCount" :click-handler="changePage"
        :prev-text="''" :next-text="''" :container-class="'pagination'" :page-class="'page-item'"
        :active-class="'active'" :page-link-class="'page-link'">
      </paginate>

    </div>
  </main>

</template>

<style lang="scss">
@use '@/assets/scss/mixins.scss' as *;

.pagination {
  display: flex;
  list-style: none;
  justify-content: center;
  width: 100%;
  margin-left: 0;
  gap: 20px;

  @media only screen and (min-width: 768px) {}

  @media only screen and (min-width: 1280px) {}
}

.page-item {}

.page-item .page-link {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 34px;
  height: 34px;
  text-decoration: none;
  border: none;
  border-radius: 50px;
  cursor: pointer;
}

.page-item.active .page-link {
  z-index: 3;
  background-color: var(--color-background-yellow);
}

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

    @media only screen and (min-width: 768px) {
      min-width: 100%;
      height: 40px;
    }

    @media only screen and (min-width: 1280px) {
      max-width: 610px;
      height: 54px;
      // margin-bottom: 60px;
    }
  }

  &__search-input::placeholder {
    color: var(--color-text-gray);
    opacity: 0.3;
  }
}

.trainings {}

.news {
  @include block-mobile;
  @include minmax-width-mobile-block;
  padding: 0;
  width: 100%;
  height: fit-content;

  @media only screen and (min-width: 768px) {
    margin-top: -10px;
    gap: 40px;
  }

  @media only screen and (min-width: 1280px) {
    margin-top: -50px;
    margin-bottom: 60px;
    gap: 40px;
  }

  &__wrapper {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 10px;

    @media only screen and (min-width: 768px) {
      justify-content: space-between;
      flex-direction: row;
    }

    @media only screen and (min-width: 1280px) {
      max-width: 1190px;
      justify-content: flex-start;
    }
  }

  &__filtering-box {
    @include block-mobile;
    @include minmax-width-mobile;
    min-width: 286px;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    padding: 0;

    @media only screen and (min-width: 768px) {
      flex-direction: row;
      flex-wrap: wrap;
      gap: 10px;
    }

    @media only screen and (min-width: 1280px) {
      max-width: 1190px;
    }
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

  &__card-link {
    display: flex;
    justify-content: center;
    width: 100%;
    text-decoration: none;
    color: inherit;

    @media only screen and (min-width: 768px) {
      min-width: 320px;
      min-height: 302px;
      width: calc(50% - 5px);
    }

    @media only screen and (min-width: 1280px) {
      min-width: 290px;
      width: calc(25% - 30px);
    }
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
</style>
