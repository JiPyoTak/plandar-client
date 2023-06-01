import React, { memo } from 'react';

import { css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import Plan from '@/plan/Plan';
import { ITimeViewInfo } from '@/plan/TimePlanManager';

import useFocusedPlanState from '@/stores/plan/focusedPlan';
import { FONT_REGULAR_7, FONT_REGULAR_8 } from '@/styles/font';
import { TIMETABLE_CELL_HEIGHT, TIMETABLE_Z_INDEX } from '@/styles/timetable';
import { TColor } from '@/types';
import { isBgBright } from '@/utils/color';
import { getTimeString } from '@/utils/date/getTimeString';

type TProps = {
  plan: Plan;
  viewInfo: ITimeViewInfo;
  isFocused?: boolean;
};

const TimePlan: React.FC<TProps> = ({ plan, viewInfo, isFocused }) => {
  const { title, startTime, color } = plan;
  const theme = useTheme();
  const selectPlan = useFocusedPlanState((state) => state.selectPlan);

  return (
    <Container
      css={[
        cellTop(viewInfo),
        cellLeft(viewInfo),
        cellWidth(viewInfo),
        cellHeight(viewInfo),
        {
          opacity: isFocused ? 0.6 : 1,
          color: isBgBright(color) ? theme.text2 : theme.white,
          backgroundColor: color,
        },
      ]}
      onMouseDown={() => selectPlan(plan)}
    >
      <TimeSpan backgroundColor={color}>
        {getTimeString(new Date(startTime))}
      </TimeSpan>
      <TitleSpan backgroundColor={color}>{title}</TitleSpan>
    </Container>
  );
};

const cellTop = ({ start }: ITimeViewInfo) => {
  return css`
    top: calc(${TIMETABLE_CELL_HEIGHT} * ${start});
  `;
};

const cellLeft = ({
  index: displayOrder,
  totalIndex: entireOrder,
}: ITimeViewInfo) => {
  const percent = (displayOrder - 1) / entireOrder;

  return css`
    left: calc(100% * ${percent});
  `;
};

const cellWidth = ({
  index: displayOrder,
  totalIndex: entireOrder,
}: ITimeViewInfo) => {
  const originalPercent = 1 / entireOrder;
  const additionalPercent = 0.7 / entireOrder;
  const percent =
    originalPercent +
    ((displayOrder !== entireOrder && additionalPercent) || 0);

  return css`
    width: calc(100% * ${percent});
  `;
};

const cellHeight = ({ term }: ITimeViewInfo) => {
  return css`
    height: calc(${TIMETABLE_CELL_HEIGHT} * ${term});
  `;
};

const Container = styled.div`
  padding: 0.125rem 0.25rem;

  position: absolute;
  z-index: ${TIMETABLE_Z_INDEX['timePlan']};

  border: 1px solid white;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    z-index: ${TIMETABLE_Z_INDEX['timePlanHover']};
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
    isBgBright(backgroundColor) ? theme.text4 : theme.text3};
`;

const TitleSpan = styled.span<{ backgroundColor: TColor }>`
  ${FONT_REGULAR_7}

  display: block;
  word-break: keep-all;
  word-wrap: break-word;

  color: ${({ backgroundColor, theme }) =>
    isBgBright(backgroundColor) ? theme.white : theme.text2};
`;

export default memo(TimePlan);
