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
import {
  MenuBorder,
  MenuIconWrapper,
  MenuSelectedIcon,
} from '@/components/sidebar/styles';
import useMenuState, { TMenuState } from '@/stores/menu';

const ICON_COMPONENTS = {
  home: HomeIcon,
  calendar: CalendarIcon,
  category: CategoryIcon,
  tag: TagIcon,
};

const SidebarIcons = () => {
  const theme = useTheme();
  const { selected, selectMenu } = useMenuState((state) => ({
    selected: state.selected,
    selectMenu: state.selectMenu,
  }));

  const onClickMenuIcon: React.MouseEventHandler = (e) => {
    const target = e.target as HTMLButtonElement;

    const button = target.closest('button');

    if (!button) return;

    const name = button.name as TMenuState;

    selectMenu(name);
  };

  return (
    <Container>
      <IconContainer>
        <OnlyLogoIcon width={40} height={40} color={theme.white} />
      </IconContainer>
      <Menu onClick={onClickMenuIcon}>
        {Object.entries(ICON_COMPONENTS).map(([key, IconComponent]) => (
          <MenuIconWrapper
            key={key}
            name={key}
            css={key === selected && MenuSelectedIcon({ theme })}
          >
            <IconComponent width={32} height={32} />
          </MenuIconWrapper>
        ))}
      </Menu>
      <IconContainer css={{ position: 'absolute', bottom: 0 }}>
        <ProfileImage width={40} height={40} />
      </IconContainer>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;

  ${MenuBorder}
`;

const IconContainer = styled.div`
  height: 4rem;
  padding: 0.75rem;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.primary};
`;

const Menu = styled.div`
  flex: 1;
  padding: 0.5rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  row-gap: 0.5rem;
`;

export default SidebarIcons;
