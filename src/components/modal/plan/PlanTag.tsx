import React, { ChangeEvent, FormEventHandler, useRef, useState } from 'react';

import styled from '@emotion/styled';

import TagButton from '@/components/buttons/TagButton';
import Dropdown from '@/components/common/dropdown';
import Input from '@/components/common/Input';
import { TagIcon } from '@/components/icons';
import { MAX_TAG_LENGTH } from '@/constants';
import {
  ClassifierAdditionalFontStyle,
  ClassifierAdditionalMarginRight,
  PlanModalClassifierTitle,
} from '@/styles/planModal';

const PlanTag: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [tagInput, setTagInput] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // selectedTags에 태그 추가
  const addTag = (tag?: string) => {
    if (
      !tag ||
      selectedTags.length >= MAX_TAG_LENGTH ||
      selectedTags.includes(tag)
    )
      return;
    setSelectedTags((prev) => [...prev, tag]);
    setTagInput('');
  };

  // 입력창에서 Enter 누르면 태그 추가
  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    addTag(inputRef.current?.value);
  };

  const onClear = () => {
    setTagInput('');
  };

  // Input 컴포넌트의 onChange 이벤트 핸들러
  const onInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      onClear();
    } else {
      setTagInput(e.target.value);
    }
  };

  return (
    <Container>
      <Dropdown.Controller>
        <PlanModalClassifierTitle
          title="태그"
          titleIcon={<TagIcon width="18" height="18" />}
          additionalComponent={
            <SelectedTagUnit>
              {selectedTags.length} / {MAX_TAG_LENGTH}
            </SelectedTagUnit>
          }
        />
      </Dropdown.Controller>
      {/* 입력창 */}
      <form onSubmit={onSubmit}>
        <Input
          type="text"
          ref={inputRef}
          value={tagInput}
          placeholder={'태그를 입력하세요'}
          onClear={onClear}
          onChange={onInput}
        />
      </form>
      {/* 추가된 태그 버튼들 */}
      <TagButtonContainer>
        {selectedTags.map((tag) => (
          <TagButton
            onClick={() =>
              setSelectedTags((prev) => prev.filter((name) => name !== tag))
            }
            key={tag}
          >
            {tag}
          </TagButton>
        ))}
      </TagButtonContainer>
    </Container>
  );
};

const Container = styled(Dropdown)`
  width: 100%;
  position: relative;
`;

const TagButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  width: 100%;
  gap: 4px;
`;

const SelectedTagUnit = styled.span`
  margin-right: ${ClassifierAdditionalMarginRight};
  color: ${({ theme }) => theme.text3};
  ${ClassifierAdditionalFontStyle}
`;

export default PlanTag;
