import React from 'react';

import styled from '@emotion/styled';

import { Moment } from 'moment';

import useDateState from '@/stores/date';

interface IProps {
  dayMoments: Moment[];
}

const COMPARE_FORMAT = 'YYYY-MM';

const CalendarOverlay = ({ dayMoments }: IProps) => {
  const referenceDate = useDateState(({ referenceDate }) => referenceDate);
  const referenceFormat = referenceDate.format(COMPARE_FORMAT);

  return (
    <Container>
      {dayMoments.map((dayMoment, j) => {
        const weekFormat = dayMoment.format('YYYY-MM');

        return (
          <Inner
            key={`${weekFormat}-${j}`}
            css={{
              backgroundColor:
                referenceFormat === weekFormat
                  ? 'transparent'
                  : 'rgba(255,255,255,.4)',
            }}
          />
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  z-index: 20;

  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
`;

const Inner = styled.div`
  position: relative;

  flex: 1;
  display: flex;
`;

export default CalendarOverlay;
