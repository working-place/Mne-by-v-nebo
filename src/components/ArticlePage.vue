<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import NewsCard from '@/components/ui/NewsCard.vue';
import ArticleCard from './ui/ArticleCard.vue';

const route = useRoute();
const article = ref(null);
const relatedArticles = ref([]);

const loadArticleData = async (articleId) => {
  try {
    const response = await import('@/data/db.json?raw');
    const data = JSON.parse(response.default);

    article.value = data.news.find(item => item.id === Number(articleId));

    if (article.value) {
      relatedArticles.value = data.news.filter(
        item => item.id !== article.value.id && item.tag === article.value.tag
      ).slice(0, 2);
    }
  } catch (error) {
    console.error('Ошибка загрузки статьи:', error);
    article.value = null;
    relatedArticles.value = [];
  }
};

onMounted(() => loadArticleData(route.params.id));

watch(() => route.params.id, (newId) => {
  loadArticleData(newId);
});

const copyShareLink = () => {
  const link = window.location.href;
  navigator.clipboard.writeText(link)
    .then(() => alert('Ссылка скопирована в буфер обмена'))
    .catch(err => console.error('Не удалось скопировать ссылку:', err));
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
</script>

<template>
  <main v-if="article" class="article-main-container">
    <div class="article-header">
      <ArticleCard imagePosition="right">
        <template v-slot:text>{{ article.text }}</template>
        <template v-slot:date>{{ article.date }}</template>
        <template v-slot:img>
          <img :src="`/img/${article.img.src}`" :alt="article.img.alt" class="adaptive-card__img">
        </template>
      </ArticleCard>
    </div>
    <div class="article-content-wrapper">
      <div class="article-primary-content">
        <div class="article-content">
          <div class="article-text" v-html="article.fullText"></div>

          <div v-if="article.source" class="article-source">
            Источник: <a :href="article.source.url" target="_blank">{{ article.source.name }}</a>
          </div>
        </div>

        <div class="share-section">
          <button @click="copyShareLink" class="share-button">Поделиться</button>
        </div>
      </div>

      <div class="related-articles-sidebar" v-if="relatedArticles.length > 0">
        <div class="related-articles">
          <h2>Это интересно</h2>
          <div class="related-articles-container">
            <div v-for="related in relatedArticles" :key="related.id" class="related-article">
              <router-link :to="{ name: 'article', params: { id: related.id } }" class="news-card-link">
                <NewsCard :tag-class="getTagClass(related.tag)">
                  <template v-slot:img>
                    <img :src="`/img/${related.img.src}`" :alt="related.img.alt" class="tag-card__img">
                  </template>
                  <template v-slot:tag>{{ related.tag }}</template>
                  <template v-slot:text>{{ related.text }}</template>
                  <template v-slot:date>{{ related.date }}</template>
                </NewsCard>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>

  <div v-else class="loading">
    Загрузка статьи...
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/mixins.scss' as *;

.article-main-container {
  @media only screen and (min-width: 1280px) {
    max-width: 1190px;
    margin: 0 auto;
    padding: 0;
  }
}

.article-content-wrapper {
  @media only screen and (min-width: 1280px) {
    display: flex;
    gap: 100px;
  }
}

.article-primary-content {
  @media only screen and (min-width: 1280px) {
    flex: 1;
  }
}

.article-header {
  padding: 0;
}

.adaptive-card__img {
  @include cover-center-no-repeat-img;
  width: 100%;
}

.article-content {
  padding: 0;
  overflow: hidden;
  margin-top: -10px;
}

.article-text {
  margin-bottom: 20px;
  line-height: 1.4;
  word-wrap: break-word;

  &::v-deep {
    p {
      margin-bottom: 1em;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}

.article-source {
  a {
    color: var(--color-primary);
  }
}

.share-section {
  width: 100%;
  margin-top: 50px;
  margin-bottom: 60px;

  .share-button {
    background-color: var(--color-background-yellow);
    color: var(--color-text-dark);
    text-transform: uppercase;
    display: block;
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 60px;
    font-family: var(--font-family-nunito);
    cursor: pointer;
    text-align: center;

    &:active {
      background: var(--color-pressed-yellow);
    }

    @media (hover: hover) {
      &:hover {
        background: var(--color-hover-yellow);
      }
    }

    @media only screen and (min-width: 768px) {
      width: 369px;
      margin: 0 auto;
      font-size: 16px;
    }

    @media only screen and (min-width: 1280px) {
      width: 190px;
      margin-left: 0;
    }
  }
}

.related-articles-sidebar {
  @media only screen and (min-width: 1280px) {
    flex-shrink: 0;
  }
}

.related-articles {
  @include block-mobile;
  @include minmax-width-mobile;
  box-sizing: border-box;

  @media only screen and (min-width: 1280px) {
    width: 100%;
    max-width: 290px;
    margin: 0;
    padding: 0;
  }
}

.related-articles-container {
  @media only screen and (min-width: 768px) {
    display: flex;
    gap: 20px;
    justify-content: center;
  }

  @media only screen and (min-width: 1280px) {
    flex-direction: column;
  }
}

.related-article {
  margin-bottom: 20px;

  @media only screen and (min-width: 768px) {
    flex: 0 1 calc(50% - 10px);
    margin-bottom: 0;
  }

  @media only screen and (min-width: 1280px) {
    flex: none;
    width: 100%;
    margin-bottom: 20px;
  }
}

h2 {
  @include h2-mobile-uppercase;
  margin-bottom: 20px;
  text-align: center;

  @media only screen and (min-width: 1280px) {
    font-size: 32px;
  }
}

.tag-card__img {
  @include cover-center-no-repeat-img;
  width: 100%;
  height: 168px;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
}

.news-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
  height: 100%;
}

.loading {
  text-align: center;
  padding: 40px;
  font-size: 1.2rem;
}
</style>