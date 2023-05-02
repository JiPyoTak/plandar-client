import { axiosAPI } from '@/apis/axios';
import { ITag, ITagWithoutId } from '@/types/rq/tag';

const getTagAPI = async (): Promise<ITag[]> => {
  const { data } = await axiosAPI.get(`/tag`);
  return data.data;
};

const createTagAPI = async (category: ITagWithoutId): Promise<ITag> => {
  const { data } = await axiosAPI.post(`/tag`, category);
  return data.data;
};

const updateTagAPI = async (tag: ITag): Promise<ITag> => {
  const { data } = await axiosAPI.put(`/tag/${tag.id}`, tag);
  return data.data;
};

export { getTagAPI, createTagAPI, updateTagAPI };
