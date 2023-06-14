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
      ref.current?.classList.remove('is-show');

      timeRef.current = setTimeout(() => {
        setPlan(null);
      }, 300);
    } else {
      if (ref.current?.classList.contains('is-show')) return;

      setPlan(initialPlan);

      timeRef.current = setTimeout(() => {
        ref.current?.classList.add('is-show');
      }, delay);
    }
  }, [initialPlan]);

  return [plan, ref] as const;
};

export { useEffectModal };
