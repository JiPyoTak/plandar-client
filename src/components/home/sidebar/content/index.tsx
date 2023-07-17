import React from 'react';

import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import CategoryClassifier from './classifier/CategoryClassifier';
import TagClassifier from './classifier/TagClassifier';
import SmallCalendar from './SmallCalendar';
import ChevronIcon from '@/components/common/icons/ChevronIcon';
import Logo from '@/components/common/Logo';
import UserInfo from '@/components/home/sidebar/content/user/UserInfo';
import useMenuState from '@/stores/menu';
import {
  MENU_CONTENT_WIDTH,
  MENU_PROFILE_HEIGHT,
  MenuBorder,
  MenuIconWrapper,
} from '@/styles/sidebar';

const SidebarContent: React.FC = () => {
  const { isOpened, selected, closeMenu } = useMenuState();
  const theme = useTheme();

  const isAllShow = selected === 'home';
  const isCalendarShow = isAllShow || selected === 'calendar';
  const isCategoryShow = isAllShow || selected === 'category' || isAllShow;
  const isTagShow = isAllShow || selected === 'tag';

  return (
    <Container css={{ width: isOpened ? MENU_CONTENT_WIDTH : 0 }}>
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
          {isCalendarShow && (
            <SmallCalendarSizer>
              <SmallCalendar />
            </SmallCalendarSizer>
          )}
          {/* <TypeClassifier /> */}
          {isCategoryShow && <CategoryClassifier />}
          {isTagShow && <TagClassifier />}
        </Content>
        <UserInfo />
      </InnerContainer>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  max-height: 100vh;
  position: relative;

  overflow: hidden;
  transition: width 0.3s ease-in-out;
`;

const InnerContainer = styled.div`
  width: ${MENU_CONTENT_WIDTH};
  min-height: 100%;

  display: flex;
  flex-direction: column;
  ${MenuBorder}
`;

const Header = styled.div`
  flex: 0 0 4rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0.5rem 1rem;
`;

const Content = styled.div`
  flex: 1 0 0;
  margin-bottom: ${MENU_PROFILE_HEIGHT};

  display: flex;
  flex-direction: column;

  gap: 1rem;

  padding: 1rem;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-clip: padding-box;
    border: none;
    background-color: ${({ theme }) => theme.text3};
  }

  & > div {
    border-radius: 10px;
    background-color: ${({ theme }) => theme.background1};
  }
`;

const SmallCalendarSizer = styled.div`
  padding: 1.5rem 1rem;
`;

export default SidebarContent;
