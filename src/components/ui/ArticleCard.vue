<script setup>
defineProps({
    imagePosition: {
        type: String,
        default: 'bottom', // 'bottom' или 'right'
        validator: (value) => ['bottom', 'right'].includes(value),
    }
});
</script>

<template>
    <div class="adaptive-card">
        <div class="adaptive-card__content">
            <div class="adaptive-card__text-box">
                <span class="adaptive-card__text">
                    <slot name="text"></slot>
                </span>
                <span class="adaptive-card__date">
                    <slot name="date"></slot>
                </span>
            </div>
        </div>

        <div class="adaptive-card__img-box">
            <slot name="img"></slot>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/mixins.scss' as *;

.adaptive-card {
    @include minmax-width-mobile;
    width: 100%;
    position: relative;
    background-color: var(--color-background-lavender);
    border-radius: var(--cards-border-radius);
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;

    &__content {
        display: flex;
        flex-direction: column;
        text-align: center;
        padding: 13px;
        gap: 10px;
    }

    &__text-box {
        @include display-flex-column;
        gap: 8px;
    }

    &__text, &__date {
        word-break: break-word;
        line-height: 1.5;
        font-weight: 600;
    }

    &__img-box {
        @include display-flex-center-center;
        background-size: cover;
        width: 100%;
        min-height: 100px;
        max-height: 168px;
        overflow: hidden;
    }
}
</style>