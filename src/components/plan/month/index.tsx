import React, { memo, useState } from 'react';

import PlanViewUnit from './PlanViewUnit';
import useHoveredPlanIdState from '@/stores/plan/hoverdPlan';
import useSelectedPlanState from '@/stores/plan/selectedPlan';
import { IViewPlanInfo } from '@/types';

interface IProps {
  isDragging?: boolean;
  hoveredPlanId?: number | null;
  planViewsToWeek: IViewPlanInfo[][];
}

const PlanViewInMonth: React.FC<IProps> = ({ isDragging, planViewsToWeek }) => {
  const { selectedPlan } = useSelectedPlanState();
  const { hoveredPlanId, setHoveredPlanId, clearHoveredPlanId } =
    useHoveredPlanIdState();

  return (
    <>
      {planViewsToWeek.map((indexablePlanView, j: number) => {
        const result = [];

        for (const k in indexablePlanView) {
          const plan = indexablePlanView[k];

          if (plan.dayOfWeek !== j + 1) continue;

          result.push(
            <PlanViewUnit
              key={`${plan.id}${k}`}
              view={plan}
              onMouseEnter={() => setHoveredPlanId(plan.id)}
              onMouseLeave={() => clearHoveredPlanId()}
              index={Number(k)}
              isSelected={selectedPlan?.id === plan.id}
              isHoverd={hoveredPlanId === plan.id}
              isDragging={isDragging}
            />,
          );
        }

        return result;
      })}
    </>
  );
};

export default memo(PlanViewInMonth);
