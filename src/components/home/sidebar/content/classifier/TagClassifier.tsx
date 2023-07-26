import React, { useMemo } from 'react';

import moment from 'moment';

import ClassifierItem from '@/components/common/classifier/ClassifierItem';
import ClassifierTitle from '@/components/common/classifier/ClassifierTitle';
import Dropdown from '@/components/core/dropdown';
import { useGetPlansQuery } from '@/hooks/query/plan';
import useTagClassifierState from '@/stores/classifier/tag';
import useDateState from '@/stores/date';
import { getStartAndEndDate } from '@/utils/date/getStartAndEndDate';

const TagClassifier: React.FC = () => {
  const { hiddenTags, toggleTagShow } = useTagClassifierState();

  // TODO : make hook
  const { referenceDate, calendarUnit } = useDateState(
    ({ referenceDate, calendarUnit }) => ({
      referenceDate,
      calendarUnit,
    }),
  );
  // FIXME : hook으로 빼내면서 변수 할당 해주겠습니다.
  const [sm, em] = getStartAndEndDate(referenceDate);

  const { data } = useGetPlansQuery({
    timemin: sm.format(),
    timemax: em.format(),
  });

  // TODO: Timetable의 로직과 같은 로직을 사용하고 있습니다.
  /// State Store 변경을 해서 시간 개념을 통일하는게 좋아보입니다.
  //// 주 선택하면 선택한 날짜 상관없이 해당 주를 보여주기
  let rangeAmount = 0;
  const startMoment = moment(referenceDate);
  if (calendarUnit === 'month') {
    rangeAmount = 42;
    startMoment.startOf('month').startOf('week');
  } else if (calendarUnit === 'week') {
    rangeAmount = 7;
    startMoment.startOf('week');
  }
  const endMoment = moment(startMoment).add(rangeAmount + 1, 'day');

  const planData = (data ?? []).filter(
    ({ startTime, endTime }) =>
      !(endMoment.isSameOrBefore(startTime) || startMoment.isAfter(endTime)),
  );

  const tags = useMemo(() => {
    const tagNameSet = new Set<string>();

    for (const { tags } of planData ?? []) {
      for (const tag of tags ?? []) {
        tagNameSet.add(tag);
      }
    }

    return [...tagNameSet].sort();
  }, [planData, calendarUnit, referenceDate]);

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
