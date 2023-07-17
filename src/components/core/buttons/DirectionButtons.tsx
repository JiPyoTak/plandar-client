import React from 'react';

import ChevronIcon from '@/components/common/icons/ChevronIcon';
import StylishButton from '@/components/core/buttons/StylishButton';

interface IProps {
  onClickLeftButton: () => void;
  onClickRightButton: () => void;
}

const DirectionButtons: React.FC<IProps> = ({
  onClickLeftButton,
  onClickRightButton,
}) => {
  return (
    <div css={{ display: 'flex' }}>
      <StylishButton
        onClick={onClickLeftButton}
        radiusDir="left"
        size="small"
        isSquare={true}
      >
        <ChevronIcon type="left" />
      </StylishButton>
      <StylishButton
        onClick={onClickRightButton}
        radiusDir="right"
        size="small"
        isSquare={true}
      >
        <ChevronIcon type="right" />
      </StylishButton>
    </div>
  );
};

export default DirectionButtons;
