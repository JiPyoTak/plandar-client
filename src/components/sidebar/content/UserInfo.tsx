import React from 'react';

import styled from '@emotion/styled';

import useLogout from '@/hooks/useLogout';
import useUserStore from '@/stores/user';
import { FONT_BOLD_3, FONT_REGULAR_4 } from '@/styles/font';
import { MENU_CONTENT_WIDTH, MENU_PROFILE_HEIGHT } from '@/styles/sidebar';

const UserInfo = () => {
  const { user } = useUserStore();
  const handleLogout = useLogout();

  if (!user) return null;

  return (
    <Container>
      <Description>
        <p css={FONT_BOLD_3}>{user.username}</p>
        <p css={FONT_REGULAR_4}>{user.email}</p>
      </Description>
      <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  bottom: 0;

  width: ${MENU_CONTENT_WIDTH};
  height: ${MENU_PROFILE_HEIGHT};

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0.75rem;
  background-color: ${({ theme }) => theme.primary};
`;

const Description = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  justify-content: center;

  gap: 5px;
  color: ${({ theme }) => theme.white};
`;

const LogoutButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 10px;
  border-radius: 3px;

  background-color: ${({ theme }) => theme.primary_light2};
`;

export default UserInfo;
