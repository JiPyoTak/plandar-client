import moment from 'moment';

import Plan from '@/plan/Plan';
import { TColor } from '@/types';
import { IPlan } from '@/types/rq/plan';

const createRandomColor = () => {
  return `#${Math.round(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, '0')}` as TColor;
};

const createPlanMock = (planData: Partial<IPlan>) => {
  const startTime = moment(planData.startTime ?? Date.now())
    .local(true)
    .toDate()
    .toUTCString();
  const endTime = moment(planData.endTime ?? Date.now())
    .local(true)
    .toDate()
    .toUTCString();

  return new Plan({
    id: Math.floor(Math.random() * 100),
    title: `임시 데이터`,
    description: '설명 보아서 무엇을 할 것인가',
    isAllDay: true,
    type: 'task',
    color: createRandomColor(),
    categoryId: 1,
    tags: ['태그1', '태그2'],
    ...planData,
    startTime,
    endTime,
  });
};

export { createPlanMock };
