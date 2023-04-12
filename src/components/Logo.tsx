import React from 'react';

import { css } from '@emotion/react';

import styled from '@emotion/styled';

import { FONT_BOLD_1 } from '@/styles/font';

const Logo: React.FC = () => {
  return (
    <HyperlinkWrapper href={''}>
      <div
        css={css`
          width: 2rem;
          height: 2rem;
          background-color: #000000;
        `}
      ></div>
      <span css={[FONT_BOLD_1]}>Plandar</span>
    </HyperlinkWrapper>
  );
};

const HyperlinkWrapper = styled.a`
  flex: 0 0 340px;
  height: 4rem;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  column-gap: 1rem;

  color: ${({ theme }) => theme.black};
  text-decoration: none;
`;

export default Logo;
