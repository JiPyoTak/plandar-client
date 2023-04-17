import React from 'react';

import { useTheme } from '@emotion/react';

import styled from '@emotion/styled';

import useCalendarUnitState from '@/stores/date/calendarUnit';
import { CALENDAR_UNIT } from '@/utils/constants';

const labelLeft = {
  [CALENDAR_UNIT[0]]: '5px',
  [CALENDAR_UNIT[1]]: 'calc(50% - 25px)',
  [CALENDAR_UNIT[2]]: 'calc(100% - 55px)',
} as const;

const CalendarUnitButton: React.FC = () => {
  const { selectedCalendarUnit, selectCalendarUnit } = useCalendarUnitState();
  const theme = useTheme();

  return (
    <CalendarUnitWrapper>
      <CalendarUnitLabel css={{ left: labelLeft[selectedCalendarUnit] }} />
      {CALENDAR_UNIT.map((calendarUnit) => (
        <CalendarUnitText
          key={calendarUnit}
          css={
            selectedCalendarUnit === calendarUnit && {
              color: theme.title_active,
            }
          }
          onClick={() => selectCalendarUnit(calendarUnit)}
        >
          {calendarUnit}
        </CalendarUnitText>
      ))}
    </CalendarUnitWrapper>
  );
};

const CalendarUnitWrapper = styled.span`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  gap: 10px;
  background-color: ${({ theme }) => theme.background3};
  border-radius: 100px;
  width: 158px;
  height: 40px;
`;

const CalendarUnitLabel = styled.span`
  position: absolute;
  pointer-events: none;
  z-index: 5;
  display: inline-block;
  background-color: white;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  border-radius: 25px;
  width: 50px;
  height: 32px;
  transition: left 0.3s ease-in-out;
`;

const CalendarUnitText = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
  background-color: transparent;
  padding: 10px;
  gap: 10px;
  width: 50px;
  height: 32px;
  transition: color 0.3s ease-in-out;
  color: ${({ theme }) => theme.text3};
`;

export default CalendarUnitButton;
