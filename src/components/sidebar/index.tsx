import React from 'react';

import styled from '@emotion/styled';

import SideTitle from './SideTitle';

const SideBar: React.FC = () => {
  return (
    <Wrapper>
      <SideTitle />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem;

  border-right: 1px solid ${({ theme }) => theme.border1};
`;

export default SideBar;
