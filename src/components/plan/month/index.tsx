import React, { memo } from 'react';

import PlanViewUnit from './PlanViewUnit';
import useHoveredPlanState from '@/stores/plan/hoveredPlan';
import useSelectedPlanState from '@/stores/plan/selectedPlan';
import { IViewPlanInfo } from '@/types';

interface IProps {
  isDragging?: boolean;
  hoveredPlanId?: number | null;
  planViewsToWeek: IViewPlanInfo[][];
}

const PlanViewInMonth: React.FC<IProps> = ({ isDragging, planViewsToWeek }) => {
  const { selectedPlan } = useSelectedPlanState();
  const { hoveredPlan, setHoveredPlan, clearHoveredPlan } =
    useHoveredPlanState();

  const onMouseEnter = (
    e: React.MouseEvent<HTMLDivElement>,
    viewPlan: IViewPlanInfo,
  ) => {
    if (!viewPlan.plan) return;

    const target = e.currentTarget as HTMLElement;

    const { top, left, right, bottom } = target.getBoundingClientRect();

    setHoveredPlan({
      hoveredPlan: viewPlan.plan,
      rect: { top, left, right, bottom },
    });
  };

  return (
    <>
      {planViewsToWeek.map((indexablePlanView, j: number) => {
        const result = [];

        for (const k in indexablePlanView) {
          const viewPlan = indexablePlanView[k];

          if (viewPlan.dayOfWeek !== j + 1) continue;

          if (isDragging === false && selectedPlan?.id !== -1) continue;

          result.push(
            <PlanViewUnit
              key={`${viewPlan.id}${k}`}
              view={viewPlan}
              onMouseEnter={(e) => onMouseEnter(e, viewPlan)}
              onMouseLeave={() => clearHoveredPlan()}
              index={Number(k)}
              isSelected={selectedPlan?.id === viewPlan.id}
              isHovered={hoveredPlan?.id === viewPlan.id}
              isDragging={
                (selectedPlan?.id === viewPlan.id && selectedPlan?.id) === -1 ||
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
