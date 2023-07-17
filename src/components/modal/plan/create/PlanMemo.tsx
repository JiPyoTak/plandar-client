import React, { ChangeEventHandler, useRef } from 'react';

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

const PlanMemo: React.FC = () => {
  const ref = useRef<HTMLTextAreaElement>(null);

  const [description, setDescription] = useFocusedPlanState(
    (store) => {
      const { focusedPlan, updateFocusedPlan } = store;
      const setDescription = (newDescription: string) =>
        updateFocusedPlan({ description: newDescription });
      return [focusedPlan?.description || '', setDescription];
    },
    (prev, cur) => prev[0] === cur[0],
  );

  const handleTextareaHeight = () => {
    const current = ref.current;
    if (!current) return;
    current.style.height = '0px'; // 마지막 줄 공백을 없애주기 위해 0으로 초기화
    current.style.height = current.scrollHeight + 'px';
  };

  const onChangeTextArea: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    handleTextareaHeight();
    if (e.target.value.length <= MAX_MEMO_LENGTH) {
      setDescription(e.target.value);
    }
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
      <div>
        <TextArea
          placeholder={`메모를 최대 ${MAX_MEMO_LENGTH}자까지 입력할 수 있습니다`}
          ref={ref}
          value={description}
          onChange={onChangeTextArea}
        />
      </div>
    </Container>
  );
};

const Container = styled(Dropdown)`
  width: 100%;
`;

const TextArea = styled.textarea`
  width: 100%;
  resize: none;
  border: none;
  outline: none;
  color: ${({ theme }) => theme.text1};
  font-family: inherit;
  line-height: 1.5;
  padding: 0 24px 0;
  height: 18px;
  ${FONT_REGULAR_4}

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
