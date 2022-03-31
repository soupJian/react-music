import request from '@/utils/request';
import { singerListType, singerType } from './type';
import { songType } from '@/services/song/type';
/**
 * 获取分类歌手
 * @param type number
 * @param area number
 * @returns
 */
export const SINGER_LIST = async (
  type: number,
  area: number,
): Promise<singerListType[]> => {
  const res = await request<{ artists: singerListType[] }>({
    url: '/artist/list',
    method: 'get',
    params: {
      type,
      area,
    },
  });
  return res.artists;
};

/**
 * 歌手详情
 * @param id 歌手id
 * @returns
 */
export const SINGER_DETAIL = async (
  id: string,
): Promise<{ artist: singerType; hotSongs: songType[] }> => {
  const res = await request<{
    artist: singerType;
    hotSongs: songType[];
  }>({
    url: '/artists',
    params: {
      id,
    },
    method: 'get',
  });
  return {
    artist: res.artist,
    hotSongs: res.hotSongs,
  };
};
