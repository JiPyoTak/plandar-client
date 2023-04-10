import { axiosAPI } from '@/apis/axios';
import { IUser } from '@/stores/user';

const getUserAPI = async (): Promise<{ success: boolean; data: IUser }> => {
  const { data } = await axiosAPI.get(`/user`);
  return data;
};

export { getUserAPI };
