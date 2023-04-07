import React from 'react';

import { Theme, css } from '@emotion/react';
import styled from '@emotion/styled';

import GoogleButton from '@/components/buttons/GoogleButton';
import KakaoButton from '@/components/buttons/KakaoButton';
import Logo from '@/components/logo';
import { FONT_REGULAR_4 } from '@/styles/font';

const Login: React.FC = () => {
  return (
    <SectionContainer>
      <LoginBox>
        <Logo />
        <GoogleButton />
        <KakaoButton />
      </LoginBox>
      <Description>
        <span>바로 로그인을 해보세요!</span>
      </Description>
    </SectionContainer>
  );
};

const SectionContainer = styled.section`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const flexibleBorder = (theme: Theme) => css`
  @media (min-width: 410px) {
    padding: 2rem 3rem;
    border-radius: 4px;
    border: 1px solid ${theme.border2};
  }
`;

const LoginBox = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 1rem;

  & > *:first-child {
    margin-bottom: 2rem;
  }

  ${({ theme }) => flexibleBorder(theme)}
`;

const Description = styled.section`
  margin-top: 1rem;
  & > * {
    width: 210px;

    display: block;
    text-align: center;
  }

  ${FONT_REGULAR_4}
  ${({ theme }) => flexibleBorder(theme)}
`;

export default Login;
