import React, { ComponentProps, useRef } from 'react';

import ClassifierTitle, {
  CLASSIFIER_TITLE_ICON_SIZE,
} from '@/components/common/classifier/ClassifierTitle';
import { PlusIcon } from '@/components/common/icons';
import { useCategoryQuery } from '@/hooks/query/category';
import useCategoryModalState from '@/stores/modal/category';

type TProps = Omit<
  ComponentProps<typeof ClassifierTitle>,
  'title' | 'additionalComponent'
>;

const CategoryClassifierTitle: React.FC<TProps> = (props) => {
  const { isShow, toggleShow } = props;
  const { data } = useCategoryQuery();
  const categoryLengthRef = useRef<number>(data?.length ?? 0);
  const openCreateCategory = useCategoryModalState(
    ({ openCreateCategory }) => openCreateCategory,
  );

  const openModal: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    openCreateCategory();
  };

  if (data?.length !== categoryLengthRef.current && !isShow) {
    toggleShow?.();
  }

  categoryLengthRef.current = data?.length ?? 0;

  return (
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
      {...props}
    />
  );
};

export default CategoryClassifierTitle;
