import React, { memo } from 'react';

import styled from '@emotion/styled';

import { Moment } from 'moment';

import CalendarDay from '@/components/core/calendar/CalendarDay';
import TimePlanList from '@/components/home/main/calendar/CalendarTimePlans';
import { DATE_FORMAT } from '@/constants';
import Plan from '@/core/plan/Plan';
import { TReturnPlanActive } from '@/hooks/usePlanPreviewEvent';
import useDateState from '@/stores/date';

interface IProps {
  dayMoment: Moment;
  height: number;
  timePlans: Plan[];
  previewPlan: TReturnPlanActive;
  onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const CalendarCell: React.FC<IProps> = (props) => {
  const { height, dayMoment, timePlans, previewPlan, onMouseDown } = props;

  const { referenceDate, setReferenceDateAndCalendarUnit } = useDateState(
    ({ referenceDate, setReferenceDateAndCalendarUnit }) => ({
      referenceDate,
      setReferenceDateAndCalendarUnit,
    }),
  );

  return (
    <Container
      className="date-time"
      data-date={dayMoment.format(DATE_FORMAT)}
      onMouseDown={onMouseDown}
    >
      <CellDay
        date={dayMoment}
        isInMonth={referenceDate.month() === dayMoment.month()}
        isSelected={referenceDate.isSame(dayMoment, 'day')}
        onClick={setReferenceDateAndCalendarUnit}
      />
      <div css={{ height, transition: 'height 0.2s' }} />
      <TimePlanList timePlans={timePlans} previewPlan={previewPlan} />
    </Container>
  );
};

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  overflow: hidden;

  &:not(:last-child) {
    border-right: 1px solid ${({ theme }) => theme.border1};
  }

  cursor: pointer;

  &.isDragging,
  &.isDragging * {
    cursor: grabbing !important;
  }
`;

const CellDay = styled(CalendarDay)`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;

  padding: 4px;
`;

export default memo(CalendarCell);
