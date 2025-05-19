<script setup>
defineProps({
    imagePosition: {
        type: String,
        default: 'bottom',
        validator: (value) => ['bottom', 'right'].includes(value),
    }
});
</script>

<template>
    <div class="adaptive-card" :class="`image-${imagePosition}`">
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

    &__text,
    &__date {
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
        border-radius: 0 0 var(--cards-border-radius) var(--cards-border-radius);
    }

    @media only screen and (min-width: 768px) {
        &.image-right {
            flex-direction: row;
            align-items: center;

            .adaptive-card__content {
                width: 60%;
                text-align: left;
                padding: 30px;
            }

            .adaptive-card__img-box {
                width: 50%;
                height: 100%;
                max-height: none;
                border-radius: 0 var(--cards-border-radius) var(--cards-border-radius) 0;
            }
        }
    }

    @media only screen and (min-width: 1280px) {

        &.image-right {
            .adaptive-card__content {
                width: 55%;
                padding: 40px;
            }

            .adaptive-card__text {
                font-family: var(--font-family-next-art);
                font-size: 20px;
                line-height: 1.2;
            }
        }
    }
}
</style>