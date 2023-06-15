import { useEffect, useState } from 'react';

import styled from '@emotion/styled';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import moment from 'moment';

import Timetable from '@/components/timetable';
import useDateState from '@/stores/date';
import useCalendarUnitState from '@/stores/date/calendarUnit';
import { addPlanStub, clearPlanStubs } from '@/stories/apis/data/plan';
import { createPlanStub } from '@/stories/utils/createPlanStub';

export default {
  title: 'timetable/DayTimetable',
  component: Timetable,
  argTypes: {
    rangeAmount: { control: 'number' },
  },
} as ComponentMeta<typeof Timetable>;

const Template: ComponentStory<typeof Timetable> = (args) => {
  const setId = useState<number>(1)[1];
  const { year, month, day } = useDateState();

  const { selectCalendarUnit } = useCalendarUnitState();
  useEffect(() => {
    selectCalendarUnit('주');
  }, []);

  const addRandomAlldayPlan = () => {
    const startOfWeek = moment(`${year}-${month}-${day}`).startOf('week');
    const startGap = Math.round(Math.random() * 7) - 1;
    const planTerm = Math.round(Math.random() * 7);
    const startTime = moment(startOfWeek).add(startGap, 'days');

    const minimumMoment = startTime.isBefore(startOfWeek)
      ? startOfWeek
      : startTime;
    const endTime = moment(minimumMoment).add(planTerm, 'days');

    setId((prevId) => {
      addPlanStub(
        createPlanStub({
          id: prevId,
          title: `임시 데이터 ${prevId}`,
          isAllDay: true,
          startTime,
          endTime,
        }),
      );

      return prevId + 1;
    });
  };

  const addRandomTimePlan = () => {
    const startOfWeek = moment(`${year}-${month}-${day}`).startOf('week');
    const dayPeriod = Math.round(Math.random() * 6);
    const startHour = Math.round(Math.random() * 21);
    const startMinute = Math.round(Math.random() * 59);
    const startPeriod = startHour * 60 + startMinute;

    const startTime = moment(startOfWeek)
      .add(dayPeriod, 'days')
      .add(startPeriod, 'minutes');

    const periodMinutes = Math.round(Math.random() * (24 * 60 - 16)) + 15;
    const endTime = moment(startTime).add(periodMinutes, 'minutes');

    setId((prevId) => {
      addPlanStub(
        createPlanStub({
          id: prevId,
          title: `임시 데이터 ${prevId}`,
          isAllDay: false,
          startTime,
          endTime,
        }),
      );

      return prevId + 1;
    });
  };

  const addPlanGroup = () => {
    for (let i = 0; i < 10; i++) {
      Math.random() < 0.5 ? addRandomAlldayPlan() : addRandomTimePlan();
    }
  };

  const clearPlans = () => {
    clearPlanStubs();
    setId(1);
  };

  return (
    <Container>
      <div className="week-timetable-controls">
        <TestButton onClick={addPlanGroup}>랜덤 10개 일정 추가하기</TestButton>
        <TestButton onClick={addRandomAlldayPlan}>
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

export const WeekTimetable = Template.bind({});
WeekTimetable.args = { rangeAmount: 7 };
