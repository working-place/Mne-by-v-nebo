<template>
    <div class="info-card">
        <div class="image-container">
            <img :src="imageUrl" :alt="title" class="rounded-image" />
        </div>
        <div class="text-content">
            <h2 class="title">{{ title }}</h2>
            <p class="description">{{ description }}</p>
        </div>
    </div>
</template>

<script setup>
defineProps({
    imageUrl: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})
</script>

<style scoped lang="scss">
@use '@/assets/scss/mixins.scss' as *;

.info-card {
    @include display-flex-column-center;
    max-width: 400px;
    min-height: 206px;
    gap: 10px;
    padding: 20px;
    background-color: var(--color-background-light-blue);
    border-radius: var(--cards-border-radius);

    .image-container {
        width: 150px;
        height: 150px;

        .rounded-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 50%;
        }
    }

    .text-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        gap: 10px;

        .title {
            color: #000000;
            font-size: 20px;
            line-height: 1.5;
            text-align: center;
            width: 100%;
        }

        .description {
            color: #000000;
            line-height: 1.5;
            font-size: 18px;
            text-align: center;
            max-width: 100%;
            word-break: break-word;
        }
    }
}
</style>