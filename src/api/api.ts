import request from './index';
import {
  bannerItemType, // 轮播图
  playListItemType, // 歌单数组
  singerListItemType, // 歌手列表
  singerDetailType, // 歌手详情
  songItemType, // 歌单列表每首歌
  userPlayListItemType, // 用户自己创建的歌单
  rankListItemType, // 排行榜信息及摘要
  songDetailType, // 歌单详情
  musicUrl, // 歌曲地址
  lycType, //歌词
  userType, // 用户
} from './interface';

/**
 * 获取轮播图
 * @returns
 */
export const getBannerList = async (): Promise<bannerItemType[]> => {
  const res = await request<{ banners: bannerItemType[] }>({
    url: '/banner',
    method: 'get',
  });
  return res.banners;
};

/**
 * 获取歌单推荐
 * @returns
 */
export const getPersionaLized = async (): Promise<playListItemType[]> => {
  const res = await request<{ result: playListItemType[] }>({
    url: '/personalized',
    method: 'get',
  });
  return res.result;
};

/**
 * 获取分类歌手
 * @param type number
 * @param area number
 * @returns
 */
export const getArticList = async (
  type: number,
  area: number,
): Promise<singerListItemType[]> => {
  const res = await request<{ artists: singerListItemType[] }>({
    url: `/artist/list?type=${type}&area=${area}`,
    method: 'get',
  });
  return res.artists;
};

/**
 * 歌手详情
 * @param id 歌手id
 * @returns
 */
export const getArticDetail = async (
  id: string,
): Promise<{ artist: singerDetailType; hotSongs: songItemType[] }> => {
  const res = await request<{
    artist: singerDetailType;
    hotSongs: songItemType[];
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

/**
 * 获取排行榜信息
 * @returns
 */
export const getTopList = async (): Promise<rankListItemType[]> => {
  const res = await request<{ list: rankListItemType[] }>({
    url: '/toplist/detail',
    method: 'get',
  });
  return res.list;
};

/**
 * 获取歌单详情
 * @param id
 * @returns
 */
export const getPlayListDetail = async (
  id: string,
): Promise<songDetailType> => {
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
 * 获取专辑详情
 * @param id
 * @returns
 */
export const getAlbumDetail = async (id: string): Promise<rankListItemType> => {
  const res = await request<{ playlist: rankListItemType }>({
    url: '/album',
    params: {
      id,
    },
    method: 'get',
  });
  return res.playlist;
};

/**
 *
 * @param uid 用户id
 * @returns
 */
export const getUserPlayList = async (
  uid: number,
): Promise<playListItemType[]> => {
  const res = await request<{ playlist: userPlayListItemType[] }>({
    url: `/user/playlist`,
    params: {
      uid,
    },
    method: 'get',
  });
  // 处理数据 新增picUrl
  return res.playlist.map((item: userPlayListItemType) => {
    return {
      ...item,
      picUrl: item.coverImgUrl,
    };
  });
};

/**
 *
 * @param id
 * @returns
 */
export const getMusicUrl = async (id: number): Promise<musicUrl[]> => {
  const res = await request<{ data: musicUrl[] }>({
    url: '/song/url',
    params: {
      id,
    },
    method: 'get',
  });
  return res.data;
};

export const getLyric = async (id: number): Promise<lycType> => {
  const res = await request<lycType>({
    url: '/lyric',
    params: {
      id,
    },
    method: 'get',
  });
  return res;
};

export const getCheckPhone = async (phone: string): Promise<number> => {
  const res = await request<{ exist: number }>({
    url: '/cellphone/existence/check',
    params: {
      phone,
    },
    method: 'get',
  });
  return res.exist;
};

export const getLogin = async (
  phone: string,
  password: string,
): Promise<{ code: number; profile: userType }> => {
  const res = await request<{ code: number; profile: userType }>({
    url: '/login/cellphone',
    params: {
      phone,
      password,
    },
    method: 'get',
  });
  return {
    code: res.code,
    profile: res.profile,
  };
};

export const getCode = async (phone: string): Promise<{ code: number }> => {
  const res = await request<{ code: number }>({
    url: '/login/cellphone',
    params: {
      phone,
    },
    method: 'get',
  });
  return {
    code: res.code,
  };
};

export const getCheckCode = async (
  phone: string,
  code: string,
): Promise<{ data: boolean }> => {
  const res = await request<{ data: boolean }>({
    url: '/captcha/verify',
    params: {
      phone,
      captcha: code,
    },
    method: 'get',
  });
  return {
    data: res.data,
  };
};

export const getChangePassword = async (
  phone: string,
  password: string,
  code: string,
): Promise<{ profile: userType }> => {
  const res = await request<{ profile: userType }>({
    url: '/register/cellphone',
    params: {
      phone,
      password,
      captcha: code,
    },
    method: 'get',
  });
  return {
    profile: res.profile,
  };
};
// /**
//  * 获取个人喜欢的音乐列表
//  * @param id
//  * @returns { ids: number[]}
//  */
// export const  getLoveList = async (id:number):Promise<likelistType> => {
//   return await request<likelistType>({
//     url: '/likelist',
//     method: 'get',
//     params: {id},
//   });
// }
