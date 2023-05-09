import React, { useState } from 'react';

import styled from '@emotion/styled';

import useUserStore from '@/stores/user';

type TImageState = 'loading' | 'error' | 'success';

const DEFAULT_PROFILE = '/images/default-profile.png';

const ProfileImage: React.FC = () => {
  const { user } = useUserStore();
  console.log('user', user);
  const [imageState, setImageState] = useState<TImageState>('loading');

  return (
    <>
      {imageState === 'loading' && <Placeholder />}
      <Image
        src={user?.profileImage}
        alt="프로필 이미지"
        onLoad={() => {
          setImageState('success');
        }}
        onError={(e) => {
          e.currentTarget.src = DEFAULT_PROFILE;
          setImageState('error');
        }}
        referrerPolicy="no-referrer"
      />
    </>
  );
};

const Placeholder = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.background3};
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export default ProfileImage;
