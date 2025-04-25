<script setup>
import ReusableScreen from './ui/ReusableScreen.vue';
import Slider from './ui/SliderWrapper.vue';
import RouterLinkButton from './ui/RouterLinkButton.vue';
import { ref } from 'vue';

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
  { id: 2, video: '/videos/video2.mp4', thumbnail: '/img/video1.png' },
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
</script>

<template>
  <main>
    <ReusableScreen>
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
        <Slider :items="photoSlides">
          <template #default="{ item }">
            <div class="slide-content" @click="openPhotoModal(item)">
              <img :src="item.image" alt="Фото" class="slide-image">
            </div>
          </template>
        </Slider>
      </div>
    </div>

    <div class="gallery-section">
      <h2>Наши видео:</h2>
      <div class="slider-container">
        <Slider :items="videoSlides">
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
      <div class="button-wrapper">
        <RouterLinkButton to="" textButton="Cмотреть больше" />
      </div>
    </div>

    <!-- Photo Modal -->
    <div v-if="showPhotoModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <button class="modal-close" @click="closeModal">&times;</button>
        <img :src="activePhoto?.image" alt="Увеличенное фото" class="modal-image">
      </div>
    </div>

    <!-- Video Modal -->
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

.gallery-section {
  margin: 10px 0;
  padding: 0 16px;
}

h2 {
  @include h2-mobile-uppercase;
  text-align: center;
}

.slider-container {
  position: relative;
  width: 100%;
  padding-top: 20px;
}

.slide-content {
  position: relative;
  cursor: pointer;
  transition: transform 0.3s;
  height: 176px;
  border-radius: 12px;
}

.slide-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-play-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  opacity: 0.8;
}

.view-more-btn {
  width: 100%;
  padding: 10px;
  font-family: var(--font-family-next-art);
  display: block;
  margin: 2rem auto;
  background-color: #7352E5;
  color: white;
  text-transform: uppercase;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  display: flex;
  position: relative;
  max-width: 90%;
  max-height: 90%;
  text-align: center;
}

.modal-close {
  position: absolute;
  top: -50px;
  right: 0;
  background: none;
  border: none;
  color: white;
  font-size: 2.5rem;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
}

.modal-image {
  max-width: 100%;
  max-height: 80vh;
  display: block;
  border-radius: 12px;
  object-fit: cover;
}

.modal-video {
  max-width: 100%;
  max-height: 80vh;
  width: 800px;
  background: black;
}
</style>
