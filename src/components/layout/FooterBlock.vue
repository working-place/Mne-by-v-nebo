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
        <h2 class="footer__title-link">Навигация</h2>
        <NavLinks class="menu__nav-box_position" decoration-class="menu__link-decoration" align="start" />
      </div>
      <div class="footer__docs-box">
        <h2 class="footer__title-link">Документы</h2>
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
        <h2 class="footer__title-link">Контакты</h2>
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

  @media only screen and (min-width: 361px) and (max-width: 768px) {
    width: 100vw;
  }

  @media only screen and (min-width: 768px) {
    min-height: 492px;
    height: fit-content;
    padding-left: 59px;
    padding-right: 59px;
  }

  @media only screen and (min-width: 1280px) {
    position: relative;
    flex-direction: row;
    justify-content: center;
    min-height: 385px;
    padding-left: 0;
    padding-right: 0;
    gap: 10px;
    font-size: 20px;
    font-weight: 400;
    line-height: 1;
  }

  &__title-link {
    @include h2-mobile-uppercase-footer;
    color: var(--color-text-purple);

    @media only screen and (min-width: 1280px) {
      text-align: left;
      font-size: 32px;
      font-weight: 600;
      line-height: 1.2;
    }
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

    @media only screen and (min-width: 1280px) {
      justify-content: space-around;
      min-height: 100%;
      height: fit-content;
      max-width: 590px;
      width: 50%;
      gap: 10px;
    }
  }

  &__wrapper-top {
    @media only screen and (min-width: 768px) {
      position: relative;
    }

    @media only screen and (min-width: 1280px) {
      position: static;
    }
  }

  &__wrapper-bottom {
    @media only screen and (min-width: 768px) {
      align-items: flex-end;
      margin-top: 40px;
    }

    @media only screen and (min-width: 1280px) {
      align-items: flex-start;
      margin-top: 0;
      line-height: 1.3;
    }
  }

  &__wrapper-contacts {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;

    @media only screen and (min-width: 768px) {
      max-width: 224px;
      width: 50%;
      gap: 22px;
    }

    @media only screen and (min-width: 1280px) {
      max-width: 188px;
      width: fit-content;
      height: fit-content;
      gap: 36px;
    }

    & span {
      display: inline-block;
      width: 285px;
    }
  }

  &__logo-box {
    align-items: center;
    width: 100%;
    gap: 40px;

    @media only screen and (min-width: 769px) {
      align-items: flex-start;
      position: absolute;
      width: 50%;
      gap: 22px;
      bottom: -40px;
      right: 0;
    }

    @media only screen and (min-width: 1280px) {
      align-items: flex-start;
      width: 50%;
      gap: 22px;
      bottom: 20px;
      left: 52%;
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

    @media only screen and (min-width: 768px) {
      max-width: 390px;
      width: fit-content;
    }
  }

  &__info-box {
    margin-bottom: 40px;

    @media only screen and (min-width: 768px) {
      flex-direction: row;
      align-items: flex-start;
      padding: 10px 0 0 0;
      margin-bottom: 0;
    }

    @media only screen and (min-width: 1280px) {
      height: fit-content;
      flex-direction: column;
      gap: 36px;
    }
  }

  &__contact-box {
    margin-top: 40px;

    @media only screen and (min-width: 768px) {
      width: 50%;
      margin-top: 0;
      gap: 22px;
    }

    @media only screen and (min-width: 1280px) {
      max-width: 292px;
      width: fit-content;
    }
  }

  &__navigation-box {
    display: flex;
    height: fit-content;

    @media only screen and (min-width: 768px) {
      width: 50%;
    }

    @media only screen and (min-width: 1280px) {
      max-width: 290px;
      width: fit-content;
    }
  }

  &__docs-list,
  &__address-list {
    @include display-flex-column;
    @include list-decoration;
    width: fit-content;
  }

  &__docs-list {
    @media only screen and (min-width: 1280px) {
      gap: 16px;
    }
  }

  &__address-list {
    @media only screen and (min-width: 1280px) {
      text-wrap-mode: wrap;
    }
  }

  &__docs-item,
  &__address-item {
    @include item-decoration;
  }

  &__info-box_direction {
    @include display-flex-justify-content-center;
    align-items: flex-end;

    @media only screen and (min-width: 1280px) {
      flex-direction: column;
      align-items: flex-start;
      line-height: 1.3;
      gap: 36px;
    }

    & a {
      display: flex;
      height: 11px;
    }
  }

  &__sot-logo {
    width: 46px;
    height: 20px;

    @media only screen and (min-width: 1280px) {
      width: 98px;
      height: 42px;
      margin-bottom: 36px;
    }
  }

  &__soyuz-logo {
    width: 69px;
    height: 100%;

    @media only screen and (min-width: 1280px) {
      width: 140px;
      height: 23px;
    }
  }

  &__profit-code-logo {
    width: 51px;
    height: 19px;

    @media only screen and (min-width: 1280px) {
      width: 99px;
      height: 37px;
    }
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
