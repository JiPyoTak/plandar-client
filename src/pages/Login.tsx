import React from 'react';

import { Navigate } from 'react-router-dom';

import { Theme, css } from '@emotion/react';
import styled from '@emotion/styled';

import GoogleButton from '@/components/buttons/GoogleButton';
import KakaoButton from '@/components/buttons/KakaoButton';
import Logo from '@/components/logo';
import useUserStore from '@/stores/user';
import { FONT_REGULAR_4 } from '@/styles/font';
import { SERVER_URL } from '@/utils/constants';

const Login: React.FC = () => {
  const { user } = useUserStore();

  if (user !== null) {
    return <Navigate to="/" />;
  }

  return (
    <SectionContainer>
      <LoginBox>
        <Logo css={{ marginBottom: '2rem' }} />
        <a href={`${SERVER_URL}/auth/google`}>
          <GoogleButton />
        </a>
        <a href={`${SERVER_URL}/auth/kakao`}>
          <KakaoButton />
        </a>
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
