import React, { useMemo } from 'react';

import TimePlan from '@/components/common/plan/TimePlan';
import Plan from '@/core/plan/Plan';
import TimePlanManager from '@/core/plan/TimePlanManager';
import usePlanActive from '@/hooks/usePlanActive';
import useTimetableViewMoment from '@/hooks/useTimetableViewMoment';
import useFocusedPlanState from '@/stores/plan/focusedPlan';

type TProps = {
  plans: Plan[];
};

const TimetablePlanColumn: React.FC<TProps> = ({ plans }) => {
  const viewMoment = useTimetableViewMoment();
  const focusedPlan = useFocusedPlanState((state) => state.focusedPlan);
  const planManager = useMemo(
    () => new TimePlanManager(plans, viewMoment),
    [plans, viewMoment],
  );

  const { selectedPlanId, hoveredPlanId, onClick, onMouseEnter, onMouseLeave } =
    usePlanActive();

  return (
    <div css={{ width: 'calc(100% - 0.75rem)', position: 'relative' }}>
      <div css={{ width: '100%', position: 'absolute' }}>
        {plans.map((plan) => {
          const { id } = plan;
          const viewInfo = planManager.viewInfo.get(id);

          return (
            viewInfo && (
              <TimePlan
                key={id}
                plan={plan}
                viewInfo={viewInfo}
                isFocused={id === focusedPlan?.id}
                isSelected={id === selectedPlanId}
                isHovered={id === hoveredPlanId}
                onClick={onClick}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
              />
            )
          );
        })}
      </div>
    </div>
  );
};

export default TimetablePlanColumn;
