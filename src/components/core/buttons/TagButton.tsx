import React, { PropsWithChildren } from 'react';

import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import { CrossIcon } from '@/components/common/icons';
import { FONT_SIZE } from '@/styles/font/sizes';
import { FONT_WEIGHT } from '@/styles/font/weights';

type TTagButtonProps = PropsWithChildren<{
  onClick?: () => void;
}>;

type TTagButton = React.FC<TTagButtonProps>;

const TagButton: TTagButton = ({ children, onClick }: TTagButtonProps) => {
  const theme = useTheme();

  return (
    <Container>
      {children}
      {onClick && (
        <DeleteButton>
          <CrossIcon
            css={{
              width: '100%',
              height: '100%',
            }}
            className="x-icon"
            onClick={onClick}
            color={theme.primary}
          />
        </DeleteButton>
      )}
    </Container>
  );
};

const Container = styled.span`
  display: flex;
  align-items: center;
  width: fit-content;
  letter-spacing: -0.01em;
  line-height: 18px;
  border-radius: 10px;
  padding: 5px 8px;
  gap: 6px;
  cursor: default;
  user-select: none;
  color: ${({ theme }) => theme.primary};
  background-color: ${({ theme }) => theme.primary_light2};
  ${FONT_WEIGHT['bold']};
  ${FONT_SIZE['14']};

  &:hover {
    color: ${({ theme }) => theme.primary_light2};
    background-color: ${({ theme }) => theme.primary};

    & .x-icon > path {
      stroke: ${({ theme }) => theme.primary_light2};
    }
  }
`;

const DeleteButton = styled.button`
  width: 14px;
  height: 14px;
`;

export default TagButton;
