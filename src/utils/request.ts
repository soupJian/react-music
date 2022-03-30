import axios, { AxiosRequestConfig } from 'axios';

const baseURL = '/api';

const request = <T>(data: AxiosRequestConfig): Promise<T> => {
  return new Promise((resolve, reject) => {
    axios({
      baseURL,
      ...data,
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
