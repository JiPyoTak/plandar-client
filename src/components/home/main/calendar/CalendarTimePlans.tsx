import React, { memo } from 'react';

import styled from '@emotion/styled';

import DayTimePlan from '@/components/common/plan/DayTimePlan';
import Plan from '@/core/plan/Plan';
import usePlanActive from '@/hooks/usePlanActive';

interface IProps {
  timePlans: Plan[];
}

const CalendarTimePlans: React.FC<IProps> = ({ timePlans }) => {
  const {
    focusedPlanId,
    hoveredPlanId,
    selectedPlanId,
    onClick,
    onMouseDown,
    onMouseEnter,
    onMouseLeave,
  } = usePlanActive();

  return (
    <Container>
      {timePlans
        .sort((a, b) => a.id - b.id)
        .map((timePlan) => (
          <DayTimePlan
            key={timePlan.id}
            plan={timePlan}
            isSelected={
              focusedPlanId === timePlan.id || selectedPlanId === timePlan.id
            }
            isHovered={hoveredPlanId === timePlan.id}
            onClick={onClick}
            onMouseDown={onMouseDown}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          />
        ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;

  overflow: hidden;
`;

export default memo(CalendarTimePlans);
