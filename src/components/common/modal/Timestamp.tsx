import React from 'react';

import styled from '@emotion/styled';

import { formatDateWithWeekday } from '@/utils/date/formatDate';

interface IProps {
  startTime: string;
  endTime: string | null;
  hasTime: boolean;
}

const TimeStamp = ({ startTime, endTime, hasTime }: IProps) => {
  const st = new Date(startTime);
  const et = endTime ? new Date(endTime) : undefined;

  const [stDate, etDate] = formatDateWithWeekday({
    startDate: st,
    endDate: et,
    isTimeStyle: hasTime,
  });

  const isNeedOnlyOneDay = !hasTime && st.toDateString() === et?.toDateString();

  return (
    <Container>
      {isNeedOnlyOneDay ? (
        <div>{stDate}</div>
      ) : (
        <>
          <div>{stDate}</div> <div>&nbsp;-&nbsp;</div> <div>{etDate}</div>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;

  flex-wrap: wrap;

  color: ${({ theme }) => theme.text3};
`;

export default TimeStamp;
