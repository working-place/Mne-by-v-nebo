<script setup>
import { ref, onMounted } from 'vue';

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
        updateSliderPosition();
    }
};

const prevSlide = () => {
    if (currentIndex.value > 0) {
        currentIndex.value--;
        updateSliderPosition();
    }
};

const goToSlide = (index) => {
    currentIndex.value = index;
    updateSliderPosition();
};

const touchStartX = ref(0);
const touchEndX = ref(0);

const handleTouchStart = (e) => {
    touchStartX.value = e.touches[0].clientX;
};

const handleTouchEnd = () => {
    if (touchStartX.value - touchEndX.value > 50) nextSlide();
    if (touchEndX.value - touchStartX.value > 50) prevSlide();
};

const handleTouchMove = (e) => {
    touchEndX.value = e.touches[0].clientX;
};

const updateSliderPosition = () => {
    if (!slider.value || !sliderContainer.value) return;

    const containerWidth = sliderContainer.value.offsetWidth;
    const cardWidth = containerWidth - 40;
    const gap = 55;
    const offset = currentIndex.value * (cardWidth + gap);

    slider.value.style.transform = `translateX(-${offset}px)`;
};

onMounted(() => {
    updateSliderPosition();
    window.addEventListener('resize', updateSliderPosition);
});
</script>

<template>
    <div class="slider-wrapper">
        <div class="slider-container" ref="sliderContainer">
            <div class="slider" ref="slider" @touchstart="handleTouchStart" @touchmove="handleTouchMove"
                @touchend="handleTouchEnd">
                <slot :items="items" :currentIndex="currentIndex"></slot>
            </div>
        </div>

        <div class="navigation">
            <div class="pagination">
                <button v-for="(item, index) in items" :key="index" @click="goToSlide(index)"
                    :class="{ active: index === currentIndex }">
                </button>
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
.slider-wrapper {
    position: relative;
    width: 100%;
    max-width: 360px;
    margin: 0 auto;
    overflow: hidden;
    padding: 0 20px;
    box-sizing: border-box;
}

.slider-container {
    width: 100%;
    overflow: hidden;
}

.slider {
    display: flex;
    transition: transform 0.3s ease;
    will-change: transform;
    gap: 16px;
    padding-right: 16px;
}

.navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    padding: 0 8px;
}

.pagination {
    display: flex;
    gap: 6px;

    button {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #E0E0E0;
        border: none;
        padding: 0;
        cursor: pointer;
        transition: all 0.3s ease;

        &.active {
            background: #4a6bdf;
            width: 24px;
            border-radius: 4px;
        }
    }
}

.arrows {
    display: flex;
    gap: 12px;
}

.arrow {
    background: #CABBFF;
    color: #000000;
    border: none;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    svg {
        stroke: white;
        width: 18px;
        height: 18px;
    }
}
</style>