import React, { useEffect, useState } from 'react';

import moment from 'moment';

import MiniCalendar from '@/components/common/mini-calendar';

import useDateState from '@/stores/date';

const SmallCalendar: React.FC = () => {
  const { referenceDate, setReferenceDate } = useDateState(
    ({ referenceDate, setReferenceDate }) => ({
      referenceDate,
      setReferenceDate,
    }),
  );
  const [date, setDate] = useState(moment(referenceDate));

  useEffect(() => {
    setDate(moment(referenceDate));
  }, [referenceDate]);

  const increaseCalendarMonth = () => {
    setDate((prev) => moment(prev).add(1, 'month'));
  };

  const decreaseCalendarMonth = () => {
    setDate((prev) => moment(prev).subtract(1, 'month'));
  };

  const onClickTodayButton = () => {
    setDate(moment());
  };

  return (
    <MiniCalendar
      referenceDate={referenceDate}
      selectedDate={date}
      setReferenceDate={setReferenceDate}
      increaseMonth={increaseCalendarMonth}
      decreaseMonth={decreaseCalendarMonth}
      onClickTodayButton={onClickTodayButton}
    />
  );
};

export default SmallCalendar;
