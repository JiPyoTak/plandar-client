import React from 'react';

import styled from '@emotion/styled';

import { HamburgerIcon } from '@/components/icons';
import useDrawerState from '@/stores/drawer';

const HamburgerButton: React.FC = () => {
  const { toggle } = useDrawerState();

  return (
    <Container onClick={toggle}>
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
