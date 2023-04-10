import axios, {
  InternalAxiosRequestConfig,
  AxiosError,
  AxiosResponse,
} from 'axios';

import { axiosRefreshAPI } from './refresh';
import { ACCESS_TOKEN_KEY, SERVER_URL } from '@/utils/constants';
import { getCookie } from '@/utils/cookie';

const axiosAPI = (() => {
  const axiosInstance = axios.create({
    baseURL: SERVER_URL,
  });

  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const accessToken = getCookie(ACCESS_TOKEN_KEY);

      if (accessToken) {
        config.headers.setAuthorization(`Bearer ${accessToken}`);
      }

      return config;
    },
    (error: AxiosError) => Promise.reject(error.response),
  );

  axiosInstance.interceptors.response.use(
    (res: AxiosResponse) => res,
    async (error: AxiosError) => {
      const { config, response } = error;

      if (!config || !response) {
        return Promise.reject(error);
      }

      if (response?.status !== 401) {
        return error;
      }

      try {
        await axiosRefreshAPI();

        return axiosInstance(config);
      } catch (refreshError) {
        return refreshError;
      }
    },
  );

  return axiosInstance;
})();

export { axiosAPI };
