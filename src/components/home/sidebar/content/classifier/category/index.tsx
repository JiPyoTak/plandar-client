import React, { useRef } from 'react';

import ClassifierGuide from '@/components/common/classifier/ClassifierGuide';
import ClassifierItem from '@/components/common/classifier/ClassifierItem';
import ClassifierTitle, {
  CLASSIFIER_TITLE_ICON_SIZE,
} from '@/components/common/classifier/ClassifierTitle';
import { CategoryIcon, PlusIcon } from '@/components/common/icons';
import Dropdown from '@/components/core/dropdown';
import CategoryClassifierItem from '@/components/home/sidebar/content/classifier/category/CategoryClassifierItem';
import CategoryModal from '@/components/modal/category';
import { useCategoryQuery } from '@/hooks/query/category';

const CategoryClassifier = () => {
  const { data: categoryData, isLoading: isLoadingCategory } =
    useCategoryQuery();
  const setEditableIdRef = useRef<
    React.Dispatch<React.SetStateAction<number | null>> | undefined
  >(undefined);

  const openModal = (id: number | null = null) => {
    setEditableIdRef.current?.(id);
  };

  const setAddableCategory = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    openModal(-1);
  };

  return (
    <>
      <div css={{ padding: '1rem 0' }}>
        <Dropdown>
          <Dropdown.Controller>
            <ClassifierTitle
              title={'카테고리'}
              additionalComponent={
                <button onClick={setAddableCategory}>
                  <PlusIcon
                    width={CLASSIFIER_TITLE_ICON_SIZE}
                    height={CLASSIFIER_TITLE_ICON_SIZE}
                  />
                </button>
              }
            />
          </Dropdown.Controller>
          <ClassifierGuide
            icon={CategoryIcon}
            isShow={!categoryData?.length && !isLoadingCategory}
          >
            <span>카테고리를 만들어서</span>
            <span>일정을 관리해보세요!</span>
          </ClassifierGuide>
          {isLoadingCategory &&
            [...Array(2)].map((_, index) => (
              <ClassifierItem.Skeleton key={index} />
            ))}
          {categoryData?.map((category) => (
            <CategoryClassifierItem category={category} onEdit={openModal} />
          ))}
        </Dropdown>
      </div>
      <CategoryModal setEditableIdRef={setEditableIdRef} />
    </>
  );
};

export default CategoryClassifier;
