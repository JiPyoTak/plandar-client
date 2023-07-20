import { useState } from 'react';

import { MAX_CANDIDATE_LENGTH } from '@/constants';
import { useCategoryQuery } from '@/hooks/query/category';
import useFocusedPlanState from '@/stores/plan/focusedPlan';
import { ICategory } from '@/types/query/category';

type TFilteredType = 'candidate' | 'noMatch';

const usePlanModalCategory = () => {
  const { data: categoryData } = useCategoryQuery();

  const [selectedCategory, setSelectedCategory] = useFocusedPlanState(
    (store) => {
      const { focusedPlan, updateFocusedPlan } = store;

      const category = categoryData?.find(
        (category) => category.id === focusedPlan?.categoryId,
      );

      const setSelectedCategory = (categoryId: number) => {
        updateFocusedPlan({ categoryId });
      };

      return [category ?? null, setSelectedCategory];
    },
    (prev, cur) => prev[0] === cur[0],
  );

  const [categoryInput, setCategoryInput] = useState('');
  const [filteredType, setFilteredType] = useState<TFilteredType | null>(null);
  const [filteredCategories, setFilteredCategories] = useState<ICategory[]>([]);
  const [focusedCategory, setFocusedCategory] = useState<ICategory | null>(
    selectedCategory,
  );

  const selectCategory = (category: ICategory) => {
    setSelectedCategory(category.id);
    clearCategory();
  };

  const filterCategoriesCb = (categoryName: string) => {
    const filtered = (categoryData ?? [])
      .filter((category) => category.name.match(categoryName))
      .slice(0, MAX_CANDIDATE_LENGTH); // 최대 4개까지 보이도록

    setFocusedCategory(null);
    setFilteredCategories(filtered);
    setFilteredType(filtered.length > 0 ? 'candidate' : 'noMatch');
  };

  const clearCategory = () => {
    setFilteredCategories([]);
    setFocusedCategory(null);
    setFilteredType(null);
    setCategoryInput('');
  };

  return {
    categoryInput,
    filteredType,
    filteredCategories,
    focusedCategory,
    selectedCategory,
    setFocusedCategory,
    setSelectedCategory,
    setCategoryInput,
    selectCategory,
    filterCategoriesCb,
    clearCategory,
  };
};

export default usePlanModalCategory;
