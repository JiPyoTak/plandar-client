import { axiosAPI } from '@/apis/axios';
import { ICategory, ICategoryWithoutId } from '@/types/rq/category';

const getCategoryAPI = async (): Promise<ICategory[]> => {
  const { data } = await axiosAPI.get(`/category`);
  return data;
};

const createCategoryAPI = async (
  category: ICategoryWithoutId,
): Promise<ICategory> => {
  const { data } = await axiosAPI.post(`/category`, category);
  return data;
};

const updateCategoryAPI = async (category: ICategory): Promise<ICategory> => {
  const { data } = await axiosAPI.put(`/category/${category.id}`, category);
  return data;
};

export { getCategoryAPI, createCategoryAPI, updateCategoryAPI };
