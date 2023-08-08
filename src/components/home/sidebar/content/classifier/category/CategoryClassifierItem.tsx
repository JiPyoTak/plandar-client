import React from 'react';

import { shallow } from 'zustand/shallow';

import ClassifierItem from '@/components/common/classifier/ClassifierItem';
import useCategoryClassifierState from '@/stores/classifier/category';
import useCategoryModalState from '@/stores/modal/category';
import { ICategory } from '@/types/query/category';

type TProps = {
  category: ICategory;
};

const CategoryClassifierItem: React.FC<TProps> = ({ category }) => {
  const { id, name, color } = category;
  const { isActive, toggleCategoryShow } = useCategoryClassifierState(
    ({ hiddenCategories, toggleCategoryShow }) => {
      return { isActive: !hiddenCategories.has(id), toggleCategoryShow };
    },
    shallow,
  );
  const onEdit = useCategoryModalState(
    ({ setCategoryEditable }) => setCategoryEditable,
  );

  return (
    <ClassifierItem
      onClick={() => toggleCategoryShow(id)}
      isActive={isActive}
      text={name}
      color={color}
      onEdit={() => onEdit(id)}
    />
  );
};

export default CategoryClassifierItem;
