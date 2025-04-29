<script setup>
import ReusableScreen from './ui/ReusableScreen.vue';
import { ref, computed } from 'vue'

const showAll = ref(false)

const items = ref([
  {
    title: 'Гранты губернатора Кубани',
    subtitle: 'Проект: «Театр равных возможностей» 2022',
    content: 'С 1 февраля 2023 года в МАОУ СОШ №33 реализуется грант Губернатора Кубани «Театр равных возможностей», в котором участвуют 37 детей, включая учащихся с ОВЗ и инвалидностью. Проект помогает развивать творческие способности, социализацию и уверенность детей через театральное искусство. Театральная деятельность способствует преодолению застенчивости, развитию коммуникативных навыков и укреплению духовно-нравственных ценностей. В планах – создание театральной образовательной программы, которая интегрируется в учебный процесс и охватит все школы Новороссийска.',
    additionalText: 'Результат: Победа',
    image: new URL('/public/img/grants-photo-project1.jpg', import.meta.url).href,
    isOpen: false
  },
  {
    title: '«Грант главы города»',
    subtitle: 'Проект «Разные возможности — равные права» 2023',
    content: 'Проект «Разные возможности – равные права» представляет собой комплексную программу занятий по ранней профориентации для детей-инвалидов и детей с ОВЗ 7-14 лет. Программа включает тренинги с педагогом-психологом, игровые занятия, экскурсии на предприятия Новороссийска и мастер-классы. Особое внимание уделяется вовлечению родителей в процесс поддержки детей. Проект помогает детям узнать о различных профессиях, необходимых навыках и возможностях трудоустройства. Также планируется долгосрочное сотрудничество с учреждениями СПО и социальными партнерами. Этот опыт может быть полезен другим школам, способствуя успешной адаптации и социализации детей с ОВЗ.',
    additionalText: '',
    image: new URL('/public/img/grants-photo-project.png', import.meta.url).href,
    isOpen: false
  },
  {
    title: '«Гранд главы города»',
    subtitle: 'Проект «Мне бы в небо» 2024',
    content: 'Проект «Мне бы в небо» направлен на формирование предпрофессиональных компетенций у школьников 8-11 классов в области программирования, управления и технического сопровождения беспилотных летательных аппаратов. Он включает образовательные модули по теории, сборке, программированию и пилотированию дронов, а также соревнования по управлению квадрокоптерами. Учащиеся получат практические навыки работы с БПЛА, развивая как hard-skills, так и soft-skills. Реализация проекта повысит интерес подростков к техническим дисциплинам и поможет в профессиональном самоопределении. Дрон-рейсинг и обучение беспилотному пилотированию могут сыграть ключевую роль в выборе будущей профессии, связанной с инженерией, робототехникой и искусственным интеллектом.',
    additionalText: '',
    image: new URL('/public/img/grants-photo-project.png', import.meta.url).href,
    isOpen: false
  },
  {
    title: 'Фонд президентских грантов',
    subtitle: 'Проект «Школа для родителей особенного ребенка» 2024',
    content: 'Проект направлен на оказание психологической и информационной помощи семьям, воспитывающим детей с инвалидностью. В нем участвуют 12 семей (21 родитель и 15 детей), включая неполные семьи. В рамках проекта родители проходят практико-ориентированное обучение по коррекционно-развивающему взаимодействию с детьми. Разработаны методические рекомендации, программы тренингов и занятий для специалистов и родителей. Проект поможет семьям эффективно справляться с воспитательными и реабилитационными задачами. По итогам работы будет создан консультационный центр «Точка опоры» для поддержки родителей и специалистов.',
    additionalText: '',
    image: new URL('/public/img/grants-photo-project.png', import.meta.url).href,
    isOpen: false
  },
  {
    title: 'СОТ',
    subtitle: 'Проект «Мне бы в небо» 2024',
    content: 'Проект «Мне бы в небо» направлен на формирование предпрофессиональных компетенций школьников 8-11 классов в области программирования, управления и технического сопровождения беспилотных летательных аппаратов (БПЛА). Программа включает образовательные модули по теории, сборке, настройке, программированию и управлению дронами, а также соревнования по пилотированию. Учащиеся на практике изучат конструкцию и принципы работы БПЛА, освоят навыки пайки, 3D-печати и программирования. Проект способствует популяризации технических дисциплин и профессиональному самоопределению подростков. Полученные hard- и soft-skills помогут участникам успешно развиваться в IT-сфере и инженерных специальностях.',
    additionalText: '',
    image: new URL('/public/img/grants-photo-project.png', import.meta.url).href,
    isOpen: false
  },
  {
    title: '«Гранд главы города»',
    subtitle: 'Проект «Мастерская инноваций» 2025',
    content: 'Ожидаем результатов конкурса.',
    additionalText: '',
    image: new URL('/public/img/grants-photo-project.png', import.meta.url).href,
    isOpen: false
  },
  {
    title: '«Добрый Новороссийск»',
    subtitle: 'Проект «БЕСЕДкА» 2025',
    content: 'Ожидаем результатов конкурса.',
    additionalText: '',
    image: new URL('/public/img/grants-photo-project.png', import.meta.url).href,
    isOpen: false
  },
  {
    title: 'Фонд президентских грантов',
    subtitle: 'Проект «Мастерская инноваций» 2025',
    content: 'Ожидаем результатов конкурса.',
    additionalText: '',
    image: new URL('/public/img/grants-photo-project.png', import.meta.url).href,
    isOpen: false
  },
  {
    title: 'Гранты Губернатора Кубани',
    subtitle: 'Проект «Память сильнее времени» 2025',
    content: 'Ожидаем результатов конкурса.',
    additionalText: '',
    image: new URL('/public/img/grants-photo-project.png', import.meta.url).href,
    isOpen: false
  },
])

const visibleItems = computed(() => {
  return showAll.value ? items.value : items.value.slice(0, 5);
});

const toggleItem = (index) => {
  items.value.forEach((item, i) => {
    if (i !== index) {
      item.isOpen = false;
    }
  });

  items.value[index].isOpen = !items.value[index].isOpen;
}
</script>

<template>
  <main>
    <ReusableScreen>
      <template v-slot:title>
        Участие<br>в грантах
      </template>
      <template v-slot:description>
        Гранты позволяют внедрять новые образовательные технологии, программы и подходы, улучшая эффективность обучения
        и повышая вовлеченность детей
      </template>
      <template v-slot:img>
        <img src="/img/grants-photo-boy.png" alt="Изображение мальчика" class="main-screen__img">
      </template>
    </ReusableScreen>

    <div class="grants-accordion">
      <div v-for="(item, index) in visibleItems" :key="index" class="accordion-item"
        :class="{ 'is-open': item.isOpen }">
        <div class="image-container" v-if="item.isOpen">
          <img :src="item.image" :alt="item.title" class="top-image">
        </div>

        <div class="accordion-header">
          <div class="text-content">
            <h2 class="item-title">{{ item.title }}</h2>
            <h3 v-if="item.isOpen" class="item-subtitle">{{ item.subtitle }}</h3>
          </div>

          <div class="arrow-circle header-arrow" :class="{ 'is-open': item.isOpen }" @click.stop="toggleItem(index)">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            </svg>
          </div>
        </div>

        <transition name="slide">
          <div v-show="item.isOpen" class="accordion-content">
            <p class="main-text">{{ item.content }}</p>
            <p class="additional-text">{{ item.additionalText }}</p>

            <div class="arrow-circle content-arrow left" :class="{ 'is-open': item.isOpen }"
              @click.stop="toggleItem(index)">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
              </svg>
            </div>
          </div>
        </transition>
      </div>

      <button class="show-all-btn" @click="showAll = !showAll">
        {{ showAll ? 'Скрыть' : 'Все гранты' }}
      </button>
    </div>
  </main>
</template>

<style scoped lang="scss">
@use '@/assets/scss/mixins.scss' as *;

.main-screen {
  background-color: var(--color-background-purple);
}

.accordion-item {
  background: #F5F5FD;
  border-radius: 12px;
  margin-bottom: 12px;
  overflow: hidden;
}

.accordion-header {
  display: flex;
  align-items: center;
  padding: 20px 16px 16px;
  position: relative;
}

.text-content {
  flex: 1;
  min-width: 0;
  padding-right: 12px;
}

.item-title {
  margin: 0;
  text-align: left;
  font-size: 20px;
}

.item-subtitle {
  margin: 4px 0 0 0;
  text-align: left;
}

.arrow-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #CABBFF;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  flex-shrink: 0;
  cursor: pointer;

  &:active {
    background: var(--color-pressed-lavender);
  }

  @media (hover: hover) {
    &:hover {
      background: var(--color-hover-lavender);
    }
  }
}

.arrow-circle.is-open {
  background: #FDD35D;

  &:active {
    background: var(--color-pressed-yellow);
  }

  @media (hover: hover) {
    &:hover {
      background: var(--color-hover-yellow);
    }
  }
}

.arrow-circle svg {
  transition: transform 0.3s ease;
  color: #000000;
}

.arrow-circle.is-open svg {
  transform: rotate(180deg);
  color: #000000;
}

.header-arrow {
  position: static;
  margin-left: auto;
}

.content-arrow.left {
  margin-top: 16px;
  display: none;
}

.accordion-item.is-open .header-arrow {
  display: none;
}

.accordion-item.is-open .content-arrow {
  display: flex;
}

.image-container {
  padding: 35px 16px 0;
  display: flex;
  justify-content: flex-start;
}

.top-image {
  width: 100px;
  height: 100px;
  border-radius: 100px;
  object-fit: cover;
  display: block;
}

.accordion-content {
  padding: 0 16px 20px;

}

.additional-text {
  margin-top: 16px;
  font-weight: 500;
}

.show-all-btn {
  background-color: #7352E5;
  color: #ffffff;
  display: block;
  width: 100%;
  margin: 24px auto 0;
  padding: 12px 24px;
  border: none;
  border-radius: 30px;
  font-family: var(--font-family-next-art);
  font-size: 11px;
  cursor: pointer;

  &:active {
    background-color: var(--color-pressed-purple);
  }

  @media (hover: hover) {
    &:hover {
      background-color: var(--color-hover-purple);
    }
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.4s ease;
  max-height: 500px;
  overflow: hidden;
}

.slide-enter-from,
.slide-leave-to {
  max-height: 0;
  opacity: 0;
}

@media (min-width: 768px) {
  .grants-accordion {
    min-width: 648px;
  }

  .accordion-item {
    padding: 0 24px;
  }

  .top-image {
    width: 160px;
    height: 160px;
  }

  .accordion-content {
    padding: 0 16px 30px;
  }

  .show-all-btn {
    font-size: 14px;
    margin: 30px auto 0;
  }
}
</style>