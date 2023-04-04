import { PropsWithChildren, useState } from 'react';

import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import { CrossIcon, PlusIcon } from '@/components/icons';
import { FONT_SIZE } from '@/styles/font/fontSize';

type TagButtonProps = {
  onClick?: () => void;
};

const TagButton = ({
  children,
  onClick,
}: PropsWithChildren<TagButtonProps>) => {
  const theme = useTheme();
  const [isHover, setIsHover] = useState(false);
  return (
    <Container
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {children}
      <DeleteButton>
        <CrossIcon
          css={{ width: '100%', height: '100%' }}
          onClick={onClick}
          color={isHover ? theme.primary_light3 : theme.primary}
        />
      </DeleteButton>
      <PlusIcon color="white" />
    </Container>
  );
};

const Container = styled.span`
  display: flex;
  align-items: center;
  width: fit-content;
  font-size: ${FONT_SIZE['14']};
  border-radius: 100px;
  padding: 5px 8px;
  gap: 6px;
  cursor: default;
  user-select: none;
  color: ${({ theme }) => theme.primary};
  background-color: ${({ theme }) => theme.primary_light3};

  &:hover {
    color: ${({ theme }) => theme.primary_light3};
    background-color: ${({ theme }) => theme.primary};
  }
`;

const DeleteButton = styled.button`
  width: 14px;
  height: 14px;
`;

export default TagButton;
