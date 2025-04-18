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
};

const handleTouchMove = (e) => {
    touchEndX.value = e.touches[0].clientX;
};

const handleTouchEnd = () => {
    if (touchStartX.value - touchEndX.value > 50) nextSlide();
    if (touchEndX.value - touchStartX.value > 50) prevSlide();
};

onMounted(() => {
    updateSliderPosition();
    window.addEventListener('resize', updateSliderPosition);
});

watch(currentIndex, updateSliderPosition);
watch(() => props.items, updateSliderPosition);
</script>

<template>
    <div class="slider-wrapper">
        <div class="slider-container" ref="sliderContainer">
            <div class="slider" ref="slider" @touchstart="handleTouchStart" @touchmove="handleTouchMove"
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

<style scoped>
.slider-wrapper {
    position: relative;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    overflow: hidden;
    padding: 0 20px;
}

.slider-container {
    width: 300px;
    overflow: hidden;
}

.slider {
    display: flex;
    transition: transform 0.3s ease;
    will-change: transform;
    gap: 20px;
}

.slide {
    flex: 0 0 auto;
    width: 280px;
}

.navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    padding: 0 20px;
}

.pagination {
    display: flex;
    gap: 5px;
}

.pagination button {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #E0E0E0;
    border: none;
    padding: 0;
    cursor: pointer;
    transition: all 0.3s ease;
}

.pagination button.active {
    background: #4a6bdf;
    width: 20px;
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
}

.arrow:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.arrow svg {
    stroke: white;
    width: 18px;
    height: 18px;
}
</style>