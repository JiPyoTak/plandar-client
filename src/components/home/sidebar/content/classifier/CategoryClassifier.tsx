import React, { MouseEventHandler, useState } from 'react';

import ClassifierGuide from '@/components/common/classifier/ClassifierGuide';
import ClassifierItem from '@/components/common/classifier/ClassifierItem';
import ClassifierTitle, {
  CLASSIFIER_TITLE_ICON_SIZE,
} from '@/components/common/classifier/ClassifierTitle';
import { CategoryIcon, PlusIcon } from '@/components/common/icons';
import Dropdown from '@/components/core/dropdown';
import CategoryModal, {
  TCategoryModalProps,
} from '@/components/modal/category';

import { toast } from '@/core/toast';
import {
  useCategoryCreate,
  useCategoryQuery,
  useCategoryUpdate,
} from '@/hooks/query/category';
import useCategoryClassifierState from '@/stores/classifier/category';
import { ColorCircle } from '@/styles/category';
import { TColor } from '@/types';

const CategoryClassifier: React.FC = () => {
  const { data: categoryData } = useCategoryQuery();
  const { mutate: categoryCreate } = useCategoryCreate();
  const { mutate: categoryUpdate } = useCategoryUpdate();
  const [modalState, setModalState] = useState<TCategoryModalProps | null>(
    null,
  );

  const { hiddenCategories, toggleCategoryShow } = useCategoryClassifierState();

  // 카테고리 추가
  const onClickAdd: MouseEventHandler = (e) => {
    e.stopPropagation();
    setModalState({
      onClose: () => setModalState(null),
      onDone: ({
        categoryName: name,
        color,
      }: {
        categoryName: string;
        color: TColor;
      }) => {
        try {
          categoryCreate({ name, color });
          setModalState(null);
          toast(
            <div>
              <ColorCircle color={color} />
              {` ${name} `}
              카테고리를 생성했습니다
            </div>,
          );
        } catch (e) {
          toast('카테고리 생성에 실패했습니다');
        }
      },
    });
  };

  // 카테고리 수정
  const onClickEdit = (id: number) => {
    const originalCategory = categoryData?.find(
      (category) => category.id === id,
    );
    if (!originalCategory) return;

    setModalState({
      onClose: () => setModalState(null),
      isEdit: true,
      category: originalCategory,
      onDone: ({
        categoryName: name,
        color,
      }: {
        categoryName: string;
        color: TColor;
      }) => {
        try {
          categoryUpdate({ id, name, color });
          setModalState(null);
          toast(
            <div>
              <ColorCircle color={originalCategory.color} />
              {` ${originalCategory.name} `} 카테고리를{' '}
              <ColorCircle color={color} />
              {` ${name} `}으로 수정했습니다
            </div>,
          );
        } catch (e) {
          toast('카테고리 수정에 실패했습니다');
        }
      },
    });
  };

  return (
    <>
      <div css={{ padding: '1rem 0' }}>
        <Dropdown>
          <Dropdown.Controller>
            <ClassifierTitle
              title={'카테고리'}
              additionalComponent={
                <button onClick={onClickAdd}>
                  <PlusIcon
                    width={CLASSIFIER_TITLE_ICON_SIZE}
                    height={CLASSIFIER_TITLE_ICON_SIZE}
                  />
                </button>
              }
            />
          </Dropdown.Controller>
          <ClassifierGuide icon={CategoryIcon} data={categoryData}>
            <span>카테고리를 만들어서</span>
            <span>일정을 관리해보세요!</span>
          </ClassifierGuide>
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
      </div>
      {modalState && <CategoryModal {...modalState} />}
    </>
  );
};

export default CategoryClassifier;
