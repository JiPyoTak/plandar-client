import React from 'react';

import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import ProfileImage from '@/components/buttons/ProfileButton/ProfileImage';
import {
  CalendarIcon,
  CategoryIcon,
  HomeIcon,
  OnlyLogoIcon,
  TagIcon,
} from '@/components/icons';
import useMenuState, { TMenuState } from '@/stores/menu';
import {
  MENU_PROFILE_HEIGHT,
  MenuBorder,
  MenuIconWrapper,
  MenuSelectedIcon,
} from '@/styles/sidebar';

const ICON_COMPONENTS = {
  home: HomeIcon,
  calendar: CalendarIcon,
  category: CategoryIcon,
  tag: TagIcon,
};

const SidebarIcons = () => {
  const theme = useTheme();
  const { isOpened, selected, selectMenu } = useMenuState();

  const onClickMenuIcon: React.MouseEventHandler = (e) => {
    const target = e.target as HTMLButtonElement;

    const button = target.closest('button');

    if (!button) return;

    const name = button.name as TMenuState;

    selectMenu(name);
  };

  return (
    <Container>
      <Header>
        <OnlyLogoIcon width={40} height={40} color={theme.white} />
      </Header>
      <Menu onClick={onClickMenuIcon}>
        {Object.entries(ICON_COMPONENTS).map(([key, IconComponent]) => (
          <MenuIconWrapper
            key={key}
            name={key}
            css={key === selected && isOpened && MenuSelectedIcon({ theme })}
          >
            <IconComponent width={32} height={32} />
          </MenuIconWrapper>
        ))}
      </Menu>
      <Footer>
        <ProfileImage width={40} height={40} />
      </Footer>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  max-height: 100vh;

  display: flex;
  flex-direction: column;

  ${MenuBorder}
`;

const Header = styled.div`
  height: 4rem;
  padding: 0.75rem;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.primary};
`;

const Menu = styled.div`
  flex: 1;
  margin-bottom: ${MENU_PROFILE_HEIGHT};
  padding: 0.5rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  row-gap: 0.5rem;
`;

const Footer = styled(Header)`
  height: ${MENU_PROFILE_HEIGHT};
  position: absolute;
  bottom: 0;
`;

export default SidebarIcons;
