import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createPlanApi,
  deletePlanApi,
  getPlansApi,
  updatePlanApi,
} from '@/apis/plan';

import { IPlan, TPlanInput } from '@/types/rq/plan';
import { getFormattedDate } from '@/utils/date/getFormattedDate';
import { getStartAndEndDate } from '@/utils/date/getStartAndEndDate';
import { getYMDByDateFormat } from '@/utils/date/getYMDByDateFormat';

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
  const [startYMD, endYMD] = getYMDByDateFormat(start, end);

  const diff =
    endYMD.year * 12 + endYMD.month - (startYMD.year * 12 + startYMD.month);

  // 일정의 시작, 끝 날짜를 기준으로 해당 일정이 포함되는 달의 일정을 모두 가져옴
  for (let i = 0; i <= diff; i++) {
    const YMD = {
      year: startYMD.year + Math.floor((startYMD.month + i) / 12),
      month: ((startYMD.month + i) % 12) + 1,
      day: 1,
    };

    const dates = getStartAndEndDate(YMD);
    const { startFormat, endFormat } = getFormattedDate(...dates);

    cb(startFormat, endFormat);
  }
};

const addQueriesData = (data: IPlan) => (timemin: string, timemax: string) => {
  const queryClient = useQueryClient();

  const prevData = queryClient.getQueryData<IPlan[] | undefined>([
    'plans',
    { timemin, timemax },
  ]);

  if (!prevData) return;

  queryClient.setQueriesData(
    ['plans', { timemin, timemax }],
    (oldData: IPlan[] | undefined) => {
      return [...(oldData ?? []), data];
    },
  );
};

const removeQueriesData =
  (id: number) => (timemin: string, timemax: string) => {
    const queryClient = useQueryClient();

    queryClient.setQueriesData(
      ['plans', { timemin, timemax }],
      (oldData: IPlan[] | undefined) => {
        if (!oldData) return;

        return oldData.filter((plan) => plan.id !== id);
      },
    );
  };

const useGetPlansQuery = ({ timemin, timemax }: IGetPlansPayload) => {
  const queryClient = useQueryClient();

  return useQuery<IPlan[]>(
    ['plans', { timemin, timemax }],
    () => getPlansApi({ timemin, timemax }),
    {
      onSuccess(data) {
        for (let i = 0; i < data.length; i++) {
          queryClient.setQueryData(['plan', { id: data[i].id }], data[i]);
        }
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

      const callback = addQueriesData(data);

      executeCallbackByDate(startTime, endTime, callback);
      queryClient.setQueryData(['plan', { id: data.id }], data);
    },
  });
};

// 기존 존재하던 일정을 제거하고 변경된 일정을 추가
const useUpdatePlanMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<IPlan, unknown, TPlanInput>(updatePlanApi, {
    onSuccess(data, variables) {
      // 기존 일정을 제거
      const prev = queryClient.getQueryData<IPlan>(['plan', { id: data.id }]);

      if (!prev) return;

      const { startTime, endTime } = prev;

      const cbByRemove = removeQueriesData(data.id);

      executeCallbackByDate(startTime, endTime, cbByRemove);

      // 변경된 일정을 추가
      const { startTime: newStartTime, endTime: newEndTime } = variables;

      const cbByAdd = addQueriesData(data);

      executeCallbackByDate(newStartTime, newEndTime, cbByAdd);
      queryClient.setQueryData(['plan', { id: data.id }], data);
    },
  });
};

const useDeletePlanMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<IPlan, unknown, number>(deletePlanApi, {
    onSuccess(data, variables) {
      const { startTime, endTime } = data;

      const callback = removeQueriesData(variables);

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
