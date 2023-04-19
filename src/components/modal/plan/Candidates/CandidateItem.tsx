import React, { ButtonHTMLAttributes } from 'react';

import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import { CheckIcon } from '@/components/icons';
import { SELECTABLE_COLOR } from '@/constants';
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

  if (type === 'tag') {
    return (
      <Container
        css={isSelected && { backgroundColor: theme.background2 }}
        {...rest}
      >
        <CheckIconContainer>
          {isSelected && (
            <CheckIcon
              css={{ width: 17, height: 17 }}
              color={theme.primary_light}
            />
          )}
        </CheckIconContainer>
        <Title>{name}</Title>
      </Container>
    );
  } else {
    return <div>아직 구현 못함</div>;
  }
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
