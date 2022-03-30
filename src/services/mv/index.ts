import request from '@/utils/request';
import { mvType, mvDetail } from './type';
/**
 * 获取推荐MV
 * @returns
 */
export const personalizedMv = async (
  area: string,
  type: string,
): Promise<mvType[]> => {
  const res = await request<{ data: mvType[] }>({
    url: '/mv/all',
    params: {
      area,
      type,
    },
    method: 'get',
  });
  return res.data;
};
/**
 * 获取mv播放地址
 * @param id
 * @returns
 */
export const MvPlayUrl = async (id: string): Promise<string> => {
  const res = await request<{ data: { url: string } }>({
    url: '/mv/url',
    params: {
      id,
    },
    method: 'get',
  });
  return res.data.url;
};

export const MvDetail = async (mvid: string): Promise<mvDetail> => {
  const res = await request<{ data: mvDetail }>({
    url: '/mv/detail',
    params: {
      mvid,
    },
    method: 'get',
  });
  return res.data;
};
