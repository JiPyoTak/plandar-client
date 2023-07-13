import React from 'react';

import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import CategoryClassifier from './CategoryClassifier';
import SmallCalendar from './SmallCalendar';
import TagClassifier from './TagClassifier';
import ChevronIcon from '@/components/icons/ChevronIcon';
import Logo from '@/components/logo';
import UserInfo from '@/components/sidebar/content/UserInfo';
import { MenuBorder, MenuIconWrapper } from '@/components/sidebar/styles';
import useMenuState from '@/stores/menu';

const WIDTH = '21.25rem';

const SidebarContent: React.FC = () => {
  const { isOpened, closeMenu } = useMenuState();
  const theme = useTheme();

  return (
    <Container css={{ width: isOpened ? WIDTH : 0 }}>
      <InnerContainer>
        <Header>
          <Logo showPicture={false} css={{ color: theme.white }} />
          <MenuIconWrapper onClick={closeMenu}>
            <ChevronIcon
              type="left"
              width={24}
              height={24}
              color={theme.white}
            />
          </MenuIconWrapper>
        </Header>
        <Content>
          <SmallCalendarSizer>
            <SmallCalendar />
          </SmallCalendarSizer>
          {/* <TypeClassifier /> */}
          <CategoryClassifier />
          <TagClassifier />
        </Content>
        <UserInfo />
      </InnerContainer>
    </Container>
  );
};

const Container = styled.div`
  position: relative;

  height: 100%;
  overflow: hidden;
  transition: width 0.3s ease-in-out;
`;

const InnerContainer = styled.div`
  width: ${WIDTH};
  min-height: 100%;

  display: flex;
  flex-direction: column;
  ${MenuBorder}
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 4rem;

  padding: 0.5rem 1rem;
`;

const Content = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;

  gap: 1rem;

  padding: 1rem;

  & > div {
    border-radius: 10px;
    background-color: ${({ theme }) => theme.background1};
  }
`;

const SmallCalendarSizer = styled.div`
  padding: 1.5rem 1rem;
`;

export default SidebarContent;
