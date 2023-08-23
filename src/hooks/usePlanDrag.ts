import { useCallback, useEffect, useRef } from 'react';

import { shallow } from 'zustand/shallow';

import { useUpdatePlanMutation } from './query/plan';
import { toast } from '@/core/toast';
import useModalState from '@/stores/modal';
import useFocusedPlanState from '@/stores/plan/focusedPlan';

export type MouseEventHandler = React.MouseEventHandler<HTMLDivElement>;

const usePlanDrag = () => {
  const { mutateAsync } = useUpdatePlanMutation();

  const {
    currentPlan,
    focusedPlan,
    onMoveMonthPlan,
    onDragTimePlan,
    onDragEndPlan,
  } = useFocusedPlanState(
    (state) => ({
      currentPlan: state.currentPlan,
      focusedPlan: state.focusedPlan,
      onMoveMonthPlan: state.onMoveMonthPlan,
      onDragTimePlan: state.onDragTimePlan,
      onDragEndPlan: state.onDragEndPlan,
    }),
    shallow,
  );

  const openModal = useModalState((state) => state.openModal);

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

  const changeCurrentDate: MouseEventHandler = useCallback((event) => {
    const { date, time } = getDataOfMouse(event);
    const targetDate = date ?? time;
    if (!targetDate) return;

    currentDateRef.current = targetDate;
    draggingDateRef.current = targetDate;
    if (!timeTypeRef.current) {
      timeTypeRef.current = date ? 'date' : time ? 'time' : null;
    }
  }, []);

  const onMouseMove: MouseEventHandler = useCallback(
    (event) => {
      if (!currentDateRef.current) return;

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
    },
    [onMoveMonthPlan, onDragTimePlan],
  );

  useEffect(() => {
    focusedPlanRef.current = focusedPlan;
  }, [focusedPlan]);

  useEffect(() => {
    const onMouseUp = async () => {
      if (!currentDateRef.current || !focusedPlanRef.current || !focusedPlan)
        return;

      if (focusedPlan.id >= 0 && !shallow(currentPlan, focusedPlan)) {
        await mutateAsync(focusedPlan);
        toast(`${focusedPlan.title} 일정 날짜가 변경되었습니다`);
      }

      if (focusedPlan.id === -1) {
        openModal();
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
    changeCurrentDate,
    onMouseMove,
  };
};

export default usePlanDrag;
