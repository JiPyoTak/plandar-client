import React, { memo, useCallback } from 'react';

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
  isSelected: boolean;
  isHovered: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>, plan: Plan) => void;
  onMouseEnter?: (e: React.MouseEvent<HTMLDivElement>, plan: Plan) => void;
  onMouseLeave?: () => void;
};

const TimePlan: React.FC<TProps> = (props) => {
  const {
    plan,
    viewInfo,
    isFocused = false,
    isSelected,
    isHovered,
    onClick,
    onMouseEnter,
    onMouseLeave,
  } = props;

  const { title, startTime, color } = plan;
  const theme = useTheme();
  const moveDragPlan = useFocusedPlanState((state) => state.moveDragPlan);
  const editDragPlan = useFocusedPlanState((state) => state.editDragPlan);
  const className: string[] = [];

  if (isSelected) className.push('is_selected');
  if (isHovered) className.push('is_hovered');

  const onMouseDownPlan = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLElement | null;
    if (!target) return;

    const type = target.getAttribute('data-type');

    if (type === 'resizer') {
      editDragPlan(plan);
    } else {
      moveDragPlan(plan);
    }

    onMouseLeave?.();
  };

  const onClickPlan = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      onClick?.(e, plan);
    },
    [plan, onClick],
  );

  const onMouseEnterPlan = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      onMouseEnter?.(e, plan);
    },
    [plan, onMouseEnter],
  );

  return (
    <Container
      className={className.join(' ')}
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
      onMouseDown={onMouseDownPlan}
      onClick={onClickPlan}
      onMouseEnter={onMouseEnterPlan}
      onMouseLeave={onMouseLeave}
    >
      <TimeSpan backgroundColor={color}>
        {getTimeString(new Date(startTime))}
      </TimeSpan>
      <TitleSpan backgroundColor={color}>{title}</TitleSpan>
      <ScrollTargeter data-type="resizer" />
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
  position: absolute;
  z-index: ${TIMETABLE_Z_INDEX['timePlan']};

  border: 1px solid white;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;

  transition: box-shadow 0.2s;

  &.is_selected,
  &.is_hovered {
    box-shadow: 0 0 12px 4px rgba(0, 0, 0, 0.12);
  }

  &:hover {
    z-index: ${TIMETABLE_Z_INDEX['timePlanHover']};
  }
`;

const TimeSpan = styled.span<{ backgroundColor: TColor }>`
  ${FONT_REGULAR_8}
  margin: 0.375rem 0.375rem 0.25rem;

  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  color: ${({ backgroundColor, theme }) =>
    isBgBright(backgroundColor) ? theme.text4 : theme.text3};
`;

const TitleSpan = styled.span<{ backgroundColor: TColor }>`
  ${FONT_REGULAR_7}
  margin: 0 0.375rem;

  display: block;
  word-break: keep-all;
  word-wrap: break-word;

  color: ${({ backgroundColor, theme }) =>
    isBgBright(backgroundColor) ? theme.white : theme.text2};
`;

const ScrollTargeter = styled.div`
  width: 100%;
  height: 0.5rem;
  position: absolute;
  bottom: 0;
  cursor: ns-resize;
`;

export default memo(TimePlan);
