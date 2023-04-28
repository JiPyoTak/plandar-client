import React, { memo } from 'react';

import PlanViewUnit from './PlanViewUnit';
import useFocusedPlanState from '@/stores/plan/focusedPlan';
import useHoveredPlanIdState from '@/stores/plan/hoverdPlan';
import { IViewPlanInfo } from '@/types';

interface IProps {
  isDragging?: boolean;
  hoveredPlanId?: number | null;
  planViewsToWeek: IViewPlanInfo[][];
}

const PlanViewInMonth: React.FC<IProps> = ({ isDragging, planViewsToWeek }) => {
  const { focusedPlan } = useFocusedPlanState();
  const { hoveredPlanId, setHoveredPlanId, clearHoveredPlanId } =
    useHoveredPlanIdState();

  return (
    <>
      {planViewsToWeek.map((indexablePlanView, j: number) => {
        const result = [];

        for (const k in indexablePlanView) {
          const plan = indexablePlanView[k];

          if (plan.dayOfWeek !== j + 1) continue;

          if (isDragging === false && focusedPlan?.id !== -1) continue;

          result.push(
            <PlanViewUnit
              key={`${plan.id}${k}`}
              view={plan}
              onMouseEnter={() => setHoveredPlanId(plan.id)}
              onMouseLeave={() => clearHoveredPlanId()}
              index={Number(k)}
              isSelected={focusedPlan?.id === plan.id}
              isHovered={hoveredPlanId === plan.id}
              isDragging={
                (focusedPlan?.id === plan.id && focusedPlan?.id) === -1 ||
                isDragging
              }
            />,
          );
        }

        return result;
      })}
    </>
  );
};

export default memo(PlanViewInMonth);
