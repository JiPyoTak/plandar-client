import React from 'react';

import styled from '@emotion/styled';

import moment from 'moment';

import TimetableAllDay from './TimetableAllDay';
import TimetableHeader from './TimetableHeader';
import TimetableView from './TimetableView';
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

  display: flex;
  flex-direction: column;

  overflow-x: auto;
`;

export default Timetable;
