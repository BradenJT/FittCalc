import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('src/modules/pages/Home/IndexPage.vue') }],
  },
  {
    path: '/WeightConversion',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('src/modules/pages/WeightConversion/WeightConversionPage.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('src/modules/pages/ErrorPage/ErrorNotFound.vue'),
  },
];

export default routes;
