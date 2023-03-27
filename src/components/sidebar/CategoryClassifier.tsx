import React, { useState } from 'react';

import Dropdown from '../common/dropdown';

import { PlusIcon } from '@/components/icons';
import ClassifierItem from '@/components/sidebar/classifier/ClassifierItem';

import ClassifierTitle, {
  CLASSIFIER_TITLE_ICON_SIZE,
} from '@/components/sidebar/classifier/ClassifierTitle';
import useCategoryClassifierState from '@/stores/classifier/category';

const CategoryClassifier: React.FC = () => {
  const [testCategory, setTestCategory] = useState([
    { id: 1, title: '테스트1', color: '#9747FF' },
  ]);

  const { hiddenCategories, toggleCategoryShow } = useCategoryClassifierState();

  const addCategory: React.MouseEventHandler<SVGSVGElement> = (e) => {
    e.stopPropagation();

    setTestCategory((prev) => {
      const { id } = prev[prev.length - 1];
      const newId = id + 1;

      return [
        ...prev,
        { id: newId, title: `테스트${newId}`, color: '#9747FF' },
      ];
    });
  };

  return (
    <Dropdown>
      <Dropdown.Controller>
        <ClassifierTitle
          title={'카테고리'}
          additionalIcon={
            <PlusIcon
              onClick={addCategory}
              width={CLASSIFIER_TITLE_ICON_SIZE}
              height={CLASSIFIER_TITLE_ICON_SIZE}
            />
          }
        />
      </Dropdown.Controller>
      {testCategory.map(({ id, title, color }) => (
        <ClassifierItem
          key={id}
          onClick={() => toggleCategoryShow(id)}
          isActive={!hiddenCategories.has(id)}
          text={title}
          color={color}
          onEdit={() => undefined}
        />
      ))}
    </Dropdown>
  );
};

export default CategoryClassifier;
