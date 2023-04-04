import React from 'react';

import StylishButton from '@/components/buttons/StylishButton';
import ChevronIcon from '@/components/icons/ChevronIcon';

const DirectionButtons = () => {
  return (
    <div css={{ display: 'flex' }}>
      <StylishButton
        onClick={() => console.log('left')}
        radiusDir="left"
        size="small"
        square={true}
      >
        <ChevronIcon type="left" />
      </StylishButton>
      <StylishButton
        onClick={() => console.log('right')}
        radiusDir="right"
        size="small"
        square={true}
      >
        <ChevronIcon type="right" />
      </StylishButton>
    </div>
  );
};

export default DirectionButtons;
