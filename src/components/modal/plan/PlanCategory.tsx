import React, { ChangeEvent, useRef, useState } from 'react';

import styled from '@emotion/styled';

import Dropdown from '@/components/common/dropdown';
import Input from '@/components/common/Input';
import { CategoryIcon } from '@/components/icons';
import { Candidate } from '@/components/modal/plan/Candidates';
import CategoryCreate from '@/components/modal/plan/CategoryCreate';
import ClassifierTitle from '@/components/sidebar/classifier/ClassifierTitle';
import { MAX_CANDIDATE_LENGTH } from '@/constants';
import { useCategoryQuery } from '@/hooks/rq/category';
import useDebounce from '@/hooks/useDebounce';
import { ICategory, ICategoryWithoutId } from '@/types/rq/category';

// 입력과 일치하는 category 존재여부에 따라 다른 것을 보여주기 위해 정의한 타입
// 입력과 일치하는 category가 있을 경우: candidate
// 일치하는 category가 없을 경우: noMatch
type TFilteredType = 'candidate' | 'noMatch';

const PlanCategory: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { data: categoryData } = useCategoryQuery();
  const [filteredCategories, setFilteredCategories] = useState<ICategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<
    (ICategoryWithoutId & { id?: number }) | null
  >(null);
  const [categoryInput, setCategoryInput] = useState('');
  const [filteredType, setFilteredType] = useState<TFilteredType | null>(null);

  const onSelectCategory = (category: ICategoryWithoutId) => {
    setSelectedCategory(category);
    setFilteredCategories([]);
    setFilteredType(null);
    setCategoryInput('');
  };

  const filterCategoriesCb = (categoryName: string) => {
    if (categoryName === '') return;

    const filtered = (categoryData ?? [])
      .filter((category) => category.name.match(categoryName))
      .slice(0, MAX_CANDIDATE_LENGTH); // 최대 4개까지 보이도록

    if (filtered.length > 0) {
      setFilteredCategories(filtered);
      setFilteredType('candidate');
    } else {
      setFilteredCategories([]);
      setFilteredType('noMatch');
    }
  };

  // Debounce를 활용해서 카테고리 이름 입력시 카테고리 후보 필터링
  const filterCategories = useDebounce(filterCategoriesCb, 300);

  const onClear = () => {
    setFilteredCategories([]);
    setFilteredType(null);
    setCategoryInput('');
  };

  const onInput = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.trim();
    setCategoryInput(input);
    if (input === '') {
      onClear();
    } else {
      filterCategories(input);
    }
  };

  return (
    <Container>
      <Dropdown.Controller>
        <ClassifierTitle title="카테고리" titleIcon={<CategoryIcon />} />
      </Dropdown.Controller>
      <Input
        type="text"
        ref={inputRef}
        value={categoryInput}
        // onFocus에 filterCategoriesCb인 이유는 debounce 없이 바로 적용되기 위함
        onFocus={() => filterCategoriesCb(inputRef.current?.value.trim() || '')}
        onBlur={() => filteredType !== 'noMatch' && setFilteredType(null)}
        placeholder={'카테고리를 입력하세요'}
        onClear={onClear}
        onChange={onInput}
        maxLength={20}
      />
      {filteredType === 'candidate' && (
        <Candidate.List type="category">
          {filteredCategories.map((category) => (
            <Candidate.Item
              key={`Candidate-${category.name}`}
              isSelected={category.id === selectedCategory?.id}
              name={category.name}
              color={category.color}
              onMouseDown={() => onSelectCategory(category)}
            />
          ))}
        </Candidate.List>
      )}
      {filteredType === 'noMatch' && categoryInput && (
        <CategoryCreate name={categoryInput} onSuccess={onSelectCategory} />
      )}
    </Container>
  );
};

const Container = styled(Dropdown)`
  width: 100%;
  position: relative;
`;
export default PlanCategory;
