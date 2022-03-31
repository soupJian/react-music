import request from '@/utils/request';
import {
  hotSearchType,
  searchArtistType,
  searchAlbumType,
  searchSongType,
  searchResultType,
} from './type';
/**
 * 获取个人喜欢的音乐列表
 * @param id
 * @returns { ids: number[]}
 */
export const LOVE_LIST = async (id: number): Promise<number[]> => {
  const res = await request<{ ids: number[] }>({
    url: '/likelist',
    method: 'get',
    params: { id },
  });
  return res.ids;
};

/**
 * 退出登录
 * @returns
 */
export const LOGIN_OUT = async (): Promise<any> => {
  return await request<any>({
    url: '/logout',
    method: 'get',
  });
};

/**
 * 热门搜索
 * @returns
 */
export const HOT_SEARCH = async (): Promise<hotSearchType[]> => {
  const res = await request<{ data: hotSearchType[] }>({
    url: '/search/hot/detail',
    method: 'get',
  });
  return res.data;
};

/**
 * 搜索
 * @param keywords
 * @returns
 */
export const SEARCH_RESULT = async (
  keywords: string,
): Promise<searchResultType> => {
  const res = await request<{ result: searchResultType }>({
    url: '/search/suggest',
    params: {
      keywords,
    },
    method: 'get',
  });
  return res.result;
};

/**
 *
 * @param id 专辑id
 * @returns
 */
export const ALBUM_COVER = async (id: number): Promise<string> => {
  const res = await request<{ album: { picUrl: string } }>({
    url: '/album',
    params: {
      id,
    },
    method: 'get',
  });
  return res.album.picUrl;
};
