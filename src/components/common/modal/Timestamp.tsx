import React from 'react';

import styled from '@emotion/styled';

import { TPlanType } from '@/types/rq/plan';
import { formatDateWithWeekday } from '@/utils/date/formatDate';

interface IProps {
  startTime: string;
  endTime: string | null;
  type: TPlanType;
}

const TimeStamp = ({ startTime, endTime, type }: IProps) => {
  const st = new Date(startTime);
  const et = endTime ? new Date(endTime) : undefined;

  const [stDate, etDate] = formatDateWithWeekday({
    startDate: st,
    endDate: et,
    isTimeStyle: type !== 'task',
  });

  const isSameDate = st.toDateString() === et?.toDateString();

  return <Container>{isSameDate ? stDate : `${stDate} - ${etDate}`}</Container>;
};

const Container = styled.div`
  color: ${({ theme }) => theme.text3};
`;

export default TimeStamp;
