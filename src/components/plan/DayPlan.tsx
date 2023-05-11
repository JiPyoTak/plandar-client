import React, { memo } from 'react';

import styled from '@emotion/styled';

import ChevronIcon from '@/components/icons/ChevronIcon';

import { IDayViewInfo } from '@/plan/DaysPlanManager';
import Plan from '@/plan/Plan';

import { FONT_REGULAR_5 } from '@/styles/font';
import { TColor } from '@/types';

interface IProps {
  view: IDayViewInfo;
  plan: Plan;
  isSelected?: boolean;
  isHovered?: boolean;
  onMouseEnter: (e: React.MouseEvent<HTMLDivElement>, plan: Plan) => void;
  onMouseDown: (plan: Plan) => void;
  onMouseLeave: React.MouseEventHandler<HTMLDivElement>;
}

const DayPlan: React.FC<IProps> = (props) => {
  const {
    plan,
    view,
    isHovered,
    isSelected,
    onMouseEnter,
    onMouseLeave,
    onMouseDown,
  } = props;

  const { id, start, index, term, st, et } = view;

  const isEqualStart = st.isSame(plan.startTime);
  const isEqualEnd = et.isSame(plan.endTime);

  const className: string[] = [];

  if (isSelected) className.push('is_selected');
  if (isHovered) className.push('is_hovered');

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
        onMouseDown={() => onMouseDown(plan)}
        onMouseEnter={(e) => onMouseEnter(e, plan)}
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

  & > div.is_hovered {
    & > div {
      background-color: rgba(0, 0, 0, 0.12);
    }
  }

  & > div.is_selected {
    & > div {
      background-color: rgba(0, 0, 0, 0.12);
      box-shadow: 0 0 12px 4px rgba(0, 0, 0, 0.12);
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
