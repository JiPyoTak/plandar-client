import React from 'react';

import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import { CheckIcon } from '@/components/common/icons';
import { SELECTABLE_COLOR } from '@/constants';
import { ColorCircle } from '@/styles/category';
import { TColor } from '@/types';

interface IProps {
  isOpen: boolean;
  className?: string;
  selectedColor: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>, color: TColor) => void;
}

const ColorPopup: React.FC<IProps> = ({
  isOpen,
  className,
  selectedColor,
  onClick,
}) => {
  const theme = useTheme();

  if (!isOpen) return null;

  return (
    <Container className={className}>
      {SELECTABLE_COLOR.map((color) => (
        <button onClick={(e) => onClick?.(e, color)} key={color}>
          <ColorCircle color={color} size={22} css={{ display: 'block' }} />
          {selectedColor === color && <CheckMarker color={theme.white} />}
        </button>
      ))}
    </Container>
  );
};

const Container = styled.div`
  position: absolute;

  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(5, 1fr);
  gap: 0.75rem;

  padding: 1rem;
  border-radius: 10px;

  background-color: ${({ theme }) => theme.white};
  border: 1px solid ${({ theme }) => theme.border1};

  filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07))
    drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));

  z-index: 50;
`;

const CheckMarker = styled(CheckIcon)`
  position: absolute;

  top: calc(50% + 1px);
  left: calc(50% - 1px);
  transform: translate(-50%, -50%);

  width: 16px;
  height: 16px;
`;

export default ColorPopup;
