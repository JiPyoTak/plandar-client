import React from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import moment from 'moment';

import { TIMETABLE_CELL_UNIT } from '@/constants';
import { FONT_REGULAR_7 } from '@/styles/font';
import { TIMETABLE_CELL_HEIGHT } from '@/styles/timetable';

type TProps = {
  plan: any;
};

const TimetablePlan: React.FC<TProps> = ({ plan }) => {
  const { title, startTime, endTime, color } = plan;

  return (
    <div css={{ width: '100%', position: 'relative' }}>
      <Container
        css={[
          cellTop(startTime),
          cellHeight(startTime, endTime),
          { backgroundColor: color },
        ]}
      >
        <span css={FONT_REGULAR_7}>{title}</span>
      </Container>
    </div>
  );
};

const cellTop = (startTime: string) => {
  const targetTime = moment(startTime);
  const midnight = targetTime.clone().startOf('day');
  const minutes = targetTime.diff(midnight, 'minute');
  const multipleOfHeight = minutes / TIMETABLE_CELL_UNIT;

  return css`
    top: calc(${TIMETABLE_CELL_HEIGHT} * ${multipleOfHeight});
  `;
};

const cellHeight = (startTime: string, endTime: string) => {
  const minutes = moment(endTime).diff(startTime, 'minute');
  const multipleOfHeight = minutes / TIMETABLE_CELL_UNIT;

  return css`
    height: calc(${TIMETABLE_CELL_HEIGHT} * ${multipleOfHeight});
  `;
};

const Container = styled.div`
  width: 100%;
  height: calc(${TIMETABLE_CELL_HEIGHT});
  padding: 0.125rem 0.25rem;

  position: absolute;

  border-radius: 8px;

  z-index: 2;
`;

export default TimetablePlan;
