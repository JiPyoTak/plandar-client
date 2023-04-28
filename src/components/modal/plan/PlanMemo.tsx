import React, { ChangeEventHandler, useRef, useState } from 'react';

import styled from '@emotion/styled';

import Dropdown from '@/components/common/dropdown';
import { MemoIcon } from '@/components/icons';
import { MAX_MEMO_LENGTH } from '@/constants';
import { FONT_REGULAR_4 } from '@/styles/font';
import {
  ClassifierAdditionalFontStyle,
  ClassifierAdditionalMarginRight,
  PlanModalClassifierTitle,
} from '@/styles/planModal';

const PlanMemo: React.FC = () => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [memo, setMemo] = useState('');

  const handleTextareaHeight = () => {
    const current = ref.current;
    if (!current) return;
    current.style.height = '0px'; // 마지막 줄 공백을 없애주기 위해 0으로 초기화
    current.style.height = current.scrollHeight + 'px';
  };

  const onChangeTextArea: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    handleTextareaHeight();
    if (e.target.value.length <= MAX_MEMO_LENGTH) {
      setMemo(e.target.value);
    }
  };

  return (
    <Container duration={0.5}>
      <Dropdown.Controller>
        <PlanModalClassifierTitle
          title="메모"
          titleIcon={<MemoIcon width="18" height="18" />}
          additionalComponent={
            <ContentLenDisplay>
              {memo.length} / {MAX_MEMO_LENGTH}
            </ContentLenDisplay>
          }
        />
      </Dropdown.Controller>
      <div>
        <TextArea
          placeholder={`메모를 최대 ${MAX_MEMO_LENGTH}자까지 입력할 수 있습니다`}
          ref={ref}
          value={memo}
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
