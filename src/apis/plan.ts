import { axiosAPI } from './axios';
import { IGetPlansPayload } from '@/hooks/rq/plan';
import { IPlan, TPlanInput } from '@/types/rq/plan';

const getPlansApi = async ({ timemin, timemax }: IGetPlansPayload) => {
  const { data } = await axiosAPI.get('/plan/between', {
    params: { timemin, timemax },
  });

  return data;
};

const createPlanApi = async (input: TPlanInput) => {
  const { data } = await axiosAPI.post<IPlan>('/plan', input);

  return data;
};

const updatePlanApi = async ({ id, ...input }: Partial<IPlan>) => {
  const { data } = await axiosAPI.put(`/plan/${id}`, input);

  return data;
};

const deletePlanApi = async (id: number) => {
  const { data } = await axiosAPI.delete(`/plan/${id}`);

  return data;
};

export { getPlansApi, createPlanApi, updatePlanApi, deletePlanApi };
