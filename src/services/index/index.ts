import request from '@/utils/request';
import { bannerType } from './type';
import { playListype } from '@/services/song/type';

/**
 * 获取轮播图
 * @returns
 */

export const BANNER = async (): Promise<bannerType[]> => {
  const res = await request.get<{ banners: bannerType[] }>({
    url: '/banner',
  });
  return res.banners;
};

/**
 * 获取歌单推荐
 * @returns
 */
export const PERSONALIZED = async (): Promise<playListype[]> => {
  const res = await request.get<{ result: playListype[] }>({
    url: '/personalized'
  });
  return res.result;
};
