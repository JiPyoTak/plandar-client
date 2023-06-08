import React from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import moment, { Moment } from 'moment';

import CalendarDay from '../common/calendar/CalendarDay';

import { DAY_OF_WEEK_UNIT } from '@/constants';
import useDateState from '@/stores/date';
import { FONT_REGULAR_5 } from '@/styles/font';
import {
  TIMETABLE_CELL_MIN_WIDTH,
  TIMETABLE_SCROLL_WIDTH,
} from '@/styles/timetable';

type TProps = {
  dateMoments: Moment[];
};

const TimetableHeader: React.FC<TProps> = ({ dateMoments }) => {
  const { year, month, day, onChangeStoreDate } = useDateState();

  return (
    <Container>
      {dateMoments.map((dateMoment) => {
        const dateInfo = {
          year: dateMoment.get('year'),
          month: dateMoment.get('month') + 1,
          day: dateMoment.get('date'),
        };
        const format = 'YYYY-MM-DD';
        const formattedDate = dateMoment.format(format);
        const isToday = moment().format(format) === formattedDate;
        const isWeekend =
          dateMoment.weekday() === 0 || dateMoment.weekday() === 6;
        const isSelected =
          moment(`${year}-${month}-${day}`).format(format) === formattedDate;

        return (
          <Sizer>
            <SignDiv key={formattedDate}>
              <CalendarDay
                css={css`
                  width: 1.75rem;
                  height: 1.75rem;
                  margin-right: 0.25rem;
                `}
                isToday={isToday}
                isWeekend={isWeekend}
                isInMonth={true}
                isSelected={isSelected}
                format={formattedDate}
                onClick={() => onChangeStoreDate(dateInfo)}
                {...dateInfo}
              />
              <span>{DAY_OF_WEEK_UNIT[dateMoment.day()]}</span>
            </SignDiv>
            <Positional>
              <Liner />
            </Positional>
          </Sizer>
        );
      })}
      <EmptyScrollBar />
    </Container>
  );
};

const Container = styled.div`
  height: 50px;

  display: flex;
  user-select: none;
`;

const Sizer = styled.div`
  flex: 1 0 0;
  min-width: ${TIMETABLE_CELL_MIN_WIDTH};
`;

const SignDiv = styled.div`
  ${FONT_REGULAR_5}
  height: 100%;
  padding: 0 1rem 0 0.75rem;

  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;

  cursor: pointer;
`;

const Positional = styled.div`
  width: 100%;
  margin: 0;

  position: relative;
  bottom: 0;
  left: 0;
`;

const LINER_HEIGHT = '0.425rem';
const Liner = styled.div`
  width: calc(100% + 1px);
  height: ${LINER_HEIGHT};

  position: absolute;
  left: -1px;
  top: -${LINER_HEIGHT};

  border-right: 1px solid ${({ theme }) => theme.border2};
`;

const EmptyScrollBar = styled.div`
  flex: 0 0 ${TIMETABLE_SCROLL_WIDTH};
  height: 100%;
`;

export default TimetableHeader;
