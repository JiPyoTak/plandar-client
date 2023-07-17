import React from 'react';

import styled from '@emotion/styled';

import { KakaoIcon } from '@/components/common/icons';

import { FONT_REGULAR_4 } from '@/styles/font';

const KakaoButton: React.FC = () => {
  return (
    <ButtonContainer>
      <KakaoIcon />
      <span css={[FONT_REGULAR_4, { flex: 1 }]}>카카오 로그인</span>
    </ButtonContainer>
  );
};

const ButtonContainer = styled.button`
  width: 210px;
  height: 42px;
  padding: 8px 12px;

  display: flex;
  align-items: center;

  background-color: #fee500;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.084), 0px 1px 1px rgba(0, 0, 0, 0.168);
  border-radius: 8px;
`;

export default KakaoButton;
