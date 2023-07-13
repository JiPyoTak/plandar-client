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

const ICON_COMPONENTS = [HomeIcon, CalendarIcon, CategoryIcon, TagIcon];

const SidebarIcons = () => {
  const theme = useTheme();

  return (
    <Container>
      <IconContainer>
        <OnlyLogoIcon width={40} height={40} color={theme.white} />
      </IconContainer>
      <Menu>
        {ICON_COMPONENTS.map((IconComponent, index) => (
          <MenuIconContainer>
            <IconComponent key={index} width={32} height={32} />
          </MenuIconContainer>
        ))}
      </Menu>
      <IconContainer>
        <ProfileImage width={40} height={40} />
      </IconContainer>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;

  & > div:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.border1};
  }
`;

const IconContainer = styled.div`
  flex: 0;
  height: 4rem;
  padding: 0.75rem;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Menu = styled.div`
  flex: 1;
  padding: 0.5rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  row-gap: 0.5rem;
`;

const MenuIconContainer = styled.div`
  padding: 0.25rem;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 5px;

  & > svg * {
    color: ${({ theme }) => theme.white};
    stroke: ${({ theme }) => theme.white};
  }

  &:hover {
    background-color: ${({ theme }) => theme.white};
    & > svg * {
      color: ${({ theme }) => theme.primary};
      stroke: ${({ theme }) => theme.primary};
    }
  }
`;

export default SidebarIcons;
