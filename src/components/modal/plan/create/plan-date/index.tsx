import styled from '@emotion/styled';

import DatePicker from '@/components/modal/plan/create/plan-date/DatePicker';
import TimeInput from '@/components/modal/plan/create/plan-date/TimeInput';
import usePlanDateState from '@/hooks/usePlanDateState';

const PlanDate = () => {
  const { date, isValidEndDate, isAllDay, setDate, setTime } =
    usePlanDateState();

  return (
    <Container>
      <div>
        <DatePicker onChangeDate={setDate('start')} date={date['start']} />
        {!isAllDay && (
          <TimeInput
            setTime={setTime('start')}
            time={{ hour: date['start'].hour, minute: date['start'].minute }}
          />
        )}
      </div>
      <span css={{ margin: 5 }}> ~ </span>
      <div>
        <DatePicker
          onChangeDate={setDate('end')}
          date={date['end']}
          isInvalid={!isValidEndDate}
        />
        {!isAllDay && (
          <TimeInput
            setTime={setTime('end')}
            time={{ hour: date['end'].hour, minute: date['end'].minute }}
          />
        )}
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;

  padding: 0.5rem 0;
`;

export default PlanDate;
