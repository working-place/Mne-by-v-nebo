import { createRouter, createWebHistory } from 'vue-router'

import MainPage from '@/components/MainPage.vue';
import SotPage from '@/components/SotPage.vue';
import GrantsPage from '@/components/GrantsPage.vue';
import UsefullMaterialPage from '@/components/UsefullMaterialPage.vue';
import NewsPage from '@/components/NewsPage.vue';
import GalleryPage from '@/components/GalleryPage.vue';


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
  ],
})

export default router

      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import('../views/AboutView.vue'),
