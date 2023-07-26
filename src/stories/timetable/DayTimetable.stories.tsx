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
  title: 'Timetable/DayTimetable',
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
    setCalendarUnit('day');
  }, []);

  const { mutateAsync: createMutateAsync } = useCreatePlanMutation();
  const queryClient = useQueryClient();
  const forceUpdate = useReducer(() => ({}), {})[1];

  const addSameTimePlan = () => {
    createMutateAsync(
      planStubManager.add({
        isAllDay: false,
        // * : Moment.add is errored with storybook-vite-source-loader-plugin (string.toLowerCase)
        /// Use Literal String for props[0]
        //// refs: https://github.com/storybookjs/storybook/issues/12208
        startTime: moment(referenceDate).startOf('day').add(`${3}`, 'hour'),
        endTime: moment(referenceDate).startOf('day').add(`${6}`, 'hour'),
      }),
    );
  };

  const addRandomTimePlan = () => {
    const startHour = Math.round(Math.random() * 21);
    const startMinute = Math.round(Math.random() * 59);
    const startTime = moment(referenceDate)
      .startOf('day')
      .set('hours', startHour)
      .set('minutes', startMinute);

    const periodMinutes = Math.round(Math.random() * 24 * 60);
    const endTime = moment(startTime).add(periodMinutes, 'minutes');
    createMutateAsync(
      planStubManager.add({
        isAllDay: false,
        startTime,
        endTime,
      }),
    );
  };

  const clearPlans = () => {
    planStubManager.clear();
    queryClient.clear();
    forceUpdate();
  };

  return (
    <Container>
      <div className="day-timetable-controls">
        <TestButton onClick={addSameTimePlan}>
          오후 03시 ~ 06시 일정 추가하기
        </TestButton>
        <TestButton onClick={addRandomTimePlan}>랜덤 일정 추가하기</TestButton>
        <TestButton onClick={clearPlans}>모든 일정 삭제하기</TestButton>
      </div>
      <div className="day-timetable-main">
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

  .day-timetable-controls {
    flex: 0;
    padding: 1rem;

    display: flex;
    column-gap: 1rem;
  }

  .day-timetable-main {
    flex: 1 0 0;
  }
`;

const TestButton = styled.button`
  padding: 0.5rem;
  border: 1px solid black;
  border-radius: 8px;
`;

export const Primary = Template.bind({});
Primary.args = { rangeAmount: 1 };
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
