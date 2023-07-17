import React from 'react';

import styled from '@emotion/styled';

import { GoogleIcon } from '@/components/common/icons';
import { FONT_REGULAR_4 } from '@/styles/font';

const GoogleButton: React.FC = () => {
  return (
    <ButtonContainer>
      <GoogleIcon />
      <span css={FONT_REGULAR_4}>구글 계정으로 로그인</span>
    </ButtonContainer>
  );
};

const ButtonContainer = styled.button`
  width: 210px;
  height: 42px;
  padding: 8px 12px;

  display: flex;
  align-items: center;
  column-gap: 24px;

  background-color: #ffffff;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.084), 0px 1px 1px rgba(0, 0, 0, 0.168);
  border-radius: 8px;
`;

export default GoogleButton;
