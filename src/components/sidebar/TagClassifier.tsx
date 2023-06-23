import React, { useMemo } from 'react';

import Dropdown from '../common/dropdown';

import ClassifierItem from '@/components/sidebar/classifier/ClassifierItem';
import ClassifierTitle from '@/components/sidebar/classifier/ClassifierTitle';
import { useGetPlansQuery } from '@/hooks/rq/plan';
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

  const { data } = useGetPlansQuery({
    timemin: startFormat,
    timemax: endFormat,
  });

  const tags = useMemo(() => {
    const tagNameSet = new Set<string>();

    for (const { tags } of data ?? []) {
      for (const tag of tags ?? []) {
        tagNameSet.add(tag);
      }
    }

    return [...tagNameSet].sort();
  }, [data]);

  return (
    <Dropdown>
      <Dropdown.Controller>
        <ClassifierTitle title={'태그'} />
      </Dropdown.Controller>
      {tags.map((title) => (
        <ClassifierItem
          key={title}
          onClick={() => toggleTagShow(title)}
          isActive={!hiddenTags.has(title)}
          onEdit={() => undefined}
          text={title}
        />
      ))}
    </Dropdown>
  );
};

export default TagClassifier;
