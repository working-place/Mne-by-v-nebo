<template>
    <div class="card" :style="{ paddingBottom: paddingBottom }">
        <div class="card-content__text">
            <h2 class="card-title">{{ title }}</h2>
            <p class="card-description">{{ description }}</p>
            <a :href="linkUrl" class="card-link">{{ linkText }}</a>
        </div>
        <div class="card__img-box">
            <slot name="image"></slot>
        </div>
    </div>
</template>

<script setup>
defineProps({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    linkUrl: {
        type: String,
        default: "#"
    },
    linkText: {
        type: String,
        default: "Источник"
    },
    paddingBottom: {
        type: String,
        default: '0'
    }
})
</script>

<style scoped lang="scss">
@use '@/assets/scss/mixins.scss' as *;

.card {
    @include display-flex-column-center;
    position: relative;
    max-width: 400px;
    width: 100%;
    min-height: 206px;
    padding: 36px 30px;
    gap: 10px;
    background-color: var(--color-background-light-blue);
    border-radius: var(--cards-border-radius);

    

    &-title {
        margin: 0 0 12px 0;
        color: #000000;
        font-size: 16px;
    }

    &-description {
        margin: 0 0 16px 0;
        color: #000000;
        font-size: 16px;
        line-height: 1.4;
    }

    &-link {
        color: #7352E5;
        text-decoration: none;
        font-size: 16px;
        display: block;
    }

    &__img-box {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 176px;
        height: 120px;
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
        overflow: hidden;
        border-radius: 0 0 12px 0;
    }
}
</style>