import request from '@/utils/request';
import { userPlayListType, userType } from './type';
import { playListype } from '@/services/song/type';

/**
 *
 * @param uid 用户id
 * @returns
 */
export const USER_PLAYlIST = async (uid: number): Promise<playListype[]> => {
  const res = await request<{ playlist: userPlayListType[] }>({
    url: `/user/playlist`,
    params: {
      uid,
    },
    method: 'get',
  });
  // 处理数据 新增picUrl
  return res.playlist.map((item: userPlayListType) => {
    return {
      ...item,
      picUrl: item.coverImgUrl,
    };
  });
};

export const check_PHONE = async (phone: string): Promise<number> => {
  const res = await request<{ exist: number }>({
    url: '/cellphone/existence/check',
    params: {
      phone,
    },
    method: 'get',
  });
  return res.exist;
};

export const LOGIN = async (
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

export const CODE = async (phone: string): Promise<{ code: number }> => {
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

export const CHECK_CODE = async (
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

export const CHANGE_PASSWORD = async (
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
