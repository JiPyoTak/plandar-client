import React from 'react';

import TimePlan from '@/components/plan/TimePlan';
import useTimetableViewMoment from '@/hooks/useTimetableViewMoment';
import Plan from '@/plan/Plan';
import TimePlanManager from '@/plan/TimePlanManager';

type TProps = {
  plans: Plan[];
};

const TimetablePlanColumn: React.FC<TProps> = ({ plans }) => {
  const viewMoment = useTimetableViewMoment();
  const planManager = new TimePlanManager(plans, viewMoment);

  return (
    <div css={{ width: 'calc(100% - 0.75rem)', position: 'relative' }}>
      <div css={{ width: '100%', position: 'absolute' }}>
        {plans.map((plan) => {
          const { id } = plan;
          const viewInfo = planManager.viewInfo.get(id);

          return (
            viewInfo && <TimePlan key={id} plan={plan} viewInfo={viewInfo} />
          );
        })}
      </div>
    </div>
  );
};

export default TimetablePlanColumn;
