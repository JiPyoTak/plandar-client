import React from 'react';

import TimePlan from '@/components/plan/TimePlan';
import Plan from '@/plan/Plan';
import { getOrderTimePlansInfo } from '@/utils/plan/day/getOrderTimePlansInfo';

type TProps = {
  plans: Plan[];
};

const TimetablePlanColumn: React.FC<TProps> = ({ plans }) => {
  const orderInfos = getOrderTimePlansInfo(plans);

  return (
    <div css={{ width: 'calc(100% - 0.75rem)', position: 'relative' }}>
      <div css={{ width: '100%', position: 'absolute' }}>
        {plans.map((plan, index) => (
          <TimePlan
            key={plan.id ?? `timetable-plan-${index}`}
            plan={plan}
            rank={orderInfos[index].rank}
            total={orderInfos[index].total}
          />
        ))}
      </div>
    </div>
  );
};

export default TimetablePlanColumn;
