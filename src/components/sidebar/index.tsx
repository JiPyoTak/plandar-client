import React from 'react';

import styled from '@emotion/styled';

import CategoryClassifier from './CategoryClassifier';
import SideTitle from './SideTitle';
import TagClassifier from './TagClassifier';
import TypeClassifier from './TypeClassifier';

const SideBar: React.FC = () => {
  return (
    <Wrapper>
      <SideTitle />
      <TypeClassifier />
      <CategoryClassifier />
      <TagClassifier />
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
