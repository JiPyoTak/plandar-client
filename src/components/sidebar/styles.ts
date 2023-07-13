import { Theme, css } from '@emotion/react';

const SelectedIcon = ({ theme }: { theme: Theme }) => css`
  background-color: ${theme.white};

  & > svg * {
    color: ${theme.primary};
    stroke: ${theme.primary};
  }
`;

export { SelectedIcon };
