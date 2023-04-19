import React, { ButtonHTMLAttributes, PropsWithChildren } from 'react';

import { css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import { TDirection, TSize } from '@/types';

type TStylishButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    size?: TSize;
    isColor?: boolean;
    isSquare?: boolean;
    radiusDir?: TDirection;
  }
>;

type TStylishButton = React.FC<TStylishButtonProps>;

const SIZE: { [key in TSize]: string } = {
  small: 'fit-content',
  medium: '200px',
  large: '100%',
} as const;

const RADIUS_DIR: { [key in TDirection]: string } = {
  left: '5px 0 0 5px',
  right: '0 5px 5px 0',
  top: '5px 5px 0 0',
  bottom: '0 0 5px 5px',
  all: '5px',
} as const;

const StylishButton: TStylishButton = ({
  children,
  onClick,
  size = 'medium',
  className,
  isSquare = false,
  isColor = false,
  radiusDir = 'all',
  disabled = false,
}: TStylishButtonProps) => {
  const theme = useTheme();
  return (
    <Container
      className={className}
      onClick={onClick}
      size={size}
      isSquare={isSquare}
      isColor={isColor}
      radiusDir={radiusDir}
      disabled={disabled}
      css={
        disabled &&
        css`
          cursor: not-allowed;
          opacity: 0.5;
          &:hover {
            background-color: ${isColor ? theme.primary : theme.background1};
          }
        `
      }
    >
      {children}
    </Container>
  );
};

const StylishContainer = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
`;

const Container = styled(StylishContainer)<{
  size: string;
  isColor: boolean;
  isSquare: boolean;
  radiusDir: TDirection;
}>`
  width: ${({ size }) => SIZE[size] ?? size};
  color: ${({ theme, isColor }) => (isColor ? theme.background2 : theme.black)};
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
