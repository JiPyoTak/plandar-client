import React from 'react';

import styled from '@emotion/styled';
import { Moment } from 'moment';

import { TIMETABLE_SCROLL_STYLE } from '@/styles/timetable';

const DAY_TO_MINUTE = 24 * 60;
const TIME_VIEW_CELL_UNIT = 15;
const TIME_VIEW_CELL_AMOUNT = Math.ceil(DAY_TO_MINUTE / TIME_VIEW_CELL_UNIT);

type TProps = {
  dateMoments: Moment[];
};

const TimetableView: React.FC<TProps> = ({ dateMoments }) => {
  return <Container></Container>;
};

const Container = styled.div`
  ${TIMETABLE_SCROLL_STYLE}

  flex: 1;

  width: 100%;
  height: 50px;

  display: flex;
`;

export default TimetableView;
