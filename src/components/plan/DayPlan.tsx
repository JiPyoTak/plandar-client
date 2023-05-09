import React, { memo, useCallback } from 'react';

import styled from '@emotion/styled';

import ChevronIcon from '@/components/icons/ChevronIcon';

import { IDayViewInfo } from '@/plan/DaysPlanManager';
import Plan from '@/plan/Plan';
import useFocusedPlanState from '@/stores/plan/focusedPlan';
import useHoveredPlanState from '@/stores/plan/hoveredPlan';

import { FONT_REGULAR_5 } from '@/styles/font';
import { TColor } from '@/types';

interface IProps {
  view: IDayViewInfo;
  plan: Plan;
  isSelected?: boolean;
  isHovered?: boolean;
  isDragging?: boolean;
  onMouseEnter: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave: React.MouseEventHandler<HTMLDivElement>;
}

const DayPlan: React.FC<IProps> = (props) => {
  const {
    plan,
    view,
    isHovered,
    isSelected,
    isDragging,
    onMouseEnter,
    onMouseLeave,
  } = props;

  const { id, start, index, term, st, et } = view;

  const { clearHoveredPlan } = useHoveredPlanState();
  const { selectPlan } = useFocusedPlanState();

  const isEqualStart = st.isSame(plan.startTime);
  const isEqualEnd = et.isSame(plan.endTime);

  const className: string[] = [];

  if (isDragging) className.push('is_dragging');
  if (isSelected) className.push('is_selected');
  if (isHovered) className.push('is_hovered');

  const onMouseDown = useCallback(() => {
    selectPlan(plan);
    clearHoveredPlan();
  }, [plan]);

  return (
    <Container
      key={id}
      style={{
        left: `${start * 14.2857}%`,
        top: `${index * 24}px`,
        width: `${term * 14.2857}%`,
      }}
      color={plan.color}
    >
      <div
        className={className.join(' ')}
        onMouseDown={onMouseDown}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div>
          {!isEqualStart && (
            <Icons>
              <ChevronIcon type="left" width={12} height={12} />
            </Icons>
          )}
          <Title>일정 {view.id}</Title>
          {!isEqualEnd && (
            <Icons>
              <ChevronIcon type="right" width={12} height={12} />
            </Icons>
          )}
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div<{ color?: TColor }>`
  position: absolute;
  padding: 0 8px;
  transition: all 0.2s;

  & > div {
    display: flex;
    align-items: center;

    background-color: ${({ theme, color }) => color ?? theme.primary_light};
    transition: opacity 0.2s;

    border-radius: 3px;
  }

  & > div > div {
    flex: 1;
    display: flex;
    align-items: center;

    ${FONT_REGULAR_5}

    padding: 0 4px;
    border-radius: 3px;
    height: 20px;

    transition: background-color 0.2s;

    overflow: hidden;

    cursor: pointer;
  }

  & > div.is_selected:not(.is_dragging) {
    opacity: 0.3;
  }

  & > div.is_dragging {
    z-index: 10;
    box-shadow: 0 0 1px #1b1d1f33, 0 15px 25px #1b1d1f33, 0 5px 10px #1b1d1f1f;
  }

  & > div.is_hovered,
  & > div.is_dragging {
    & > div {
      background-color: rgba(0, 0, 0, 0.12);
    }
  }
`;

const Title = styled.div`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  flex: 1;
`;

const Icons = styled.div`
  height: fit-content;
  display: flex;
  align-items: center;
  text-align: center;
`;

export default memo(DayPlan);
