import React from 'react';

import styled from '@emotion/styled';
import { Moment } from 'moment';

import { TIMETABLE_SCROLL_STYLE } from '@/styles/timetable';

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
  flex-direction: column;
  user-select: none;

  overflow-y: scroll;
`;

export default TimetableView;
