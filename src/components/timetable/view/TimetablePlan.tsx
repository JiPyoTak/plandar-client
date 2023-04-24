import React from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import moment from 'moment';

import { TIMETABLE_CELL_UNIT } from '@/constants';
import { FONT_REGULAR_7 } from '@/styles/font';
import { TIMETABLE_CELL_HEIGHT } from '@/styles/timetable';
import { ITimePlan } from '@/types/rq/plan';

type TProps = {
  plan: ITimePlan;
  rank: number;
  total: number;
};

const TimetablePlan: React.FC<TProps> = ({ plan, rank, total }) => {
  const { title, startTime, endTime, color } = plan;

  return (
    <Container
      css={[
        cellTop(startTime),
        cellLeft(rank, total),
        cellWidth(rank, total),
        cellHeight(startTime, endTime),
        { backgroundColor: color },
      ]}
    >
      <span css={FONT_REGULAR_7}>{title}</span>
    </Container>
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

const cellLeft = (displayOrder: number, entireOrder: number) => {
  const percent = (displayOrder - 1) / entireOrder;

  return css`
    left: calc(100% * ${percent});
  `;
};

const cellWidth = (displayOrder: number, entireOrder: number) => {
  const originalPercent = 1 / entireOrder;
  const additionalPercent = 0.7 / entireOrder;
  const percent =
    originalPercent +
    ((displayOrder !== entireOrder && additionalPercent) || 0);

  return css`
    width: calc(100% * ${percent});
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
  padding: 0.125rem 0.25rem;

  position: absolute;

  border-radius: 8px;

  z-index: 2;
  border: 1px solid white;
  &:hover {
    z-index: 3;
  }
`;

export default TimetablePlan;
