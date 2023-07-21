import React, { MouseEventHandler, memo } from 'react';

import styled from '@emotion/styled';

import { Moment } from 'moment';

import CalendarCell from './CalendarCell';
import { DATE_FORMAT } from '@/constants';
import Plan from '@/core/plan/Plan';

interface IProps {
  dayMoments: Moment[];
  daysIndex: number[][];
  daysTimePlans: Plan[][];
  onMouseDown: MouseEventHandler;
}

const CalendarWeek = (props: IProps) => {
  const { dayMoments, daysIndex, daysTimePlans, onMouseDown } = props;

  return (
    <Container>
      {dayMoments.map((dayMoment, i) => (
        <CalendarCell
          key={dayMoment.format(DATE_FORMAT)}
          dayMoment={dayMoment}
          height={daysIndex[i].length * 24}
          timePlans={daysTimePlans[i]}
          onMouseDown={onMouseDown}
        />
      ))}
    </Container>
  );
};

const Container = styled.div`
  position: relative;

  flex: 1;
  display: flex;

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.border1};
  }
`;

export default memo(CalendarWeek);
