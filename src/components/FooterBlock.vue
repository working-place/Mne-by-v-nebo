<script setup>

import NavLinks from './NavLinks.vue';

</script>

<template>
  <footer class="footer">
    <div class="footer__logo-box">
      <RouterLink to="/">
        <img class="footer__logo-img" src="/img/logo.png" alt="Логотип">
      </RouterLink>
      <RouterLink to="/">
        <img class="footer__vk-img" src="/img/socials.png" alt="Кнопка перехода в VK">
      </RouterLink>
    </div>
    <div class="footer__navigation-box">
      <h2>Навигация</h2>
      <NavLinks class="menu__nav-box_position" decoration-class="menu__link-decoration" align="start" />
    </div>
    <div class="footer__docs-box">
      <h2>Документы</h2>
      <ul class="footer__docs-list">
        <li class="footer__docs-item">
          <RouterLink to="/" :class="{ active: $route.path === ('/') }" class="footer__docs-item">
            Политика конфиденциальности
          </RouterLink>
        </li>
        <li class="footer__docs-item">
          <RouterLink to="/" :class="{ active: $route.path === ('/') }" class="footer__docs-item">
            Пользовательское соглашение
          </RouterLink>
        </li>
      </ul>
    </div>
    <div class="footer__contact-box">
      <h2>Контакты</h2>
      <ul class="footer__address-list">
        <li class="footer__address-item">г. Новороссийск, ул. Ивановская д. 3</li>
        <li class="footer__address-item">+7 (903) 456 84 46</li>
        <li class="footer__address-item">vospitaniedlyavseh@gmail.com</li>
      </ul>
    </div>

    <div class="footer__info-box">
      <div class="footer__info-box_direction">
        <RouterLink to="/">
          <img class="footer__sot-logo" src="/img/sot-logo.png" alt="Логотип СОТ">
        </RouterLink>
      </div>
      <div class="footer__info-box_direction">
        <RouterLink to="/">
          <img class="footer__soyuz-logo" src="/img/soyuz-logo.png" alt="Логотип Союз.РФ">
        </RouterLink>
        <RouterLink to="/">
          <img class="footer__profit-code-logo" src="/img/profit-code.png" alt="Логотип ProfitCode">
        </RouterLink>
      </div>
    </div>
    <div class="footer__text-about-center">
      <span>© 2025 АНО «Инновационный центр развития детей и молодежи "Воспитание для всех"»</span>
    </div>
  </footer>
</template>

<style scoped>
.active {
  font-weight: bold;
}

.menu__nav-box_position {
  position: static;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 40px;
}

.menu__link_position {
  align-items: flex-start;
}

.footer__docs-list,
.footer__address-list {
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: 12px;
  width: fit-content;
  white-space: nowrap;
}

.menu__link-decoration,
.footer__docs-item,
.footer__address-item {
  line-height: 1.5;
  margin: 0;
  text-decoration: none;
  color: var(--color-text-dark);
}

h2 {
  text-transform: uppercase;
  font-weight: 700;
  line-height: 1.5;
  color: var(--color-text-purple);
}

.footer,
.footer__logo-box,
.footer__navigation-box,
.footer__docs-box,
.footer__contact-box,
.footer__info-box {
  display: flex;
  flex-direction: column;
}

.footer__info-box_direction {
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

.footer__docs-box,
.footer__navigation-box,
.footer__contact-box,
.footer__info-box,
.footer__info-box_direction {
  gap: 22px;
}

.footer,
.footer__logo-box {
  gap: 40px;
}

.footer {
  min-width: var(--min-width);
  max-width: var(--max-width);
  min-height: 915px;
  height: fit-content;
  padding: 17px;
  background-color: var(--color-background-light-blue);
}

.footer__logo-box {
  align-items: center;
  width: 100%;
}

.footer__logo-img {
  width: 117px;
  height: 46px;
}

.footer__vk-img {
  width: 26px;
  height: 26px;
}

.footer__navigation-box {
  display: flex;
}

.footer__sot-logo {
  width: 46px;
  height: 20px;
}

.footer__soyuz-logo {
  width: 69px;
  height: 11px;
}

.footer__profit-code-logo {
  width: 51px;
  height: 19px;
}

.footer__text-about-center {
  display: flex;
  font-size: 12px;
  color: var(--color-text-gray);
  justify-content: center;
  align-items: center;
}

.footer__text-about-center span {
  display: block;
  text-align: center;
  line-height: 1.2;
}

</style>
