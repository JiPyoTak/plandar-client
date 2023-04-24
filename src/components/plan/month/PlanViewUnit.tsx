import React from 'react';

import styled from '@emotion/styled';

import ChevronIcon from '../../icons/ChevronIcon';

import useSelectedPlanState from '@/stores/plan/selectedPlan';
import { FONT_REGULAR_5 } from '@/styles/font';
import { IViewPlanInfo, TColor } from '@/types';
import { IPlanWithoutIdAndTime } from '@/types/rq/plan';

interface IProps {
  index: number;
  view: IViewPlanInfo;
  isSelected: boolean;
  isHovered: boolean;
  isDragging?: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const PlanViewUnit: React.FC<IProps> = (props) => {
  const {
    view,
    index,
    isHovered,
    isSelected,
    isDragging,
    onMouseEnter,
    onMouseLeave,
  } = props;

  const { isDragging: d, selectPlan } = useSelectedPlanState();

  const isEqualStart = view.startTime.isSame(view.viewStart);
  const isEqualEnd = view.endTime.isSame(view.viewEnd);

  const className = [];

  if (isDragging) className.push('isDragging');
  if (isSelected && d) className.push('isSelected');
  if (isHovered && !d) className.push('isHovered');

  const onMouseDown = () => {
    if (isDragging || isSelected || !view.plan) return;

    selectPlan(view.plan);
  };

  return (
    <Container
      key={view.id}
      style={{
        left: `${(view.dayOfWeek - 1) * 14.2857}%`,
        top: `${Number(index) * 24}px`,
        width: `${view.termInWeek * 14.2857}%`,
      }}
      color={view.plan?.color}
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

  & > div.isSelected:not(.isDragging) {
    opacity: 0.3;
  }

  & > div.isDragging {
    z-index: 10;
    box-shadow: 0 0 1px #1b1d1f33, 0 15px 25px #1b1d1f33, 0 5px 10px #1b1d1f1f;
  }

  & > div.isHovered,
  & > div.isDragging {
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

export default PlanViewUnit;
