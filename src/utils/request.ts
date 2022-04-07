import axios from 'axios'
import type { AxiosInstance,AxiosRequestConfig } from 'axios'

class service {
  instance: AxiosInstance
  // constructor(config: AxiosRequestConfig) { //替换为扩展后的LYRequestConfig
  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config)
    // 请求拦截
    this.instance.interceptors.request.use(
      (config) => {
        config.params = {
          ...config.params,
          realIP: '116.25.146.177'
        }
        return config
      },
      (err) => {
        return err
      }
    )
    // 响应拦截
    this.instance.interceptors.response.use(
      (res) => {
        return res.data
      },
      (err) => {
        return err
      }
    )
  }
  // 针对单个请求的处理、拦截
  request<T>(config: AxiosRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      // this.instance.request(config)
      this.instance
        .request<any, T>(config)
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          reject(err)
          return err
        })
    })
  }
  get<T>(config: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }
  post<T>(config: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
  delete<T>(config: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
  patch<T>(config: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

// const baseURL = '/api'; // 自己服务器需要代理
const baseURL = 'https://music-soupjian.vercel.app';

const request = new service({
  baseURL,
  withCredentials: true, // vercel 跨域 添加表示才可调用
})
export default request
