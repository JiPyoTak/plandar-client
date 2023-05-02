import axios from 'axios';

import { axiosAPI } from '@/apis/axios';
import { SERVER_URL } from '@/constants';
import { IUser } from '@/stores/user';

const getUserAPI = async (): Promise<IUser> => {
  const { data } = await axiosAPI.get<IUser>(`/user`);

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
