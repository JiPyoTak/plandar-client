import { useEffect, useReducer } from 'react';

import styled from '@emotion/styled';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { useQueryClient } from '@tanstack/react-query';
import moment from 'moment';

import Timetable from '@/components/home/main/timetable';
import { useCreatePlanMutation } from '@/hooks/query/plan';
import useDateState from '@/stores/date';
import planStubManager from '@/stories/apis/data/plan';
import {
  createPlanApiHandler,
  deletePlanApiHandler,
  getPlansApiHandler,
  updatePlanApiHandler,
} from '@/stories/apis/plan';

export default {
  title: 'Timetable/WeekTimetable',
  component: Timetable,
  argTypes: {
    rangeAmount: { control: 'number' },
  },
} as ComponentMeta<typeof Timetable>;

const Template: ComponentStory<typeof Timetable> = (args) => {
  const { referenceDate, setCalendarUnit } = useDateState(
    ({ referenceDate, setCalendarUnit }) => ({
      referenceDate,
      setCalendarUnit,
    }),
  );

  useEffect(() => {
    setCalendarUnit('week');
  }, []);

  const { mutateAsync: createMutateAsync } = useCreatePlanMutation();
  const queryClient = useQueryClient();
  const forceUpdate = useReducer(() => ({}), {})[1];

  const addRandomAllDayPlan = () => {
    const startOfWeek = moment(referenceDate).startOf('week');
    const startGap = Math.round(Math.random() * 7) - 1;
    const planTerm = Math.round(Math.random() * 7);
    const startTime = moment(startOfWeek).add(startGap, 'days');

    const minimumMoment = startTime.isBefore(startOfWeek)
      ? startOfWeek
      : startTime;
    const endTime = moment(minimumMoment).add(planTerm, 'days');

    createMutateAsync(
      planStubManager.add({
        isAllDay: true,
        startTime,
        endTime,
      }),
    );
  };

  const addRandomTimePlan = () => {
    const startOfWeek = moment(referenceDate).startOf('week');
    const dayPeriod = Math.round(Math.random() * 6);
    const startHour = Math.round(Math.random() * 21);
    const startMinute = Math.round(Math.random() * 59);
    const startPeriod = startHour * 60 + startMinute;

    const startTime = moment(startOfWeek)
      .add(dayPeriod, 'days')
      .add(startPeriod, 'minutes');

    const periodMinutes = Math.round(Math.random() * (24 * 60 - 16)) + 15;
    const endTime = moment(startTime).add(periodMinutes, 'minutes');

    createMutateAsync(
      planStubManager.add({
        isAllDay: false,
        startTime,
        endTime,
      }),
    );
  };

  const addPlanGroup = () => {
    for (let i = 0; i < 10; i++) {
      Math.random() < 0.5 ? addRandomAllDayPlan() : addRandomTimePlan();
    }
  };

  const clearPlans = () => {
    planStubManager.clear();
    queryClient.clear();
    forceUpdate();
  };

  return (
    <Container>
      <div className="week-timetable-controls">
        <TestButton onClick={addPlanGroup}>랜덤 10개 일정 추가하기</TestButton>
        <TestButton onClick={addRandomAllDayPlan}>
          범위 안 종일 일정 추가하기
        </TestButton>
        <TestButton onClick={addRandomTimePlan}>
          범위 안 시간 일정 추가하기
        </TestButton>
        <TestButton onClick={clearPlans}>모든 일정 삭제하기</TestButton>
      </div>
      <div className="week-timetable-main">
        <Timetable {...args} />
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;

  .week-timetable-controls {
    flex: 0;
    padding: 1rem;

    display: flex;
    column-gap: 1rem;
  }

  .week-timetable-main {
    flex: 1 0 0;
  }
`;

const TestButton = styled.button`
  padding: 0.5rem;
  border: 1px solid black;
  border-radius: 8px;
`;

export const Primary = Template.bind({});
Primary.args = { rangeAmount: 7 };
Primary.parameters = {
  msw: {
    handlers: [
      getPlansApiHandler,
      createPlanApiHandler,
      updatePlanApiHandler,
      deletePlanApiHandler,
    ],
  },
};
