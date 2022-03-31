import request from '@/utils/request';
import { bannerType } from './type';
import { playListype } from '@/services/song/type';

/**
 * 获取轮播图
 * @returns
 */

export const BANNER = async (): Promise<bannerType[]> => {
  const res = await request<{ banners: bannerType[] }>({
    url: '/banner',
    method: 'get',
  });
  return res.banners;
};

/**
 * 获取歌单推荐
 * @returns
 */
export const PERSONALIZED = async (): Promise<playListype[]> => {
  const res = await request<{ result: playListype[] }>({
    url: '/personalized',
    method: 'get',
  });
  return res.result;
};
