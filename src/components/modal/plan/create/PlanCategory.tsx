import React, { ChangeEvent, useRef } from 'react';

import styled from '@emotion/styled';

import { CategoryIcon } from '@/components/common/icons';
import Dropdown from '@/components/core/dropdown';
import Input from '@/components/core/Input';
import { Candidate } from '@/components/modal/plan/create/candidates';
import CategoryCreateForm from '@/components/modal/plan/create/category/CategoryCreateForm';
import SelectedCategoryDisplay from '@/components/modal/plan/create/category/SelectedCategoryDisplay';
import usePlanModalCategory from '@/hooks/modal/usePlanModalCategory';
import useDebounce from '@/hooks/useDebounce';
import {
  PlanModalClassifierTitle,
  PlanModalCollapseDuration,
} from '@/styles/plan-modal';

// 입력과 일치하는 category 존재여부에 따라 다른 것을 보여주기 위해 정의한 타입
// 입력과 일치하는 category가 있을 경우: candidate
// 일치하는 category가 없을 경우: noMatch

const PlanCategory: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    focusedCategory,
    categoryInput,
    filteredType,
    selectedCategory,
    filteredCategories,
    filterCategoriesCb,
    clearCategory,
    selectCategory,
    setCategoryInput,
    setSelectedCategory,
    onKeydown,
  } = usePlanModalCategory();

  // Debounce를 활용해서 카테고리 이름 입력시 카테고리 후보 필터링
  const [filterCategories] = useDebounce(filterCategoriesCb, 300);

  const onInput = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    setCategoryInput(input);
    filterCategories(input.trim());
  };

  return (
    <Container duration={PlanModalCollapseDuration}>
      <Dropdown.Controller>
        <PlanModalClassifierTitle
          title="카테고리"
          titleIcon={<CategoryIcon width="18" height="18" />}
          additionalComponent={
            selectedCategory && (
              <SelectedCategoryDisplay
                category={selectedCategory}
                onUpdateCategory={setSelectedCategory}
              />
            )
          }
        />
      </Dropdown.Controller>
      <Input
        type="text"
        placeholder="카테고리를 입력하세요"
        maxLength={20}
        ref={inputRef}
        value={categoryInput}
        onFocus={() => filterCategoriesCb(inputRef.current?.value.trim() || '')}
        onBlur={clearCategory}
        onClear={clearCategory}
        onChange={onInput}
        onKeyDown={onKeydown}
        css={{
          '&:focus': {
            borderRadius: '0.5rem 0.5rem 0 0',
            borderBottom: 'none',
          },
        }}
      />
      {filteredType === 'candidate' && (
        <Candidate.List type="category">
          {filteredCategories.map((category) => (
            <Candidate.Item
              key={`Candidate-${category.name}`}
              isSelected={category.name === selectedCategory?.name}
              isFocused={category.name === focusedCategory?.name}
              name={category.name}
              color={category.color}
              onMouseDown={() => selectCategory(category)}
            />
          ))}
        </Candidate.List>
      )}
      {filteredType === 'noMatch' && categoryInput && (
        <CategoryCreateForm name={categoryInput} onSuccess={selectCategory} />
      )}
    </Container>
  );
};

const Container = styled(Dropdown)`
  position: relative;

  width: 100%;
`;

export default PlanCategory;
