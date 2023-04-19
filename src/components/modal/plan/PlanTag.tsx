import React, { FormEventHandler, useRef, useState } from 'react';

import styled from '@emotion/styled';

import TagButton from '@/components/buttons/TagButton';
import Dropdown from '@/components/common/dropdown';
import Input from '@/components/common/Input';
import { TagIcon } from '@/components/icons';
import ClassifierTitle from '@/components/sidebar/classifier/ClassifierTitle';
import { MAX_CANDIDATE_LENGTH } from '@/constants';
import { TAG_MOCK } from '@/utils/mock';
import { Candidate } from 'components/modal/plan/Candidates';

const PlanTag: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [tagInput, setTagInput] = useState('');
  const [isCandidateOpened, setIsCandidateOpened] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([
    '테스트1',
    '테스트2',
  ]);

  const addTag = (tag?: string) => {
    if (!tag || selectedTags.length >= 5 || selectedTags.includes(tag)) return;
    setSelectedTags((prev) => [...prev, tag]);
    setTagInput('');
  };

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    addTag(inputRef.current?.value);
    inputRef.current?.blur();
  };

  return (
    <Container>
      <Dropdown.Controller>
        <ClassifierTitle title="태그" titleIcon={<TagIcon />} />
      </Dropdown.Controller>
      {/* 입력창 */}
      <form onSubmit={onSubmit}>
        <Input
          type="text"
          ref={inputRef}
          value={tagInput}
          placeholder={'태그를 입력하세요'}
          onFocus={() => setIsCandidateOpened(true)}
          onBlur={() => setIsCandidateOpened(false)}
          onClear={() => setTagInput('')}
          onChange={(e) => setTagInput(e.target.value)}
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
      {/* 태그 후보군 팝업창 */}
      {isCandidateOpened && tagInput && (
        <Candidates type={'tag'}>
          {TAG_MOCK.filter((tag) => tag.name.match(tagInput))
            .slice(0, MAX_CANDIDATE_LENGTH)
            .map((candidate, index) => (
              <Candidate.Item
                key={`Candidate-${index}`}
                onMouseDown={() => {
                  addTag(candidate.name);
                }}
                name={candidate.name}
                isSelected={selectedTags.includes(candidate.name)}
              />
            ))}
        </Candidates>
      )}
    </Container>
  );
};

const Container = styled(Dropdown)`
  width: 100%;
  position: relative;
`;

const Candidates = styled(Candidate.List)`
  position: absolute;
  top: 40px;
`;

const TagButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  width: 100%;
  gap: 4px;
`;

export default PlanTag;
