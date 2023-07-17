import React from 'react';

import StylishButton from '@/components/core/buttons/StylishButton';

interface IProps {
  onClick: () => void;
}

const TodayButton: React.FC<IProps> = ({ onClick }) => {
  return (
    <StylishButton onClick={onClick} size="small" css={{ padding: '8px 16px' }}>
      오늘
    </StylishButton>
  );
};
export default TodayButton;
