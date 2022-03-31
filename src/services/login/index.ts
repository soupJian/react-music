import request from '@/utils/request';
import { userType } from '@/services/me/type';

export const CHECK_PHONE = async (phone: string): Promise<number> => {
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
