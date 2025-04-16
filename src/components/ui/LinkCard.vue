<script setup>
import { ref } from 'vue';

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
        required: true
    },
    linkText: {
        type: String,
        required: true
    },
    paddingBottom: {
        type: String,
        default: '0'
    },
});

const root = ref(null);
defineExpose({
    root
});
</script>

<template>
    <div class="card" :style="{ paddingBottom: paddingBottom }" ref="root">
        <div class="card-content__text">
            <h3 class="card-title">{{ title }}</h3>
            <p class="card-description">{{ description }}</p>
            <a :href="linkUrl" class="card-link">{{ linkText }}</a>
        </div>
        <div class="card__img-box">
            <slot name="image"></slot>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/mixins.scss' as *;

.card {
    @include display-flex-column-center;
        position: relative;
        min-width: var(--min-width);
        width: calc(100% + 34px);
        min-height: var(--main-screen_block-height);
        padding: 20px;
        gap: 10px;
        background-color: var(--color-background-light-blue);
        border-radius: var(--cards-border-radius);
    
        &-title {
            color: #000000;
        }
    
        &-description {
            color: #000000;
        }
    
        &-link {
            color: #7352E5;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
        }
    
        &__img-box {
            position: absolute;
            bottom: 0;
            right: 0;
            display: flex;
            justify-content: flex-end;
            overflow: hidden;
            border-radius: 0 0 12px 0;

            :slotted(img) {
                    width: 140px;
                }
        }
}
</style>