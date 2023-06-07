import React from 'react';

import styled from '@emotion/styled';
import { Moment } from 'moment';

import CalendarLayer from '../calendars/large/CalendarLayer';

import DaysPlanManager from '@/plan/DaysPlanManager';
import Plan from '@/plan/Plan';
import {
  TIMETABLE_CELL_MIN_WIDTH,
  TIMETABLE_SCROLL_WIDTH,
} from '@/styles/timetable';
import { getYMDByDateFormat } from '@/utils/date/getYMDByDateFormat';

type TProps = {
  dateMoments: Moment[];
  allDayPlans: Plan[];
};

const TimetableAllDay: React.FC<TProps> = ({ dateMoments, allDayPlans }) => {
  const [start, end] = getYMDByDateFormat(
    dateMoments[0].toString(),
    dateMoments[dateMoments.length - 1].toString(),
  );
  const planManager = new DaysPlanManager({ plans: allDayPlans, start, end });
  const height = planManager.daysIndex.reduce(
    (acc, arr) => Math.max(acc, arr.length),
    0,
  );

  return (
    <Container css={{ height: height * 24 + 16 }}>
      <Content
        css={{
          minWidth: `calc(${TIMETABLE_CELL_MIN_WIDTH} * ${dateMoments.length})`,
        }}
      >
        <CalendarLayer css={{ top: 8 }} planManager={planManager} />
      </Content>
      <Row>
        {dateMoments.map((_, index) => {
          return <AllDayCell key={index} />;
        })}
      </Row>
    </Container>
  );
};

const Container = styled.div`
  flex: 1;
  min-height: 1.75rem;
  padding-right: ${TIMETABLE_SCROLL_WIDTH};
`;

const Content = styled.div`
  width: 100%;
  position: relative;
`;

const Row = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const AllDayCell = styled.div`
  flex: 1 0 auto;

  min-width: ${TIMETABLE_CELL_MIN_WIDTH};
  border-left: 1px solid ${({ theme }) => theme.border2};
`;

export default TimetableAllDay;
