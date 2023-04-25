import React from 'react';

import TimetablePlan from './TimetablePlan';
import { ITimePlan } from '@/types/rq/plan';
import { getOrderTimePlansInfo } from '@/utils/plan/day/getOrderTimePlansInfo';

type TProps = {
  plans: ITimePlan[];
};

const TimetablePlanColumn: React.FC<TProps> = ({ plans }) => {
  const orderInfos = getOrderTimePlansInfo(plans);

  return (
    <div css={{ width: 'calc(100% - 0.75rem)', position: 'relative' }}>
      <div css={{ width: '100%', position: 'absolute' }}>
        {plans.map((plan, index) => (
          <TimetablePlan
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
