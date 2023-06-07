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
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  height: 50px;
  padding-right: ${TIMETABLE_SCROLL_WIDTH};

  display: flex;
  user-select: none;
`;

const SignDiv = styled.div`
  ${FONT_REGULAR_5}

  flex: 1 0 0;
  min-width: ${TIMETABLE_CELL_MIN_WIDTH};
  padding: 0 1rem;

  display: flex;
  flex-wrap: nowrap;
  align-items: center;

  cursor: pointer;
`;

export default TimetableHeader;
