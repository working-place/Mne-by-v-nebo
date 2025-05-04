<script setup>
import { ref, onMounted, watch } from 'vue';

const props = defineProps({
    items: {
        type: Array,
        required: true
    }
});

const currentIndex = ref(0);
const slider = ref(null);
const sliderContainer = ref(null);

const nextSlide = () => {
    if (currentIndex.value < props.items.length - 1) {
        currentIndex.value++;
    }
};

const prevSlide = () => {
    if (currentIndex.value > 0) {
        currentIndex.value--;
    }
};

const goToSlide = (index) => {
    currentIndex.value = index;
};

const updateSliderPosition = () => {
    if (!slider.value) return;

    const slideWidth = sliderContainer.value?.offsetWidth || 0;
    const offset = currentIndex.value * slideWidth;

    slider.value.style.transform = `translateX(-${offset}px)`;
};

const touchStartX = ref(0);
const touchEndX = ref(0);

const handleTouchStart = (e) => {
    touchStartX.value = e.touches[0].clientX;
    touchEndX.value = e.touches[0].clientX;
};

const handleTouchMove = (e) => {
    touchEndX.value = e.touches[0].clientX;
};

const handleTouchEnd = () => {
    if (Math.abs(touchStartX.value - touchEndX.value) > 50) {
        if (touchStartX.value - touchEndX.value > 50) nextSlide();
        if (touchEndX.value - touchStartX.value > 50) prevSlide();
    }
};

onMounted(() => {
    updateSliderPosition();
    window.addEventListener('resize', updateSliderPosition);
});

watch(currentIndex, updateSliderPosition);
watch(() => props.items, updateSliderPosition);
</script>

<template>
    <div class="slider-root">
        <div class="slider-wrapper" ref="sliderContainer">
            <div class="slides-container" ref="slider" @touchstart="handleTouchStart" @touchmove="handleTouchMove"
                @touchend="handleTouchEnd">
                <div v-for="(item, index) in items" :key="item.id || index" class="slide">
                    <slot :item="item" :index="index"></slot>
                </div>
            </div>
        </div>

        <div class="navigation">
            <div class="pagination">
                <button v-for="(_, index) in items" :key="index" @click="goToSlide(index)"
                    :class="{ active: index === currentIndex }"></button>
            </div>

            <div class="arrows">
                <button @click="prevSlide" class="arrow" :disabled="currentIndex === 0">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                </button>
                <button @click="nextSlide" class="arrow" :disabled="currentIndex === items.length - 1">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.slider-root {
    width: 100%;
    max-width: 326px;
    margin: 0 auto;

    @media (min-width: 768px) {
        min-width: 650px;
    }
}

.slider-wrapper {
    position: relative;
    width: 100%;
    overflow: hidden;

}

.slides-container {
    display: flex;
    transition: transform 0.3s ease;
    will-change: transform;
    height: 100%;
}

.slide {
    flex: 0 0 100%;
    padding: 0 5px;
        
}

.navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 16px;

    @media (min-width: 768px) {
        margin-top: 24px;
    }
}

.pagination {
    display: flex;
    gap: 5px;

    @media (min-width: 768px) {
        gap: 8px;
    }
}

.pagination button {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #E3E3E3;
    border: none;
    padding: 0;
    cursor: pointer;
    transition: all 0.3s ease;
}

.pagination button.active {
    background: #CABBFF;
    width: 8px;
    border-radius: 4px;
}

.arrows {
    display: flex;
    gap: 12px;
}

.arrow {
    background: #CABBFF;
    border: none;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    @media (min-width: 768px) {
        width: 40px;
        height: 40px;
    }

    &:active {
        background: var(--color-pressed-lavender);
    }

    @media (hover: hover) {
        &:hover {
            background-color: var(--color-hover-lavender);
        }
    }

    &:disabled {
        cursor: not-allowed;
        background-color: #E3E3E3;
        color: #525252;
    }
}

.arrow svg {
    stroke: white;
    width: 18px;
    height: 18px;

    @media (min-width: 768px) {
        width: 22px;
        height: 22px;
    }
}
</style>