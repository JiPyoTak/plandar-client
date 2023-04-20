import React from 'react';

import styled from '@emotion/styled';

import { TIMETABLE_CELL_HEIGHT } from '@/styles/timetable';

type TProps = {
  plans: any[];
};

const TimetablePlanColumn: React.FC<TProps> = ({ plans }) => {
  return (
    <Positioner>
      <div css={{ width: '100%', position: 'absolute' }}>
        {plans.map(({ id, color }) => {
          return (
            <Positioner key={id}>
              <PlanCell css={{ backgroundColor: color }} />
            </Positioner>
          );
        })}
      </div>
    </Positioner>
  );
};

const Positioner = styled.div`
  width: 100%;
  position: relative;
`;

const PlanCell = styled.div`
  width: 100%;
  height: calc(${TIMETABLE_CELL_HEIGHT});

  position: absolute;

  border-radius: 8px;
`;

export default TimetablePlanColumn;
