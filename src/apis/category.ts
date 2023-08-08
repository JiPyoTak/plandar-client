import { axiosAPI } from '@/apis/axios';
import { ICategory, ICategoryWithoutId } from '@/types/query/category';

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

const deleteCategoryAPI = async (category: ICategory): Promise<ICategory> => {
  const { data } = await axiosAPI.delete(`/category/${category.id}`);

  return data;
};

export {
  getCategoryAPI,
  createCategoryAPI,
  updateCategoryAPI,
  deleteCategoryAPI,
};
