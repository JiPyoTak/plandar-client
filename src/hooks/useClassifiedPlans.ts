import { useMemo } from 'react';

import useRangedPlans from '@/hooks/useRangedPlans';
import useCategoryClassifierState from '@/stores/classifier/category';
import useTagClassifierState from '@/stores/classifier/tag';
import useTypeClassifierState from '@/stores/classifier/type';
import { IPlan } from '@/types/query/plan';

const useClassifiedPlans = () => {
  const hiddenCategories = useCategoryClassifierState(
    (state) => state.hiddenCategories,
  );
  const hiddenTags = useTagClassifierState((state) => state.hiddenTags);
  const { showAlarm, showEvent, showTask } = useTypeClassifierState(
    ({ showAlarm, showEvent, showTask }) => ({
      showAlarm,
      showEvent,
      showTask,
    }),
  );
  const { data: plans } = useRangedPlans();

  const classifiedPlans = useMemo(() => {
    return plans.reduce((result, plan) => {
      const { categoryId, tags } = plan;

      if (categoryId && hiddenCategories.has(categoryId)) return result;
      if (tags.length && tags.every((tag) => hiddenTags.has(tag)))
        return result;
      if (!showAlarm && plan.type === 'alarm') return result;
      if (!showEvent && plan.type === 'event') return result;
      if (!showTask && plan.type === 'task') return result;

      result.push(plan);

      return result;
    }, [] as IPlan[]);
  }, [plans, hiddenCategories, hiddenTags, showAlarm, showEvent, showTask]);

  return classifiedPlans;
};

export default useClassifiedPlans;
