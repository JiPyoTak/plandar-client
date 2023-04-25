import { useEffect, useRef } from 'react';

import moment from 'moment';

import useSelectedPlanState from '@/stores/plan/selectedPlan';
import { changePlanView } from '@/utils/plan/planViewHandlerToMonth';

export type MouseEventHandler = React.MouseEventHandler<HTMLDivElement>;

const useDrag = () => {
  const currentDateRef = useRef<string | null>(null);

  const { selectedPlan, isDragging, onDragEnd, changeSelectedPlan } =
    useSelectedPlanState();

  const changeCurrentDate: MouseEventHandler = (e) => {
    const target = document
      .elementsFromPoint(e.clientX, e.clientY)
      .find((el) => el.classList.contains('dateTime')) as HTMLElement;

    if (!target) return;

    const targetDate = target.dataset.date;

    if (!target || !targetDate) return;

    currentDateRef.current = targetDate;
  };

  const onMouseMove: MouseEventHandler = (e) => {
    if (!selectedPlan || !currentDateRef.current) return;

    const target = document
      .elementsFromPoint(e.clientX, e.clientY)
      .find((el) => el.classList.contains('dateTime')) as HTMLElement;

    if (!selectedPlan || !target?.dataset?.date) return;

    const currentDate = moment(currentDateRef.current);
    const targetDate = moment(target.dataset.date);

    const changePlanViewCb = changePlanView({ targetDate, currentDate });

    changeSelectedPlan(changePlanViewCb);
  };

  useEffect(() => {
    if (!selectedPlan || !currentDateRef.current) return;

    const onMouseUp = () => {
      currentDateRef.current = null;
      onDragEnd();
      // TODO: cb()을 통한 추가 이벤트 구현 여부
    };

    document.addEventListener('mouseup', onMouseUp);
    return () => {
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [selectedPlan, currentDateRef.current]);

  return [
    isDragging,
    currentDateRef.current,
    changeCurrentDate,
    onMouseMove,
  ] as const;
};

export default useDrag;
