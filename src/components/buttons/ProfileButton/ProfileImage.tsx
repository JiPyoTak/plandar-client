import React, { useState } from 'react';

import styled from '@emotion/styled';

import useUserStore from '@/stores/user';

type TImageState = 'loading' | 'error' | 'success';

const DEFAULT_PROFILE = '/images/default-profile.png';

type TProps = {
  width?: string | number;
  height?: string | number;
};

const ProfileImage: React.FC<TProps> = ({ width, height }) => {
  const { user } = useUserStore();
  const [imageState, setImageState] = useState<TImageState>('loading');

  return (
    <>
      {imageState === 'loading' && (
        <Placeholder
          css={{
            width: width ? width : '100%',
            height: height ? height : '100%',
          }}
        />
      )}
      <Image
        css={{
          width: width ? width : '100%',
          height: height ? height : '100%',
        }}
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
  background-color: ${({ theme }) => theme.background3};
`;

const Image = styled.img`
  object-fit: cover;
`;

export default ProfileImage;
