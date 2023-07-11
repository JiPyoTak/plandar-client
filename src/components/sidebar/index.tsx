import React from 'react';

import styled from '@emotion/styled';

import CategoryClassifier from './CategoryClassifier';
import SmallCalendar from './SmallCalendar';
import TagClassifier from './TagClassifier';
import HamburgerButton from '@/components/buttons/HamburgerButton';
import Logo from '@/components/logo';
import useDrawerState from '@/stores/drawer';

const WIDTH = '21.25rem';

const SideBar: React.FC = () => {
  const { isOpened } = useDrawerState();

  return (
    <Container css={{ width: isOpened ? WIDTH : 0 }}>
      <InnerContainer>
        <div className="sidebar-header">
          <Logo />
          <HamburgerButton />
        </div>
        <div className="sidebar-contents">
          <SmallCalendarSizer>
            <SmallCalendar />
          </SmallCalendarSizer>
          {/*
            Type 구현이 완료된 후 사용 할 것
            <TypeClassifier />
          */}
          <CategoryClassifier />
          <TagClassifier />
        </div>
      </InnerContainer>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  overflow: hidden;
  transition: width 0.3s ease-in-out;
`;

const InnerContainer = styled.div`
  width: ${WIDTH};
  min-height: 100%;
  background-color: ${({ theme }) => theme.background3};

  & > .sidebar-header {
    display: flex;
    justify-content: space-between;
    background-color: ${({ theme }) => theme.background1};
  }

  & > .sidebar-contents {
    padding: 1rem;

    & > div {
      border-radius: 10px;
      background-color: ${({ theme }) => theme.background1};
    }
  }
`;

const SmallCalendarSizer = styled.div`
  padding: 1.5rem 1rem;
`;

export default SideBar;
