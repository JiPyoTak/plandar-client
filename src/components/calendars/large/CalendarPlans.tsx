import React, { memo } from 'react';

import DayPlan from '@/components/plan/DayPlan';
import Plan from '@/plan/Plan';
import useFocusedPlanState from '@/stores/plan/focusedPlan';
import useHoveredPlanState from '@/stores/plan/hoveredPlan';
import { IViewPlanInfo } from '@/types';

interface IProps {
  isDragging?: boolean;
  hoveredPlanId?: number | null;
  planViewsToWeek: IViewPlanInfo[][];
}

const CalendarPlans: React.FC<IProps> = ({ isDragging, planViewsToWeek }) => {
  const { focusedPlan } = useFocusedPlanState();
  const { hoveredPlan, setHoveredPlan, clearHoveredPlan } =
    useHoveredPlanState();

  const onMouseEnter = (
    e: React.MouseEvent<HTMLDivElement>,
    viewPlan: IViewPlanInfo,
  ) => {
    if (!viewPlan.plan) return;

    const target = e.currentTarget as HTMLElement;

    const { top, left, right, bottom } = target.getBoundingClientRect();

    // NOTICE : viewPlan이 바뀜에 따라 한 번 확인할 것
    setHoveredPlan({
      hoveredPlan: new Plan(viewPlan.plan),
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

          if (isDragging === false && focusedPlan?.id !== -1) continue;

          result.push(
            <DayPlan
              key={`${viewPlan.id}${k}`}
              view={viewPlan}
              onMouseEnter={(e) => onMouseEnter(e, viewPlan)}
              onMouseLeave={() => clearHoveredPlan()}
              index={Number(k)}
              isSelected={focusedPlan?.id === viewPlan.id}
              isHovered={hoveredPlan?.id === viewPlan.id}
              isDragging={
                (focusedPlan?.id === viewPlan.id && focusedPlan?.id) === -1 ||
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

export default memo(CalendarPlans);
