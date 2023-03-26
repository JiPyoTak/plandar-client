import React, { PropsWithChildren } from 'react';

import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import { CheckIcon } from '@/components/icons';

type TProps = PropsWithChildren<{
  text: string;
  isActive: boolean;
  color?: string;
}>;

const ClassifierItem: React.FC<TProps> = ({
  isActive,
  color,
  text,
  children,
}) => {
  const theme = useTheme();

  if (!color) {
    color = theme.primary;
  }

  return (
    <Wrapper>
      <CircleDiv
        css={{ backgroundColor: isActive ? color : theme.background4 }}
      >
        <CheckIcon width={16.5} height={16.5} color={theme.white} />
      </CircleDiv>
      <span>{text}</span>
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 2.5rem;
  padding: 0.5rem 1.25rem 0.5rem 2.25rem;

  display: flex;
  align-items: center;
  column-gap: 1rem;

  & > .edit {
    visibility: hidden;
  }
  &:hover > .edit {
    visibility: visible;
  }
`;

const CircleDiv = styled.div`
  width: 22px;
  height: 22px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 50%;
`;

export default ClassifierItem;
