import axios from 'axios';

import { axiosAPI } from '@/apis/axios';
import { IUser } from '@/stores/user';
import { SERVER_URL } from '@/utils/constants';

const getUserAPI = async (): Promise<{ success: boolean; data: IUser }> => {
  const { data } = await axiosAPI.get(`/user`);
  return data;
};

const logoutAPI = () => {
  return axios.post(
    `/auth/logout`,
    {},
    { baseURL: SERVER_URL, withCredentials: true },
  );
};

export { getUserAPI, logoutAPI };
