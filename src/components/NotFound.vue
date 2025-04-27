<script setup>
import InfoCard from './ui/InfoCard.vue';
import RouterLinkButton from './ui/RouterLinkButton.vue';

</script>

<template>
    <main>
        <div class="not-found">
            <h1>Ошибка 404</h1>
            <InfoCard imageUrl="public\img\404-photo-boy.png" title="ОЙ!  Кажется, этой страницы тут нет"
                description="Страница не найдена.  Мы тоже расстроены и делаем все возможное, чтобы исправить проблему." />

            <div class="button-wrapper">
                <RouterLinkButton :to="{ name: 'home' }" :disabled="false">
                    <template v-slot:text>вернуться на главную</template>
                </RouterLinkButton>
            </div>
        </div>
    </main>
</template>

<style scoped>
.not-found {
    text-align: center;
    padding: 20px;
}

.not-found h1 {
    margin-bottom: 30px;
    font-size: 36px;
    font-weight: 600;
}

.button-wrapper {
    margin-top: 26px;
}
</style>