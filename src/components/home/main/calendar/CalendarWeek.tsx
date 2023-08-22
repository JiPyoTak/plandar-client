import React, { MouseEventHandler, memo } from 'react';

import styled from '@emotion/styled';

import { Moment } from 'moment';

import CalendarCell from '@/components/home/main/calendar/CalendarCell';
import { DATE_FORMAT } from '@/constants';
import Plan from '@/core/plan/Plan';
import { TReturnPlanActive } from '@/hooks/usePlanPreviewEvent';

interface IProps {
  dayMoments: Moment[];
  daysIndex: number[][];
  daysTimePlans: Plan[][];
  previewPlan: TReturnPlanActive;
  onMouseDown: MouseEventHandler;
}

const CalendarWeek = (props: IProps) => {
  const { previewPlan, dayMoments, daysIndex, daysTimePlans, onMouseDown } =
    props;

  return (
    <Container>
      {dayMoments.map((dayMoment, i) => (
        <CalendarCell
          key={dayMoment.format(DATE_FORMAT)}
          dayMoment={dayMoment}
          timePlans={daysTimePlans[i]}
          previewPlan={previewPlan}
          height={daysIndex[i].length * 24}
          onMouseDown={onMouseDown}
        />
      ))}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;

  flex: 1;
  display: flex;

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.border1};
  }
`;

export default memo(CalendarWeek);
