import { useEffect, useState } from 'react';

import styled from '@emotion/styled';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import moment from 'moment';

import { createPlanMock } from '../plan/createPlanMock';

import Timetable from '@/components/timetable';
import useDateState from '@/stores/date';
import useCalendarUnitState from '@/stores/date/calendarUnit';
import { addMockPlan, clearMockPlans } from '@/stories/apis/data/plan';
import { padZero } from '@/utils/padZero';
export default {
  title: 'timetable/DayTimetable',
  component: Timetable,
  argTypes: {
    rangeAmount: { control: 'number' },
  },
} as ComponentMeta<typeof Timetable>;

const AddableTemplate: ComponentStory<typeof Timetable> = (args) => {
  const setId = useState<number>(1)[1];
  const { year, month, day } = useDateState();

  const { selectCalendarUnit } = useCalendarUnitState();
  useEffect(() => {
    selectCalendarUnit('일');
  }, []);

  const addSameTimePlan = () => {
    setId((prevId) => {
      addMockPlan({
        key: month,
        plan: createPlanMock({
          id: prevId,
          title: `임시 데이터 ${prevId}`,
          isAllDay: false,
          startTime: `${year}-${padZero(month)}-${padZero(day)}T03:00:00.000`,
          endTime: `${year}-${padZero(month)}-${padZero(day)}T06:00:00.000`,
        }),
      });

      return prevId + 1;
    });
  };

  const addRandomTimePlan = () => {
    const startHour = Math.round(Math.random() * 21);
    const startMinute = padZero(Math.round(Math.random() * 59));
    const startTime = `${year}-${padZero(month)}-${padZero(day)}T${padZero(
      startHour,
    )}:${startMinute}:00.000`;

    const periodMinutes = Math.round(Math.random() * 24 * 60);
    const endTime = moment(startTime).add(periodMinutes, 'minutes');

    setId((prevId) => {
      addMockPlan({
        key: month,
        plan: createPlanMock({
          id: prevId,
          title: `임시 데이터 ${prevId}`,
          isAllDay: false,
          startTime,
          endTime,
        }),
      });

      return prevId + 1;
    });
  };

  const clearPlans = () => {
    clearMockPlans();
    setId(1);
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

export const DayTimetable = AddableTemplate.bind({});
DayTimetable.args = { rangeAmount: 1 };
