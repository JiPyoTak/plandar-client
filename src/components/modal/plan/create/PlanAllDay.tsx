import styled from '@emotion/styled';

import Checkbox from '@/components/core/buttons/Checkbox';
import useFocusedPlanState from '@/stores/plan/focusedPlan';

const PlanAllDay = () => {
  const [isAllDay, toggleIsAllDay] = useFocusedPlanState(
    (store) => {
      const { focusedPlan, updateFocusedPlan } = store;
      const toggleIsAllDay = () =>
        updateFocusedPlan({ isAllDay: !focusedPlan?.isAllDay });

      return [focusedPlan ? focusedPlan.isAllDay : false, toggleIsAllDay];
    },
    (prev, cur) => prev[0] === cur[0],
  );

  return (
    <Container>
      <Checkbox label="종일" checked={isAllDay} onChange={toggleIsAllDay} />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 10px 0;
`;

export default PlanAllDay;
