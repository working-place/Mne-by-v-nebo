import { createRouter, createWebHistory } from 'vue-router'

import MainPage from '@/components/MainPage.vue';
import SotPage from '@/components/SotPage.vue';
import GrantsPage from '@/components/GrantsPage.vue';
import UsefullMaterialPage from '@/components/UsefullMaterialPage.vue';
import NewsPage from '@/components/NewsPage.vue';
import GalleryPage from '@/components/GalleryPage.vue';
import PrivacyPolicyPdfPage from '@/components/PrivacyPolicyPdfPage.vue';
import UserAgreementPdf from '@/components/userAgreementPdf.vue';

const router = createRouter({
  history: createWebHistory(),
  // history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainPage,
    },
    {
      path: '/sot',
      name: 'sot',
      component: SotPage,
    },
    {
      path: '/grants',
      name: 'grants',
      component: GrantsPage,
    },
    {
      path: '/usefull',
      name: 'usefull-materials',
      component: UsefullMaterialPage,
    },
    {
      path: '/news',
      name: 'news',
      component: NewsPage,
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: GalleryPage,
    },
    {
      path: '/privacy-policy',
      name: 'privacy-policy',
      component: PrivacyPolicyPdfPage,
    },
    {
      path: '/user-agreement',
      name: 'user-agreement',
      component: UserAgreementPdf,
    },
  ],
})

export default router
