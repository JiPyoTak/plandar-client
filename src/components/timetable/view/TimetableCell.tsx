import React from 'react';

import styled from '@emotion/styled';

import { TIMETABLE_CELL_HEIGHT } from '@/styles/timetable';

type TProps = {
  className?: string;
};

const TimetableCell: React.FC<TProps> = ({ className }) => {
  return <Container className={className}></Container>;
};

const Container = styled.div`
  width: 100%;
  height: ${TIMETABLE_CELL_HEIGHT};

  &:nth-of-type(4n) {
    border-bottom: 1px solid ${({ theme }) => theme.border2};
  }
`;

export default TimetableCell;
