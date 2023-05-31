import React from 'react';

import TimePlan from '@/components/plan/TimePlan';
import useTimetableViewMoment from '@/hooks/useTimetableViewMoment';
import TimePlanManager from '@/plan/TimePlanManager';
import useFocusedPlanState from '@/stores/plan/focusedPlan';

const TimetableSelect: React.FC = () => {
  const viewMoment = useTimetableViewMoment();
  const focusedPlan = useFocusedPlanState((state) => state.focusedPlan);

  if (!focusedPlan) return <></>;

  const shouldRender = viewMoment.isBetween(
    focusedPlan.startTime,
    focusedPlan.endTime,
    'date',
    '[]',
  );
  if (!shouldRender) return <></>;

  const manager = new TimePlanManager([focusedPlan], viewMoment);
  const focusedViewInfo = manager.viewInfo.get(focusedPlan.id);
  if (!focusedViewInfo)
    throw new Error('Timetable View Info Error! : focusedPlan');

  return (
    <div css={{ width: 'calc(100% - 0.75rem)', position: 'relative' }}>
      <div css={{ width: '100%', position: 'absolute' }}>
        <TimePlan plan={focusedPlan} viewInfo={focusedViewInfo} />
      </div>
    </div>
  );
};

export default TimetableSelect;
