import React from 'react';

import styled from '@emotion/styled';
import moment, { Moment } from 'moment';

import {
  TIMETABLE_CELL_AMOUNT,
  TIMETABLE_CELL_PER_HOUR,
  TIMETABLE_CELL_UNIT,
} from '@/constants';
import useFocusedPlanState from '@/stores/plan/focusedPlan';
import { FONT_REGULAR_8 } from '@/styles/font';
import { TIMETABLE_CELL_HEIGHT, TIMETABLE_Z_INDEX } from '@/styles/timetable';
import { getTimeString } from '@/utils/date/getTimeString';
import { padZero } from '@/utils/padZero';

type TProps = {
  dateMoment: Moment;
  formattedDate: string;
};

const TimetableCellColumn: React.FC<TProps> = ({
  dateMoment,
  formattedDate,
}) => {
  const createDragPlan = useFocusedPlanState((state) => state.createDragPlan);

  const createNewPlan = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = (e.target as HTMLElement).closest('.date-time');
    if (!target) return;

    const targetDate = target.getAttribute('data-time');
    if (!targetDate) return;

    createDragPlan({
      startTime: targetDate,
      endTime: moment(targetDate)
        .add(15, 'minute')
        .format('YYYY-MM-DDThh:mm:ss'),
    });
  };

  return (
    <Container onMouseDown={createNewPlan}>
      {Array.from(Array(TIMETABLE_CELL_AMOUNT), (_, index) => {
        const date = dateMoment.toDate();
        const hour = Math.floor(index / TIMETABLE_CELL_PER_HOUR);
        const minute = Math.floor(
          (index % TIMETABLE_CELL_PER_HOUR) * TIMETABLE_CELL_UNIT,
        );
        date.setHours(hour);
        date.setMinutes(minute);

        const dateString = `${formattedDate}T${padZero(hour)}:${padZero(
          minute,
        )}:00`;

        return (
          <TimeCell
            key={date.toString()}
            className="date-time"
            data-time={dateString}
          >
            <TimeSpan>{getTimeString(date)}</TimeSpan>
          </TimeCell>
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  position: relative;
`;

const TimeCell = styled.div`
  width: 100%;
  height: ${TIMETABLE_CELL_HEIGHT};

  &:nth-of-type(4n) {
    border-bottom: 1px solid ${({ theme }) => theme.border2};
  }

  & > span {
    position: relative;
  }
  &:hover > span {
    z-index: ${TIMETABLE_Z_INDEX['timeCellHover']};

    color: ${({ theme }) => theme.primary};
    background-color: ${({ theme }) => theme.primary_light3};
    cursor: pointer;
  }
`;

const TimeSpan = styled.span`
  ${FONT_REGULAR_8}

  width: 100%;
  height: 100%;
  padding: 0.1rem 0.3rem;

  display: block;

  color: transparent;
  background-color: transparent;
  border-radius: 4px;
  transition-property: color, background-color;
  transition-duration: 0.2s;
`;

export default TimetableCellColumn;
