import React from 'react';

import { Moment } from 'moment';

import TimePlan from '@/components/plan/TimePlan';
import TimePlanManager from '@/plan/TimePlanManager';
import useFocusedPlanState from '@/stores/plan/focusedPlan';

type TProps = {
  dateMoment: Moment;
};

const TimetableSelect: React.FC<TProps> = ({ dateMoment }) => {
  const { focusedPlan } = useFocusedPlanState();
  const isToday =
    dateMoment.format('YYYY-MM-DD') ===
    focusedPlan?.startMoment.format('YYYY-MM-DD');

  if (!isToday || !focusedPlan) return <></>;

  const manager = new TimePlanManager([focusedPlan]);
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
