import React from 'react';
import type { MouseEventHandler, ReactNode } from 'react';

import styled from '@emotion/styled';

import { ColorCircle } from '@/styles/category';
import { TColor } from '@/types';

interface IProps {
  onClick: MouseEventHandler;
  className?: string;
  selectedColor: TColor;
  circleSize?: 'small' | 'middle';
  additionalComponent?: ReactNode;
}

const CIRCLE_SIZE = {
  small: 10,
  middle: 14,
};

const PickButton: React.FC<IProps> = ({
  className,
  selectedColor,
  circleSize = 'middle',
  additionalComponent,
  onClick,
}) => {
  return (
    <Container onClick={onClick} className={className}>
      <ColorCircle color={selectedColor} size={CIRCLE_SIZE[circleSize]} />
      {additionalComponent}
    </Container>
  );
};

const Container = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  gap: 5px;

  padding: 0 5px;
  border-radius: 5px;

  &:hover {
    background-color: ${({ theme }) => theme.background3};
  }
`;

export default PickButton;
