<script setup>
import ReusableScreen from './ui/ReusableScreen.vue';
import Slider from './ui/SliderWrapper.vue';
import RouterLinkButton from './ui/RouterLinkButton.vue';
import { ref, computed, onMounted, onUnmounted } from 'vue';

const photoSlides = [
  { id: 1, image: '/img/photo1.jpg' },
  { id: 2, image: '/img/photo2.jpg' },
  { id: 3, image: '/img/photo1.jpg' },
  { id: 4, image: '/img/photo1.jpg' },
  { id: 5, image: '/img/photo1.jpg' },
  { id: 6, image: '/img/photo1.jpg' },
  { id: 7, image: '/img/photo1.jpg' },
  { id: 8, image: '/img/photo1.jpg' },
  { id: 9, image: '/img/photo1.jpg' },
  { id: 10, image: '/img/photo1.jpg' },
  { id: 11, image: '/img/photo1.jpg' },
  { id: 12, image: '/img/photo1.jpg' }
];

const videoSlides = [
  { id: 1, video: '/videos/video1.mp4', thumbnail: '/img/video1.png' },
  { id: 2, video: '/videos/video1.mp4', thumbnail: '/img/video1.png' },
  { id: 3, video: '/videos/video3.mp4', thumbnail: '/img/video1.png' },
  { id: 4, video: '/videos/video4.mp4', thumbnail: '/img/video1.png' },
  { id: 5, video: '/videos/video5.mp4', thumbnail: '/img/video1.png' },
  { id: 6, video: '/videos/video6.mp4', thumbnail: '/img/video1.png' },
  { id: 7, video: '/videos/video7.mp4', thumbnail: '/img/video1.png' },
  { id: 8, video: '/videos/video8.mp4', thumbnail: '/img/video1.png' },
  { id: 9, video: '/videos/video9.mp4', thumbnail: '/img/video1.png' },
  { id: 10, video: '/videos/video10.mp4', thumbnail: '/img/video1.png' },
  { id: 11, video: '/videos/video11.mp4', thumbnail: '/img/video1.png' },
  { id: 12, video: '/videos/video12.mp4', thumbnail: '/img/video1.png' }
];

const activePhoto = ref(null);
const activeVideo = ref(null);
const showPhotoModal = ref(false);
const showVideoModal = ref(false);
const isDesktop = ref(false);
const isMounted = ref(false);

const currentPhotoPage = ref(1);
const currentVideoPage = ref(1);
const itemsPerPage = 6;

const paginatedPhotos = computed(() => {
  const start = (currentPhotoPage.value - 1) * itemsPerPage;
  return photoSlides.slice(start, start + itemsPerPage);
});

const paginatedVideos = computed(() => {
  const start = (currentVideoPage.value - 1) * itemsPerPage;
  return videoSlides.slice(start, start + itemsPerPage);
});

const totalPhotoPages = computed(() => Math.ceil(photoSlides.length / itemsPerPage));
const totalVideoPages = computed(() => Math.ceil(videoSlides.length / itemsPerPage));

const openPhotoModal = (photo) => {
  activePhoto.value = photo;
  showPhotoModal.value = true;
};

const openVideoModal = (video) => {
  activeVideo.value = video;
  showVideoModal.value = true;
};

const closeModal = () => {
  showPhotoModal.value = false;
  showVideoModal.value = false;
};

const changePhotoPage = (page) => {
  currentPhotoPage.value = page;
};

const changeVideoPage = (page) => {
  currentVideoPage.value = page;
};

const checkScreenSize = () => {
  isDesktop.value = window.innerWidth >= 1280;
};

onMounted(() => {
  isMounted.value = true;
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize);
});
</script>

<template>
  <main>
    <ReusableScreen imgPaddingTop="20px">
      <template v-slot:title>
        <span class="title-text">Наша жизнь</span>
      </template>
      <template v-slot:description>
        <span class="description-text">
          Добро пожаловать в нашу галерею! Здесь вы увидите, как дети учатся, играют, развиваются и создают удивительные
          вещи. Погрузитесь в атмосферу творчества, радости и познания!
        </span>
      </template>
      <template v-slot:img>
        <img src="/img/gallery-photo-boy-laptop.png" alt="Изображение мальчика за ноутбуком" class="main-screen__img">
      </template>
    </ReusableScreen>

    <div class="gallery-section">
      <h2>Наши Фотоотчеты:</h2>
      <div class="slider-container">
        <div v-if="isMounted && isDesktop" class="grid-container">
          <div v-for="item in paginatedPhotos" :key="item.id" class="slide-content" @click="openPhotoModal(item)">
            <img :src="item.image" alt="Фото" class="slide-image">
          </div>
        </div>

        <div v-if="isMounted && !isDesktop">
          <Slider :items="photoSlides" :visible-slides="2">
            <template #default="{ item }">
              <div class="slide-content" @click="openPhotoModal(item)">
                <img :src="item.image" alt="Фото" class="slide-image">
              </div>
            </template>
          </Slider>
        </div>

        <div v-if="isMounted && isDesktop" class="pagination">
          <div v-for="page in totalPhotoPages" :key="page" class="page-number"
            :class="{ active: currentPhotoPage === page }" @click="changePhotoPage(page)">
            {{ page }}
          </div>
        </div>
      </div>
    </div>

    <div class="gallery-section">
      <h2>Наши видео:</h2>
      <div class="slider-container">
        <div v-if="isMounted && isDesktop" class="grid-container">
          <div v-for="item in paginatedVideos" :key="item.id" class="slide-content" @click="openVideoModal(item)">
            <img :src="item.thumbnail" alt="Видео" class="slide-image">
            <div class="video-play-icon"> <svg viewBox="0 0 24 24" width="48" height="48">
                <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
              </svg>
            </div>
          </div>
        </div>

        <div v-if="isMounted && !isDesktop">
          <Slider :items="videoSlides" :visible-slides="2">
            <template #default="{ item }">
              <div class="slide-content" @click="openVideoModal(item)">
                <img :src="item.thumbnail" alt="Видео" class="slide-image">
                <div class="video-play-icon">
                  <svg viewBox="0 0 24 24" width="48" height="48">
                    <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                  </svg>
                </div>
              </div>
            </template>
          </Slider>
        </div>

        <div v-if="isMounted && isDesktop" class="pagination">
          <div v-for="page in totalVideoPages" :key="page" class="page-number"
            :class="{ active: currentVideoPage === page }" @click="changeVideoPage(page)">
            {{ page }}
          </div>
        </div>
      </div>
      <div class="button-wrapper">
        <RouterLinkButton to="" textButton="Cмотреть больше" />
      </div>
    </div>

    <div v-if="showPhotoModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <button class="modal-close" @click="closeModal">&times;</button>
        <img :src="activePhoto?.image" alt="Увеличенное фото" class="modal-image">
      </div>
    </div>

    <div v-if="showVideoModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <button class="modal-close" @click="closeModal">&times;</button>
        <video controls autoplay class="modal-video">
          <source :src="activeVideo?.video" type="video/mp4">
          Ваш браузер не поддерживает видео.
        </video>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
@use '@/assets/scss/mixins.scss' as *;
@use "@/assets/scss/modalViewer.scss" as *;

.gallery-section {
  // margin: 20px 0;
  padding-top: 60px
}

h2 {
  @include h2-mobile-uppercase;
  text-align: center;

  @media only screen and (min-width: 1280px) {
    font-size: 32px;
    font-weight: 600;
    line-height: 1.2;
  }
}

.slider-container {
  position: relative;
  width: 100%;
  padding-top: 20px;
  max-width: 1190px;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 16px;
  margin-bottom: 24px;
}

.slide-content {
  position: relative;
  cursor: pointer;
  transition: transform 0.3s;
  min-height: 176px;
  height: 60vw;

  &:hover {
    transform: scale(1.03);
  }

  @media only screen and (min-width: 768px) {
    min-height: 176px;
    height: 30vw;
  }

  @media only screen and (min-width: 1280px) {
    height: 258px;
  }
}

.slide-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;

  @media only screen and (min-width: 1280px) {
    border-radius: 24px;
  }
}

.button-wrapper {
  padding-top: 26px;
  max-width: 1190px;

  @media only screen and (min-width: 768px) {
    padding-top: 40px;
  }
}

.video-play-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  opacity: 0.8;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 20px;
}

.page-number {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &.active {
    background: #FDD35D;
  }
}

@media only screen and (max-width: 1279px) {
  .grid-container {
    display: none;
  }

  .pagination {
    display: none;
  }
}

@media only screen and (min-width: 1280px) {
  .slider-container :deep(.slider-wrapper) {
    display: none;
  }
}
</style>
