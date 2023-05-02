import React from 'react';

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

  if (st.toDateString() === et?.toDateString()) return <div>{stDate}</div>;

  return (
    <div>
      {stDate} ~ {etDate}
    </div>
  );
};

export default TimeStamp;
