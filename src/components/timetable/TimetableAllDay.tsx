import React from 'react';

import styled from '@emotion/styled';
import { Moment } from 'moment';

import CalendarLayer from '../calendars/large/CalendarLayer';

import DaysPlanManager from '@/plan/DaysPlanManager';
import Plan from '@/plan/Plan';
import {
  TIMETABLE_CELL_MIN_WIDTH,
  TIMETABLE_SCROLL_STYLE,
} from '@/styles/timetable';
import { getYMDByDateFormat } from '@/utils/date/getYMDByDateFormat';

type TProps = {
  dateMoments: Moment[];
  allDayPlans: Plan[];
};

const VERTICAL_PADDING = 8;
const ALLDAY_PLAN_HEIGHT = 24;

const TimetableAllDay: React.FC<TProps> = ({ dateMoments, allDayPlans }) => {
  const [start, end] = getYMDByDateFormat(
    dateMoments[0].toString(),
    dateMoments[dateMoments.length - 1].toString(),
  );
  const planManager = new DaysPlanManager({ plans: allDayPlans, start, end });
  const itemMaxCount = planManager.daysIndex.reduce(
    (acc, arr) => Math.max(acc, arr.length),
    0,
  );

  return (
    <Container>
      <Content
        css={{
          minWidth: `calc(${TIMETABLE_CELL_MIN_WIDTH} * ${dateMoments.length})`,
        }}
      >
        <CalendarLayer
          css={{ top: VERTICAL_PADDING }}
          planManager={planManager}
        />
      </Content>
      <Row
        css={{
          height: itemMaxCount * ALLDAY_PLAN_HEIGHT + VERTICAL_PADDING * 2,
        }}
      >
        {dateMoments.map((_, index) => {
          return <AllDayCell key={index} />;
        })}
      </Row>
    </Container>
  );
};

const Container = styled.div`
  ${TIMETABLE_SCROLL_STYLE}

  flex: 1;
  min-height: 1.75rem;
  max-height: ${8 * ALLDAY_PLAN_HEIGHT + VERTICAL_PADDING * 2}px;

  overflow-x: hidden;
  overflow-y: scroll;
`;

const Content = styled.div`
  width: 100%;
  position: relative;
  display: flex;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
`;

const AllDayCell = styled.div`
  flex: 1 0 auto;

  min-width: ${TIMETABLE_CELL_MIN_WIDTH};
  border-right: 1px solid ${({ theme }) => theme.border2};
`;

export default TimetableAllDay;
