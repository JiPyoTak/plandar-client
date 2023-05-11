import React, { ButtonHTMLAttributes, MouseEvent } from 'react';

import styled from '@emotion/styled';

import { HamburgerIcon } from '@/components/icons';
import useDrawerState from '@/stores/drawer';

type THamburgerButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

type THamburgerButton = React.FC<THamburgerButtonProps>;

const HamburgerButton: THamburgerButton = ({
  onClick,
  ...rest
}: THamburgerButtonProps) => {
  const { toggle } = useDrawerState();

  const onClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    toggle();
  };

  return (
    <Container onClick={onClickHandler} {...rest}>
      <HamburgerIcon width={32} height={32} />
    </Container>
  );
};

const Container = styled.button`
  border-radius: 5px;
  padding: 5px;
  &:hover {
    background-color: ${({ theme }) => theme.background3};
  }
`;

export default HamburgerButton;
