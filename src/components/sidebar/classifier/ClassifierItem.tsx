import React, { PropsWithChildren } from 'react';

import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import { CheckIcon } from '@/components/icons';

type TProps = PropsWithChildren<{
  text: string;
  isActive: boolean;
  color?: string;
}> &
  React.HTMLAttributes<HTMLDivElement>;

const CLASSIFIER_EDITABLE_ITEM_CLASS = 'classifier-item-edit';

const ClassifierItem: React.FC<TProps> = ({
  isActive,
  color,
  text,
  children,
  ...restProps
}) => {
  const theme = useTheme();

  if (!color) {
    color = theme.primary;
  }

  return (
    <Wrapper {...restProps}>
      <CircleDiv
        css={{ backgroundColor: isActive ? color : theme.background4 }}
      >
        <CheckIcon width={16.5} height={16.5} color={theme.white} />
      </CircleDiv>
      <span css={{ flex: 1 }}>{text}</span>
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

  & > .${CLASSIFIER_EDITABLE_ITEM_CLASS} {
    visibility: hidden;
  }
  &:hover > .${CLASSIFIER_EDITABLE_ITEM_CLASS} {
    visibility: visible;
  }

  cursor: pointer;
`;

const CircleDiv = styled.div`
  width: 22px;
  height: 22px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 50%;
`;

export { CLASSIFIER_EDITABLE_ITEM_CLASS };
export default ClassifierItem;
