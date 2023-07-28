import React from 'react';

import { useTheme } from '@emotion/react';

import styled from '@emotion/styled';

import { CALENDAR_UNIT } from '@/constants';
import useDateState from '@/stores/date';

const LABEL_LEFT = {
  [CALENDAR_UNIT.day]: '5px',
  [CALENDAR_UNIT.week]: 'calc(50% - 25px)',
  [CALENDAR_UNIT.month]: 'calc(100% - 55px)',
} as const;

const CALENDAR_UNIT_TEXT = {
  [CALENDAR_UNIT.day]: '일',
  [CALENDAR_UNIT.week]: '주',
  [CALENDAR_UNIT.month]: '월',
} as const;

const CALENDAR_SELECTIONS = [
  CALENDAR_UNIT.day,
  CALENDAR_UNIT.week,
  CALENDAR_UNIT.month,
];

const CalendarUnitButton: React.FC = () => {
  const theme = useTheme();
  const { calendarUnit, setCalendarUnit } = useDateState(
    ({ calendarUnit, setCalendarUnit }) => ({
      calendarUnit,
      setCalendarUnit,
    }),
  );
  // * : days (range 선택 시) 주 단위 달력으로 판단
  const selectedUnit =
    calendarUnit === CALENDAR_UNIT.days ? CALENDAR_UNIT.week : calendarUnit;

  return (
    <CalendarUnitWrapper>
      <CalendarUnitLabel css={{ left: LABEL_LEFT[selectedUnit] }} />
      {CALENDAR_SELECTIONS.map((unit) => (
        <CalendarUnitText
          key={unit}
          css={
            selectedUnit === unit && {
              color: theme.title_active,
            }
          }
          onClick={() => setCalendarUnit(unit)}
        >
          {CALENDAR_UNIT_TEXT[unit]}
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
