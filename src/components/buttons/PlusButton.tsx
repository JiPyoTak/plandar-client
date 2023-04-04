import React from 'react';

import StylishButton from '@/components/buttons/StylishButton';
import { PlusIcon } from '@/components/icons';

const PlusButton = () => {
  return (
    <StylishButton
      onClick={() => console.log('plus')}
      size="small"
      color={true}
      square={true}
    >
      <PlusIcon color="white" />
    </StylishButton>
  );
};

export default PlusButton;
