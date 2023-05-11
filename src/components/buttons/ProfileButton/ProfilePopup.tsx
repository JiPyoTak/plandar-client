import styled from '@emotion/styled';

import useLogout from '@/hooks/useLogout';
import useUserStore from '@/stores/user';
import { FONT_REGULAR_3, FONT_REGULAR_4, FONT_REGULAR_5 } from '@/styles/font';

const ProfilePopup = () => {
  const { user } = useUserStore();
  const logout = useLogout();
  const onLogout = async () => {
    try {
      await logout();
    } catch (e) {
      alert('로그아웃에 실패했습니다');
    }
  };

  return (
    <Container>
      <NameSection>
        <UsernameDisplay>{user?.username}</UsernameDisplay>
        <EmailDisplay>{user?.email}</EmailDisplay>
      </NameSection>
      <Hr />
      <Button onClick={onLogout}>로그아웃</Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 60px;
  right: 10px;
  background-color: ${({ theme }) => theme.background1};
  padding: 10px;
  border-radius: 5px;
  border-right-width: 0;
  border-left-width: 8px;
  z-index: 60;
  filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07))
    drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));
  overflow: hidden;
`;

const Button = styled.button`
  width: 100%;
  height: 100%;
  padding: 5px 0;
  border-radius: 5px;
  &:hover {
    background-color: ${({ theme }) => theme.background4};
  }
  // ${FONT_REGULAR_5}
`;

const NameSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: start;
  justify-content: center;
`;

const UsernameDisplay = styled.span`
  ${FONT_REGULAR_3}
`;

const EmailDisplay = styled.span`
  color: ${({ theme }) => theme.text3};
  ${FONT_REGULAR_4}
`;

const Hr = styled.hr`
  width: 100%;
  border: none;
  height: 1px;
  background-color: ${({ theme }) => theme.border2};
`;

export default ProfilePopup;
