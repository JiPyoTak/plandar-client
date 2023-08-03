import { useEffect, useRef, useState } from 'react';

import Plan from '@/core/plan/Plan';
import { getPositionByViewPort } from '@/utils/calendar/getPositionByViewPort';

interface IProps {
  initialPlan: Plan | null;
  rect: Pick<DOMRect, 'top' | 'left' | 'right'>;
  delay?: number;
}

const useEffectModal = ({ initialPlan, rect, delay = 300 }: IProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const timeRef = useRef<NodeJS.Timeout | null>(null);

  const [plan, setPlan] = useState<Plan | null>(null);

  useEffect(() => {
    if (timeRef.current) {
      clearTimeout(timeRef.current);
      timeRef.current = null;
    }

    if (!initialPlan) {
      if (!ref.current) return;

      ref.current.style.opacity = '0';

      timeRef.current = setTimeout(() => {
        setPlan(null);
      }, 300);
    } else {
      setPlan(initialPlan);

      timeRef.current = setTimeout(() => {
        if (!ref.current) return;

        ref.current!.style.opacity = '1';
      }, delay);
    }
  }, [initialPlan]);

  useEffect(() => {
    if (!plan || !ref.current) return;

    const { width, height } = ref.current.getBoundingClientRect();

    const { left, top } = getPositionByViewPort(rect, { width, height });

    ref.current.style.left = `${left}px`;
    ref.current.style.top = `${top}px`;
  }, [plan]);

  return [plan, ref] as const;
};

export { useEffectModal };
