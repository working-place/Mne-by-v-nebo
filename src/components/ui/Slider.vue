<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
    items: {
        type: Array,
        required: true
    }
});

const currentIndex = ref(0);
const slider = ref(null);
const touchStartX = ref(0);
const touchEndX = ref(0);

const nextSlide = () => {
    currentIndex.value = (currentIndex.value + 1) % props.items.length;
    updateSliderPosition();
};

const prevSlide = () => {
    currentIndex.value = (currentIndex.value - 1 + props.items.length) % props.items.length;
    updateSliderPosition();
};

const updateSliderPosition = () => {
    if (slider.value && slider.value.children[0]) {
        const slideWidth = slider.value.children[0].offsetWidth;
        slider.value.style.transform = `translateX(-${currentIndex.value * slideWidth}px)`;
    }
};

const handleTouchStart = (e) => {
    touchStartX.value = e.touches[0].clientX;
};

const handleTouchMove = (e) => {
    touchEndX.value = e.touches[0].clientX;
};

const handleTouchEnd = () => {
    if (touchStartX.value - touchEndX.value > 50) {
        nextSlide();
    }
    if (touchStartX.value - touchEndX.value < -50) {
        prevSlide();
    }
};

onMounted(() => {
    updateSliderPosition();
    window.addEventListener('resize', updateSliderPosition);
});

onUnmounted(() => {
    window.removeEventListener('resize', updateSliderPosition);
});
</script>

<template>
    <div class="slider-container">
        <div class="slider" ref="slider" @touchstart="handleTouchStart" @touchmove="handleTouchMove"
            @touchend="handleTouchEnd">
            <slot :items="items" :currentIndex="currentIndex"></slot>
        </div>
        <div class="controls">
            <button @click="prevSlide" class="arrow left">←</button>
            <button @click="nextSlide" class="arrow right">→</button>
        </div>
    </div>
</template>

<style scoped>
.slider-container {
    position: relative;
    max-width: 100%;
    overflow: hidden;
    padding: 20px 0;
}

.slider {
    display: flex;
    transition: transform 0.5s ease;
    width: 100%;
}

.controls {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 20px;
}

.arrow {
    background: #4a6bdf;
    color: white;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    font-size: 20px;
    cursor: pointer;
}
</style>