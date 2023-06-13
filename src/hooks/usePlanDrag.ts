import { useEffect, useRef } from 'react';

import { shallow } from 'zustand/shallow';

import { useUpdatePlanMutation } from './rq/plan';
import useFocusedPlanState from '@/stores/plan/focusedPlan';

export type MouseEventHandler = React.MouseEventHandler<HTMLDivElement>;

const usePlanDrag = () => {
  const { mutateAsync } = useUpdatePlanMutation();

  const { focusedPlan, onMoveMonthPlan, onDragTimePlan, onDragEndPlan } =
    useFocusedPlanState(
      (state) => ({
        focusedPlan: state.focusedPlan,
        onMoveMonthPlan: state.onMoveMonthPlan,
        onDragTimePlan: state.onDragTimePlan,
        onDragEndPlan: state.onDragEndPlan,
      }),
      shallow,
    );
  const currentDateRef = useRef<string | null>(null);
  const draggingDateRef = useRef<string | null>(null);
  const focusedPlanRef = useRef<typeof focusedPlan>(focusedPlan);
  const timeTypeRef = useRef<'date' | 'time' | null>(null);

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
    const { date, time } = getDataOfMouse(event);
    const targetDate = date ?? time;
    if (!targetDate) return;

    currentDateRef.current = targetDate;
    draggingDateRef.current = targetDate;
    if (!timeTypeRef.current) {
      timeTypeRef.current = date ? 'date' : time ? 'time' : null;
    }
  };

  const onMouseMove: MouseEventHandler = (event) => {
    const { date, time } = getDataOfMouse(event);
    const targetDate = date ?? time;

    const currentDate = currentDateRef.current;
    const draggingDate = draggingDateRef.current;
    const timeType = timeTypeRef.current;

    if (!targetDate || !currentDate || !timeType) return;

    // 처음 드래깅 한 곳과 현재 드래깅 한 곳이 다른 Cell 일 경우 그대로
    const isDayPlan = timeType === 'date';
    const isTimePlan = timeType === 'time';
    if (isDayPlan && !date) return;
    if (isTimePlan && !time) return;

    // 현재 같은 곳을 드래깅하고 있다면 그대로
    if (targetDate && targetDate === draggingDate) return;
    draggingDateRef.current = targetDate;

    const dragPlan = isDayPlan ? onMoveMonthPlan : onDragTimePlan;
    dragPlan({ targetDate, currentDate });
  };

  useEffect(() => {
    focusedPlanRef.current = focusedPlan;
  }, [focusedPlan]);

  useEffect(() => {
    const onMouseUp = async () => {
      if (!currentDateRef.current || !focusedPlanRef.current || !focusedPlan)
        return;

      if (focusedPlan.id >= 0) {
        const input = {
          ...focusedPlan,
          tags: focusedPlan.tags.map((tag) => tag.name),
        };

        await mutateAsync(input);
      }

      timeTypeRef.current = null;
      currentDateRef.current = null;
      draggingDateRef.current = null;
      onDragEndPlan();
    };

    document.addEventListener('mouseup', onMouseUp);
    return () => {
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [focusedPlan]);

  return {
    currentDateRef,
    changeCurrentDate,
    getDataOfMouse,
    onMouseMove,
  };
};

export default usePlanDrag;
