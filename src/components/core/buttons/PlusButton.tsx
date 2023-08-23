import React from 'react';

import { PlusIcon } from '@/components/common/icons';
import StylishButton from '@/components/core/buttons/StylishButton';
import useModalState from '@/stores/modal';
import useFocusedPlanState from '@/stores/plan/focusedPlan';

const PlusButton: React.FC = () => {
  const createNewPlan = useFocusedPlanState((store) => store.createNewPlan);
  const openModal = useModalState((state) => state.openModal);

  const onClickButton = () => {
    createNewPlan();
    openModal();
  };

  return (
    <StylishButton
      onClick={onClickButton}
      size="small"
      isColor={true}
      isSquare={true}
    >
      <PlusIcon color="white" />
    </StylishButton>
  );
};

export default PlusButton;
