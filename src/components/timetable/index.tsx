import React from 'react';

import styled from '@emotion/styled';

import moment from 'moment';

import TimetableAllDay from '@/components/timetable/TimetableAllDay';
import TimetableHeader from '@/components/timetable/TimetableHeader';
import TimetableView from '@/components/timetable/view';
import useDateState from '@/stores/date';
import { TIMETABLE_SCROLL_STYLE } from '@/styles/timetable';

type TProps = {
  rangeAmount: number;
};

const Timetable: React.FC<TProps> = ({ rangeAmount }) => {
  const { year, month, day } = useDateState();

  const range = Math.min(rangeAmount, 7);
  const stateMoment = moment({ year, month: month - 1, day });
  const dateMoments = Array.from(Array(range), (_, index) =>
    stateMoment.clone().add(index, 'days'),
  );

  const showHeader = range > 1;

  return (
    <Container>
      {showHeader && <TimetableHeader dateMoments={dateMoments} />}
      <TimetableAllDay dateMoments={dateMoments} />
      <TimetableView dateMoments={dateMoments} />
    </Container>
  );
};

const Container = styled.div`
  ${TIMETABLE_SCROLL_STYLE}
  width: 100%;
  height: 100%;
  min-height: 100%;

  display: flex;
  flex-direction: column;
`;

export default Timetable;
