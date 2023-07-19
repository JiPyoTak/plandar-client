import React from 'react';

import styled from '@emotion/styled';
import moment, { Moment } from 'moment';

import TimetableScroll from './TimetableScroll';
import CalendarDay from '@/components/core/calendar/CalendarDay';

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

const DATE_FORMAT = 'YYYY-MM-DD';
const getCalendarInfo = (dateMoment: Moment, selectedFormat: string) => {
  const format = dateMoment.format(DATE_FORMAT);
  const weekday = dateMoment.weekday();

  return {
    year: dateMoment.get('year'),
    month: dateMoment.get('month') + 1,
    day: dateMoment.get('date'),
    format,
    isToday: moment().format(DATE_FORMAT) === format,
    isWeekend: weekday === 0 || weekday === 6,
    isInMonth: true,
    isSelected: format === selectedFormat,
  };
};

const TimetableHeader: React.FC<TProps> = ({ dateMoments }) => {
  const { year, month, day, onChangeStoreDate } = useDateState();
  const selectedFormat = moment(`${year}-${month}-${day}`).format(DATE_FORMAT);
  const timezone = `GTM${dateMoments[0].format('Z')}`;

  return (
    <TimetableScroll.Horizontal
      scrollId="header"
      fixedComponent={<ZoneText>{timezone}</ZoneText>}
    >
      <Container>
        {dateMoments.map((dateMoment) => {
          const calendarInfo = getCalendarInfo(dateMoment, selectedFormat);
          const { year, month, day } = calendarInfo;

          return (
            <DaySizer key={calendarInfo.format}>
              <DayContent>
                <DayNumber
                  {...calendarInfo}
                  onClick={() => onChangeStoreDate({ year, month, day })}
                />
                <span>{DAY_OF_WEEK_UNIT[dateMoment.day()]}</span>
              </DayContent>
              <DayBorderLiner />
            </DaySizer>
          );
        })}
        <EmptySpace />
      </Container>
    </TimetableScroll.Horizontal>
  );
};

const Container = styled.div`
  height: 50px;

  display: flex;
  user-select: none;
`;

const ZoneText = styled.div`
  width: 100%;
  height: 100%;

  padding: 0.25rem 0.25rem 0.25rem 0;

  display: flex;
  justify-content: flex-end;
  align-items: flex-end;

  border-right: 1px solid ${({ theme }) => theme.border2};
`;

const DaySizer = styled.div`
  flex: 1 0 0;
  min-width: ${TIMETABLE_CELL_MIN_WIDTH};
`;

const DayContent = styled.div`
  ${FONT_REGULAR_5}
  height: 100%;
  padding: 0 1rem 0 0.75rem;

  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
`;

const DayNumber = styled(CalendarDay)`
  width: 1.75rem;
  height: 1.75rem;
  margin-right: 0.25rem;
`;

const DAY_BORDER_LINER_HEIGHT = '0.425rem';
const DayBorderLiner = styled.div`
  width: 100%;
  margin: 0;

  position: relative;
  bottom: 0;
  left: 0;
  top: -${DAY_BORDER_LINER_HEIGHT};

  &::before {
    content: '';
    width: 100%;
    height: ${DAY_BORDER_LINER_HEIGHT};

    position: absolute;

    box-sizing: border-box;
    border-right: 1px solid ${({ theme }) => theme.border2};
  }
`;

const EmptySpace = styled.div`
  flex: 0 0 ${TIMETABLE_SCROLL_WIDTH};
  height: 100%;
`;

export default TimetableHeader;
