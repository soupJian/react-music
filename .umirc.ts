import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  dva: {
    immer: true,
    hmr: false,
  },
  routes: [
    {
      path: '/',
      component: '@/layout/index',
      routes: [
        { path: '/', redirect: '/recommend' },
        { path: '/recommend', component: '@/pages/index/index' },
        { path: '/singer', component: '@/pages/singer/index' },
        { path: '/rank', component: '@/pages/rank/index' },
        { path: '/me', component: '@/pages/me/index' },
        { path: '/login', component: '@/pages/login/index' },
      ],
    },
  ],
});
