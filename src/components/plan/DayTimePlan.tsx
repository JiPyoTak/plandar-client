import React from 'react';

import styled from '@emotion/styled';

import { Color } from '@/components/common/modal/styles';
import Plan from '@/plan/Plan';
import { FONT_REGULAR_5 } from '@/styles/font';

type TProps = {
  plan: Plan;
};

const DayTimePlan: React.FC<TProps> = ({ plan }) => {
  return (
    <Container>
      <div css={{ flex: '0 0 16px' }}>
        <Color width={8} height={8} backgroundColor={plan.color} />
      </div>
      <TitleText>{plan.title}</TitleText>
    </Container>
  );
};

const Container = styled.div`
  height: 1.25rem;
  padding: 0 0.5rem;

  display: flex;
  align-items: center;
`;

const TitleText = styled.span`
  ${FONT_REGULAR_5}

  flex: 1 1 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export default DayTimePlan;
