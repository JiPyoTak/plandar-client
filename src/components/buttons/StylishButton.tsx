import { PropsWithChildren } from 'react';

import styled from '@emotion/styled';

import { TDirection, TSize } from '@/types';

type StylishButtonProps = PropsWithChildren<{
  onClick: () => void;
  className?: string;
  size?: TSize;
  color?: boolean;
  square?: boolean;
  radiusDir?: TDirection;
}>;

const SIZE: { [key in TSize]: string } = {
  small: 'fit-content',
  medium: '200px',
  large: '300px',
} as const;

const RADIUS_DIR: { [key in TDirection]: string } = {
  left: '5px 0 0 5px',
  right: '0 5px 5px 0',
  top: '5px 5px 0 0',
  bottom: '0 0 5px 5px',
  all: '5px',
} as const;

const StylishButton = ({
  children,
  onClick,
  size = 'medium',
  className,
  square = false,
  color = false,
  radiusDir = 'all',
}: StylishButtonProps) => {
  return (
    <Container
      className={className}
      onClick={onClick}
      size={size}
      isSquare={square}
      isColor={color}
      radiusDir={radiusDir}
    >
      {children}
    </Container>
  );
};

const StylishContainer = styled.button<{
  size?: string;
  color?: boolean;
  square?: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.border2};
  padding: 8px;
  background-color: ${({ theme }) => theme.background1};

  &:hover {
    background-color: ${({ theme }) => theme.background2};
  }
`;

const Container = styled(StylishContainer)<{
  size: string;
  isColor: boolean;
  isSquare: boolean;
  radiusDir: TDirection;
}>`
  width: ${({ size }) => SIZE[size] ?? size};
  color: ${({ theme, isColor }) => (isColor ? theme.white : theme.black)};
  background-color: ${({ theme, isColor }) =>
    isColor ? theme.primary : theme.background1};
  border: 1px solid
    ${({ theme, isColor }) => (isColor ? theme.primary : theme.border2)};
  aspect-ratio: ${({ isSquare }) => (isSquare ? '1/1' : 'auto')};
  border-radius: ${({ radiusDir }) => RADIUS_DIR[radiusDir]};

  &:hover {
    background-color: ${({ isColor, theme }) =>
      isColor ? theme.primary_dark : theme.background2};
  }
`;

export default StylishButton;
