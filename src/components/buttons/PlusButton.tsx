import React from 'react';

import StylishButton from '@/components/buttons/StylishButton';
import { PlusIcon } from '@/components/icons';
import useFocusedPlanState from '@/stores/plan/focusedPlan';

const PlusButton: React.FC = () => {
  const createNewPlan = useFocusedPlanState((store) => store.createNewPlan);

  return (
    <StylishButton
      onClick={() => createNewPlan()}
      size="small"
      isColor={true}
      isSquare={true}
    >
      <PlusIcon color="white" />
    </StylishButton>
  );
};

export default PlusButton;
