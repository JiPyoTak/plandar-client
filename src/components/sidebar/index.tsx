import React from 'react';

import styled from '@emotion/styled';

import CategoryClassifier from './CategoryClassifier';
import TagClassifier from './TagClassifier';
import TypeClassifier from './TypeClassifier';
import Calendar from '@/components/calendars/small';
import useDrawerState from '@/stores/drawer';
import { SIDEBAR_WIDTH } from '@/styles/home';

const SideBar: React.FC = () => {
  const { isOpened } = useDrawerState();

  return (
    <Container css={{ width: isOpened ? SIDEBAR_WIDTH : 0 }}>
      <InnerContainer>
        <Calendar />
        <TypeClassifier />
        <CategoryClassifier />
        <TagClassifier />
      </InnerContainer>
    </Container>
  );
};

const InnerContainer = styled.div`
  width: ${SIDEBAR_WIDTH};
  padding: 2rem;
`;

const Container = styled.div`
  height: 100%;
  background-color: ${({ theme }) => theme.white};
  overflow: hidden;
  transition: width 0.3s ease-in-out;
`;

export default SideBar;
