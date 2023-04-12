import React from 'react';

import styled from '@emotion/styled';
import moment, { Moment } from 'moment';

import { FONT_BOLD_5, FONT_REGULAR_5 } from '@/styles/font';
import { TimetableGuide } from '@/styles/timetable';
import { DAY_OF_WEEK_UNIT } from '@/utils/constants';

type TProps = {
  dateMoments: Moment[];
};

const TimetableHeader: React.FC<TProps> = ({ dateMoments }) => {
  const standardDay = dateMoments[0];
  const timeZone = `GMT${standardDay.format('Z')}`;

  return (
    <Container>
      <TimetableGuide css={{ marginTop: 'auto' }}>{timeZone}</TimetableGuide>
      {dateMoments.map((date) => {
        const isToday = moment().format('YYYYMMDD') === date.format('YYYYMMDD');

        return (
          <SignDiv>
            <DayCircle isToday={isToday}>{date.date()}</DayCircle>
            <span>{DAY_OF_WEEK_UNIT[date.day()]}</span>
          </SignDiv>
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 50px;

  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.border2};
  user-select: none;
`;

const SignDiv = styled.div`
  ${FONT_REGULAR_5}

  flex: 1;
  padding: 0 1rem;

  display: flex;
  flex-wrap: nowrap;
  align-items: center;

  &:hover > div {
    background-color: ${({ theme }) => theme.primary_light3};
  }
  cursor: pointer;
`;

const DayCircle = styled.div<{ isToday: boolean }>`
  ${FONT_BOLD_5}

  width: 1.75rem;
  height: 1.75rem;
  margin-right: 0.25rem;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 50%;

  ${({ isToday, theme }) =>
    isToday ? `background-color: ${theme.primary}` : ''};
`;

export default TimetableHeader;
