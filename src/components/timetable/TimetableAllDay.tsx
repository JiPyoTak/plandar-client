import React from 'react';

import styled from '@emotion/styled';
import { Moment } from 'moment';

import CalendarLayer from '../calendars/large/CalendarLayer';

import DaysPlanManager from '@/plan/DaysPlanManager';
import Plan from '@/plan/Plan';
import {
  TIMETABLE_CELL_MIN_WIDTH,
  TIMETABLE_SCROLL_WIDTH,
  TimetableGuide,
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
    <>
      <div
        css={{
          position: 'relative',
          width: 'calc(100% - 4rem)',
          marginLeft: '4rem',
        }}
      >
        <CalendarLayer css={{ top: 8 }} planManager={planManager} />
      </div>
      <Container css={{ height: height * 24 + 16 }}>
        <TimetableGuide
          css={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          종일
        </TimetableGuide>
        {dateMoments.map((_, index) => {
          return <AllDayItem key={index} />;
        })}
      </Container>
    </>
  );
};

const Container = styled.div`
  min-height: 1.75rem;
  padding-right: ${TIMETABLE_SCROLL_WIDTH};

  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.border2};
  user-select: none;
`;

const AllDayItem = styled.div`
  flex: 1 0 auto;

  min-width: ${TIMETABLE_CELL_MIN_WIDTH};
  border-left: 1px solid ${({ theme }) => theme.border2};
`;

export default TimetableAllDay;
