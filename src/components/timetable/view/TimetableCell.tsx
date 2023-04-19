import React from 'react';

import styled from '@emotion/styled';

import { FONT_REGULAR_8 } from '@/styles/font';
import { TIMETABLE_CELL_HEIGHT } from '@/styles/timetable';
import { timeToString } from '@/utils/timeToString';

type TProps = {
  className?: string;
  date: Date;
};

const TimetableCell: React.FC<TProps> = ({ className, date }) => {
  return (
    <Container className={className}>
      <div className="timetable-cell-time">{timeToString(date)}</div>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: ${TIMETABLE_CELL_HEIGHT};

  &:nth-of-type(4n) {
    border-bottom: 1px solid ${({ theme }) => theme.border2};
  }

  .timetable-cell-time {
    ${FONT_REGULAR_8}

    width: 100%;
    height: 100%;
    padding: 0.1rem 0.3rem;

    visibility: hidden;

    color: ${({ theme }) => theme.primary};
    background-color: ${({ theme }) => theme.primary_light3};
    border-radius: 4px;
  }

  &:hover .timetable-cell-time {
    visibility: visible;
    cursor: pointer;
  }
`;

export default TimetableCell;
