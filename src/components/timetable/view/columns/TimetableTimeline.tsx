import React, { memo } from 'react';

import styled from '@emotion/styled';

import moment from 'moment';

import { TIMETABLE_CELL_AMOUNT, TIMETABLE_CELL_PER_HOUR } from '@/constants';
import { TIMETABLE_CELL_HEIGHT } from '@/styles/timetable';
import { getTimeString } from '@/utils/date/getTimeString';

const TIMELINE_CELL_AMOUNT = Math.floor(
  TIMETABLE_CELL_AMOUNT / TIMETABLE_CELL_PER_HOUR,
);

const TimetableTimeline: React.FC = () => {
  return (
    <>
      {Array.from(Array(TIMELINE_CELL_AMOUNT), (_, index) => {
        const isFirst = index === 0;
        const date = moment().startOf('day').set('hour', index).toDate();

        return (
          <HourSpace key={index}>
            {!isFirst && (
              <HourSpan>{getTimeString(date, { showMinutes: false })}</HourSpan>
            )}
          </HourSpace>
        );
      })}
    </>
  );
};

const HourSpace = styled.div`
  padding: 0 0.25rem;
  width: 100%;
  height: calc(${TIMETABLE_CELL_HEIGHT} * ${TIMETABLE_CELL_PER_HOUR});

  border-right: 1px solid ${({ theme }) => theme.border2};
`;

const HourSpan = styled.span`
  width: 100%;

  display: block;
  transform: translateY(-50%);
`;

export default memo(TimetableTimeline);
