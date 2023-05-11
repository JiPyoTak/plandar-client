import React, { ButtonHTMLAttributes, MouseEvent, useState } from 'react';

import styled from '@emotion/styled';

import ProfileImage from '@/components/buttons/ProfileButton/ProfileImage';
import ProfilePopup from '@/components/buttons/ProfileButton/ProfilePopup';

type TProfileButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

type TProfileButton = React.FC<TProfileButtonProps>;

const ProfileButton: TProfileButton = ({
  onClick,
  ...rest
}: TProfileButtonProps) => {
  const [popupOpened, setPopupOpened] = useState(false);
  const onClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    setPopupOpened((prev) => !prev);
    onClick?.(e);
  };

  return (
    <>
      <Container onClick={onClickHandler} {...rest}>
        <ProfileImage />
      </Container>
      {popupOpened && (
        <>
          <ProfilePopup />
          <Background onMouseDown={() => setPopupOpened(false)} />
        </>
      )}
    </>
  );
};

const Container = styled.button`
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  border: solid 2px ${({ theme }) => theme.border1};
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 50;
`;

export default ProfileButton;
