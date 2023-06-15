import React, { useEffect, useRef } from 'react';

import styled from '@emotion/styled';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import moment from 'moment';

import CalendarView from '@/components/calendars/large';
import CalendarHeader from '@/components/common/calendar/CalendarHeader';
import { CALENDAR_UNIT } from '@/constants';
import { useCreatePlanMutation } from '@/hooks/rq/plan';
import useDateState from '@/stores/date';
import useCalendarUnitState from '@/stores/date/calendarUnit';
import planStubManager from '@/stories/apis/data/plan';
import {
  createPlanApiHandler,
  deletePlanApiHandler,
  getPlansApiHandler,
  updatePlanApiHandler,
} from '@/stories/apis/plan';
import { getFormattedDate } from '@/utils/date/getFormattedDate';
import { getStartAndEndDate } from '@/utils/date/getStartAndEndDate';

export default {
  title: 'calendars/LargeCalendar',
  component: CalendarView,
} as ComponentMeta<typeof CalendarView>;

const Template: ComponentStory<typeof CalendarView> = () => {
  const idRef = useRef<number>(1);

  const { selectCalendarUnit } = useCalendarUnitState();
  useEffect(() => {
    selectCalendarUnit(CALENDAR_UNIT[2]);
  }, []);

  const { year, month, day } = useDateState();
  const { startFormat } = getFormattedDate(
    ...getStartAndEndDate({ year, month, day }),
  );
  const { mutateAsync } = useCreatePlanMutation();

  const addRandomAlldayPlan = () => {
    const daysInMonth = moment({ year, month: month - 1, day }).daysInMonth();
    const startOfMonth = moment(startFormat);
    const planTerm = Math.round(Math.random() * (daysInMonth - 1)) + 1;
    const startGap =
      Math.floor(Math.random() * (planTerm + daysInMonth - 2)) - planTerm;
    const startTime = moment(startOfMonth).add(startGap, 'days');
    const endTime = moment(startTime).add(planTerm, 'days');

    const id = idRef.current;
    idRef.current += 1;
    mutateAsync(
      planStubManager.createStub({
        id,
        title: `임시 데이터 ${id}`,
        isAllDay: true,
        startTime: startTime.toString(),
        endTime: endTime.toString(),
      }),
    );
  };

  return (
    <Container>
      <div className="large-calendar-controls">
        <TestButton onClick={addRandomAlldayPlan}>
          범위 안 종일 일정 추가하기
        </TestButton>
      </div>
      <div className="large-calendar-main">
        <CalendarView />
      </div>
    </Container>
  );
};
const Template2 = () => <CalendarHeader />;

const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;

  .large-calendar-controls {
    flex: 0;
    padding: 1rem;

    display: flex;
    column-gap: 1rem;
  }

  .large-calendar-main {
    flex: 1 0 0;

    overflow-y: scroll;
  }
`;

const TestButton = styled.button`
  padding: 0.5rem;
  border: 1px solid black;
  border-radius: 8px;
`;

export const View = Template.bind({});
View.args = {};
View.parameters = {
  msw: {
    handlers: [
      getPlansApiHandler,
      createPlanApiHandler,
      updatePlanApiHandler,
      deletePlanApiHandler,
    ],
  },
};

export const Header = Template2.bind({});
Template2.args = {};
