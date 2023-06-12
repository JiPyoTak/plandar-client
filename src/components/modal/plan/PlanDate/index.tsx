import styled from '@emotion/styled';
import moment from 'moment/moment';
import { shallow } from 'zustand/shallow';

import DatePicker from '@/components/modal/plan/PlanDate/DatePicker';
import TimeInput from '@/components/modal/plan/PlanDate/TimeInput';
import { TDateYMD } from '@/stores/date';
import useFocusedPlanState from '@/stores/plan/focusedPlan';
import { TDateYMDHM, TTimeHM } from '@/types/time';

type TDateType = 'start' | 'end';

const PlanDate = () => {
  const { date, setDate, setTime, isValidEndDate } = useFocusedPlanState(
    (store) => {
      const { focusedPlan, updateFocusedPlan } = store;

      const _startDate = focusedPlan?.startTime
        ? new Date(focusedPlan?.startTime)
        : new Date();

      const startDate = {
        year: _startDate.getFullYear(),
        month: _startDate.getMonth() + 1,
        day: _startDate.getDate(),
        hour: _startDate.getHours(),
        minute: _startDate.getMinutes(),
      };

      const _endDate = focusedPlan?.endTime
        ? new Date(focusedPlan?.endTime)
        : new Date();

      const endDate = {
        year: _endDate.getFullYear(),
        month: _endDate.getMonth() + 1,
        day: _endDate.getDate(),
        hour: _endDate.getHours(),
        minute: _endDate.getMinutes(),
      };

      const date: { [key in TDateType]: TDateYMDHM } = {
        start: startDate,
        end: endDate,
      };

      const setDate = (type: TDateType) => {
        const key = type === 'start' ? 'startTime' : 'endTime';
        const originDate = date[type];
        return ({ year, month, day }: TDateYMD) => {
          const newDateMoment = moment({
            ...originDate,
            year,
            month: month - 1,
            day,
          });
          updateFocusedPlan({ [key]: newDateMoment.toString() });
        };
      };

      const setTime = (type: TDateType) => {
        const key = type === 'start' ? 'startTime' : 'endTime';
        const originDate = date[type];
        return ({ hour, minute }: TTimeHM) => {
          const { month, ...rest } = originDate;
          const newDateMoment = moment({
            ...rest,
            month: month - 1,
            hour,
            minute,
          });
          updateFocusedPlan({ [key]: newDateMoment.toString() });
        };
      };

      const isValidEndDate = moment({
        ...startDate,
        month: startDate.month - 1,
      }).isSameOrBefore({ ...endDate, month: endDate.month - 1 });

      return {
        date,
        setDate,
        setTime,
        isValidEndDate,
      };
    },
    shallow,
  );

  return (
    <Container>
      {(['start', 'end'] as TDateType[]).map((type) => (
        <div css={{ position: 'relative' }} key={type}>
          <DatePicker
            onChangeDate={setDate(type)}
            date={date[type]}
            isInvalid={type === 'end' && !isValidEndDate}
          />
          {type === 'start' && (
            <TimeInput
              setTime={setTime(type)}
              time={{ hour: date[type].hour, minute: date[type].minute }}
            />
          )}
          {type === 'start' && <span css={{ margin: 5 }}> ~ </span>}
        </div>
      ))}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: 48px;
`;

export default PlanDate;
