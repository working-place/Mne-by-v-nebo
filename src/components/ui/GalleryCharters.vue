<script setup>
import { ref, computed } from 'vue';

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
  bgColor: {
    type: String,
    default: ''
  },
  textColor: {
    type: String,
    default: 'var(--color-text-dark)'
  }
});

const currentIndex = ref(0);

const visiblePhotosGroup = computed(() => {
  const result = [];
  for (let i = 0; i < props.photos.length; i += 2) {
    result.push(props.photos.slice(i, i + 2));
  }
  return result;
});

const nextSlide = () => {
  if (currentIndex.value < visiblePhotosGroup.value.length - 1) {
    currentIndex.value++;
  }
};

const prevSlide = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
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
  if (touchStartX.value - touchEndX.value < 50) prevSlide();

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
</script>

<template>
  <div class="gallery-section" :style="{
    '--gallery-section_background-color': bgColor,
    '--gallery-text-color': textColor
  }">
    <h2 v-if="showTitle">{{ title }}</h2>
    <div class="slider-wrapper">
      <div class="slider" @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd">
        <div class="slide-group" v-for="(group, groupIndex) in visiblePhotosGroup" :key="groupIndex"
          v-show="currentIndex === groupIndex">
          <div class="slide" v-for="photo in group" :key="photo.id">
            <div class="slide-content" @click="openPhotoModal(photo)">
              <img :src="`/img/${photo.img.src}`" :alt="photo.img.alt" class="slide-image">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="navigation">
    <div class="arrows">
      <button @click="prevSlide" class="arrow" :disabled="currentIndex === 0">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" />
        </svg>
      </button>
      <button @click="nextSlide" class="arrow" :disabled="currentIndex === visiblePhotosGroup.length - 1">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" />
        </svg>
      </button>
    </div>
  </div>

  <div v-if="showPhotoModal" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <button class="modal-close" @click="closeModal">&times;</button>
      <img :src="`/img/${activePhoto?.img.src}`" :alt="activePhoto?.img.alt" class="modal-image">
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/mixins.scss' as *;
@use "@/assets/scss/modalViewer.scss" as *;

.gallery-section {
  position: relative;
  width: 100%;
  padding: 20px;
  background-color: var(--gallery-section_background-color);
  border-radius: var(--cards-border-radius);

  h2 {
    text-align: center;
    margin: 0 0 20px;
    font-size: 20px;
    color: var(--gallery-text-color);
  }
}

.slider-wrapper {
  @include display-flex-column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
}

.slider {
  display: flex;
  transition: transform 0.3s ease;
  width: 100%;
}

.slide-group {
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 40px;
}

.slide {
  flex: 0 0 calc(50% - 20px);
  max-width: calc(50% - 20px);
}

.slide-content {
  @include img-border-radius;
  overflow: hidden;
}

.slide-image {
  @include img-border-radius;
  display: block;
  width: 100%;
  object-fit: cover;
  height: auto;
}

.navigation {
  display: flex;
  justify-content: center;
  margin-top: -20px;
}

.arrows {
  display: flex;
  gap: 12px;
}

.arrow {
  @include display-flex-center-center;
  width: 40px;
  height: 40px;
  background: var(--color-background-lavender);
  border: none;
  border-radius: 50%;
  cursor: pointer;

  @media (hover :hover) {
    &:hover {
      background-color: var(--color-hover-lavender);
    }
  }

  &:disabled {
    @include btn-disable;
  }
}

.arrow svg {
  width: 18px;
  height: 18px;
}
</style>
