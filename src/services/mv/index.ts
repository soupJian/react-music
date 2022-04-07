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
  const res = await request.get<{ data: mvType[] }>({
    url: '/mv/all',
    params: {
      area,
      type,
    }
  });
  return res.data;
};
/**
 * 获取mv播放地址
 * @param id
 * @returns
 */
export const MvPlayUrl = async (id: string): Promise<string> => {
  const res = await request.get<{ data: { url: string } }>({
    url: '/mv/url',
    params: {
      id,
    }
  });
  return res.data.url;
};

/**
 * 获取mv详情
 * @param mvid
 * @returns
 */
export const MvDetail = async (mvid: string): Promise<mvDetail> => {
  const res = await request.get<{ data: mvDetail }>({
    url: '/mv/detail',
    params: {
      mvid,
    }
  });
  return res.data;
};

/**
 * 获取相似Mv
 * @param mvid
 * @returns
 */
export const simiMV = async (mvid: string): Promise<mvType[]> => {
  const res = await request.get<{ mvs: mvType[] }>({
    url: '/simi/mv',
    params: {
      mvid,
    }
  });
  return res.mvs;
};
