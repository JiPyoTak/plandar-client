import React, { ChangeEvent, useRef, useState } from 'react';

import styled from '@emotion/styled';

import Dropdown from '@/components/common/dropdown';
import Input from '@/components/common/Input';
import { CategoryIcon } from '@/components/icons';
import { Candidate } from '@/components/modal/plan/Candidates';
import CategoryCreateForm from '@/components/modal/plan/category/CategoryCreateForm';
import SelectedCategoryDisplay from '@/components/modal/plan/category/SelectedCategoryDisplay';
import { MAX_CANDIDATE_LENGTH } from '@/constants';
import { useCategoryQuery } from '@/hooks/rq/category';
import useDebounce from '@/hooks/useDebounce';
import useFocusedPlanState from '@/stores/plan/focusedPlan';
import { PlanModalClassifierTitle } from '@/styles/planModal';
import { ICategory } from '@/types/rq/category';

// 입력과 일치하는 category 존재여부에 따라 다른 것을 보여주기 위해 정의한 타입
// 입력과 일치하는 category가 있을 경우: candidate
// 일치하는 category가 없을 경우: noMatch
type TFilteredType = 'candidate' | 'noMatch';

const PlanCategory: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { data: categoryData } = useCategoryQuery();
  const [filteredCategories, setFilteredCategories] = useState<ICategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useFocusedPlanState(
    (store) => {
      const { focusedPlan, updateFocusedPlan } = store;
      const setSelectedCategory = (categoryId: number) =>
        updateFocusedPlan({ categoryId });

      return [
        categoryData && focusedPlan?.categoryId
          ? categoryData.find(
              (category) => category.id === focusedPlan.categoryId,
            )
          : null,
        setSelectedCategory,
      ];
    },
    (prev, cur) => prev[0] === cur[0],
  );

  const [categoryInput, setCategoryInput] = useState('');
  const [filteredType, setFilteredType] = useState<TFilteredType | null>(null);

  const onSelectCategory = (category: ICategory) => {
    setSelectedCategory(category.id);
    setFilteredCategories([]);
    setFilteredType(null);
    setCategoryInput('');
  };

  const filterCategoriesCb = (categoryName: string) => {
    if (categoryName === '') return;

    const filtered = (categoryData ?? [])
      .filter((category) => category.name.match(categoryName))
      .slice(0, MAX_CANDIDATE_LENGTH); // 최대 4개까지 보이도록

    setFilteredCategories(filtered);
    setFilteredType(filtered.length > 0 ? 'candidate' : 'noMatch');
  };

  // Debounce를 활용해서 카테고리 이름 입력시 카테고리 후보 필터링
  const [filterCategories] = useDebounce(filterCategoriesCb, 300);

  const onClear = () => {
    setFilteredCategories([]);
    setFilteredType(null);
    setCategoryInput('');
  };

  const onInput = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setCategoryInput(input);
    if (input === '') {
      onClear();
    } else {
      filterCategories(input.trim());
    }
  };

  return (
    <Container>
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
        ref={inputRef}
        value={categoryInput}
        // onFocus에 filterCategoriesCb인 이유는 debounce 없이 바로 적용되기 위함
        onFocus={() => filterCategoriesCb(inputRef.current?.value.trim() || '')}
        onBlur={() => setFilteredType(null)}
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
              isSelected={category.name === selectedCategory?.name}
              name={category.name}
              color={category.color}
              onMouseDown={() => onSelectCategory(category)}
            />
          ))}
        </Candidate.List>
      )}
      {filteredType === 'noMatch' && categoryInput && (
        <CategoryCreateForm name={categoryInput} onSuccess={onSelectCategory} />
      )}
    </Container>
  );
};

const Container = styled(Dropdown)`
  width: 100%;
  position: relative;
`;

export default PlanCategory;
