import styled from '@emotion/styled';

import DatePicker from '@/components/modal/plan/create/plan-date/DatePicker';
import TimeInput from '@/components/modal/plan/create/plan-date/TimeInput';
import usePlanDateState from '@/hooks/usePlanDateState';

const PlanDate = () => {
  const { date, isValidEndDate, isAllDay, setDate, setTime } =
    usePlanDateState();

  return (
    <Container>
      <div css={{ position: 'relative' }}>
        <DatePicker onChangeDate={setDate('start')} date={date['start']} />
        {!isAllDay && (
          <TimeInput
            setTime={setTime('start')}
            time={{ hour: date['start'].hour, minute: date['start'].minute }}
          />
        )}
      </div>
      <span css={{ margin: 5 }}> ~ </span>
      <div css={{ position: 'relative' }}>
        {!isAllDay && (
          <TimeInput
            setTime={setTime('end')}
            time={{ hour: date['end'].hour, minute: date['end'].minute }}
          />
        )}
        <DatePicker
          onChangeDate={setDate('end')}
          date={date['end']}
          isInvalid={!isValidEndDate}
        />
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: 48px;
`;

export default PlanDate;
