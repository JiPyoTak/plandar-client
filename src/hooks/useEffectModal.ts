import { useEffect, useRef, useState } from 'react';

import Plan from '@/plan/Plan';

interface IProps {
  initialPlan: Plan | null;
  delay?: number;
}

const useEffectModal = ({ initialPlan, delay = 300 }: IProps) => {
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

  return [plan, ref] as const;
};

export { useEffectModal };
