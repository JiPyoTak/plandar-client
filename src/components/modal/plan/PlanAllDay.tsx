import { useState } from 'react';

import styled from '@emotion/styled';

import Checkbox from '@/components/buttons/Checkbox';

const PlanAllDay = () => {
  const [isAllDay, setIsAllDay] = useState(false);

  return (
    <Container>
      <Checkbox
        label="종일"
        checked={isAllDay}
        onClick={() => setIsAllDay((prev) => !prev)}
      />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

export default PlanAllDay;
