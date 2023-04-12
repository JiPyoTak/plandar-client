import React from 'react';

import styled from '@emotion/styled';

import moment from 'moment';

import TimetableAllDay from './TimetableAllDay';
import TimetableHeader from './TimetableHeader';
import useDateState from '@/stores/date';

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
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
`;

export default Timetable;
