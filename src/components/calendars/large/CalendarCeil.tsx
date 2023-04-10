import React, { memo } from 'react';

import styled from '@emotion/styled';

import CeilContent from './CeilContent';
import CeilDay from '@/components/common/calendar/CalendarDay';
import { TDateYMD } from '@/stores/date';
import { ICalendarInfo } from '@/utils/getCalendarInfo';

interface IProps {
  dateInfo: ICalendarInfo;
  isSelected: boolean;
  onClickDayNumber: (date: TDateYMD) => void;
  onClickDayContent: () => void;
}

const CalendarCeil: React.FC<IProps> = (props) => {
  const { dateInfo, isSelected, onClickDayNumber, onClickDayContent } = props;

  return (
    <Container onClick={onClickDayContent}>
      <CeilDay
        {...dateInfo}
        isSelected={isSelected}
        onClick={onClickDayNumber}
      />
      <CeilContent></CeilContent>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  border-bottom: 1px solid ${({ theme }) => theme.border1};
  border-right: 1px solid ${({ theme }) => theme.border1};

  padding: 0.5rem;

  cursor: pointer;
`;

export default memo(CalendarCeil);
