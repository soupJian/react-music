import axios from 'axios';
interface paramsObj {
  url: string;
  data?: string;
}
export const request = (params: paramsObj) => {
  const baseUrl: string = 'http://www.soupjian.work:3000';
  let url: string = '';
  if (params.data) {
    url = `${baseUrl}${params.url}?${params.data}`;
  } else {
    url = `${baseUrl}${params.url}`;
  }
  return axios.get(url);
};
export const requestCookie = (params: paramsObj) => {
  const baseUrl: string = 'http://www.soupjian.work:3000';
  const cookie = localStorage.getItem('cookie');
  let url: string = '';
  if (params.data) {
    url = `${baseUrl}${params.url}?${params.data}&cookie=${cookie}`;
  } else {
    url = `${baseUrl}${params.url}?cookie=${cookie}`;
  }
  return axios.get(url);
};
