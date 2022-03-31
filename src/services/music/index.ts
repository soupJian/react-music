import request from '@/utils/request';
import { musicUrlType, lycType } from './type';
/**
 *
 * @param id
 * @returns
 */
export const MUSIC_URL = async (id: number): Promise<musicUrlType[]> => {
  const res = await request<{ data: musicUrlType[] }>({
    url: '/song/url',
    params: {
      id,
    },
    method: 'get',
  });
  return res.data;
};

export const LYRIC = async (id: number): Promise<lycType> => {
  const res = await request<lycType>({
    url: '/lyric',
    params: {
      id,
    },
    method: 'get',
  });
  return res;
};
