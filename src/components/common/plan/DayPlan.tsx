import React, { memo } from 'react';

import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import ChevronIcon from '@/components/common/icons/ChevronIcon';

import { IDayViewInfo } from '@/core/plan/DaysPlanManager';
import Plan from '@/core/plan/Plan';

import { TReturnPlanActive } from '@/hooks/usePlanPreviewEvent';
import { FONT_REGULAR_5 } from '@/styles/font';
import { TColor } from '@/types';
import { isBgBright } from '@/utils/color';

interface IProps {
  view: IDayViewInfo;
  plan: Plan;
  previewPlan: TReturnPlanActive;
}

const DayPlan: React.FC<IProps> = (props) => {
  const theme = useTheme();
  const { plan, view, previewPlan } = props;

  const textColor = isBgBright(plan.color) ? theme.white : theme.text1;

  const { id, start, index, term, termAmount, st, et } = view;
  const { focusedPlanId, hoveredPlanId, selectedPlanId } = previewPlan;
  const { onClick, onMouseDown, onMouseEnter, onMouseLeave } = previewPlan;

  const isEqualStart = st.isSame(plan.startTime);
  const isEqualEnd = et.isSame(plan.endTime);

  const className: string[] = [];

  if (focusedPlanId === id || selectedPlanId === id) {
    className.push('is_selected');
  }
  if (hoveredPlanId === id) {
    className.push('is_hovered');
  }

  const cellPercent = (1 / termAmount) * 100;

  return (
    <Container
      key={id}
      style={{
        left: `${start * cellPercent}%`,
        top: `${index * 24}px`,
        width: `${term * cellPercent}%`,
      }}
      color={plan.color}
    >
      <div
        className={className.join(' ')}
        css={{ color: textColor }}
        onMouseDown={() => onMouseDown(plan)}
        onMouseEnter={(e) => onMouseEnter(e, plan)}
        onMouseLeave={onMouseLeave}
        onClick={(e) => onClick(e, plan)}
      >
        <div>
          {!isEqualStart && (
            <Icons>
              <ChevronIcon
                type="left"
                width={12}
                height={12}
                color={textColor}
              />
            </Icons>
          )}
          <Title>{plan.title}</Title>
          {!isEqualEnd && (
            <Icons>
              <ChevronIcon
                type="right"
                width={12}
                height={12}
                color={textColor}
              />
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

  & > div:hover,
  & > div.is_hovered,
  & > div.is_selected {
    & > div {
      background-color: rgba(0, 0, 0, 0.12);
    }
  }

  & > div.is_selected {
    & > div {
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
