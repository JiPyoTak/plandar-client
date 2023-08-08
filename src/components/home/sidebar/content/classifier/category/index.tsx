import React from 'react';

import ClassifierGuide from '@/components/common/classifier/ClassifierGuide';
import ClassifierItem from '@/components/common/classifier/ClassifierItem';
import { CategoryIcon } from '@/components/common/icons';
import Dropdown from '@/components/core/dropdown';
import CategoryClassifierItem from '@/components/home/sidebar/content/classifier/category/CategoryClassifierItem';
import CategoryClassifierTitle from '@/components/home/sidebar/content/classifier/category/CategoryClassifierTitle';
import CategoryModal from '@/components/modal/category';
import { useCategoryQuery } from '@/hooks/query/category';

const CategoryClassifier = () => {
  const { data: categoryData, isLoading: isLoadingCategory } =
    useCategoryQuery();

  return (
    <>
      <div css={{ padding: '1rem 0' }}>
        <Dropdown>
          <Dropdown.Controller>
            <CategoryClassifierTitle />
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
