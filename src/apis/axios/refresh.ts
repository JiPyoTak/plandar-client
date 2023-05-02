import axios, { AxiosError, AxiosResponse } from 'axios';

import { SERVER_URL } from '@/constants';

const axiosRefreshAPI = (() => {
  const axiosInstance = axios.create({
    baseURL: SERVER_URL,
    withCredentials: true,
  });

  axiosInstance.interceptors.response.use(
    (res: AxiosResponse) => {
      return {
        ...res,
        data: res.data.data,
      };
    },
    async (error: AxiosError) => {
      return Promise.reject(error);
    },
  );

  return () => axiosInstance.post('/auth/refresh');
})();

export { axiosRefreshAPI };
