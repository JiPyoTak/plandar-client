import React from 'react';

import { PlusIcon } from '@/components/common/icons';
import StylishButton from '@/components/core/buttons/StylishButton';
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
