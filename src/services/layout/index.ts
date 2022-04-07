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
  const res = await request.get<{ ids: number[] }>({
    url: '/likelist',
    params: { id }
  });
  return res.ids;
};

/**
 * 退出登录
 * @returns
 */
export const LOGIN_OUT = async (): Promise<any> => {
  return await request.get<any>({
    url: '/logout'
  });
};

/**
 * 热门搜索
 * @returns
 */
export const HOT_SEARCH = async (): Promise<hotSearchType[]> => {
  const res = await request.get<{ data: hotSearchType[] }>({
    url: '/search/hot/detail'
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
  const res = await request.get<{ result: searchResultType }>({
    url: '/search/suggest',
    params: {
      keywords,
    }
  });
  return res.result;
};

/**
 *
 * @param id 专辑id
 * @returns
 */
export const ALBUM_COVER = async (id: number): Promise<string> => {
  const res = await request.get<{ album: { picUrl: string } }>({
    url: '/album',
    params: {
      id,
    }
  });
  return res.album.picUrl;
};
