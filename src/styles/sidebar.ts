import { Theme, css } from '@emotion/react';
import styled from '@emotion/styled';

const MENU_CONTENT_WIDTH = '21.25rem';
const MENU_PROFILE_HEIGHT = '4rem';

const MenuSelectedIcon = ({ theme }: { theme: Theme }) => css`
  background-color: ${theme.white};

  & > svg * {
    color: ${theme.primary};
    stroke: ${theme.primary};
  }
`;

const MenuBorder = ({ theme }: { theme: Theme }) => css`
  & > div:not(:first-child) {
    border-top: 1px solid ${theme.border1};
  }
`;

const MenuIconWrapper = styled.button`
  padding: 0.25rem;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 5px;

  cursor: pointer;

  & > svg * {
    color: ${({ theme }) => theme.white};
    stroke: ${({ theme }) => theme.white};
  }

  &:hover {
    ${MenuSelectedIcon}
  }
`;

export {
  MENU_CONTENT_WIDTH,
  MENU_PROFILE_HEIGHT,
  MenuIconWrapper,
  MenuSelectedIcon,
  MenuBorder,
};
