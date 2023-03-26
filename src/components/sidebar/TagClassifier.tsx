import React, { useState } from 'react';

import Dropdown from '../common/dropdown';

import ClassifierEditableItem from '@/components/sidebar/classifier/ClassifierEditableItem';

import ClassifierTitle from '@/components/sidebar/classifier/ClassifierTitle';
import useTagClassifierState from '@/stores/classifier/tag';

const TagClassifier: React.FC = () => {
  const [testTags] = useState([
    { id: 1, title: '테스트1' },
    { id: 2, title: '테스트2' },
  ]);

  const { hiddenTags, toggleTagShow } = useTagClassifierState();

  return (
    <Dropdown>
      <Dropdown.Controller>
        <ClassifierTitle title={'태그'} />
      </Dropdown.Controller>
      {testTags.map(({ id, title }) => (
        <ClassifierEditableItem
          key={id}
          onClick={() => toggleTagShow(id)}
          isActive={!hiddenTags.has(id)}
          onEdit={() => undefined}
          text={title}
        />
      ))}
    </Dropdown>
  );
};

export default TagClassifier;
