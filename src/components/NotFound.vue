<script setup>
import InfoCard from './ui/InfoCard.vue';
import RouterLinkButton from './ui/RouterLinkButton.vue';

</script>

<template>
  <main>
    <div class="not-found">
      <h1>Ошибка 404</h1>
      <InfoCard imageUrl="/img/404-photo-boy.png" title="ОЙ!  Кажется, этой страницы тут нет"
        description="Страница не найдена.  Мы тоже расстроены и делаем все возможное, чтобы исправить проблему. А пока попробуйте поискать что-нибудь другое или вернитесь на главную." />

      <RouterLinkButton :to="{ name: 'home' }" :disabled="false" widthTablet="100%">
        <template v-slot:text>вернуться на главную</template>
      </RouterLinkButton>
    </div>
  </main>
</template>

<style scoped lang="scss">
@use '@/assets/scss/mixins.scss' as *;

.not-found {
  text-align: center;
  max-width: 1190px;

  & .info-card-wrapper {
    @media only screen and (min-width: 1280px) {
      border-radius: 100px 24px 24px 100px;
    }
  }
}

.not-found h1 {
  margin-bottom: 30px;
  font-size: 36px;
  font-weight: 600;

  @media only screen and (min-width: 1280px) {
    font-size: 48px;
    font-weight: 700;
  }
}
</style>
