import React from 'react';

import styled from '@emotion/styled';

import Calendar from '../Calendar/small';

import CategoryClassifier from './CategoryClassifier';
import SideTitle from './SideTitle';
import TagClassifier from './TagClassifier';
import TypeClassifier from './TypeClassifier';

const SideBar: React.FC = () => {
  return (
    <Wrapper>
      <SideTitle />
      <Calendar />
      <TypeClassifier />
      <CategoryClassifier />
      <TagClassifier />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  border-right: 1px solid ${({ theme }) => theme.border1};
`;

export default SideBar;
