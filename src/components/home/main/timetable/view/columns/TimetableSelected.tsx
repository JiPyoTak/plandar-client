import React, { memo } from 'react';

import TimePlan from '@/components/common/plan/TimePlan';
import TimePlanManager from '@/core/plan/TimePlanManager';
import useTimetableViewMoment from '@/hooks/useTimetableViewMoment';
import useFocusedPlanState from '@/stores/plan/focusedPlan';

const TimetableSelected: React.FC = () => {
  const viewMoment = useTimetableViewMoment();
  const { currentPlan, focusedPlan } = useFocusedPlanState(
    ({ currentPlan, focusedPlan }) => ({
      currentPlan,
      focusedPlan,
    }),
  );
  if (!focusedPlan || !focusedPlan.isTimePlan) return <></>;

  const isPlanInRange = viewMoment.isBetween(
    focusedPlan.startTime,
    focusedPlan.endTime,
    'date',
    '[]',
  );
  const isPlanUnedited =
    currentPlan?.startMoment.isSame(focusedPlan.startMoment) &&
    currentPlan?.endMoment.isSame(focusedPlan.endMoment) &&
    currentPlan?.id !== -1;
  if (!isPlanInRange || isPlanUnedited) return <></>;

  const manager = new TimePlanManager([focusedPlan], viewMoment);
  const focusedViewInfo = manager.viewInfo.get(focusedPlan.id);
  if (!focusedViewInfo)
    throw new Error('Timetable View Info Error! : focusedPlan');

  return (
    <div css={{ width: 'calc(100% - 0.75rem)', position: 'relative' }}>
      <div css={{ width: '100%', position: 'absolute' }}>
        <TimePlan
          plan={focusedPlan}
          viewInfo={focusedViewInfo}
          isSelected={true}
        />
      </div>
    </div>
  );
};

export default memo(TimetableSelected);
