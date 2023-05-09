import { useEffect, useState } from 'react';

import styled from '@emotion/styled';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import moment from 'moment';

import { createPlanMock } from '../plan/createPlanMock';

import Timetable from '@/components/timetable';
import { MONTH_PLANS_MOCK } from '@/constants/mock';
import useDateState from '@/stores/date';
import useCalendarUnitState from '@/stores/date/calendarUnit';
import { padZero } from '@/utils/padZero';

export default {
  title: 'timetable/DayTimetable',
  component: Timetable,
  argTypes: {
    rangeAmount: { control: 'number' },
  },
} as ComponentMeta<typeof Timetable>;

const Template: ComponentStory<typeof Timetable> = (args) => {
  const [id, setId] = useState<number>(10);
  const { year, month, day } = useDateState();

  const { selectCalendarUnit } = useCalendarUnitState();
  useEffect(() => {
    selectCalendarUnit('주');
  }, []);

  const addRangePlan = () => {
    const startOfWeek = moment(`${year}-${month}-${day}`)
      .startOf('week')
      .get('day');
    const isAllDay = Math.round(Math.random()) === 1;
    const startDay = startOfWeek + Math.round(Math.random() * 6);
    const endDay =
      startDay + Math.round(Math.random() * (6 - (startDay - startOfWeek))) + 1;

    MONTH_PLANS_MOCK[month] = [
      ...MONTH_PLANS_MOCK[month],
      createPlanMock({
        id,
        title: `임시 데이터 ${id}`,
        isAllDay,
        startTime: `${year}-${padZero(month)}-${padZero(startDay)}`,
        endTime: isAllDay
          ? null
          : `${year}-${padZero(month)}-${padZero(endDay)}`,
      }),
    ];

    console.log(
      createPlanMock({
        id,
        title: `임시 데이터 ${id}`,
        isAllDay,
        startTime: `${year}-${padZero(month)}-${padZero(startDay)}`,
        endTime: isAllDay
          ? null
          : `${year}-${padZero(month)}-${padZero(endDay)}`,
      }),
    );

    setId((prevId) => prevId + 1);
  };

  const clearPlans = () => {
    MONTH_PLANS_MOCK[month] = [];
    setId(1);
  };

  return (
    <Container>
      <div className="day-timetable-controls">
        <TestButton onClick={addRangePlan}>
          범위 안 종일 일정 추가하기
        </TestButton>
        <TestButton onClick={clearPlans}>해당 달의 일정 삭제하기</TestButton>
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

export const WeekTimetable = Template.bind({});
WeekTimetable.args = { rangeAmount: 7 };
