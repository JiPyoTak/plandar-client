import React from 'react';

import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import { CheckIcon, PencilIcon } from '@/components/icons';
import { SELECTABLE_COLOR } from '@/constants';
import { TColor } from '@/types';

type TProps = {
  text: string;
  isActive: boolean;
  color?: TColor;
  onEdit?: (...args: unknown[]) => unknown;
} & React.HTMLAttributes<HTMLDivElement>;

const CLASSIFIER_EDITABLE_ITEM_CLASS = 'classifier-item-edit';

const ClassifierItem: React.FC<TProps> = ({
  isActive,
  color = SELECTABLE_COLOR[0],
  text,
  onEdit,
  ...restProps
}) => {
  const theme = useTheme();

  return (
    <Wrapper {...restProps}>
      <CircleDiv
        css={{
          backgroundColor: isActive ? color : theme.background4,
        }}
      >
        <CheckIcon width={16.5} height={16.5} color={theme.white} />
      </CircleDiv>
      <span css={{ flex: 1 }}>{text}</span>
      {onEdit && (
        <button onClick={onEdit}>
          <PencilIcon
            className={CLASSIFIER_EDITABLE_ITEM_CLASS}
            width={20}
            height={20}
          />
        </button>
      )}
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
