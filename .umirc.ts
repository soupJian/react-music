import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  title: 'react-music',
  dva: {
    immer: true,
    hmr: false,
  },
  // proxy: {
  //   '/api': {
  //     target: 'https://music-soupjian.vercel.app',
  //     changeOrigin: true,
  //     pathRewrite: { '^/api': '' },
  //   },
  // },
  routes: [
    {
      path: '/',
      component: '@/layout/index',
      routes: [
        { path: '/', redirect: '/recommend' },
        { path: '/recommend', component: '@/pages/index/index' },
        { path: '/singer', component: '@/pages/singer/index' },
        { path: '/rank', component: '@/pages/rank/index' },
        { path: '/mv', component: '@/pages/mv/index' },
        { path: '/me', component: '@/pages/me/index' },
        { path: '/login', component: '@/pages/login/index' },
        { path: '/song/:id', component: '@/pages/detail/song_detail/[id]' }, // 歌单详情
        { path: '/album/:id', component: '@/pages/detail/album_detail/[id]' }, // 专辑详情
        { path: '/singer/:id', component: '@/pages/detail/singer_detail/[id]' }, // 歌手详情
        { path: '/mv/:id', component: '@/pages/detail/mv_detail/[id]' }, // 歌手详情
      ],
    },
  ],
});
