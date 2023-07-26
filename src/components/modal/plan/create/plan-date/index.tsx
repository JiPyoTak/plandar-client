import styled from '@emotion/styled';

import moment, { Moment, MomentInput } from 'moment';

import DatePicker from '@/components/modal/plan/create/plan-date/DatePicker';
import TimeInput from '@/components/modal/plan/create/plan-date/TimeInput';
import { toast } from '@/core/toast';
import useFocusedPlanState from '@/stores/plan/focusedPlan';

type TKey = 'startTime' | 'endTime';
type TChangeType = 'time' | 'date';

const PlanDate = () => {
  const { focusedPlan, updateFocusedPlan } = useFocusedPlanState(
    ({ focusedPlan, updateFocusedPlan }) => ({
      focusedPlan,
      updateFocusedPlan,
    }),
  );

  const { startMoment, endMoment, isAllDay } = focusedPlan ?? {};

  const date: { [key in TKey]: Moment } = {
    startTime: startMoment ?? moment(),
    endTime: endMoment ?? moment(),
  };

  const setPlanDate = (key: TKey, changeType: TChangeType) => {
    const targetDate = date[key];
    const oppositeDate = date[key === 'startTime' ? 'endTime' : 'startTime'];

    return (input: MomentInput) => {
      const newDate = moment(input);
      const prevDate = moment(targetDate);

      if (changeType === 'time') {
        newDate.set('year', prevDate.get('year'));
        newDate.set('month', prevDate.get('month'));
        newDate.set('date', prevDate.get('date'));
      } else if (changeType === 'date') {
        newDate.set('hour', prevDate.get('hour'));
        newDate.set('minute', prevDate.get('minute'));
      }

      const start = key === 'startTime' ? moment(newDate) : oppositeDate;
      const end = key === 'endTime' ? moment(newDate) : oppositeDate;
      const isValid = start.isSameOrBefore(end);

      if (!isValid) {
        toast('날짜를 변경할 수 없습니다.');
      } else {
        updateFocusedPlan({ [key]: newDate.toString() });
      }

      return isValid;
    };
  };

  return (
    <Container>
      <InnerItem>
        <DatePicker
          onChangeDate={setPlanDate('startTime', 'date')}
          date={date.startTime}
        />
        {!isAllDay && (
          <TimeInput
            setTime={setPlanDate('startTime', 'time')}
            time={date.startTime}
          />
        )}
      </InnerItem>
      <span css={{ margin: 5 }}> ~ </span>
      <InnerItem>
        <DatePicker
          onChangeDate={setPlanDate('endTime', 'date')}
          date={date.endTime}
        />
        {!isAllDay && (
          <TimeInput
            setTime={setPlanDate('endTime', 'time')}
            time={date.endTime}
          />
        )}
      </InnerItem>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;

  padding: 0.5rem 0;
`;

const InnerItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default PlanDate;
