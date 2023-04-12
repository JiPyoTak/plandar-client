import React, { useState } from 'react';

import Dropdown from '../common/dropdown';

import { PlusIcon } from '@/components/icons';
import CategoryModal, {
  TCategoryModalProps,
} from '@/components/modal/CategoryModal';
import ClassifierItem from '@/components/sidebar/classifier/ClassifierItem';

import ClassifierTitle, {
  CLASSIFIER_TITLE_ICON_SIZE,
} from '@/components/sidebar/classifier/ClassifierTitle';
import {
  useCategoryCreate,
  useCategoryQuery,
  useCategoryUpdate,
} from '@/hooks/rq/category';
import useCategoryClassifierState from '@/stores/classifier/category';
import { TColor } from '@/types';

const CategoryClassifier: React.FC = () => {
  const { data: categoryData, isLoading } = useCategoryQuery();
  const { mutate: categoryCreate } = useCategoryCreate();
  const { mutate: categoryUpdate } = useCategoryUpdate();
  const [modalState, setModalState] = useState<TCategoryModalProps | null>(
    null,
  );

  const { hiddenCategories, toggleCategoryShow } = useCategoryClassifierState();

  const onClickAdd = () => {
    setModalState({
      onClose: () => setModalState(null),
      onDone: ({
        categoryName: name,
        color,
      }: {
        categoryName: string;
        color: TColor;
      }) => {
        categoryCreate({ name, color });
        setModalState(null);
      },
    });
  };

  const onClickEdit = (id: number) => {
    const originalCategory = categoryData?.find(
      (category) => category.id === id,
    );
    setModalState({
      onClose: () => setModalState(null),
      isEdit: true,
      categoryName: originalCategory?.name,
      color: originalCategory?.color,
      onDone: ({
        categoryName: name,
        color,
      }: {
        categoryName: string;
        color: TColor;
      }) => {
        categoryUpdate({ id, name, color });
        setModalState(null);
      },
    });
  };

  if (isLoading) return null;

  return (
    <>
      <Dropdown>
        <Dropdown.Controller>
          <ClassifierTitle
            title={'카테고리'}
            additionalIcon={
              <PlusIcon
                onClick={onClickAdd}
                width={CLASSIFIER_TITLE_ICON_SIZE}
                height={CLASSIFIER_TITLE_ICON_SIZE}
              />
            }
          />
        </Dropdown.Controller>
        {categoryData?.map(({ id, name, color }) => (
          <ClassifierItem
            key={id}
            onClick={() => toggleCategoryShow(id)}
            isActive={!hiddenCategories.has(id)}
            text={name}
            color={color}
            onEdit={() => onClickEdit(id)}
          />
        ))}
      </Dropdown>
      {modalState && <CategoryModal {...modalState} />}
    </>
  );
};

export default CategoryClassifier;
