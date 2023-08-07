import React from 'react';

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
import useCategoryModalState from '@/stores/modal/category';

const CategoryClassifier = () => {
  const { data: categoryData, isLoading: isLoadingCategory } =
    useCategoryQuery();
  const openCreateCategory = useCategoryModalState(
    ({ openCreateCategory }) => openCreateCategory,
  );

  const openModal: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    openCreateCategory();
  };

  return (
    <>
      <div css={{ padding: '1rem 0' }}>
        <Dropdown>
          <Dropdown.Controller>
            <ClassifierTitle
              title={'카테고리'}
              additionalComponent={
                <button onClick={openModal}>
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
            <CategoryClassifierItem key={category.id} category={category} />
          ))}
        </Dropdown>
      </div>
      <CategoryModal />
    </>
  );
};

export default CategoryClassifier;
