import request from '@/utils/request';
import { albumType } from './type';
import { songType } from '@/services/song/type';
/**
 * 获取专辑详情
 * @param id
 * @returns
 */
export const ALBUM_DETAIL = async (
  id: string,
): Promise<{ album: albumType; songs: songType[] }> => {
  const res = await request<{ album: albumType; songs: songType[] }>({
    url: '/album',
    params: {
      id,
    },
    method: 'get',
  });
  return {
    album: res.album,
    songs: res.songs,
  };
};
