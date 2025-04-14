<script setup>
import { ref, onMounted } from 'vue';
import ReusableScreen from './ui/ReusableScreen.vue';
import LinkCard from './ui/LinkCard.vue';


const slides = ref([
  {
    title: 'Взросление с умом:  Путеводитель по детскому развитию',
    description: 'Узнайте, как создать гармоничные отношения с вашим ребенком и помочь ему раскрыть свой потенциал',
    linkUrl: '#',
    linkText: 'Источник',
    image: '/img/star.png'
  },

  {
    title: 'Взросление без слёз',
    description: 'Пошаговое руководство по воспитанию счастливых и самостоятельных детей, основанное на современных исследованиях детской психологии',
    linkUrl: '#',
    linkText: 'Источник',
    image: '/img/book.png'
  },

  {
    title: 'Тайный язык детей: научитесь понимать своего ребёнка',
    description: 'Раскройте секреты детской коммуникации и научитесь понимать потребности и эмоции вашего ребёнка без слов',
    linkUrl: '#',
    linkText: 'Источник',
    image: '/img/medal.png'
  },

  {
    title: 'Воспитание с любовью',
    description: 'Практические советы и упражнения для построения крепких и доверительных отношений с детьми, основанных на взаимном уважении и любви',
    linkUrl: '#',
    linkText: 'Источник',
    image: '/img/heart.png'
  },
]);

// Текущий активный слайд
const currentIndex = ref(0);
// Ссылка на DOM-элемент слайдера
const slider = ref(null);
// Координаты для обработки свайпа
const touchStartX = ref(0);
const touchEndX = ref(0);

// Переход к следующему слайду
const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % slides.value.length;
  updateSliderPosition();
};

// Переход к предыдущему слайду
const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + slides.value.length) % slides.value.length;
  updateSliderPosition();
};

// Обновление позиции слайдера
const updateSliderPosition = () => {
  if (slider.value) {
    const slideWidth = slider.value.children[0].offsetWidth;
    slider.value.style.transform = `translateX(-${currentIndex.value * slideWidth}px)`;
  }
};

// Обработка начала касания
const handleTouchStart = (e) => {
  touchStartX.value = e.touches[0].clientX;
};

// Обработка движения пальцем
const handleTouchMove = (e) => {
  touchEndX.value = e.touches[0].clientX;
};

// Обработка окончания касания
const handleTouchEnd = () => {
  // Если свайп влево более 50px
  if (touchStartX.value - touchEndX.value > 50) {
    nextSlide();
  }
  // Если свайп вправо более 50px
  if (touchStartX.value - touchEndX.value < -50) {
    prevSlide();
  }
};

// Инициализация после монтирования компонента
onMounted(() => {
  updateSliderPosition();
});
</script>

<template>
  <main>
    <ReusableScreen>
      <template v-slot:title>
        <span class="title-text">Полезные материалы</span>
      </template>
      <template v-slot:description>
        <span class="description-text">
          Вы найдете здесь интересные истории, познавательные материалы и развивающие пособия, которые сделают обучение
          не только полезным, но и увлекательным
        </span>
      </template>
      <template v-slot:img>
        <img src="/img/usefull-material-photo-boy.png" alt="Изображение мальчика" class="main-screen__img">
      </template>
    </ReusableScreen>

    <!-- Основной контейнер слайдера -->
    <div class="slider-container">
      <!-- Область слайдов с обработчиками свайпа -->
      <div class="slider" ref="slider" @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd">
        <!-- Рендерим каждую плашку как компонент Card -->
        <LinkCard v-for="(slide, index) in slides" :key="index" :title="slide.title" :description="slide.description"
          :linkUrl="slide.linkUrl" :linkText="slide.linkText" :paddingBottom="'120px'">
          <!-- Слот для изображения в карточке -->
          <template #image>
            <img :src="slide.image" :alt="slide.title" width="176">
          </template>
        </LinkCard>
      </div>

      <!-- Контролы для мобильной навигации -->
      <div class="controls">
        <button @click="prevSlide" class="arrow left">←</button>
        <button @click="nextSlide" class="arrow right">→</button>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
@use '@/assets/scss/mixins.scss' as *;

.main-screen {
  background-color: var(--color-background-yellow);
}

.title-text {
  @include h1-mobile
}

.title-text, .description-text {
  color: #000000;
}
.main-screen__img {
  object-fit: cover;
}

/* Основной контейнер */
.slider-container {
  position: relative;
  max-width: 100%;
  overflow: hidden;
  padding: 20px 0;
}

/* Контейнер слайдов */
.slider {
  display: flex;
  transition: transform 0.5s ease;
  /* Плавная анимация */
  width: 100%;
}

/* Стили для каждой карточки */
.card {
  min-width: 80%;
  /* Ширина карточки 80% от экрана */
  // margin: 0 10%;
  /* Отступы по бокам */
  flex-shrink: 0;
  /* Запрещаем сжатие */
  box-sizing: border-box;
}

/* Контейнер для кнопок навигации */
.controls {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

/* Стили для кнопок-стрелок */
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
