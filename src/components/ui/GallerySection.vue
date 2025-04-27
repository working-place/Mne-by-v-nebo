<script setup>
import { ref, onMounted, watch } from 'vue';

const props = defineProps({
  photos: {
    type: Array,
    required: true,
    default: () => []
  },
  showTitle: {
    type: Boolean,
    default: true
  },
  title: {
    type: String,
    default: 'Наши Фотоотчеты'
  },
  showPagination: {
    type: Boolean,
    default: true
  },
  bgColor: {
    type: String,
    default: ''
  },
  textColor: {
    type: String,
    default: 'var(--color-text-dark)'
  },
  minHeight: {
    type: String,
    default: ''
  },
  height: {
    type: String,
    default: ''
  }
});

const currentIndex = ref(0);
const slider = ref(null);
const sliderContainer = ref(null);

const nextSlide = () => {
  if (currentIndex.value < props.photos.length - 1) {
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
  const offset = currentIndex.value * (slideWidth + 20);

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

const activePhoto = ref(null);
const showPhotoModal = ref(false);

const openPhotoModal = (photo) => {
  activePhoto.value = photo;
  showPhotoModal.value = true;
};

const closeModal = () => {
  showPhotoModal.value = false;
};

onMounted(() => {
  updateSliderPosition();
  window.addEventListener('resize', updateSliderPosition);
});

watch(currentIndex, updateSliderPosition);
watch(() => props.photos, updateSliderPosition);
</script>

<template>
  <div class="gallery-section" :style="{
    '--gallery-section_background-color': bgColor,
    '--gallery-text-color': textColor,
    '--gallery-height': height
  }">
    <h2 v-if="showTitle">{{ title }}</h2>
    <div ref="sliderContainer" class="slider-wrapper">
      <div class="slider" ref="slider" @touchstart="handleTouchStart" @touchmove="handleTouchMove"
        @touchend="handleTouchEnd">
        <div v-for="(photo, index) in photos" :key="photo.id || index" class="slide">
          <div class="slide-content" @click="openPhotoModal(photo)">
            <img :src="photo.image" :alt="`Фото ${index + 1}`" class="slide-image">
          </div>
        </div>
      </div>

      <div class="navigation">
        <div v-if="showPagination" class="pagination">
          <button v-for="(_, index) in photos" :key="index" @click="goToSlide(index)"
            :class="{ active: index === currentIndex }"></button>
        </div>

        <div class="arrows">
          <button @click="prevSlide" class="arrow" :disabled="currentIndex === 0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </button>
          <button @click="nextSlide" class="arrow" :disabled="currentIndex === photos.length - 1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>

  <div v-if="showPhotoModal" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <button class="modal-close" @click="closeModal">&times;</button>
      <img :src="activePhoto?.image" alt="Увеличенное фото" class="modal-image">
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/mixins.scss' as *;
@use "@/assets/scss/modalViewer.scss" as *;

.gallery-section {
  height: var(--gallery-height);
  min-width: 286px;
  max-width: 326px;
  position: relative;
  width: 100%;
  padding: 0;
  background-color: var(--gallery-section_background-color);

  h2 {
    text-align: center;
    margin-bottom: 24px;
    margin: 20px 0 20px;
    font-size: 24px;
    color: var(--gallery-text-color);
  }
}

.slider-wrapper {
  position: relative;
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
}

.slider-container {
  width: 100%;
  overflow: hidden;
  border-radius: 12px;
}

.slider {
  display: flex;
  transition: transform 0.3s ease;
  will-change: transform;
  gap: 20px;
}

.slide {
  flex: 0 0 auto;
  width: 100%;
  height: fit-content;
}

.slide-image {
  min-height: 286px;
  max-width: 360px;
  width: 100%;
  height: 360px;
  object-fit: cover;
  border-radius: 12px;
}

.slide {
  width: 100%;
}

.navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
}

.pagination {
  display: flex;
  gap: 8px;
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

  @media (hover: hover) {
    &:hover {
      background-color: #977AF9;
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
}
</style>
