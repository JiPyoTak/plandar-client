import { useGetPlansQuery } from '@/hooks/query/plan';
import useCategoryClassifierState from '@/stores/classifier/category';
import useTagClassifierState from '@/stores/classifier/tag';
import useTypeClassifierState from '@/stores/classifier/type';
import useDateState from '@/stores/date';
import { IPlan } from '@/types/query/plan';
import { getStartAndEndDate } from '@/utils/date/getStartAndEndDate';

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

  // TODO : make hook
  const { referenceDate } = useDateState(({ referenceDate }) => ({
    referenceDate,
  }));
  const [startMoment, endMoment] = getStartAndEndDate(referenceDate);

  const { data: plans } = useGetPlansQuery({
    timemin: startMoment.format(),
    timemax: endMoment.format(),
  });

  const classifiedPlans = (plans ?? []).reduce((result, plan) => {
    const { categoryId, tags } = plan;

    if (categoryId && hiddenCategories.has(categoryId)) return result;
    if (tags.length && tags.every((tag) => hiddenTags.has(tag))) return result;
    if (!showAlarm && plan.type === 'alarm') return result;
    if (!showEvent && plan.type === 'event') return result;
    if (!showTask && plan.type === 'task') return result;

    result.push(plan);

    return result;
  }, [] as IPlan[]);

  return classifiedPlans;
};

export default useClassifiedPlans;
