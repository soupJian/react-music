import request from '@/utils/request';
import { songDetailType, rankListType } from './type';

/**
 * 获取歌单详情
 * @param id
 * @returns
 */
export const SONG_DETAIL = async (id: string): Promise<songDetailType> => {
  const res = await request<{ playlist: songDetailType }>({
    url: '/playlist/detail',
    params: {
      id,
    },
    method: 'get',
  });
  return res.playlist;
};

/**
 * 获取排行榜信息
 * @returns
 */
export const TOP_LIST = async (): Promise<rankListType[]> => {
  const res = await request<{ list: rankListType[] }>({
    url: '/toplist/detail',
    method: 'get',
  });
  return res.list;
};
