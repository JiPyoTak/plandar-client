import React from 'react';

import styled from '@emotion/styled';

import { LogoIcon } from '@/components/icons';
import { FONT_BOLD_1 } from '@/styles/font';

type TProps = {
  className?: string;
  showPicture?: boolean;
  showText?: boolean;
};

const Logo: React.FC<TProps> = ({
  className,
  showPicture = true,
  showText = true,
}) => {
  return (
    <HyperlinkContainer className={className} href={'/'}>
      {showPicture && <LogoIcon width={'2.5rem'} height={'2.5rem'} />}
      {showText && <span css={[FONT_BOLD_1]}>Plandar</span>}
    </HyperlinkContainer>
  );
};

const HyperlinkContainer = styled.a`
  height: 4rem;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  column-gap: 1rem;

  color: ${({ theme }) => theme.text1};
  text-decoration: none;
`;

export default Logo;
