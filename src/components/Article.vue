<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import NewsCard from '@/components/ui/NewsCard.vue';

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
</script>

<template>
    <main v-if="article">
        <div class="article-header">
            <NewsCard :tag-class="article.class">
                <template v-slot:tag>{{ article.tag }}</template>
                <template v-slot:text>{{ article.text }}</template>
                <template v-slot:date>{{ article.date }}</template>
                <template v-slot:img>
                    <img :src="article.img.src" :alt="article.img.alt" class="tag-card__img">
                </template>
            </NewsCard>
        </div>

        <div class="article-content">
            <div class="article-text" v-html="article.fullText"></div>

            <div v-if="article.source" class="article-source">
                Источник: <a :href="article.source.url" target="_blank">{{ article.source.name }}</a>
            </div>
        </div>

        <div class="share-section">
            <button @click="copyShareLink" class="share-button">Поделиться</button>
        </div>

        <div class="related-articles" v-if="relatedArticles.length > 0">
            <h2>Это интересно</h2>
            <div class="related-articles-list">
                <div v-for="related in relatedArticles" :key="related.id" class="related-article">
                    <router-link :to="{ name: 'article', params: { id: related.id } }" class="news-card-link">
                        <NewsCard :tag-class="related.class">
                            <template v-slot:img>
                                <img :src="related.img.src" :alt="related.img.alt" class="tag-card__img">
                            </template>
                            <template v-slot:tag>{{ related.tag }}</template>
                            <template v-slot:text>{{ related.text }}</template>
                            <template v-slot:date>{{ related.date }}</template>
                        </NewsCard>
                    </router-link>
                </div>
            </div>
        </div>
    </main>

    <div v-else class="loading">
        Загрузка статьи...
    </div>
</template>

<style scoped lang="scss">

.article-header {

    .tag-card__img {
        max-width: 100%;
        height: auto;
        display: block;
        object-fit: cover;
    }
}

.article-content {
    padding: 0 20px;
    overflow: hidden;

    .article-text {
        margin-bottom: 20px;
        line-height: 1.4;
        word-wrap: break-word;
    }

    .article-source {
        a {
            color: var(--color-primary);
        }
    }
}

.share-section {
    width: 100%;
    margin-left: -50vw;
    margin-right: -50vw;
    margin-bottom: 40px;

    .share-button {
        background-color: var(--color-background-yellow);
        color: #000000;
        text-transform: uppercase;
        display: block;
        width: 100%;
        padding: 10px;
        border: none;
        border-radius: 60px;
        font-family: var(--font-family-nunito);
        cursor: pointer;
        text-align: center;
    }
}

.related-articles {
    margin: 0 auto;
    padding: 0 20px;
    box-sizing: border-box;

    h2 {
        margin-bottom: 20px;
        text-align: center;
    }

    .related-articles-list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 20px;
    }

    .news-card-link {
        text-decoration: none;
        color: inherit;
        display: block;
        height: 100%;
    }

    .tag-card__img {
        max-width: 100%;
        height: auto;
        display: block;
        object-fit: cover;
    }
}

.loading {
    text-align: center;
    padding: 40px;
    font-size: 1.2rem;
}
</style>