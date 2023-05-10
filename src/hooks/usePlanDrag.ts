import { useEffect, useRef } from 'react';

import useFocusedPlanState from '@/stores/plan/focusedPlan';

export type MouseEventHandler = React.MouseEventHandler<HTMLDivElement>;

const usePlanDrag = () => {
  const { focusedPlan, onMoveMonthPlan, onMoveTimePlan, onDragEndPlan } =
    useFocusedPlanState();
  const currentDateRef = useRef<string | null>(null);
  const draggingDateRef = useRef<string | null>(null);
  const focusedPlanRef = useRef<typeof focusedPlan>(focusedPlan);

  const getDataOfMouse = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const { clientX, clientY } = event;

    const target = document
      .elementsFromPoint(clientX, clientY)
      .find(
        (el) => el.getAttribute('data-date') || el.getAttribute('data-time'),
      );

    if (!target) {
      return {
        date: null,
        time: null,
      };
    }

    return {
      date: target.getAttribute('data-date'),
      time: target.getAttribute('data-time'),
    };
  };

  const changeCurrentDate: MouseEventHandler = (event) => {
    const { date: targetDate } = getDataOfMouse(event);
    if (!targetDate) return;

    currentDateRef.current = targetDate;
    draggingDateRef.current = targetDate;
  };

  const onMouseMove: MouseEventHandler = (event) => {
    const { date, time } = getDataOfMouse(event);
    const targetDate = date ?? time;

    const currentDate = currentDateRef.current;
    const draggingDate = draggingDateRef.current;

    if (!targetDate || !currentDate) return;

    // 현재 같은 곳을 드래깅하고 있다면 그대로
    if (targetDate && targetDate === draggingDate) return;
    draggingDateRef.current = targetDate;

    const movePlan = date ? onMoveMonthPlan : onMoveTimePlan;
    movePlan({ targetDate, currentDate });
  };

  useEffect(() => {
    focusedPlanRef.current = focusedPlan;
  }, [focusedPlan]);

  useEffect(() => {
    const onMouseUp = () => {
      if (currentDateRef.current && focusedPlanRef.current) {
        currentDateRef.current = null;
        draggingDateRef.current = null;
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
    getDataOfMouse,
    onMouseMove,
  };
};

export default usePlanDrag;
