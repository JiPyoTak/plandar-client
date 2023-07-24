import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import moment from 'moment';

import {
  createPlanApi,
  deletePlanApi,
  getPlansApi,
  updatePlanApi,
} from '@/apis/plan';

import Plan from '@/core/plan/Plan';
import { IPlan, TPlanInput } from '@/types/query/plan';
import { getStartAndEndDate } from '@/utils/date/getStartAndEndDate';

export interface IGetPlansPayload {
  timemin: string;
  timemax: string;
}

// 입략받은 시작, 종료날짜에 따라 입력받은 callback 함수를 실행하는 함수
const executeCallbackByDate = (
  start: string,
  end: string,
  cb: (timemin: string, timemax: string) => void,
) => {
  const startMoment = moment(start).startOf('w').startOf('month').startOf('d');
  const endMoment = moment(end).endOf('w').endOf('month').endOf('d');

  const monthDiff = endMoment.diff(startMoment, 'month');

  // 일정의 시작, 끝 날짜를 기준으로 해당 일정이 포함되는 달의 일정을 모두 가져옴
  for (let i = 0; i <= monthDiff; i++) {
    const targetMoment = moment(startMoment).add(i, 'month');
    const [from, to] = getStartAndEndDate(targetMoment);

    cb(from.format(), to.format());
  }
};

const addQueriesData =
  (data: IPlan, queryClient: QueryClient) =>
  (timemin: string, timemax: string) => {
    const key = ['plans', { timemin, timemax }];

    const prevData = queryClient.getQueryData<IPlan[] | undefined>(key);

    if (!prevData) return;

    queryClient.setQueriesData<IPlan[]>(key, (oldData) => {
      return [...(oldData ?? []), new Plan(data)];
    });
  };

const removeQueriesData =
  (id: number, queryClient: QueryClient) =>
  (timemin: string, timemax: string) => {
    const key = ['plans', { timemin, timemax }];

    const prevData = queryClient.getQueryData<IPlan[] | undefined>(key);

    if (!prevData) return;

    queryClient.setQueriesData<IPlan[]>(key, (oldData) => {
      if (!oldData) return;

      return oldData.filter((plan) => plan.id !== id);
    });
  };

const useGetPlansQuery = ({ timemin, timemax }: IGetPlansPayload) => {
  const queryClient = useQueryClient();

  return useQuery<IPlan[]>(
    ['plans', { timemin, timemax }],
    () => getPlansApi({ timemin, timemax }),
    {
      staleTime: 1000 * 60 * 60 * 24,
      onSuccess(data) {
        data.forEach((plan) =>
          queryClient.setQueryData(['plan', { id: plan.id }], new Plan(plan)),
        );
      },
    },
  );
};

// 해당 요청 성공시 캐시 업데이트
const useCreatePlanMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<IPlan, unknown, TPlanInput>(createPlanApi, {
    onSuccess(data, variables) {
      const { startTime, endTime } = variables;

      const callback = addQueriesData(data, queryClient);

      executeCallbackByDate(startTime, endTime, callback);
      queryClient.setQueryData(['plan', { id: data.id }], new Plan(data));
    },
  });
};

// 기존 존재하던 일정을 제거하고 변경된 일정을 추가
const useUpdatePlanMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<IPlan, unknown, TPlanInput>(updatePlanApi, {
    onSuccess(data, variables) {
      // 기존 일정을 제거
      const prev = queryClient.getQueryData<Plan>(['plan', { id: data.id }]);

      if (!prev) return;

      const { startTime, endTime } = prev;

      const cbByRemove = removeQueriesData(data.id, queryClient);

      executeCallbackByDate(startTime, endTime, cbByRemove);

      // 변경된 일정을 추가
      const { startTime: newStartTime, endTime: newEndTime } = variables;

      const cbByAdd = addQueriesData(data, queryClient);

      executeCallbackByDate(newStartTime, newEndTime, cbByAdd);

      queryClient.setQueryData(['plan', { id: data.id }], new Plan(data));
    },
  });
};

const useDeletePlanMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<IPlan, unknown, number>(deletePlanApi, {
    onSuccess(data, variables) {
      const { startTime, endTime } = data;

      const callback = removeQueriesData(variables, queryClient);

      executeCallbackByDate(startTime, endTime, callback);
      queryClient.removeQueries(['plan', { id: data.id }]);
    },
  });
};

export {
  useGetPlansQuery,
  useCreatePlanMutation,
  useUpdatePlanMutation,
  useDeletePlanMutation,
};
