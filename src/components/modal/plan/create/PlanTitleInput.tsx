import styled from '@emotion/styled';

import Input from '@/components/core/Input';
import { MAX_TITLE_LENGTH } from '@/constants';
import useFocusedPlanState from '@/stores/plan/focusedPlan';
import { FONT_BOLD_1 } from '@/styles/font';

const PlanTitleInput = () => {
  const [planTitle, setPlanTitle] = useFocusedPlanState(
    (store) => {
      const { focusedPlan, updateFocusedPlan } = store;
      const setPlanTitle = (newTitle: string) =>
        updateFocusedPlan({ title: newTitle });

      return [focusedPlan ? focusedPlan.title : '', setPlanTitle];
    },
    (prev, cur) => prev[0] === cur[0],
  );

  return (
    <PlanInput
      type="text"
      isInline={true}
      placeholder="일정 제목"
      maxLength={MAX_TITLE_LENGTH}
      value={planTitle}
      onChange={(e) => setPlanTitle(e.target.value)}
    />
  );
};

const PlanInput = styled(Input)`
  padding: 15px 0;
  ${FONT_BOLD_1};
`;

export default PlanTitleInput;
