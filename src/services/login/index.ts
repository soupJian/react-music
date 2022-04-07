import request from '@/utils/request';
import { userType } from '@/services/me/type';

export const CHECK_PHONE = async (phone: string): Promise<number> => {
  const res = await request.get<{ exist: number }>({
    url: '/cellphone/existence/check',
    params: {
      phone,
    }
  });
  return res.exist;
};

export const LOGIN = async (
  phone: string,
  password: string,
): Promise<{ code: number; profile: userType; token: string }> => {
  const res = await request.get<{ code: number; profile: userType; token: string }>(
    {
      url: '/login/cellphone',
      params: {
        phone,
        password,
      }
    }
  );
  return {
    code: res.code,
    profile: res.profile,
    token: res.token,
  };
};

export const CODE = async (phone: string): Promise<{ code: number }> => {
  const res = await request.get<{ code: number }>({
    url: '/login/cellphone',
    params: {
      phone,
    }
  });
  return {
    code: res.code,
  };
};

export const CHECK_CODE = async (
  phone: string,
  code: string,
): Promise<{ data: boolean }> => {
  const res = await request.get<{ data: boolean }>({
    url: '/captcha/verify',
    params: {
      phone,
      captcha: code,
    }
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
  const res = await request.get<{ profile: userType }>({
    url: '/register/cellphone',
    params: {
      phone,
      password,
      captcha: code,
    }
  });
  return {
    profile: res.profile,
  };
};
