import React from 'react';

import TimetablePlan from './TimetablePlan';

type TProps = {
  plans: any[];
};

const TimetablePlanColumn: React.FC<TProps> = ({ plans }) => {
  return (
    <div css={{ width: '100%', position: 'relative' }}>
      <div css={{ width: '100%', position: 'absolute' }}>
        {plans.map((plan, index) => (
          <TimetablePlan
            key={plan.id ?? `timetable-plan-${index}`}
            plan={plan}
          />
        ))}
      </div>
    </div>
  );
};

export default TimetablePlanColumn;
