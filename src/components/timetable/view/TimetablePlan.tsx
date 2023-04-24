import React from 'react';

import { css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import moment from 'moment';

import { TIMETABLE_CELL_UNIT } from '@/constants';
import { FONT_REGULAR_7, FONT_REGULAR_8 } from '@/styles/font';
import { TIMETABLE_CELL_HEIGHT } from '@/styles/timetable';
import { TColor } from '@/types';
import { ITimePlan } from '@/types/rq/plan';
import { isTextColorBrightWithBackgroundColor } from '@/utils/color';
import { timeToString } from '@/utils/timeToString';

type TProps = {
  plan: ITimePlan;
  rank: number;
  total: number;
};

const TimetablePlan: React.FC<TProps> = ({ plan, rank, total }) => {
  const { title, startTime, endTime, color } = plan;
  const theme = useTheme();

  return (
    <Container
      css={[
        cellTop(startTime),
        cellLeft(rank, total),
        cellWidth(rank, total),
        cellHeight(startTime, endTime),
        {
          color: isTextColorBrightWithBackgroundColor(color)
            ? theme.text2
            : theme.white,
          backgroundColor: color,
        },
      ]}
    >
      <TimeSpan backgroundColor={color}>
        {timeToString(new Date(startTime))}
      </TimeSpan>
      <TitleSpan backgroundColor={color}>{title}</TitleSpan>
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
  z-index: 2;

  border: 1px solid white;
  border-radius: 8px;
  overflow: hidden;

  &:hover {
    z-index: 3;
  }
`;

const TimeSpan = styled.span<{ backgroundColor: TColor }>`
  ${FONT_REGULAR_8}
  margin-bottom: 0.25rem;

  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  color: ${({ backgroundColor, theme }) =>
    isTextColorBrightWithBackgroundColor(backgroundColor)
      ? theme.text4
      : theme.text3};
`;

const TitleSpan = styled.span<{ backgroundColor: TColor }>`
  ${FONT_REGULAR_7}

  display: block;
  word-break: keep-all;
  word-wrap: break-word;

  color: ${({ backgroundColor, theme }) =>
    isTextColorBrightWithBackgroundColor(backgroundColor)
      ? theme.white
      : theme.text2};
`;

export default TimetablePlan;
