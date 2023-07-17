import React, { ButtonHTMLAttributes } from 'react';

import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import { CheckIcon } from '@/components/common/icons';
import { SELECTABLE_COLOR } from '@/constants';
import { ColorCircle } from '@/styles/category';
import { TColor } from '@/types';

type TCandidateItemProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  type?: 'tag' | 'category';
  isSelected: boolean;
  name: string;
  color?: TColor;
};

type TCandidateItem = React.FC<TCandidateItemProps>;

const CandidateItem: TCandidateItem = ({
  type,
  isSelected,
  name,
  color = SELECTABLE_COLOR[0],
  ...rest
}: TCandidateItemProps) => {
  const theme = useTheme();

  return (
    <Container
      css={isSelected && { backgroundColor: theme.background2 }}
      {...rest}
    >
      {type === 'tag' ? (
        <>
          <CheckIconContainer>
            {isSelected && (
              <CheckIcon color={theme.primary_light} width="17" height="17" />
            )}
          </CheckIconContainer>
          <Title>{name}</Title>
        </>
      ) : (
        <>
          <ColorCircle color={color} size={20} />
          <Title>{name}</Title>
          <CheckIconContainer>
            {isSelected && (
              <CheckIcon color={theme.primary_light} width="17" height="17" />
            )}
          </CheckIconContainer>
        </>
      )}
    </Container>
  );
};

const Container = styled.button`
  display: flex;
  width: 100%;
  height: 34px;
  padding: 8px 12px;
  gap: 15px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.white};

  &:hover {
    background-color: ${({ theme }) => theme.background3};
  }

  &:first-of-type {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  &:last-of-type {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
`;

const CheckIconContainer = styled.div`
  height: 100%;
  aspect-ratio: 1/1;
`;

const Title = styled.span`
  flex: 1;
  text-align: left;
`;

export default CandidateItem;
