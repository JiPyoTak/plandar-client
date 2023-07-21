import React from 'react';

import styled from '@emotion/styled';

import HeaderButtons from './HeaderButtons';
import HeaderTitle from './HeaderTitle';
import CalendarUnitButton from '@/components/core/buttons/CalendarUnitButton';

const Header = () => {
  return (
    <Container>
      <HeaderButtons />
      <HeaderTitle />
      <CalendarUnitButton />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 4rem;
  padding: 0.5rem 1rem;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: ${({ theme }) => theme.white};
`;

export default Header;
