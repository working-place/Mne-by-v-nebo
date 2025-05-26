<script setup>
import { ref, onMounted, watch, computed, onBeforeUnmount, nextTick } from 'vue';

const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  visibleSlides: {
    type: Number,
    default: 1
  }
});

const currentIndex = ref(0);
const slider = ref(null);
const sliderContainer = ref(null);
const windowWidth = ref(window.innerWidth);

const visibleSlidesCount = computed(() => {
  if (windowWidth.value >= 1280) return Math.min(4, props.items.length);
  if (windowWidth.value >= 768) return Math.min(2, props.items.length);
  return 1;
});

const slideWidth = computed(() => {
  return 100 / visibleSlidesCount.value;
});

const maxIndex = computed(() => {
  return Math.max(0, props.items.length - visibleSlidesCount.value);
});

const nextSlide = () => {
  if (currentIndex.value < maxIndex.value) {
    currentIndex.value++;
  }
};

const prevSlide = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
};

const goToSlide = (index) => {
  currentIndex.value = Math.min(index, maxIndex.value);
};

const updateSliderPosition = () => {
  if (!slider.value || !sliderContainer.value) return;

  nextTick(() => {
    const containerWidth = sliderContainer.value.offsetWidth;
    const offset = (currentIndex.value * containerWidth) / visibleSlidesCount.value;
    slider.value.style.transform = `translateX(-${offset}px)`;
  });
};

const handleResize = () => {
  windowWidth.value = window.innerWidth;
  updateSliderPosition();
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
  window.addEventListener('resize', handleResize);
  updateSliderPosition();
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});

watch(currentIndex, updateSliderPosition);
watch(() => props.items, () => {
  currentIndex.value = 0;
  updateSliderPosition();
});
watch(visibleSlidesCount, () => {
  currentIndex.value = Math.min(currentIndex.value, maxIndex.value);
  updateSliderPosition();
});
</script>

<template>
  <div class="slider-root">
    <div class="slider-wrapper" ref="sliderContainer">
      <div class="slides-container" ref="slider" @touchstart="handleTouchStart" @touchmove="handleTouchMove"
        @touchend="handleTouchEnd">
        <div v-for="(item, index) in items" :key="index" class="slide" :style="{ width: `${slideWidth}%` }">
          <slot :item="item" :index="index"></slot>
        </div>
      </div>
    </div>

    <div class="navigation">
      <div class="pagination">
        <button v-for="(_, index) in Math.max(1, items.length - visibleSlidesCount + 1)" :key="index"
          @click="goToSlide(index)" :class="{ active: index === currentIndex }"></button>
      </div>

      <div class="arrows">
        <button @click="prevSlide" class="arrow" :disabled="currentIndex === 0" :title="`Previous slide button`">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </button>
        <button @click="nextSlide" class="arrow" :disabled="currentIndex >= maxIndex" :title="`Next slide button`">
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
  max-width: 1190px;
  margin: 0 auto;
}

.slider-wrapper {
  position: relative;
  overflow: hidden;
}

.slides-container {
  display: flex;
  transition: transform 0.3s ease;
  will-change: transform;
  height: 100%;
}

.slide {
  flex: 0 0 auto;
  padding: 0 5px;
  box-sizing: border-box;
}

.navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;

  @media only screen and (min-width: 768px) {
    margin-top: 24px;
  }
}

.pagination {
  width: auto;
  gap: 5px;

  @media only screen and (min-width: 768px) {
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

  @media only screen and (min-width: 1280px) {
    width: 12px;
    height: 12px;
  }
}

.pagination button.active {
  background: #CABBFF;
  width: 8px;
  border-radius: 4px;

  @media only screen and (min-width: 1280px) {
    width: 12px;
    border-radius: 6px;
  }
}

.arrows {
  display: flex;
  gap: 12px;

  @media only screen and (min-width: 1280px) {
    gap: 16px;
  }
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

  @media only screen and (min-width: 768px) {
    width: 40px;
    height: 40px;
  }

  @media only screen and (min-width: 1280px) {
    width: 48px;
    height: 48px;
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

  @media only screen and (min-width: 768px) {
    width: 22px;
    height: 22px;
  }

  @media only screen and (min-width: 1280px) {
    width: 24px;
    height: 24px;
  }
}
</style>
