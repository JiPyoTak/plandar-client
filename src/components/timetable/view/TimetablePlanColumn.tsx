import React from 'react';

import moment from 'moment';

import TimetablePlan from './TimetablePlan';
import { DAY_TO_MINUTE, TIMETABLE_CELL_UNIT } from '@/constants';

type TProps = {
  plans: any[];
};

const TimetablePlanColumn: React.FC<TProps> = ({ plans }) => {
  const orderOfCells = new Array(
    Math.floor(DAY_TO_MINUTE / TIMETABLE_CELL_UNIT),
  );

  const sortedPlans = plans
    // Maybe 정렬할 때 같이 써야할 것 같음
    .sort(
      (
        { id: aId, startTime: aST, endTime: aET },
        { id: bId, startTime: bST, endTime: bET },
      ) => {
        const startDiff = moment(aST).diff(bST, 'minute');
        const longDiff = moment(bET).diff(bST) - moment(aET).diff(aST);
        const idDiff = aId - bId;
        return startDiff || longDiff || idDiff;
      },
    );

  const dateToTimetableMinute = (dateString: string, isCeil?: boolean) => {
    const date = new Date(dateString);
    return Math?.[isCeil ? 'ceil' : 'floor'](
      (date.getHours() * 60 + date.getMinutes()) / TIMETABLE_CELL_UNIT,
    );
  };

  const displayOrderOfPlans = sortedPlans
    // Cell에 기록하면서 정렬
    .map((plan) => {
      let displayOrder = 1;
      const startIndex = dateToTimetableMinute(plan.startTime);
      const endIndex = dateToTimetableMinute(plan.endTime, true);

      for (let i = startIndex; i <= endIndex; i++) {
        orderOfCells[i] = (orderOfCells[i] ?? 0) + 1;
        displayOrder = Math.max(displayOrder, orderOfCells[i]);
      }

      return displayOrder;
    });

  const entireOrderOfPlans = sortedPlans.map((plan) => {
    let entireOrder = 1;
    const startIndex = dateToTimetableMinute(plan.startTime);
    const endIndex = dateToTimetableMinute(plan.endTime, true);

    for (let i = startIndex; i <= endIndex; i++) {
      entireOrder = Math.max(entireOrder, orderOfCells[i] ?? 0);
    }

    return entireOrder;
  });

  return (
    <div css={{ width: 'calc(100% - 0.75rem)', position: 'relative' }}>
      <div css={{ width: '100%', position: 'absolute' }}>
        {plans.map((plan, index) => (
          <TimetablePlan
            key={plan.id ?? `timetable-plan-${index}`}
            plan={plan}
            displayOrder={displayOrderOfPlans[index]}
            entireOrder={entireOrderOfPlans[index]}
          />
        ))}
      </div>
    </div>
  );
};

export default TimetablePlanColumn;
