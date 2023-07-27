import React, { useMemo } from 'react';

import ClassifierGuide from '@/components/common/classifier/ClassifierGuide';
import ClassifierItem from '@/components/common/classifier/ClassifierItem';
import ClassifierTitle from '@/components/common/classifier/ClassifierTitle';
import { TagIcon } from '@/components/common/icons';
import Dropdown from '@/components/core/dropdown';
import useRangedPlans from '@/hooks/useRangedPlans';
import useTagClassifierState from '@/stores/classifier/tag';

const TagClassifier: React.FC = () => {
  const { hiddenTags, toggleTagShow } = useTagClassifierState();
  const { data: plans, isLoading: isLoadingPlan } = useRangedPlans();

  const tags = useMemo(() => {
    const tagNameSet = new Set<string>();

    for (const { tags } of plans) {
      for (const tag of tags ?? []) {
        tagNameSet.add(tag);
      }
    }

    return [...tagNameSet].sort();
  }, [plans]);

  return (
    <div css={{ padding: '1rem 0' }}>
      <Dropdown>
        <Dropdown.Controller>
          <ClassifierTitle title={'태그'} />
        </Dropdown.Controller>
        <ClassifierGuide
          icon={TagIcon}
          isShow={!tags?.length && !isLoadingPlan}
        >
          <span>일정에 태그를 추가해서</span>
          <span>일정을 분류해보세요!</span>
        </ClassifierGuide>
        {isLoadingPlan &&
          [...Array(2)].map((_, index) => (
            <ClassifierItem.Skeleton key={index} />
          ))}
        {tags.map((title) => (
          <ClassifierItem
            key={title}
            onClick={() => toggleTagShow(title)}
            isActive={!hiddenTags.has(title)}
            text={title}
          />
        ))}
      </Dropdown>
    </div>
  );
};

export default TagClassifier;
