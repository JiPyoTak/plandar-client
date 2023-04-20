import React, { ChangeEvent, FormEventHandler, useRef, useState } from 'react';

import styled from '@emotion/styled';

import TagButton from '@/components/buttons/TagButton';
import Dropdown from '@/components/common/dropdown';
import Input from '@/components/common/Input';
import { TagIcon } from '@/components/icons';
import ClassifierTitle from '@/components/sidebar/classifier/ClassifierTitle';
import { MAX_CANDIDATE_LENGTH } from '@/constants';
import useDebounce from '@/hooks/useDebounce';
import { TAG_MOCK } from '@/utils/mock';
import { Candidate } from 'components/modal/plan/Candidates';

const PlanTag: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [tagInput, setTagInput] = useState('');
  const [isCandidateOpened, setIsCandidateOpened] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([
    TAG_MOCK[0].name,
    TAG_MOCK[1].name,
  ]);
  const [filteredTags, setFilteredTags] = useState<string[]>([]);

  // Debounce를 활용해서 태그 입력 시 태그 후보 필터링
  const filterTags = useDebounce((newTag: string) => {
    const filtered = TAG_MOCK.filter((tag) => tag.name.match(newTag))
      .slice(0, MAX_CANDIDATE_LENGTH)
      .map((tag) => tag.name);
    setFilteredTags(filtered);
  }, 300);

  // selectedTags에 태그 추가
  const addTag = (tag?: string) => {
    if (!tag || selectedTags.length >= 5 || selectedTags.includes(tag)) return;
    setSelectedTags((prev) => [...prev, tag]);
    setTagInput('');
    setFilteredTags([]);
  };

  // 입력창에서 Enter 누르면 태그 추가
  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    addTag(inputRef.current?.value);
    inputRef.current?.blur();
  };

  // Input 컴포넌트의 onChange 이벤트 핸들러
  const onInput = (e: ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
    filterTags(e.target.value);
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
          onChange={onInput}
        />
      </form>
      {/* 태그 후보군 팝업창 */}
      {isCandidateOpened && tagInput && (
        <Candidate.List type={'tag'}>
          {filteredTags.map((candidate, index) => (
            <Candidate.Item
              key={`Candidate-${index}`}
              onMouseDown={() => addTag(candidate)}
              name={candidate}
              isSelected={selectedTags.includes(candidate)}
            />
          ))}
        </Candidate.List>
      )}
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

export default PlanTag;
