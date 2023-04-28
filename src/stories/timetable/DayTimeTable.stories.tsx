import { useEffect, useState } from 'react';

import styled from '@emotion/styled';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import Timetable from '@/components/timetable';
import useDateState from '@/stores/date';
import useCalendarUnitState from '@/stores/date/calendarUnit';
import { IPlan } from '@/types/rq/plan';
import { MONTH_PLANS_MOCK } from '@/utils/mock';
import { padZero } from '@/utils/padZero';
export default {
  title: 'timetable/DayTimetable',
  component: Timetable,
  argTypes: {
    rangeAmount: { control: 'number' },
  },
} as ComponentMeta<typeof Timetable>;

const createRandomColor = () => {
  return `#${Math.round(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, '0')}`;
};

const createTempPlan = (planData: Partial<IPlan>) => {
  return {
    title: `임시 데이터`,
    description: '설명 보아서 무엇을 할 것인가',
    isAllDay: true,
    type: 'task',
    startTime: Date.now().toLocaleString(),
    endTime: null,
    color: createRandomColor(),
    categoryId: 1,
    tags: ['태그1', '태그2'],
    ...planData,
  } as IPlan;
};

const AddableTemplate: ComponentStory<typeof Timetable> = (args) => {
  const [id, setId] = useState<number>(10);
  const { year, month, day } = useDateState();

  const { selectCalendarUnit } = useCalendarUnitState();
  useEffect(() => {
    selectCalendarUnit('일');
  }, []);

  const addSameTimePlan = () => {
    MONTH_PLANS_MOCK[month] = [
      ...MONTH_PLANS_MOCK[month],
      createTempPlan({
        id,
        title: `임시 데이터 ${id}`,
        isAllDay: false,
        startTime: `${year}-${padZero(month)}-${padZero(day)}T03:00:00.000`,
        endTime: `${year}-${padZero(month)}-${padZero(day)}`,
      }),
    ];

    setId((prevId) => prevId + 1);
  };

  const addRandomPlan = () => {
    const startHour = Math.round(Math.random() * 21);
    const startMinute = padZero(Math.round(Math.random() * 59));

    const endHour = padZero(
      Math.round(Math.random() * (22 - startHour) + startHour + 1),
    );
    const endMinute = padZero(Math.round(Math.random() * 59));

    MONTH_PLANS_MOCK[month] = [
      ...MONTH_PLANS_MOCK[month],
      createTempPlan({
        id,
        title: `임시 데이터 ${id}`,
        isAllDay: false,
        startTime: `${year}-${padZero(month)}-${padZero(day)}T${padZero(
          startHour,
        )}:${startMinute}:00.000`,
        endTime: `${year}-${padZero(month)}-${padZero(
          day,
        )}T${endHour}:${endMinute}:00.000`,
      }),
    ];

    setId((prev) => prev + 1);
  };

  const clearPlans = () => {
    MONTH_PLANS_MOCK[month] = [];
    setId(1);
  };

  return (
    <Container>
      <div className="day-timetable-controls">
        <TestButton onClick={addSameTimePlan}>
          오전 3시 ~ 5시 일정 추가하기
        </TestButton>
        <TestButton onClick={addRandomPlan}>랜덤 일정 추가하기</TestButton>
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

export const DayTimeTable = AddableTemplate.bind({});
DayTimeTable.args = { rangeAmount: 1 };
