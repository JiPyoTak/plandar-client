import React, {
  ChangeEventHandler,
  TextareaHTMLAttributes,
  useRef,
} from 'react';

import styled from '@emotion/styled';

import Dropdown from '@/components/common/dropdown';
import { MemoIcon } from '@/components/icons';
import ClassifierTitle from '@/components/sidebar/classifier/ClassifierTitle';
import { MAX_MEMO_LENGTH } from '@/constants';
import { FONT_REGULAR_4 } from '@/styles/font';

type TPlanMemoProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

type TPlanMemo = React.FC<TPlanMemoProps>;

const PlanMemo: TPlanMemo = ({ onChange, ...rest }: TPlanMemoProps) => {
  const ref = useRef<HTMLTextAreaElement>(null);

  const handleTextareaHeight = () => {
    const current = ref.current;
    if (!current) return;
    current.style.height = '0px'; // 마지막 줄 공백을 없애주기 위해 0으로 초기화
    current.style.height = current.scrollHeight + 'px';
  };

  const onChangeTextArea: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    handleTextareaHeight();
    if (e.target.value.length <= MAX_MEMO_LENGTH) {
      onChange?.(e);
    }
  };

  return (
    <Container duration={0.5}>
      <Dropdown.Controller>
        <ClassifierTitle
          title="메모"
          titleIcon={<MemoIcon />}
          additionalComponent={
            <ContentLenDisplay>
              {ref.current?.value.length ?? 0} / {MAX_MEMO_LENGTH}
            </ContentLenDisplay>
          }
        />
      </Dropdown.Controller>
      <div>
        <TextArea
          placeholder={`메모를 최대 ${MAX_MEMO_LENGTH}자까지 입력할 수 있습니다`}
          ref={ref}
          onChange={onChangeTextArea}
          {...rest}
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
  ${FONT_REGULAR_4}

  &::placeholder {
    color: ${({ theme }) => theme.text3};
  }
`;

const ContentLenDisplay = styled.span`
  margin-right: 15px;
  color: ${({ theme }) => theme.text3};
`;

export default PlanMemo;
