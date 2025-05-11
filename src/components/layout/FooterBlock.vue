<script setup>
import NavLinks from './NavLinksMobile.vue';
</script>

<template>
  <footer class="footer">
    <div class="footer__wrapper-top">
      <div class="footer__logo-box">
        <RouterLink to="/">
          <img class="footer__logo-img" src="/img/logo.png" alt="Логотип">
        </RouterLink>
        <a href="https://vk.com/vospitaniedlyvseh">
          <img class="footer__vk-img" src="/img/socials.png" alt="Кнопка перехода в VK">
        </a>
      </div>
      <div class="footer__navigation-box">
        <h2>Навигация</h2>
        <NavLinks class="menu__nav-box_position" decoration-class="menu__link-decoration" align="start" />
      </div>
      <div class="footer__docs-box">
        <h2>Документы</h2>
        <ul class="footer__docs-list">
          <li class="footer__docs-item">
            <RouterLink to="/privacy-policy" :class="{ active: $route.path === '/privacy-policy' }"
              class="footer__docs-item">
              Политика конфиденциальности
            </RouterLink>
          </li>
          <li class="footer__docs-item">
            <RouterLink to="/user-agreement" :class="{ active: $route.path === ('/user-agreement') }"
              class="footer__docs-item">
              Пользовательское соглашение
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
    <div class="footer__wrapper-bottom">
      <div class="footer__contact-box">
        <h2>Контакты</h2>
        <ul class="footer__address-list">
          <li class="footer__address-item">г. Новороссийск, ул. Ивановская д. 3</li>
          <li class="footer__address-item">+7 (903) 456 84 46</li>
          <li class="footer__address-item">vospitaniedlyavseh@gmail.com</li>
        </ul>
      </div>
      <div class="footer__wrapper-contacts">
        <div class="footer__info-box">
          <div class="footer__info-box_direction">
            <a href="https://grant.obr.so/">
              <img class="footer__sot-logo" src="/img/sot-logo.png" alt="Логотип СОТ">
            </a>
          </div>
          <div class="footer__info-box_direction">
            <a href="https://xn--g1ani7c.xn--p1ai/">
              <img class="footer__soyuz-logo" src="/img/soyuz-logo.png" alt="Логотип Союз.РФ">
            </a>
            <img class="footer__profit-code-logo" src="/img/profit-code.png" alt="Логотип ProfitCode">
          </div>
        </div>
        <div class="footer__text-about">
          <span>© 2025 АНО «Инновационный центр развития детей и молодежи "Воспитание для всех"»</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
@use '@/assets/scss/mixins.scss' as *;

h2 {
  @include h2-mobile-uppercase-footer;
  color: var(--color-text-purple);
}

.active {
  font-weight: bold;
}

.menu {
  &__nav-box_position {
    position: static;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 40px;
  }

  &__link {
    line-height: 1;
  }

  &__link_position {
    align-items: flex-start;
  }

  &__link-decoration {
    @include list-decoration;
  }
}

.footer {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  min-height: 915px;
  height: fit-content;
  padding: 40px 17px;
  background-color: var(--color-background-light-blue);

  @media only screen and (min-width: 768px) {
    min-height: 492px;
    height: fit-content;
    padding-left: 59px;
    padding-right: 59px;
  }

  &__wrapper-top,
  &__wrapper-bottom {
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 40px;

    @media only screen and (min-width: 768px) {
      flex-direction: row;
      gap: 0;
    }
  }

  &__wrapper-top {
    @media only screen and (min-width: 768px) {
      position: relative;
    }
  }

  &__wrapper-bottom {
    @media only screen and (min-width: 768px) {
      margin-top: 40px;
      align-items: flex-end;
    }
  }

  &__wrapper-contacts {
    display: flex;
    flex-direction: column;
    height: 100%;

    @media only screen and (min-width: 768px) {
      gap: 22px;
      max-width: 224px;
      width: 50%;
    }
  }

  @media only screen and (min-width: 361px) and (max-width: 768px) {
    width: 100vw;
  }

  @media only screen and (min-width: 769px) {
    justify-content: flex-start;
    width: 100vw;
  }

  &__logo-box {
    align-items: center;
    width: 100%;
    gap: 40px;

    @media only screen and (min-width: 769px) {
      position: absolute;
      gap: 22px;
      width: 50%;
      bottom: -40px;
      right: 0;
      align-items: flex-start;
    }
  }

  &__logo-img {
    width: 117px;
    height: 46px;
  }

  &__vk-img {
    width: 26px;
    height: 26px;
  }

  &__docs-box,
  &__navigation-box,
  &__contact-box,
  &__info-box,
  &__info-box_direction {
    gap: 22px;
  }

  &__logo-box,
  &__navigation-box,
  &__docs-box,
  &__contact-box,
  &__info-box {
    @include display-flex-column;
  }

  &__docs-box {
    @media only screen and (min-width: 768px) {
      width: 50%;
    }
  }

  &__info-box {
    @media only screen and (min-width: 768px) {
      flex-direction: row;
      align-items: flex-start;
      padding: 10px 0 0 0;
    }
  }

  &__contact-box {
    margin-top: 40px;

    @media only screen and (min-width: 768px) {
      margin-top: 0;
      gap: 22px;
      width: 50%;
    }
  }

  &__navigation-box {
    display: flex;

    @media only screen and (min-width: 768px) {
      width: 50%;
    }
  }

  &__docs-list,
  &__address-list {
    @include display-flex-column;
    @include list-decoration;
    width: fit-content;
  }

  &__docs-item,
  &__address-item {
    @include item-decoration;
  }

  &__info-box_direction {
    @include display-flex-justify-content-center;
    align-items: flex-end;
  }

  &__sot-logo {
    width: 46px;
    height: 20px;
  }

  &__soyuz-logo {
    width: 69px;
    height: 11px;
  }

  &__profit-code-logo {
    width: 51px;
    height: 19px;
  }

  &__text-about {
    @include display-flex-center-center;
    font-size: 12px;
    color: var(--color-text-gray);
  }

  &__text-about span {
    display: block;
    text-align: center;
    line-height: 1.2;

    @media only screen and (min-width: 768px) {
      text-align: left;
    }
  }
}
</style>
