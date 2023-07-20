import React, { ChangeEventHandler, useState } from 'react';

import styled from '@emotion/styled';

import { MemoIcon } from '@/components/common/icons';
import Dropdown from '@/components/core/dropdown';
import { MAX_MEMO_LENGTH } from '@/constants';
import useFocusedPlanState from '@/stores/plan/focusedPlan';
import { FONT_REGULAR_4 } from '@/styles/font';
import {
  ClassifierAdditionalFontStyle,
  ClassifierAdditionalMarginRight,
  PlanModalClassifierTitle,
  PlanModalCollapseDuration,
} from '@/styles/plan-modal';
import { BOX_SCROLL_Y } from '@/styles/scroll';

const PlanMemo: React.FC = () => {
  const [isFocsued, setIsFocused] = useState(false);

  const [description, setDescription] = useFocusedPlanState(
    (store) => {
      const { focusedPlan, updateFocusedPlan } = store;
      const setDescription = (newDescription: string) =>
        updateFocusedPlan({ description: newDescription });
      return [focusedPlan?.description || '', setDescription];
    },
    (prev, cur) => prev[0] === cur[0],
  );

  const onInputTextArea: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.target.value.length > MAX_MEMO_LENGTH) return;

    setDescription(e.target.value);
  };

  return (
    <Container duration={PlanModalCollapseDuration} defaultVisibility={true}>
      <Dropdown.Controller>
        <PlanModalClassifierTitle
          title="메모"
          titleIcon={<MemoIcon width="18" height="18" />}
          additionalComponent={
            <ContentLenDisplay>
              {description.length} / {MAX_MEMO_LENGTH}
            </ContentLenDisplay>
          }
        />
      </Dropdown.Controller>
      <TextArea
        placeholder={`메모를 최대 ${MAX_MEMO_LENGTH}자까지 입력할 수 있습니다`}
        value={description}
        className={isFocsued ? 'focused' : ''}
        onInput={onInputTextArea}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </Container>
  );
};

const Container = styled(Dropdown)`
  width: 100%;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 150px;

  padding: 0.8rem;
  border-radius: 0.5rem;

  line-height: 1.5;

  color: ${({ theme }) => theme.text1};
  border-color: ${({ theme }) => theme.white};
  background-color: ${({ theme }) => theme.background2};

  font-family: inherit;
  resize: none;

  ${FONT_REGULAR_4}
  ${BOX_SCROLL_Y}

  &.focused {
    background-color: ${({ theme }) => theme.background1};
    border-color: ${({ theme }) => theme.border2};
  }

  &::placeholder {
    color: ${({ theme }) => theme.text3};
  }
`;

const ContentLenDisplay = styled.span`
  margin-right: ${ClassifierAdditionalMarginRight};
  color: ${({ theme }) => theme.text3};
  ${ClassifierAdditionalFontStyle}
`;

export default PlanMemo;
