import React from 'react';

import styled from '@emotion/styled';

import CategoryClassifier from './CategoryClassifier';
import TagClassifier from './TagClassifier';
import TypeClassifier from './TypeClassifier';
import Calendar from '@/components/calendars/small';

const SideBar: React.FC = () => {
  return (
    <Wrapper>
      <Calendar />
      <TypeClassifier />
      <CategoryClassifier />
      <TagClassifier />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  flex: 0 0 340px;
  height: 100%;
  background-color: ${({ theme }) => theme.white};
  padding: 2rem;
`;

export default SideBar;
