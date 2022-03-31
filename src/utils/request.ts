import axios, { AxiosRequestConfig } from 'axios';

// const baseURL = '/api'; // 自己服务器需要代理
const baseURL = 'https://music-soupjian.vercel.app';
const cookie = sessionStorage.getItem('cookie');

const request = <T>(data: AxiosRequestConfig): Promise<T> => {
  return new Promise((resolve, reject) => {
    axios({
      baseURL,
      ...data,
      params: {
        ...data.params,
        realIP: '116.25.146.177',
        cookie: cookie,
      },
      withCredentials: true,
    })
      .then((res: { data: T }) => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export default request;
