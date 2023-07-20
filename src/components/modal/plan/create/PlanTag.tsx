import React, { ChangeEvent, FormEventHandler, useRef, useState } from 'react';

import styled from '@emotion/styled';

import { TagIcon } from '@/components/common/icons';
import TagButton from '@/components/core/buttons/TagButton';
import Dropdown from '@/components/core/dropdown';
import Input from '@/components/core/Input';
import { MAX_TAG_LENGTH } from '@/constants';
import useFocusedPlanState from '@/stores/plan/focusedPlan';
import {
  ClassifierAdditionalFontStyle,
  ClassifierAdditionalMarginRight,
  PlanModalClassifierTitle,
  PlanModalCollapseDuration,
} from '@/styles/plan-modal';

const PlanTag: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [tagInput, setTagInput] = useState('');
  const [selectedTags, setSelectedTags] = useFocusedPlanState(
    (store) => {
      const { focusedPlan, updateFocusedPlan } = store;
      const setSelectedTags = (newTags: string[]) =>
        updateFocusedPlan({ tags: newTags });
      return [focusedPlan?.tags || [], setSelectedTags];
    },
    (prev, cur) => {
      const prevTags = prev[0];
      const curTags = cur[0];
      if (prevTags.length !== curTags.length) return false;
      return prevTags.every((tag, i) => tag === curTags[i]);
    },
  );

  // selectedTags에 태그 추가
  const addTag = (tag?: string) => {
    if (
      !tag ||
      selectedTags.length >= MAX_TAG_LENGTH ||
      selectedTags.includes(tag)
    )
      return;
    setSelectedTags([...selectedTags, tag]);
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
    <Container duration={PlanModalCollapseDuration} defaultVisibility={true}>
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
              setSelectedTags(selectedTags.filter((name) => name !== tag))
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
  position: relative;

  width: 100%;
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
