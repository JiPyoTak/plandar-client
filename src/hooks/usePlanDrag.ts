import { useEffect, useRef } from 'react';

import { CALENDAR_UNIT } from '@/constants';
import useCalendarUnitState from '@/stores/date/calendarUnit';
import useDraggedPlanState from '@/stores/plan/draggedPlan';

export type MouseEventHandler = React.MouseEventHandler<HTMLDivElement>;

const usePlanDrag = () => {
  const { selectedCalendarUnit } = useCalendarUnitState();
  const { selectedPlan, onMoveMonthPlan, onDragEndPlan } =
    useDraggedPlanState();
  const currentDateRef = useRef<string | null>(null);
  const selectedPlanRef = useRef<typeof selectedPlan>(selectedPlan);

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
    selectedPlanRef.current = selectedPlan;
  }, [selectedPlan]);

  useEffect(() => {
    const onMouseUp = () => {
      if (currentDateRef.current && selectedPlanRef.current) {
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
