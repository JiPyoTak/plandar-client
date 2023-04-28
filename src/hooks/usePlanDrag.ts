import { useEffect, useRef } from 'react';

import { CALENDAR_UNIT } from '@/constants';
import useCalendarUnitState from '@/stores/date/calendarUnit';
import useFocusedPlanState from '@/stores/plan/focusedPlan';

export type MouseEventHandler = React.MouseEventHandler<HTMLDivElement>;

const usePlanDrag = () => {
  const { selectedCalendarUnit } = useCalendarUnitState();
  const { focusedPlan, onMoveMonthPlan, onDragEndPlan } = useFocusedPlanState();
  const currentDateRef = useRef<string | null>(null);
  const focusedPlanRef = useRef<typeof focusedPlan>(focusedPlan);

  const getDateOfMouse = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const { clientX, clientY } = event;

    const target = document
      .elementsFromPoint(clientX, clientY)
      .find((el) => el.getAttribute('data-date'));
    if (!target) return null;

    return target.getAttribute('data-date');
  };

  const changeCurrentDate: MouseEventHandler = (event) => {
    const targetDate = getDateOfMouse(event);
    if (!targetDate) return;

    currentDateRef.current = targetDate;
  };

  const onMouseMove: MouseEventHandler = (event) => {
    const targetDate = getDateOfMouse(event);
    const currentDate = currentDateRef.current;
    if (!targetDate || !currentDate) return;

    const isMonth = selectedCalendarUnit === CALENDAR_UNIT[2];
    const movePlan = isMonth ? onMoveMonthPlan : onMoveMonthPlan;
    movePlan({ targetDate, currentDate });
  };

  useEffect(() => {
    focusedPlanRef.current = focusedPlan;
  }, [focusedPlan]);

  useEffect(() => {
    const onMouseUp = () => {
      if (currentDateRef.current && focusedPlanRef.current) {
        currentDateRef.current = null;
        onDragEndPlan();
      }
    };

    document.addEventListener('mouseup', onMouseUp);
    return () => {
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  return {
    currentDateRef,
    changeCurrentDate,
    getDateOfMouse,
    onMouseMove,
  };
};

export default usePlanDrag;
