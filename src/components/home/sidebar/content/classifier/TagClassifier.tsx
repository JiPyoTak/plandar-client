import React, { useMemo } from 'react';

import ClassifierItem from '@/components/common/classifier/ClassifierItem';
import ClassifierTitle from '@/components/common/classifier/ClassifierTitle';
import Dropdown from '@/components/core/dropdown';
import { useGetPlansQuery } from '@/hooks/query/plan';
import useTagClassifierState from '@/stores/classifier/tag';
import useDateState from '@/stores/date';
import { getFormattedDate } from '@/utils/date/getFormattedDate';
import { getStartAndEndDate } from '@/utils/date/getStartAndEndDate';

const TagClassifier: React.FC = () => {
  const { hiddenTags, toggleTagShow } = useTagClassifierState();

  const { year, month, day } = useDateState();
  const { startFormat, endFormat } = getFormattedDate(
    ...getStartAndEndDate({ year, month, day }),
  );

  const { data: planData } = useGetPlansQuery({
    timemin: startFormat,
    timemax: endFormat,
  });

  const tags = useMemo(() => {
    const tagNameSet = new Set<string>();

    for (const { tags } of planData ?? []) {
      for (const tag of tags ?? []) {
        tagNameSet.add(tag);
      }
    }

    return [...tagNameSet].sort();
  }, [planData]);

  return (
    <div css={{ padding: '1rem 0' }}>
      <Dropdown>
        <Dropdown.Controller>
          <ClassifierTitle title={'태그'} />
        </Dropdown.Controller>
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
